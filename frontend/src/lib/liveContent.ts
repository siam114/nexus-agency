"use client";

import * as React from "react";
import { TeamMember, Testimonial } from "@/types";
import { teamData as defaultTeam, testimonialsData as defaultTestimonials } from "@/data/mockData";

export const STORAGE_KEYS = {
  TEAM: "nexus_admin_team",
  TESTIMONIALS: "nexus_admin_testimonials",
} as const;

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api/v1";

/**
 * Dispatches cross-component and cross-tab update notifications
 */
export function dispatchContentUpdate() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("nexus_content_update"));
  }
}

/**
 * Get all team members for admin view (including unpublished/drafts)
 */
export function getAdminTeam(): TeamMember[] {
  if (typeof window === "undefined") return defaultTeam;
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.TEAM);
    if (saved) {
      const parsed: TeamMember[] = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed
          .map((m, idx) => ({ ...m, id: m.id || `member-${idx + 1}` }))
          .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
      }
    }
  } catch {
    // fallback
  }
  return defaultTeam;
}

/**
 * Save all team members from admin view
 */
export function saveAdminTeam(members: TeamMember[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.TEAM, JSON.stringify(members));
    dispatchContentUpdate();
  }
}

/**
 * Get all testimonials for admin view (including unpublished/drafts)
 */
export function getAdminTestimonials(): Testimonial[] {
  if (typeof window === "undefined") return defaultTestimonials;
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
    if (saved) {
      const parsed: Testimonial[] = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed
          .map((t, idx) => ({ ...t, id: t.id || `testimonial-${idx + 1}` }))
          .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
      }
    }
  } catch {
    // fallback
  }
  return defaultTestimonials;
}

/**
 * Save all testimonials from admin view
 */
export function saveAdminTestimonials(testimonials: Testimonial[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(testimonials));
    dispatchContentUpdate();
  }
}

/**
 * Hook for public website to get only published team members, sorted by display order
 */
export function useLiveTeam(): TeamMember[] {
  const [members, setMembers] = React.useState<TeamMember[]>(() => {
    if (typeof window === "undefined") return defaultTeam;
    try {
      const all = getAdminTeam();
      const publishedOnly = all
        .filter((m) => m.published !== false)
        .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
      return publishedOnly.length > 0 ? publishedOnly : defaultTeam;
    } catch {
      return defaultTeam;
    }
  });

  const loadMembers = React.useCallback(() => {
    try {
      const all = getAdminTeam();
      const publishedOnly = all
        .filter((m) => m.published !== false)
        .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
      setMembers(publishedOnly);
    } catch {
      setMembers(defaultTeam);
    }
  }, []);

  React.useEffect(() => {
    // Attempt fetching from backend API if available
    const fetchApiTeam = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/team`);
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.data) && data.data.length > 0) {
            const normalized = data.data.map((m: TeamMember, idx: number) => ({
              ...m,
              id: m.id || `member-${idx + 1}`,
            }));
            setMembers(normalized);
          }
        }
      } catch {
        // Backend offline; use local storage / defaults
      }
    };

    fetchApiTeam();

    const handleUpdate = () => loadMembers();
    window.addEventListener("nexus_content_update", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("nexus_content_update", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [loadMembers]);

  return members;
}

/**
 * Hook for public website to get only published testimonials, sorted by display order
 */
export function useLiveTestimonials(): Testimonial[] {
  const [testimonials, setTestimonials] = React.useState<Testimonial[]>(() => {
    if (typeof window === "undefined") return defaultTestimonials;
    try {
      const all = getAdminTestimonials();
      const publishedOnly = all
        .filter((t) => t.published !== false)
        .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
      return publishedOnly.length > 0 ? publishedOnly : defaultTestimonials;
    } catch {
      return defaultTestimonials;
    }
  });

  const loadTestimonials = React.useCallback(() => {
    try {
      const all = getAdminTestimonials();
      const publishedOnly = all
        .filter((t) => t.published !== false)
        .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
      setTestimonials(publishedOnly);
    } catch {
      setTestimonials(defaultTestimonials);
    }
  }, []);

  React.useEffect(() => {
    // Attempt fetching from backend API if available
    const fetchApiTestimonials = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/testimonials`);
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.data) && data.data.length > 0) {
            const normalized = data.data.map((t: Testimonial, idx: number) => ({
              ...t,
              id: t.id || `testimonial-${idx + 1}`,
            }));
            setTestimonials(normalized);
          }
        }
      } catch {
        // Backend offline; use local storage / defaults
      }
    };

    fetchApiTestimonials();

    const handleUpdate = () => loadTestimonials();
    window.addEventListener("nexus_content_update", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("nexus_content_update", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [loadTestimonials]);

  return testimonials;
}
