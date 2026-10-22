"use client";

import * as React from "react";
import { TeamMember, Testimonial, Project, ProjectDetail } from "@/types";
import {
  teamData as defaultTeam,
  testimonialsData as defaultTestimonials,
  projectsData as defaultProjects,
} from "@/data/mockData";
import { projectDetailsData as defaultProjectDetails } from "@/data/projectDetailsData";

export const STORAGE_KEYS = {
  TEAM: "nexus_admin_team",
  TESTIMONIALS: "nexus_admin_testimonials",
  PROJECTS: "nexus_admin_projects",
  PROJECT_DETAILS: "nexus_admin_project_details",
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

// ==========================================
// Projects & Project Details Storage Handlers
// ==========================================

/**
 * Get all projects for admin view (including unpublished/drafts)
 */
export function getAdminProjects(): Project[] {
  if (typeof window === "undefined") return defaultProjects;
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    if (saved) {
      const parsed: Project[] = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed
          .map((p, idx) => ({
            ...p,
            id: p.id || p.slug || `project-${idx + 1}`,
            published: p.published !== false,
            sortOrder: p.sortOrder ?? idx + 1,
          }))
          .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
      }
    }
  } catch {
    // fallback
  }
  return defaultProjects.map((p, idx) => ({
    ...p,
    published: p.published !== false,
    sortOrder: p.sortOrder ?? idx + 1,
  }));
}

/**
 * Save all projects from admin view
 */
export function saveAdminProjects(projects: Project[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    dispatchContentUpdate();
  }
}

/**
 * Get all full project details (case studies) keyed by slug
 */
export function getAdminProjectDetails(): Record<string, ProjectDetail> {
  if (typeof window === "undefined") return defaultProjectDetails;
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.PROJECT_DETAILS);
    if (saved) {
      const parsed: Record<string, ProjectDetail> = JSON.parse(saved);
      if (parsed && typeof parsed === "object" && Object.keys(parsed).length > 0) {
        return { ...defaultProjectDetails, ...parsed };
      }
    }
  } catch {
    // fallback
  }
  return defaultProjectDetails;
}

/**
 * Save all project details dictionary
 */
export function saveAdminProjectDetails(details: Record<string, ProjectDetail>) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.PROJECT_DETAILS, JSON.stringify(details));
    dispatchContentUpdate();
  }
}

/**
 * Hook for public website to get only published projects, sorted by display order
 */
export function useLiveProjects(): Project[] {
  const [projects, setProjects] = React.useState<Project[]>(() => {
    if (typeof window === "undefined") return defaultProjects;
    try {
      const all = getAdminProjects();
      const publishedOnly = all
        .filter((p) => p.published !== false)
        .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
      return publishedOnly.length > 0 ? publishedOnly : defaultProjects;
    } catch {
      return defaultProjects;
    }
  });

  const loadProjects = React.useCallback(() => {
    try {
      const all = getAdminProjects();
      const publishedOnly = all
        .filter((p) => p.published !== false)
        .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
      setProjects(publishedOnly);
    } catch {
      setProjects(defaultProjects);
    }
  }, []);

  React.useEffect(() => {
    const fetchApiProjects = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/projects`);
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.data) && data.data.length > 0) {
            const normalized = data.data
              .filter((p: Project) => p.published !== false)
              .sort((a: Project, b: Project) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
              .map((p: Project, idx: number) => ({
                ...p,
                id: p.id || p.slug || `project-${idx + 1}`,
              }));
            setProjects(normalized);
          }
        }
      } catch {
        // Backend offline; local storage persists
      }
    };

    fetchApiProjects();

    const handleUpdate = () => loadProjects();
    window.addEventListener("nexus_content_update", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("nexus_content_update", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [loadProjects]);

  return projects;
}

/**
 * Hook for individual project detail page (/projects/[slug]) to get updated case study
 */
export function useLiveProjectDetail(slug: string): ProjectDetail | null {
  const [detail, setDetail] = React.useState<ProjectDetail | null>(() => {
    const details = getAdminProjectDetails();
    if (details[slug]) return details[slug];
    // Attempt match by ID or previous slug
    const found = Object.values(details).find((p) => p.slug === slug || p.id === slug);
    return found || defaultProjectDetails[slug] || null;
  });

  const loadDetail = React.useCallback(() => {
    try {
      const details = getAdminProjectDetails();
      if (details[slug]) {
        setDetail(details[slug]);
      } else {
        const found = Object.values(details).find((p) => p.slug === slug || p.id === slug);
        setDetail(found || defaultProjectDetails[slug] || null);
      }
    } catch {
      setDetail(defaultProjectDetails[slug] || null);
    }
  }, [slug]);

  React.useEffect(() => {
    const fetchApiDetail = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/projects/${slug}`);
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.data) {
            setDetail(data.data);
          }
        }
      } catch {
        // Backend offline
      }
    };

    fetchApiDetail();

    const handleUpdate = () => loadDetail();
    window.addEventListener("nexus_content_update", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("nexus_content_update", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [slug, loadDetail]);

  return detail;
}

// ==========================================
// Team Members Storage Handlers & Hook
// ==========================================

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

export function saveAdminTeam(members: TeamMember[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.TEAM, JSON.stringify(members));
    dispatchContentUpdate();
  }
}

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
        // Backend offline
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

// ==========================================
// Testimonials Storage Handlers & Hook
// ==========================================

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

export function saveAdminTestimonials(testimonials: Testimonial[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(testimonials));
    dispatchContentUpdate();
  }
}

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
        // Backend offline
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
