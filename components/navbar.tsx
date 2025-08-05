"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Music } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-sm border-b border-gray-800 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Music className="h-8 w-8 text-purple-400" />
              <span className="font-bold text-xl text-white">SUA MARCA</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                href="/"
                className="text-gray-300 hover:text-purple-400 px-3 py-2 text-sm font-medium transition-colors"
              >
                Início
              </Link>
              <Link
                href="/beats"
                className="text-gray-300 hover:text-purple-400 px-3 py-2 text-sm font-medium transition-colors"
              >
                Beats
              </Link>
              <Link
                href="/sobre"
                className="text-gray-300 hover:text-purple-400 px-3 py-2 text-sm font-medium transition-colors"
              >
                Sobre Mim
              </Link>
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                Contato
              </Button>
            </div>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-purple-400"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/95 backdrop-blur-sm">
            <Link
              href="/"
              className="text-gray-300 hover:text-purple-400 block px-3 py-2 text-base font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Início
            </Link>
            <Link
              href="/beats"
              className="text-gray-300 hover:text-purple-400 block px-3 py-2 text-base font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Beats
            </Link>
            <Link
              href="/sobre"
              className="text-gray-300 hover:text-purple-400 block px-3 py-2 text-base font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Sobre Mim
            </Link>
            <div className="px-3 py-2">
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700 w-full">
                Contato
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
