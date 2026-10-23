"use client";

import * as React from "react";
import { useAdminAuth } from "@/lib/adminAuth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/Logo";
import { Shield, Lock, Mail, ArrowRight, AlertCircle, Sparkles, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const { login } = useAdminAuth();
  const [email, setEmail] = React.useState("smsiam987@gmail.com");
  const [password, setPassword] = React.useState("AdminPassword123!");
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await login(email, password);
    if (!result.success) {
      setError(result.error || "Login failed");
      setLoading(false);
    }
  };

  const handleQuickFill = () => {
    setEmail("smsiam987@gmail.com");
    setPassword("AdminPassword123!");
    setError(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-block">
            <Logo />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Admin Control Panel
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Sign in to manage projects, services, client inquiries, and website settings.
          </p>
        </div>

        <Card className="p-8 border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl rounded-2xl">
          {error && (
            <div className="mb-6 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 flex items-start gap-2.5 text-xs text-rose-600 dark:text-rose-400">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Administrator Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@nexusagency.com"
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/60 px-4 py-2.5 pl-10 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                />
                <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/60 px-4 py-2.5 pl-10 pr-10 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                />
                <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
                  title={showPassword ? "Hide password" : "Show password"}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl font-semibold mt-2 shadow-sm shadow-blue-500/20"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Signing In...</span>
                </div>
              ) : (
                <span className="flex items-center justify-center gap-1.5">
                  Sign In to Dashboard <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </Button>
          </form>

          {/* Quick-fill helper */}
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
            <button
              type="button"
              onClick={handleQuickFill}
              className="inline-flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Fill Default Admin Credentials</span>
            </button>
          </div>
        </Card>

        <div className="text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
          <Shield className="h-3.5 w-3.5 text-emerald-500" />
          <span>Protected by JWT &amp; Role-Based Authorization</span>
        </div>
      </div>
    </div>
  );
}

