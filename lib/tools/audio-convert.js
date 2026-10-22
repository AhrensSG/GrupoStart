import { spawn } from "node:child_process"
import { existsSync } from "node:fs"
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import path from "node:path"

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

/**
 * Ejecuta ffmpeg sobre un buffer y devuelve el resultado.
 * Escribe a un archivo temporal (no a un pipe) porque al escribir OGG en un
 * pipe ffmpeg no puede volver atrás a completar las cabeceras y Meta termina
 * rechazando el archivo como octet-stream.
 */
async function runFfmpeg(buffer, extension, args) {
  const bin = await resolveFfmpeg()
  const dir = await mkdtemp(path.join(tmpdir(), "wa-audio-"))
  const input = path.join(dir, "input")
  const output = path.join(dir, `output.${extension}`)

  try {
    await writeFile(input, buffer)

    await new Promise((resolve, reject) => {
      const proc = spawn(bin, [
        "-hide_banner",
        "-loglevel", "error",
        "-y",
        "-i", input,
        ...args,
        output,
      ])

      const errors = []
      let done = false

      const timer = setTimeout(() => {
        if (done) return
        done = true
        proc.kill("SIGKILL")
        reject(new Error("La conversión de audio tardó demasiado"))
      }, 30000)

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
        resolve()
      })
    })

    return await readFile(output)
  } finally {
    await rm(dir, { recursive: true, force: true }).catch(() => {})
  }
}

/** Convierte cualquier audio a OGG/Opus (formato de las notas de voz). */
export async function convertToOggOpus(buffer) {
  return runFfmpeg(buffer, "ogg", [
    "-vn",
    // Meta rechaza OGG/Opus con timestamps inconsistentes (error 131053).
    "-af", "asetpts=N/SR/TB",
    "-c:a", "libopus",
    "-b:a", "32k",
    "-vbr", "on",
    "-application", "voip",
    "-ar", "48000",
    "-ac", "1",
    "-f", "ogg",
  ])
}

/** Convierte cualquier audio a M4A/AAC (audio básico aceptado por Meta). */
export async function convertToM4a(buffer) {
  return runFfmpeg(buffer, "m4a", [
    "-vn",
    "-c:a", "aac",
    "-b:a", "64k",
    "-ar", "48000",
    "-ac", "1",
    "-movflags", "+faststart",
    "-f", "ipod",
  ])
}
