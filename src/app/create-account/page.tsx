"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, LinkIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createUser } from "../actions/auth"

export default function CreateAccountPage() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    setIsLoading(true);

    // form validation and auth; Zod?

}

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFA]">
      <header className="sticky top-0 z-50 border-b border-[#E5E5E5] bg-[#FAFAFA]/90 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <LinkIcon className="h-5 w-5 text-[#1D1D1F]" />
            <span className="text-lg font-medium text-[#1D1D1F]">trim</span>
          </div>
          <Link href="/" className="text-sm text-[#86868B] hover:text-[#1D1D1F]">
            Back to home
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-sm border border-[#E5E5E5] overflow-hidden"
          >
            <div className="p-8">
              <Link href="/login" className="inline-flex items-center text-[#0071E3] mb-6 hover:underline">
                <ArrowLeft className="h-4 w-4 mr-1" />
                <span>Back to login</span>
              </Link>

              <h1 className="text-2xl font-semibold text-[#1D1D1F] mb-2">Create your account</h1>
              <p className="text-[#86868B] mb-8">Sign up to start shortening your URLs</p>

              {error && (
                <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">{error}</div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-[#1D1D1F]">
                    Username
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="username"
                    required
                    className="h-11 rounded-lg border-[#E5E5E5] bg-white focus-visible:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-[#1D1D1F]">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="h-11 rounded-lg border-[#E5E5E5] bg-white focus-visible:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-[#1D1D1F]">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    required
                    className="h-11 rounded-lg border-[#E5E5E5] bg-white focus-visible:ring-blue-500"
                  />
                  <p className="text-xs text-[#86868B]">Must be at least 8 characters</p>
                </div>


                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 rounded-lg bg-[#0071E3] text-white hover:bg-[#0077ED] transition-colors"
                >
                  {isLoading ? "Creating account..." : "Create account"}
                </Button>

                <div className="text-center text-sm text-[#86868B]">
                  Already have an account?{" "}
                  <Link href="/login" className="text-[#0071E3] hover:underline">
                    Log in
                  </Link>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

