"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, LinkIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();

     const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      const formData = new FormData(e.target as HTMLFormElement);
      const data = Object.fromEntries(formData.entries());

      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email, password}),
          credentials: 'include'
        });

        if (!response.ok) {
          const result = await response.json();
          setErrorMessage(result.error || 'Unknown error');
        } else {
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("An error occurred:", error);
        setErrorMessage("Something went wrong. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFA]">
      <header className="sticky top-0 z-50 border-b border-[#E5E5E5] bg-[#FAFAFA]/90 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <LinkIcon className="h-5 w-5 text-[#1D1D1F]" />
            <span className="text-lg font-medium text-[#1D1D1F]">shrinq.link</span>
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
              <Link href="/" className="inline-flex items-center text-[#0071E3] mb-6 hover:underline">
                <ArrowLeft className="h-4 w-4 mr-1" />
                <span>Back</span>
              </Link>

              <h1 className="text-2xl font-semibold text-[#1D1D1F] mb-2">Welcome back</h1>
              <p className="text-[#86868B] mb-8">Log in to your account to manage your shortened URLs</p>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-[#1D1D1F]">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="h-11 rounded-lg border-[#E5E5E5] bg-white focus-visible:ring-blue-500 text-black"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-medium text-[#1D1D1F]">
                      Password
                    </Label>
                    {/* TODO: Implement forgot password */}
                    <Link href="/forgot-password" className="text-xs text-[#0071E3] hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="********"
                    required
                    className="h-11 rounded-lg border-[#E5E5E5] bg-white focus-visible:ring-blue-500 text-black"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 rounded-lg bg-[#0077ED] text-white transition-colors cursor-pointer"
                >
                  Log in
                </Button>

                {errorMessage && (
                  <div className="mt-4 text-center text-sm text-red-500">
                    {errorMessage}
                  </div>
                )}

                <div className="text-center text-sm text-[#86868B]">
                  Don't have an account?{" "}
                  <Link href="/create-account" className="text-[#0071E3] hover:underline">
                    Create an account
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

