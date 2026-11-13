"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { TeamMember } from "@/types";
import { getAdminTeam, saveAdminTeam } from "@/lib/liveContent";
import { useAdminAuth } from "@/lib/adminAuth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  Plus,
  Search,
  ExternalLink,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  Eye,
  Upload,
  X,
  Sparkles,
  ArrowUpDown,
  Star,
} from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  FacebookIcon,
  WhatsappIcon,
  PortfolioIcon,
} from "@/components/ui/SocialIcons";
import { cn } from "@/lib/utils";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "https://nexusagency-backend.onrender.com/api/v1";

const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80";

export default function AdminTeamPage() {
  const { token } = useAdminAuth();
  const [members, setMembers] = React.useState<TeamMember[]>(() =>
    getAdminTeam(),
  );
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<
    "all" | "published" | "draft"
  >("all");

  // Fetch real team members from backend API on mount to sync with MongoDB Atlas
  React.useEffect(() => {
    let isMounted = true;
    const fetchTeamFromBackend = async () => {
      try {
        const activeToken =
          token ||
          (typeof window !== "undefined"
            ? localStorage.getItem("nexus_admin_jwt")
            : null) ||
          "fallback-jwt-token-nexus-admin";
        const headers: Record<string, string> = {
          Authorization: `Bearer ${activeToken}`,
        };

        let res = await fetch(`${BACKEND_URL}/admin/team`, { headers });
        if (!res.ok) {
          res = await fetch(`${BACKEND_URL}/team`);
        }

        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data) && isMounted) {
            const fetchedMembers = json.data.map((m: TeamMember, idx: number) => ({
              ...m,
              id: m.id || (m as unknown as { _id?: string })._id || `member-${idx + 1}`,
            }));
            setMembers(fetchedMembers);
            saveAdminTeam(fetchedMembers);
          }
        }
      } catch (err) {
        console.warn("Could not fetch remote team, fallback to local storage:", err);
      }
    };

    fetchTeamFromBackend();
    return () => {
      isMounted = false;
    };
  }, [token]);

  // Modal states
  const [showFormModal, setShowFormModal] = React.useState(false);
  const [editingMember, setEditingMember] = React.useState<TeamMember | null>(
    null,
  );
  const [previewMember, setPreviewMember] = React.useState<TeamMember | null>(
    null,
  );

  // Form states
  const [formName, setFormName] = React.useState("");
  const [formRole, setFormRole] = React.useState("");
  const [formBio, setFormBio] = React.useState("");
  const [formImage, setFormImage] = React.useState(DEFAULT_AVATAR);
  const [formSkills, setFormSkills] = React.useState("");
  const [formWebsite, setFormWebsite] = React.useState("");
  const [formGithub, setFormGithub] = React.useState("");
  const [formLinkedin, setFormLinkedin] = React.useState("");
  const [formFacebook, setFormFacebook] = React.useState("");
  const [formWhatsapp, setFormWhatsapp] = React.useState("");
  const [formPublished, setFormPublished] = React.useState(true);
  const [formFeatured, setFormFeatured] = React.useState(false);
  const [formSortOrder, setFormSortOrder] = React.useState(1);
  const [formError, setFormError] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const syncBackend = async (
    action: "create" | "update" | "delete",
    memberData: Partial<TeamMember>,
    originalName?: string,
  ): Promise<boolean> => {
    const activeToken =
      token ||
      (typeof window !== "undefined"
        ? localStorage.getItem("nexus_admin_jwt")
        : null) ||
      "fallback-jwt-token-nexus-admin";
    try {
      if (action === "create") {
        const res = await fetch(`${BACKEND_URL}/admin/team`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${activeToken}`,
          },
          body: JSON.stringify(memberData),
        });
        if (!res.ok) {
          const errData = await res.json().catch(() => null);
          const msg =
            errData?.message ||
            errData?.errors?.[0]?.message ||
            `Server error (Status ${res.status})`;
          throw new Error(msg);
        }
        const resData = await res.json();
        const serverId =
          resData?.data?.id || (resData?.data as { _id?: string })?._id;
        if (serverId) {
          setMembers((prev) =>
            prev.map((m) =>
              m.id === memberData.id ? { ...m, id: serverId } : m,
            ),
          );
          const currentList = getAdminTeam();
          const updated = currentList.map((m) =>
            m.id === memberData.id ? { ...m, id: serverId } : m,
          );
          saveAdminTeam(updated);
        }
        return true;
      } else if (action === "update" && memberData.id) {
        const queryParam = originalName
          ? `?originalName=${encodeURIComponent(originalName)}`
          : "";
        const res = await fetch(
          `${BACKEND_URL}/admin/team/${memberData.id}${queryParam}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${activeToken}`,
            },
            body: JSON.stringify({ ...memberData, originalName }),
          },
        );
        if (!res.ok) {
          const errData = await res.json().catch(() => null);
          const msg =
            errData?.message ||
            errData?.errors?.[0]?.message ||
            `Server error (Status ${res.status})`;
          throw new Error(msg);
        }
        const resData = await res.json();
        const serverId =
          resData?.data?.id ||
          (resData?.data as { _id?: string })?._id ||
          memberData.id;
        setMembers((prev) =>
          prev.map((m) =>
            m.id === memberData.id ||
            (originalName &&
              m.name.toLowerCase().trim() ===
                originalName.toLowerCase().trim()) ||
            m.name.toLowerCase().trim() ===
              memberData.name?.toLowerCase().trim()
              ? { ...m, ...resData.data, id: serverId }
              : m,
          ),
        );
        const currentList = getAdminTeam();
        const updated = currentList.map((m) =>
          m.id === memberData.id ||
          (originalName &&
            m.name.toLowerCase().trim() ===
              originalName.toLowerCase().trim()) ||
          m.name.toLowerCase().trim() ===
            memberData.name?.toLowerCase().trim()
            ? { ...m, ...resData.data, id: serverId }
            : m,
        );
        saveAdminTeam(updated);
        return true;
      } else if (action === "delete" && memberData.id) {
        const res = await fetch(
          `${BACKEND_URL}/admin/team/${memberData.id}?name=${encodeURIComponent(
            memberData.name || "",
          )}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${activeToken}`,
            },
          },
        );
        return res.ok;
      }
      return true;
    } catch (err) {
      console.error("syncBackend error:", err);
      throw err;
    }
  };

  const handleOpenAddModal = () => {
    setEditingMember(null);
    setFormName("");
    setFormRole("");
    setFormBio("");
    setFormImage(DEFAULT_AVATAR);
    setFormSkills("");
    setFormWebsite("");
    setFormGithub("");
    setFormLinkedin("");
    setFormFacebook("");
    setFormWhatsapp("");
    setFormPublished(true);
    setFormFeatured(false);
    setFormSortOrder(members.length + 1);
    setFormError("");
    setShowFormModal(true);
  };

  const handleOpenEditModal = (member: TeamMember) => {
    setEditingMember(member);
    setFormName(member.name);
    setFormRole(member.role);
    setFormBio(member.bio || "");
    setFormImage(member.image || DEFAULT_AVATAR);
    setFormSkills((member.skills || []).join(", "));
    setFormWebsite(member.socials?.website || "");
    setFormGithub(member.socials?.github || "");
    setFormLinkedin(member.socials?.linkedin || "");
    setFormFacebook(member.socials?.facebook || "");
    setFormWhatsapp(member.socials?.whatsapp || "");
    setFormPublished(member.published !== false);
    setFormFeatured(member.featured === true);
    setFormSortOrder(member.sortOrder ?? 1);
    setFormError("");
    setShowFormModal(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setFormError("Please select an image file (PNG, JPG, WebP).");
      return;
    }

    if (file.size > 12 * 1024 * 1024) {
      setFormError("Image file size should be less than 12MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result;
      if (typeof src !== "string") return;

      const img = new window.Image();
      img.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          const MAX_DIM = 800;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_DIM) {
              height = Math.round((height * MAX_DIM) / width);
              width = MAX_DIM;
            }
          } else {
            if (height > MAX_DIM) {
              width = Math.round((width * MAX_DIM) / height);
              height = MAX_DIM;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const compressed = canvas.toDataURL("image/jpeg", 0.85);
            setFormImage(compressed);
            setFormError("");
          } else {
            setFormImage(src);
            setFormError("");
          }
        } catch {
          setFormImage(src);
          setFormError("");
        }
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  const handleSaveMember = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formName.trim()) {
      setFormError("Full name is required.");
      return;
    }

    if (!formRole.trim()) {
      setFormError("Job title or role is required.");
      return;
    }

    if (!formImage.trim()) {
      setFormError("Profile photo is required.");
      return;
    }

    setIsSubmitting(true);
    setFormError("");

    const skillsArray = formSkills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const memberPayload: TeamMember = {
      id: editingMember ? editingMember.id : `team-${Date.now()}`,
      name: formName.trim(),
      role: formRole.trim(),
      bio: formBio.trim(),
      image: formImage.trim(),
      skills: skillsArray,
      published: formPublished,
      featured: formFeatured,
      sortOrder: Number(formSortOrder) || 1,
      createdAt: editingMember?.createdAt || new Date().toISOString(),
      socials: {
        website: formWebsite.trim() || undefined,
        github: formGithub.trim() || undefined,
        linkedin: formLinkedin.trim() || undefined,
        facebook: formFacebook.trim() || undefined,
        whatsapp: formWhatsapp.trim() || undefined,
      },
    };

    try {
      if (editingMember) {
        await syncBackend("update", memberPayload, editingMember.name);
        const updatedList = members.map((m) =>
          m.id === memberPayload.id ||
          m.name.toLowerCase().trim() === memberPayload.name.toLowerCase().trim() ||
          m.name.toLowerCase().trim() === editingMember.name.toLowerCase().trim()
            ? memberPayload
            : m,
        );
        updatedList.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
        setMembers(updatedList);
        saveAdminTeam(updatedList);
      } else {
        await syncBackend("create", memberPayload);
        const updatedList = [...members, memberPayload];
        updatedList.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
        setMembers(updatedList);
        saveAdminTeam(updatedList);
      }
      setShowFormModal(false);
    } catch (err) {
      setFormError(
        (err as Error).message ||
          "Failed to save changes to the database. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTogglePublish = async (member: TeamMember) => {
    const updated = { ...member, published: !(member.published !== false) };
    const updatedList = members.map((m) => (m.id === member.id ? updated : m));
    setMembers(updatedList);
    saveAdminTeam(updatedList);
    try {
      await syncBackend("update", updated, member.name);
    } catch (err) {
      console.error("Toggle publish failed:", err);
    }
  };

  const handleDeleteMember = async (member: TeamMember) => {
    if (
      confirm(
        `Are you sure you want to delete team member "${member.name}"? This action cannot be undone.`,
      )
    ) {
      const updatedList = members.filter(
        (m) =>
          m.id !== member.id &&
          m.name.toLowerCase().trim() !== member.name.toLowerCase().trim(),
      );
      setMembers(updatedList);
      saveAdminTeam(updatedList);
      try {
        await syncBackend("delete", { id: member.id, name: member.name });
      } catch (err) {
        console.error("Delete member failed:", err);
      }
      if (previewMember?.id === member.id) {
        setPreviewMember(null);
      }
    }
  };

  // Filtered members
  const filteredMembers = members.filter((m) => {
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "published" && m.published !== false) ||
      (statusFilter === "draft" && m.published === false);

    const q = search.toLowerCase();
    const matchesSearch =
      m.name.toLowerCase().includes(q) ||
      m.role.toLowerCase().includes(q) ||
      (m.bio && m.bio.toLowerCase().includes(q)) ||
      (m.skills && m.skills.some((s) => s.toLowerCase().includes(q)));

    return matchesStatus && matchesSearch;
  });

  const totalMembers = members.length;
  const publishedCount = members.filter((m) => m.published !== false).length;
  const draftCount = members.filter((m) => m.published === false).length;
  const featuredCount = members.filter((m) => m.featured === true).length;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Users className="h-3.5 w-3.5" />
            <span>Personnel Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Team Members
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Manage your agency specialists, roles, profile photos, social links,
            display ordering, and public visibility.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/team" target="_blank">
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl border-slate-300 dark:border-slate-700"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View Public Team
            </Button>
          </Link>
          <Button
            size="sm"
            onClick={handleOpenAddModal}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-xs"
          >
            <Plus className="h-4 w-4 mr-1.5" />
            Add Team Member
          </Button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4 rounded-xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Total Specialists
          </div>
          <div className="mt-1 text-2xl font-black text-slate-900 dark:text-white">
            {totalMembers}
          </div>
        </Card>
        <Card className="p-4 rounded-xl border-emerald-200/80 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/20">
          <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" />
            <span>Published</span>
          </div>
          <div className="mt-1 text-2xl font-black text-emerald-600 dark:text-emerald-400">
            {publishedCount}
          </div>
        </Card>
        <Card className="p-4 rounded-xl border-amber-200/80 dark:border-amber-900/40 bg-amber-50/50 dark:bg-amber-950/20">
          <div className="text-xs font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1">
            <XCircle className="h-3 w-3" />
            <span>Drafts / Unpublished</span>
          </div>
          <div className="mt-1 text-2xl font-black text-amber-600 dark:text-amber-400">
            {draftCount}
          </div>
        </Card>
        <Card className="p-4 rounded-xl border-purple-200/80 dark:border-purple-900/40 bg-purple-50/50 dark:bg-purple-950/20">
          <div className="text-xs font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-1">
            <Star className="h-3 w-3" />
            <span>Featured</span>
          </div>
          <div className="mt-1 text-2xl font-black text-purple-600 dark:text-purple-400">
            {featuredCount}
          </div>
        </Card>
      </div>

      {/* Filter & Search Bar */}
      <Card className="p-4 rounded-2xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Status Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80">
          {[
            { id: "all", label: "All Members", count: totalMembers },
            { id: "published", label: "Published", count: publishedCount },
            { id: "draft", label: "Drafts", count: draftCount },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() =>
                setStatusFilter(tab.id as "all" | "published" | "draft")
              }
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5",
                statusFilter === tab.id
                  ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white",
              )}
            >
              <span>{tab.label}</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-200/70 dark:bg-slate-700">
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search name, role, skills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </Card>

      {/* Team Members Grid */}
      {filteredMembers.length === 0 ? (
        <Card className="p-12 text-center rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
          <Users className="h-10 w-10 text-slate-400 mx-auto opacity-50" />
          <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            No team members found
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            {search
              ? "No members match your search keywords."
              : "Get started by adding your first agency specialist."}
          </p>
          <Button
            size="sm"
            onClick={handleOpenAddModal}
            className="text-xs mt-2"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Team Member
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredMembers.map((member) => {
            const isPublished = member.published !== false;

            return (
              <Card
                key={member.id}
                className={cn(
                  "overflow-hidden rounded-3xl border bg-white dark:bg-slate-900 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1.5 group relative",
                  isPublished
                    ? "border-slate-200/80 dark:border-slate-800"
                    : "border-amber-300/80 dark:border-amber-900/60 opacity-85",
                )}
              >
                <div>
                  {/* Photo & Badges */}
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <Image
                      src={member.image || DEFAULT_AVATAR}
                      alt={member.name}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />

                    {/* Gradient Overlay for photo depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

                    {/* Top Badges Bar */}
                    <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between pointer-events-auto z-10">
                      {/* Left: Publication & Featured Pills */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <button
                          type="button"
                          onClick={() => handleTogglePublish(member)}
                          className={cn(
                            "px-3 py-1 rounded-full text-[11px] font-bold shadow-md transition-all flex items-center gap-1.5 backdrop-blur-md cursor-pointer",
                            isPublished
                              ? "bg-emerald-500/90 text-white hover:bg-emerald-600 ring-1 ring-emerald-400/40"
                              : "bg-amber-500/90 text-white hover:bg-amber-600 ring-1 ring-amber-400/40",
                          )}
                          title="Click to toggle publication status"
                        >
                          {isPublished ? (
                            <>
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              <span>Published</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="h-3.5 w-3.5" />
                              <span>Draft</span>
                            </>
                          )}
                        </button>

                        {member.featured && (
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-600/90 backdrop-blur-md text-white shadow-md flex items-center gap-1 ring-1 ring-purple-400/30">
                            <Star className="h-3 w-3 fill-current" />
                            <span>Featured</span>
                          </span>
                        )}
                      </div>

                      {/* Right: Order Pill */}
                      <div className="px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-mono font-semibold flex items-center gap-1.5 shadow-md border border-white/10">
                        <ArrowUpDown className="h-3 w-3 text-blue-400" />
                        <span>Order: {member.sortOrder ?? 0}</span>
                      </div>
                    </div>

                    {/* Bottom overlay inside image: Name & Role preview */}
                    <div className="absolute bottom-3.5 inset-x-4 pointer-events-none">
                      <h3 className="text-xl font-extrabold text-white drop-shadow-md truncate tracking-tight">
                        {member.name}
                      </h3>
                      <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-300 drop-shadow-sm mt-0.5 truncate">
                        <Sparkles className="h-3.5 w-3.5 flex-shrink-0" />
                        <span>{member.role}</span>
                      </div>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-5 space-y-4">
                    {/* Bio */}
                    {member.bio ? (
                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {member.bio}
                      </p>
                    ) : (
                      <p className="text-xs text-slate-400 dark:text-slate-500 italic">
                        No short bio provided.
                      </p>
                    )}

                    {/* Skills Chips */}
                    {member.skills && member.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {member.skills.slice(0, 4).map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 text-[11px] font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                        {member.skills.length > 4 && (
                          <span className="px-2 py-1 rounded-lg text-[10px] font-medium bg-slate-200/50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 self-center">
                            +{member.skills.length - 4}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Social Indicators */}
                    <div className="flex items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                      {member.socials?.website && (
                        <a
                          href={member.socials.website}
                          target="_blank"
                          rel="noreferrer"
                          className="h-7 w-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-blue-500 hover:scale-110 hover:bg-blue-50 dark:hover:bg-blue-950/60 transition-all"
                          title="Portfolio Website"
                        >
                          <PortfolioIcon className="h-3.5 w-3.5" />
                        </a>
                      )}
                      {member.socials?.github && (
                        <a
                          href={member.socials.github}
                          target="_blank"
                          rel="noreferrer"
                          className="h-7 w-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:scale-110 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                          title="GitHub"
                        >
                          <GithubIcon className="h-3.5 w-3.5" />
                        </a>
                      )}
                      {member.socials?.linkedin && (
                        <a
                          href={member.socials.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="h-7 w-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-blue-600 hover:scale-110 hover:bg-blue-50 dark:hover:bg-blue-950/60 transition-all"
                          title="LinkedIn"
                        >
                          <LinkedinIcon className="h-3.5 w-3.5" />
                        </a>
                      )}
                      {member.socials?.facebook && (
                        <a
                          href={member.socials.facebook}
                          target="_blank"
                          rel="noreferrer"
                          className="h-7 w-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-blue-500 hover:scale-110 hover:bg-blue-50 dark:hover:bg-blue-950/60 transition-all"
                          title="Facebook"
                        >
                          <FacebookIcon className="h-3.5 w-3.5" />
                        </a>
                      )}
                      {member.socials?.whatsapp && (
                        <a
                          href={member.socials.whatsapp}
                          target="_blank"
                          rel="noreferrer"
                          className="h-7 w-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-emerald-500 hover:scale-110 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 transition-all"
                          title="WhatsApp"
                        >
                          <WhatsappIcon className="h-3.5 w-3.5" />
                        </a>
                      )}
                      {(!member.socials ||
                        Object.values(member.socials).every((v) => !v)) && (
                        <span className="text-[11px] text-slate-400 italic">
                          No social links configured
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="px-5 py-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-800/40">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setPreviewMember(member)}
                    className="h-8 px-3 text-xs rounded-xl font-medium border-slate-200 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-800 transition-all shadow-2xs"
                    title="Preview card appearance"
                  >
                    <Eye className="h-3.5 w-3.5 mr-1.5" />
                    Preview
                  </Button>

                  <div className="flex items-center gap-1.5">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleOpenEditModal(member)}
                      className="h-8 px-3 text-xs rounded-xl font-medium border-slate-200 dark:border-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-2xs"
                      title="Edit member"
                    >
                      <Edit className="h-3.5 w-3.5 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteMember(member)}
                      className="h-8 w-8 p-0 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-xl transition-all"
                      title="Delete member"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Add / Edit Member Modal */}
      {showFormModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <Card className="w-full max-w-2xl rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  {editingMember ? "Edit Team Member" : "Add New Team Member"}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Configure member profile details, biography, photo, and social
                  profiles.
                </p>
              </div>
              <button
                onClick={() => setShowFormModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-xs font-semibold">
                {formError}
              </div>
            )}

            <form onSubmit={handleSaveMember} className="space-y-5 text-xs">
              {/* Profile Photo Upload & Preview */}
              <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-3">
                <label className="font-semibold block text-slate-700 dark:text-slate-300">
                  Profile Photo
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="relative h-24 w-24 rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 shrink-0 shadow-sm">
                    <Image
                      src={formImage || DEFAULT_AVATAR}
                      alt="Preview"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 space-y-2 w-full">
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-xs rounded-xl"
                      >
                        <Upload className="h-3.5 w-3.5 mr-1.5" />
                        Upload &amp; Replace Photo
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => setFormImage(DEFAULT_AVATAR)}
                        className="text-xs text-slate-500"
                      >
                        Reset Default
                      </Button>
                    </div>

                    <div>
                      <span className="text-[11px] text-slate-400 block mb-1">
                        Or enter direct image URL:
                      </span>
                      <input
                        type="text"
                        value={formImage}
                        onChange={(e) => setFormImage(e.target.value)}
                        placeholder="https://images.unsplash.com/... or data:image/..."
                        className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Basic Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Liam Walker"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                    Job Title / Role <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value)}
                    placeholder="e.g. Senior Shopify Engineer"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                    Short Biography
                  </label>
                  <textarea
                    rows={3}
                    value={formBio}
                    onChange={(e) => setFormBio(e.target.value)}
                    placeholder="Brief description of experience, specialties, and contributions..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 text-xs"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                    Skills &amp; Expertise (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formSkills}
                    onChange={(e) => setFormSkills(e.target.value)}
                    placeholder="Shopify Liquid, Next.js, TypeScript, Tailwind CSS"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 text-xs"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                    Display Order Index
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={formSortOrder}
                    onChange={(e) => setFormSortOrder(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 text-xs"
                  />
                </div>

                <div className="flex items-center gap-6 pt-5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formPublished}
                      onChange={(e) => setFormPublished(e.target.checked)}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                    />
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      Publish to Website
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formFeatured}
                      onChange={(e) => setFormFeatured(e.target.checked)}
                      className="rounded border-slate-300 text-purple-600 focus:ring-purple-500 h-4 w-4"
                    />
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      Mark as Featured
                    </span>
                  </label>
                </div>
              </div>

              {/* Social Profiles */}
              <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="font-semibold uppercase tracking-wider text-slate-400 text-[11px]">
                  Social &amp; Professional Links (Optional)
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-medium text-slate-500 block mb-0.5">
                      Portfolio / Personal Website URL
                    </label>
                    <input
                      type="url"
                      value={formWebsite}
                      onChange={(e) => setFormWebsite(e.target.value)}
                      placeholder="https://example.com"
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-medium text-slate-500 block mb-0.5">
                      LinkedIn URL
                    </label>
                    <input
                      type="url"
                      value={formLinkedin}
                      onChange={(e) => setFormLinkedin(e.target.value)}
                      placeholder="https://linkedin.com/in/..."
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-medium text-slate-500 block mb-0.5">
                      GitHub Profile URL
                    </label>
                    <input
                      type="url"
                      value={formGithub}
                      onChange={(e) => setFormGithub(e.target.value)}
                      placeholder="https://github.com/..."
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-medium text-slate-500 block mb-0.5">
                      Facebook URL
                    </label>
                    <input
                      type="url"
                      value={formFacebook}
                      onChange={(e) => setFormFacebook(e.target.value)}
                      placeholder="https://facebook.com/..."
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[11px] font-medium text-slate-500 block mb-0.5">
                      Direct WhatsApp Link
                    </label>
                    <input
                      type="url"
                      value={formWhatsapp}
                      onChange={(e) => setFormWhatsapp(e.target.value)}
                      placeholder="https://api.whatsapp.com/send/?phone=..."
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFormModal(false)}
                  className="rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-xs flex items-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {isSubmitting && (
                    <div className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  )}
                  {isSubmitting
                    ? "Saving to Database..."
                    : editingMember
                      ? "Save Changes"
                      : "Create Team Member"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* Live Public Card Preview Modal */}
      {previewMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <Card className="w-full max-w-sm rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                <Sparkles className="h-4 w-4 text-blue-500" />
                <span>Public Card Appearance Preview</span>
              </div>
              <button
                onClick={() => setPreviewMember(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Exactly replicates the public Team Card from /team and Team.tsx */}
            <div className="overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md">
              <div className="relative h-64 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                <Image
                  src={previewMember.image || DEFAULT_AVATAR}
                  alt={previewMember.name}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>

              <div className="p-5">
                <h3 className="text-base font-bold text-slate-900 dark:text-white truncate">
                  {previewMember.name}
                </h3>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mt-0.5 mb-2 truncate">
                  {previewMember.role}
                </p>
                {previewMember.bio && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed mb-4">
                    {previewMember.bio}
                  </p>
                )}

                <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 pt-3 border-t border-slate-100 dark:border-slate-800 flex-wrap">
                  {previewMember.socials?.website && (
                    <span className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-blue-600">
                      <PortfolioIcon className="h-4 w-4" />
                    </span>
                  )}
                  {previewMember.socials?.github && (
                    <span className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white">
                      <GithubIcon className="h-4 w-4" />
                    </span>
                  )}
                  {previewMember.socials?.linkedin && (
                    <span className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-blue-600">
                      <LinkedinIcon className="h-4 w-4" />
                    </span>
                  )}
                  {previewMember.socials?.facebook && (
                    <span className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-blue-500">
                      <FacebookIcon className="h-4 w-4" />
                    </span>
                  )}
                  {previewMember.socials?.whatsapp && (
                    <span className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-emerald-500">
                      <WhatsappIcon className="h-4 w-4" />
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button
                size="sm"
                onClick={() => setPreviewMember(null)}
                className="w-full text-xs rounded-xl"
              >
                Close Preview
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
