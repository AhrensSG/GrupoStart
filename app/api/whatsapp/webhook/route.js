import { NextResponse } from "next/server"

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const mode = searchParams.get("hub.mode")
  const token = searchParams.get("hub.verify_token")
  const challenge = searchParams.get("hub.challenge")

  if (mode === "subscribe" && token === "grupostart_webhook_2026") {
    return new Response(challenge, { status: 200 })
  }

  return NextResponse.json({ error: "Verification failed" }, { status: 403 })
}

export async function POST(req) {
  try {
    const body = await req.json()
    console.log("[WhatsApp Webhook]", JSON.stringify(body))
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 })
  }
}
