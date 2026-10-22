import { spawn } from "node:child_process"
import { existsSync } from "node:fs"

let cachedBinary = null

/**
 * Resuelve el binario de ffmpeg: primero FFMPEG_PATH, luego ffmpeg-static
 * (instalado por npm) y por último el ffmpeg del sistema.
 */
async function resolveFfmpeg() {
  if (cachedBinary) return cachedBinary
  if (process.env.FFMPEG_PATH) {
    cachedBinary = process.env.FFMPEG_PATH
    return cachedBinary
  }
  try {
    const mod = await import("ffmpeg-static")
    const bin = mod?.default || mod
    if (typeof bin === "string" && existsSync(bin)) {
      cachedBinary = bin
      return cachedBinary
    }
  } catch {
    // ffmpeg-static no está instalado: seguimos con el ffmpeg del sistema.
  }
  cachedBinary = "ffmpeg"
  return cachedBinary
}

/** Convierte cualquier audio (webm/mp4/wav…) a OGG/Opus, el formato de las notas de voz. */
export async function convertToOggOpus(buffer) {
  const bin = await resolveFfmpeg()
  return new Promise((resolve, reject) => {
    const proc = spawn(bin, [
      "-hide_banner",
      "-loglevel", "error",
      "-i", "pipe:0",
      "-vn",
      "-c:a", "libopus",
      "-b:a", "32k",
      "-ar", "48000",
      "-ac", "1",
      "-f", "ogg",
      "pipe:1",
    ])

    const chunks = []
    const errors = []
    let done = false

    const timer = setTimeout(() => {
      if (done) return
      done = true
      proc.kill("SIGKILL")
      reject(new Error("La conversión de audio tardó demasiado"))
    }, 30000)

    proc.stdout.on("data", (data) => chunks.push(data))
    proc.stderr.on("data", (data) => errors.push(data))

    proc.on("error", (err) => {
      if (done) return
      done = true
      clearTimeout(timer)
      reject(err)
    })

    proc.on("close", (code) => {
      if (done) return
      done = true
      clearTimeout(timer)
      if (code !== 0) {
        reject(new Error(Buffer.concat(errors).toString() || `ffmpeg terminó con código ${code}`))
        return
      }
      resolve(Buffer.concat(chunks))
    })

    proc.stdin.on("error", () => {})
    proc.stdin.write(buffer)
    proc.stdin.end()
  })
}
