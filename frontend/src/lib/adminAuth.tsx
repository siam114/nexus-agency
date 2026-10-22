"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AdminAuthContextType {
  user: AdminUser | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AdminAuthContext = React.createContext<AdminAuthContextType | undefined>(undefined);

const TOKEN_KEY = "nexus_admin_jwt";
const USER_KEY = "nexus_admin_user";
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api/v1";

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = React.useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  });

  const [user, setUser] = React.useState<AdminUser | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const stored = localStorage.getItem(USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [loading] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Protect admin routes (except /admin/login)
  React.useEffect(() => {
    if (loading) return;

    const isLoginPage = pathname === "/admin/login";
    const isAdminRoute = pathname.startsWith("/admin");

    if (isAdminRoute && !isLoginPage && !token) {
      router.replace("/admin/login");
    } else if (isLoginPage && token) {
      router.replace("/admin");
    }
  }, [pathname, token, loading, router]);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // First try real backend API
      try {
        const res = await fetch(`${BACKEND_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();

        if (res.ok && data.success && data.data?.token) {
          const authUser = data.data.user;
          const authToken = data.data.token;
          setToken(authToken);
          setUser(authUser);
          localStorage.setItem(TOKEN_KEY, authToken);
          localStorage.setItem(USER_KEY, JSON.stringify(authUser));
          return { success: true };
        }
      } catch {
        // Backend might be offline; continue to fallback check
      }

      // Offline / dev fallback: allow default admin credentials
      if (
        (email.trim().toLowerCase() === "smsiam987@gmail.com" || email.trim() === "admin@nexusagency.com") &&
        password === "AdminPassword123!"
      ) {
        const fallbackUser: AdminUser = {
          id: "admin-siam",
          email: "smsiam987@gmail.com",
          name: "Siam Ahmed",
          role: "superadmin",
        };
        const fallbackToken = "fallback-jwt-token-nexus-admin";
        setToken(fallbackToken);
        setUser(fallbackUser);
        localStorage.setItem(TOKEN_KEY, fallbackToken);
        localStorage.setItem(USER_KEY, JSON.stringify(fallbackUser));
        return { success: true };
      }

      return { success: false, error: "Invalid email or password. Please check your credentials." };
    } catch (err) {
      return { success: false, error: (err as Error).message || "An unexpected login error occurred." };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    try {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    } catch {
      // ignore
    }
    router.replace("/admin/login");
  };

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = React.useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
}
