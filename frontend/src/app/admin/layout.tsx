import * as React from "react";
import { AdminLayoutClient } from "./AdminLayoutClient";

/**
 * Opt admin dashboard segments out of static instant navigation pre-rendering validation.
 * Admin pages are client-only views protected by JWT authentication in localStorage.
 */
export const instant = false;

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
