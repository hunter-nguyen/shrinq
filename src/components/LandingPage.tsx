"use client"

import { motion } from "framer-motion"
import { LinkIcon } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFA]">
      <header className="sticky top-0 z-50 border-b border-[#E5E5E5] bg-[#FAFAFA]/90 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <LinkIcon className="h-5 w-5 text-[#1D1D1F]" />
            <span className="text-lg font-medium text-[#1D1D1F]">abrev.me</span>
          </div>
          <div className="flex items-center">
            <Link href="/login">
              <Button variant="ghost" className="h-9 px-4 text-sm font-medium text-[#1D1D1F] hover:bg-[#F5F5F7] cursor-pointer">
                Log in
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative overflow-hidden py-32 md:py-40 px-4">
          <div className="absolute inset-0 bg-gradient-to-b from-[#F5F5F7] to-[#FAFAFA]" />
          <div className="container relative mx-auto">
            <div className="mx-auto max-w-2xl text-center px-4">
              <motion.h1
                className="text-4xl font-bold tracking-tight text-[#1D1D1F] sm:text-5xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                shorten URLs with elegant simplicity
              </motion.h1>
            </div>
            <motion.div
              className="mt-16 flex justify-center px-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <div className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-sm border border-[#E5E5E5]">
                <div className="p-6 md:p-8">
                  <div className="flex h-8 items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-[#FF605C]" />
                    <div className="h-3 w-3 rounded-full bg-[#FFBD44]" />
                    <div className="h-3 w-3 rounded-full bg-[#00CA4E]" />
                  </div>
                  <div className="mt-12 flex flex-col items-center justify-center space-y-8 pb-6">
                    <div className="w-full max-w-md text-center">
                      <h2 className="text-2xl font-medium text-[#1D1D1F] mb-2">Please log in to shorten your URLs</h2>
                    </div>
                    <Link href="/login">
                      <Button className="rounded-full bg-[#0071E3] text-white hover:bg-[#0077ED] transition-colors px-8 py-2.5 text-base cursor-pointer">
                        Log in to continue
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <footer className="border-t border-[#E5E5E5] bg-[#FAFAFA] py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <LinkIcon className="h-4 w-4 text-[#1D1D1F]" />
              <span className="text-sm font-medium text-[#1D1D1F]">abrev.me</span>
            </div>
            <div className="text-sm text-center text-[#86868B]">
              © {new Date().getFullYear()} abrev.me. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

