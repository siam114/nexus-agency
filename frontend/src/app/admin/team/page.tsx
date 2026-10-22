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

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api/v1";

const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80";

export default function AdminTeamPage() {
  const { token } = useAdminAuth();
  const [members, setMembers] = React.useState<TeamMember[]>(() => getAdminTeam());
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<"all" | "published" | "draft">("all");

  // Modal states
  const [showFormModal, setShowFormModal] = React.useState(false);
  const [editingMember, setEditingMember] = React.useState<TeamMember | null>(null);
  const [previewMember, setPreviewMember] = React.useState<TeamMember | null>(null);

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

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const syncBackend = async (action: "create" | "update" | "delete", memberData: Partial<TeamMember>) => {
    if (!token) return;
    try {
      if (action === "create") {
        await fetch(`${BACKEND_URL}/admin/team`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(memberData),
        });
      } else if (action === "update" && memberData.id) {
        await fetch(`${BACKEND_URL}/admin/team/${memberData.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(memberData),
        });
      } else if (action === "delete" && memberData.id) {
        await fetch(`${BACKEND_URL}/admin/team/${memberData.id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch {
      // Backend offline; local storage persists the changes
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

    if (file.size > 5 * 1024 * 1024) {
      setFormError("Image file size should be less than 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === "string") {
        setFormImage(event.target.result);
        setFormError("");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveMember = (e: React.FormEvent) => {
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

    let updatedList: TeamMember[];
    if (editingMember) {
      updatedList = members.map((m) => (m.id === memberPayload.id ? memberPayload : m));
      syncBackend("update", memberPayload);
    } else {
      updatedList = [...members, memberPayload];
      syncBackend("create", memberPayload);
    }

    updatedList.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
    setMembers(updatedList);
    saveAdminTeam(updatedList);
    setShowFormModal(false);
  };

  const handleTogglePublish = (member: TeamMember) => {
    const updated = { ...member, published: !(member.published !== false) };
    const updatedList = members.map((m) => (m.id === member.id ? updated : m));
    setMembers(updatedList);
    saveAdminTeam(updatedList);
    syncBackend("update", updated);
  };

  const handleDeleteMember = (member: TeamMember) => {
    if (confirm(`Are you sure you want to delete team member "${member.name}"? This action cannot be undone.`)) {
      const updatedList = members.filter((m) => m.id !== member.id);
      setMembers(updatedList);
      saveAdminTeam(updatedList);
      syncBackend("delete", { id: member.id });
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
            Manage your agency specialists, roles, profile photos, social links, display ordering, and public visibility.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/team" target="_blank">
            <Button variant="outline" size="sm" className="rounded-xl border-slate-300 dark:border-slate-700">
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
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Specialists</div>
          <div className="mt-1 text-2xl font-black text-slate-900 dark:text-white">{totalMembers}</div>
        </Card>
        <Card className="p-4 rounded-xl border-emerald-200/80 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/20">
          <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" />
            <span>Published</span>
          </div>
          <div className="mt-1 text-2xl font-black text-emerald-600 dark:text-emerald-400">{publishedCount}</div>
        </Card>
        <Card className="p-4 rounded-xl border-amber-200/80 dark:border-amber-900/40 bg-amber-50/50 dark:bg-amber-950/20">
          <div className="text-xs font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1">
            <XCircle className="h-3 w-3" />
            <span>Drafts / Unpublished</span>
          </div>
          <div className="mt-1 text-2xl font-black text-amber-600 dark:text-amber-400">{draftCount}</div>
        </Card>
        <Card className="p-4 rounded-xl border-purple-200/80 dark:border-purple-900/40 bg-purple-50/50 dark:bg-purple-950/20">
          <div className="text-xs font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-1">
            <Star className="h-3 w-3" />
            <span>Featured</span>
          </div>
          <div className="mt-1 text-2xl font-black text-purple-600 dark:text-purple-400">{featuredCount}</div>
        </Card>
      </div>

      {/* Filter & Search Bar */}
      <Card className="p-4 rounded-2xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80">
          {[
            { id: "all", label: "All Members", count: totalMembers },
            { id: "published", label: "Published", count: publishedCount },
            { id: "draft", label: "Drafts", count: draftCount },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id as "all" | "published" | "draft")}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5",
                statusFilter === tab.id
                  ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
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
            {search ? "No members match your search keywords." : "Get started by adding your first agency specialist."}
          </p>
          <Button size="sm" onClick={handleOpenAddModal} className="text-xs mt-2">
            <Plus className="h-4 w-4 mr-1" />
            Add Team Member
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMembers.map((member) => {
            const isPublished = member.published !== false;

            return (
              <Card
                key={member.id}
                className={cn(
                  "overflow-hidden rounded-2xl border bg-white dark:bg-slate-900 flex flex-col justify-between transition-all hover:shadow-lg group",
                  isPublished
                    ? "border-slate-200/80 dark:border-slate-800"
                    : "border-amber-300/80 dark:border-amber-900/60 opacity-80"
                )}
              >
                <div>
                  {/* Photo & Badges */}
                  <div className="relative h-56 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <Image
                      src={member.image || DEFAULT_AVATAR}
                      alt={member.name}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />

                    {/* Status Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <button
                        onClick={() => handleTogglePublish(member)}
                        className={cn(
                          "px-2.5 py-1 rounded-full text-[10px] font-bold shadow-md transition-all flex items-center gap-1",
                          isPublished
                            ? "bg-emerald-600 text-white hover:bg-emerald-700"
                            : "bg-amber-600 text-white hover:bg-amber-700"
                        )}
                        title="Click to toggle publication status"
                      >
                        {isPublished ? (
                          <>
                            <CheckCircle2 className="h-3 w-3" />
                            <span>Published</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="h-3 w-3" />
                            <span>Draft</span>
                          </>
                        )}
                      </button>

                      {member.featured && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-600 text-white shadow-md flex items-center gap-0.5">
                          <Star className="h-2.5 w-2.5 fill-current" />
                          <span>Featured</span>
                        </span>
                      )}
                    </div>

                    {/* Order Badge */}
                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-white text-[10px] font-mono font-semibold flex items-center gap-1">
                      <ArrowUpDown className="h-2.5 w-2.5" />
                      <span>Order: {member.sortOrder ?? 0}</span>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-5 space-y-3">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white truncate">
                        {member.name}
                      </h3>
                      <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 truncate mt-0.5">
                        {member.role}
                      </div>
                    </div>

                    {member.bio && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {member.bio}
                      </p>
                    )}

                    {/* Skills Chips */}
                    {member.skills && member.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {member.skills.slice(0, 3).map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                        {member.skills.length > 3 && (
                          <span className="text-[10px] text-slate-400 self-center">
                            +{member.skills.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Social Indicators */}
                    <div className="flex items-center gap-1.5 text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                      {member.socials?.website && <PortfolioIcon className="h-3.5 w-3.5 text-blue-500" />}
                      {member.socials?.github && <GithubIcon className="h-3.5 w-3.5 text-slate-700 dark:text-slate-300" />}
                      {member.socials?.linkedin && <LinkedinIcon className="h-3.5 w-3.5 text-blue-600" />}
                      {member.socials?.facebook && <FacebookIcon className="h-3.5 w-3.5 text-blue-500" />}
                      {member.socials?.whatsapp && <WhatsappIcon className="h-3.5 w-3.5 text-emerald-500" />}
                      {!member.socials ||
                        Object.values(member.socials).every((v) => !v) && (
                          <span className="text-[10px] text-slate-400 italic">No social links</span>
                        )}
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/30">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setPreviewMember(member)}
                    className="h-8 px-2 text-xs text-slate-600 dark:text-slate-400 hover:text-blue-600"
                    title="Preview card appearance"
                  >
                    <Eye className="h-3.5 w-3.5 mr-1" />
                    Preview
                  </Button>

                  <div className="flex items-center gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleOpenEditModal(member)}
                      className="h-8 w-8 p-0 text-slate-600 dark:text-slate-400 hover:text-blue-600 rounded-lg"
                      title="Edit member"
                    >
                      <Edit className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteMember(member)}
                      className="h-8 w-8 p-0 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg"
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
                  Configure member profile details, biography, photo, and social profiles.
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
                        type="url"
                        value={formImage}
                        onChange={(e) => setFormImage(e.target.value)}
                        placeholder="https://images.unsplash.com/..."
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
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-xs"
                >
                  {editingMember ? "Save Changes" : "Create Team Member"}
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
              <Button size="sm" onClick={() => setPreviewMember(null)} className="w-full text-xs rounded-xl">
                Close Preview
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

