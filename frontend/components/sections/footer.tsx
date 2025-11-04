"use client"
import Link from "next/link"
import { Mail, Github, Twitter, Leaf } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-contrast text-background py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 font-serif text-lg font-bold mb-4">
              <Leaf className="w-6 h-6" />
              CropTrust
            </Link>
            <p className="text-background/70 text-sm">
              Building a fair and transparent agricultural marketplace for all.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <Link href="#marketplace" className="hover:text-background transition">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-background transition">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-background transition">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <Link href="#" className="hover:text-background transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-background transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-background transition">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <Link href="#" className="hover:text-background transition">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-background transition">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-background transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="border-t border-background/20 pt-8 mb-8">
          <div className="mb-6">
            <h3 className="font-serif text-xl font-bold mb-2">Let's build a fairer food economy together.</h3>
            <p className="text-background/70">Join thousands of farmers and buyers on the trust network.</p>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-background/20 pt-8">
          <p className="text-sm text-background/50">&copy; 2025 CropTrust. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="text-background/70 hover:text-background transition">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-background/70 hover:text-background transition">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-background/70 hover:text-background transition">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
