"use client";

import * as React from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Mail, Phone, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon, DribbbleIcon } from "@/components/ui/SocialIcons";

export function Footer() {
  return (
    <footer className="border-t border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-950 pt-12 pb-10 transition-colors">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-100 dark:border-slate-800/80">
          {/* Column 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Logo />
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              We build high-converting Shopify stores, convert Figma designs into responsive code, develop WordPress websites, and provide practical SEO and advertising management.
            </p>
          </div>

          {/* Column 2: Core Services (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mb-4">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              <li>
                <Link href="/services#shopify-development" className="hover:text-blue-600 transition-colors">
                  Shopify Development
                </Link>
              </li>
              <li>
                <Link href="/services#figma-to-website" className="hover:text-blue-600 transition-colors">
                  Figma to Website Conversion
                </Link>
              </li>
              <li>
                <Link href="/services#wordpress-development" className="hover:text-blue-600 transition-colors">
                  WordPress Development
                </Link>
              </li>
              <li>
                <Link href="/services#seo-services" className="hover:text-blue-600 transition-colors">
                  SEO Services
                </Link>
              </li>
              <li>
                <Link href="/services#ads-management" className="hover:text-blue-600 transition-colors">
                  Ads Management
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              <li>
                <Link href="/" className="hover:text-blue-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-blue-600 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/work" className="hover:text-blue-600 transition-colors">
                  Portfolio / Work
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-600 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-blue-600 transition-colors">
                  Team
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-600 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Get in Touch & Socials (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mb-4">
              Get in Touch
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-5">
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-blue-600 shrink-0" />
                <a href="mailto:hello@nexusagency.com" className="hover:text-blue-600 transition-colors">
                  hello@nexusagency.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-blue-600 shrink-0" />
                <a href="tel:+8801712345678" className="hover:text-blue-600 transition-colors">
                  +880 1712 345678
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-blue-600 shrink-0" />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>

            <div className="flex items-center gap-2.5 text-slate-500">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:text-blue-600 transition-colors"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:text-blue-600 transition-colors"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:text-blue-600 transition-colors"
              >
                <TwitterIcon className="h-4 w-4" />
              </a>
              <a
                href="https://dribbble.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Dribbble"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:text-blue-600 transition-colors"
              >
                <DribbbleIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2025 NexusAgency. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
