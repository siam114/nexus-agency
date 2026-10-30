"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Logo } from "@/components/ui/Logo";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [prevPathname, setPrevPathname] = React.useState(pathname);

  // Automatically close mobile menu drawer on route navigation
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
  }

  // Do not render public navbar on admin dashboard pages
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full backdrop-blur-md transition-all duration-300",
        scrolled
          ? "border-b border-slate-200/90 dark:border-slate-800/90 bg-white/95 dark:bg-slate-950/95 shadow-md shadow-slate-900/5"
          : "border-b border-slate-100/60 dark:border-slate-800/50 bg-white/80 dark:bg-slate-950/80"
      )}
    >
      <div className="mx-auto flex max-w-[1600px] w-full items-center justify-between px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-4">
        {/* Brand Logo */}
        <Logo />

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-8">
          {navItems.map((item) => {
            const isHome = item.href === "/" && pathname === "/";
            const isActive =
              isHome ||
              (item.href !== "/" &&
                (pathname === item.href ||
                  pathname.startsWith(item.href + "/") ||
                  (item.href === "/work" &&
                    pathname.startsWith("/portfolio"))));

            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "relative py-1 text-sm font-medium transition-colors duration-150",
                  isActive
                    ? "text-blue-600 dark:text-blue-400 font-semibold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white",
                )}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-blue-600 dark:bg-blue-400" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link href="/contact">
            <Button
              size="md"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-5 py-2 text-sm font-semibold shadow-sm shadow-blue-500/20"
            >
              Start a Project <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger & Actions */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition-transform touch-manipulation cursor-pointer"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 dark:border-slate-800 bg-white/98 dark:bg-slate-950/98 backdrop-blur-md px-6 py-5 space-y-3 shadow-xl transition-all duration-200">
          {navItems.map((item) => {
            const isHome = item.href === "/" && pathname === "/";
            const isActive =
              isHome ||
              (item.href !== "/" &&
                (pathname === item.href ||
                  pathname.startsWith(item.href + "/") ||
                  (item.href === "/work" &&
                    pathname.startsWith("/portfolio"))));

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block px-3 py-2.5 rounded-xl text-base font-medium transition-colors active:scale-[0.98] touch-manipulation",
                  isActive
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50/70 dark:bg-blue-950/40 font-semibold"
                    : "text-slate-700 dark:text-slate-300 hover:text-blue-600 hover:bg-slate-50 dark:hover:bg-slate-900",
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between px-3">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Appearance
            </span>
            <ThemeToggle />
          </div>
          <div className="pt-1">
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full rounded-full bg-blue-600 hover:bg-blue-700 text-white active:scale-[0.98] touch-manipulation">
                Start a Project <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
