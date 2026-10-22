"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Testimonial } from "@/types";
import { getAdminTestimonials, saveAdminTestimonials } from "@/lib/liveContent";
import { useAdminAuth } from "@/lib/adminAuth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Quote,
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
import { cn } from "@/lib/utils";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api/v1";

const DEFAULT_CLIENT_AVATAR =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80";

export default function AdminTestimonialsPage() {
  const { token } = useAdminAuth();
  const [testimonials, setTestimonials] = React.useState<Testimonial[]>(() =>
    getAdminTestimonials()
  );
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<"all" | "published" | "draft">("all");

  // Modal states
  const [showFormModal, setShowFormModal] = React.useState(false);
  const [editingItem, setEditingItem] = React.useState<Testimonial | null>(null);
  const [previewItem, setPreviewItem] = React.useState<Testimonial | null>(null);

  // Form states
  const [formName, setFormName] = React.useState("");
  const [formRole, setFormRole] = React.useState("");
  const [formCompany, setFormCompany] = React.useState("");
  const [formContent, setFormContent] = React.useState("");
  const [formAvatar, setFormAvatar] = React.useState(DEFAULT_CLIENT_AVATAR);
  const [formRating, setFormRating] = React.useState<number>(5);
  const [formPublished, setFormPublished] = React.useState(true);
  const [formFeatured, setFormFeatured] = React.useState(false);
  const [formSortOrder, setFormSortOrder] = React.useState(1);
  const [formError, setFormError] = React.useState("");

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const syncBackend = async (
    action: "create" | "update" | "delete",
    data: Partial<Testimonial>
  ) => {
    if (!token) return;
    try {
      if (action === "create") {
        await fetch(`${BACKEND_URL}/admin/testimonials`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
      } else if (action === "update" && data.id) {
        await fetch(`${BACKEND_URL}/admin/testimonials/${data.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
      } else if (action === "delete" && data.id) {
        await fetch(`${BACKEND_URL}/admin/testimonials/${data.id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch {
      // Backend offline; local storage persists
    }
  };

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setFormName("");
    setFormRole("");
    setFormCompany("");
    setFormContent("");
    setFormAvatar(DEFAULT_CLIENT_AVATAR);
    setFormRating(5);
    setFormPublished(true);
    setFormFeatured(false);
    setFormSortOrder(testimonials.length + 1);
    setFormError("");
    setShowFormModal(true);
  };

  const handleOpenEditModal = (item: Testimonial) => {
    setEditingItem(item);
    setFormName(item.name);
    setFormRole(item.role || "");
    setFormCompany(item.company || "");
    setFormContent(item.content);
    setFormAvatar(item.avatar || DEFAULT_CLIENT_AVATAR);
    setFormRating(item.rating || 5);
    setFormPublished(item.published !== false);
    setFormFeatured(item.featured === true);
    setFormSortOrder(item.sortOrder ?? 1);
    setFormError("");
    setShowFormModal(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setFormError("Please select a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFormError("Image file size should be less than 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === "string") {
        setFormAvatar(event.target.result);
        setFormError("");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveTestimonial = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formName.trim()) {
      setFormError("Client name is required.");
      return;
    }

    if (!formContent.trim() || formContent.trim().length < 10) {
      setFormError("Testimonial content must be at least 10 characters.");
      return;
    }

    const payload: Testimonial = {
      id: editingItem ? editingItem.id : `testimonial-${Date.now()}`,
      name: formName.trim(),
      role: formRole.trim() || undefined,
      company: formCompany.trim() || undefined,
      content: formContent.trim(),
      avatar: formAvatar.trim() || DEFAULT_CLIENT_AVATAR,
      rating: Number(formRating) || 5,
      published: formPublished,
      featured: formFeatured,
      sortOrder: Number(formSortOrder) || 1,
      createdAt: editingItem?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    let updatedList: Testimonial[];
    if (editingItem) {
      updatedList = testimonials.map((t) => (t.id === payload.id ? payload : t));
      syncBackend("update", payload);
    } else {
      updatedList = [...testimonials, payload];
      syncBackend("create", payload);
    }

    updatedList.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
    setTestimonials(updatedList);
    saveAdminTestimonials(updatedList);
    setShowFormModal(false);
  };

  const handleTogglePublish = (item: Testimonial) => {
    const updated = { ...item, published: !(item.published !== false) };
    const updatedList = testimonials.map((t) => (t.id === item.id ? updated : t));
    setTestimonials(updatedList);
    saveAdminTestimonials(updatedList);
    syncBackend("update", updated);
  };

  const handleDelete = (item: Testimonial) => {
    if (
      confirm(
        `Are you sure you want to delete the testimonial from "${item.name}"? This action cannot be undone.`
      )
    ) {
      const updatedList = testimonials.filter((t) => t.id !== item.id);
      setTestimonials(updatedList);
      saveAdminTestimonials(updatedList);
      syncBackend("delete", { id: item.id });
      if (previewItem?.id === item.id) {
        setPreviewItem(null);
      }
    }
  };

  // Filtered testimonials
  const filteredList = testimonials.filter((t) => {
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "published" && t.published !== false) ||
      (statusFilter === "draft" && t.published === false);

    const q = search.toLowerCase();
    const matchesSearch =
      t.name.toLowerCase().includes(q) ||
      (t.company && t.company.toLowerCase().includes(q)) ||
      (t.role && t.role.toLowerCase().includes(q)) ||
      t.content.toLowerCase().includes(q);

    return matchesStatus && matchesSearch;
  });

  const totalCount = testimonials.length;
  const publishedCount = testimonials.filter((t) => t.published !== false).length;
  const draftCount = testimonials.filter((t) => t.published === false).length;
  const featuredCount = testimonials.filter((t) => t.featured === true).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Quote className="h-3.5 w-3.5" />
            <span>Social Proof</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Client Testimonials
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Manage genuine client reviews, quotes, company affiliations, client avatars, ratings, and public visibility.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/about" target="_blank">
            <Button variant="outline" size="sm" className="rounded-xl border-slate-300 dark:border-slate-700">
              <ExternalLink className="h-4 w-4 mr-2" />
              View on Website
            </Button>
          </Link>
          <Button
            size="sm"
            onClick={handleOpenAddModal}
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-xs"
          >
            <Plus className="h-4 w-4 mr-1.5" />
            Add Testimonial
          </Button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4 rounded-xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Reviews</div>
          <div className="mt-1 text-2xl font-black text-slate-900 dark:text-white">{totalCount}</div>
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
            <span>Drafts</span>
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
            { id: "all", label: "All Reviews", count: totalCount },
            { id: "published", label: "Published", count: publishedCount },
            { id: "draft", label: "Drafts", count: draftCount },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id as "all" | "published" | "draft")}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5",
                statusFilter === tab.id
                  ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs"
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

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search client, company, quote text..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </Card>

      {/* Testimonials List */}
      {filteredList.length === 0 ? (
        <Card className="p-12 text-center rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
          <Quote className="h-10 w-10 text-slate-400 mx-auto opacity-50" />
          <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            No testimonials found
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            {search ? "No feedback matches your search query." : "Add your first client testimonial to display social proof."}
          </p>
          <Button size="sm" onClick={handleOpenAddModal} className="text-xs mt-2">
            <Plus className="h-4 w-4 mr-1" />
            Add Testimonial
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredList.map((item) => {
            const isPublished = item.published !== false;

            return (
              <Card
                key={item.id}
                className={cn(
                  "p-6 rounded-2xl border bg-white dark:bg-slate-900 flex flex-col justify-between transition-all hover:shadow-lg relative group",
                  isPublished
                    ? "border-slate-200/80 dark:border-slate-800"
                    : "border-amber-300/80 dark:border-amber-900/60 opacity-80"
                )}
              >
                <div className="space-y-4">
                  {/* Top Bar: Order, Rating & Status */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleTogglePublish(item)}
                        className={cn(
                          "px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-all flex items-center gap-1",
                          isPublished
                            ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30"
                            : "bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30"
                        )}
                        title="Click to toggle publication"
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

                      {item.featured && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/30 flex items-center gap-0.5">
                          <Star className="h-2.5 w-2.5 fill-current" />
                          <span>Featured</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400">
                      <ArrowUpDown className="h-3 w-3" />
                      <span>Order: {item.sortOrder ?? 0}</span>
                    </div>
                  </div>

                  {/* Rating Stars */}
                  {item.rating && (
                    <div className="flex items-center gap-1 text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-3.5 w-3.5",
                            i < (item.rating ?? 5)
                              ? "fill-current text-amber-400"
                              : "text-slate-200 dark:text-slate-700"
                          )}
                        />
                      ))}
                    </div>
                  )}

                  {/* Quote Text */}
                  <div className="relative">
                    <Quote className="h-6 w-6 text-indigo-500/20 absolute -top-1 -left-1 shrink-0" />
                    <p className="text-xs sm:text-sm italic text-slate-700 dark:text-slate-300 leading-relaxed pl-5 line-clamp-4">
                      &ldquo;{item.content}&rdquo;
                    </p>
                  </div>

                  {/* Client Info */}
                  <div className="flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <div className="relative h-11 w-11 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 border border-slate-200 dark:border-slate-700">
                      <Image
                        src={item.avatar || DEFAULT_CLIENT_AVATAR}
                        alt={item.name}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                    <div className="truncate">
                      <div className="font-bold text-slate-900 dark:text-white text-xs truncate">
                        {item.name}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                        {item.role || "Client"}
                        {item.company ? ` • ${item.company}` : ""}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setPreviewItem(item)}
                    className="h-8 px-2 text-xs text-slate-600 dark:text-slate-400 hover:text-indigo-600"
                    title="Live preview card"
                  >
                    <Eye className="h-3.5 w-3.5 mr-1" />
                    Preview
                  </Button>

                  <div className="flex items-center gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleOpenEditModal(item)}
                      className="h-8 w-8 p-0 text-slate-600 dark:text-slate-400 hover:text-indigo-600 rounded-lg"
                      title="Edit testimonial"
                    >
                      <Edit className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(item)}
                      className="h-8 w-8 p-0 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg"
                      title="Delete testimonial"
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

      {/* Add / Edit Testimonial Modal */}
      {showFormModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <Card className="w-full max-w-xl rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  {editingItem ? "Edit Testimonial" : "Add Client Testimonial"}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Save authentic client feedback and testimonials for social proof.
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

            <form onSubmit={handleSaveTestimonial} className="space-y-4 text-xs">
              {/* Client Avatar Upload & Preview */}
              <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-3">
                <label className="font-semibold block text-slate-700 dark:text-slate-300">
                  Client Avatar / Photo
                </label>
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 shrink-0">
                    <Image
                      src={formAvatar || DEFAULT_CLIENT_AVATAR}
                      alt="Avatar Preview"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 space-y-2">
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
                        Upload Client Photo
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => setFormAvatar(DEFAULT_CLIENT_AVATAR)}
                        className="text-xs text-slate-500"
                      >
                        Default
                      </Button>
                    </div>

                    <input
                      type="url"
                      value={formAvatar}
                      onChange={(e) => setFormAvatar(e.target.value)}
                      placeholder="Or enter image URL: https://..."
                      className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Client Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                    Client Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Emily Carter"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 text-sm"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                    Client Role / Job Title (Optional)
                  </label>
                  <input
                    type="text"
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value)}
                    placeholder="e.g. Founder & CEO"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 text-xs"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                    Company Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={formCompany}
                    onChange={(e) => setFormCompany(e.target.value)}
                    placeholder="e.g. Outdoor Essentials"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 text-xs"
                  />
                </div>
              </div>

              {/* Testimonial Quote */}
              <div>
                <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                  Testimonial Quote / Feedback <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  placeholder="Share the client's genuine review regarding project quality, responsiveness, and results..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 text-xs leading-relaxed"
                />
              </div>

              {/* Rating & Display Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                    Rating (Stars)
                  </label>
                  <select
                    value={formRating}
                    onChange={(e) => setFormRating(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 text-xs"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                    <option value={3}>⭐⭐⭐ (3 Stars)</option>
                    <option value={2}>⭐⭐ (2 Stars)</option>
                    <option value={1}>⭐ (1 Star)</option>
                  </select>
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
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 text-xs"
                  />
                </div>

                <div className="sm:col-span-2 flex items-center gap-6 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formPublished}
                      onChange={(e) => setFormPublished(e.target.checked)}
                      className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                    />
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      Publish on Website
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
                  className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-xs"
                >
                  {editingItem ? "Save Changes" : "Create Testimonial"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* Live Public Testimonial Card Preview Modal */}
      {previewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <Card className="w-full max-w-lg rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                <Sparkles className="h-4 w-4 text-indigo-500" />
                <span>Public Testimonial Card Appearance</span>
              </div>
              <button
                onClick={() => setPreviewItem(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Exactly replicates the website's Testimonial Card */}
            <div className="p-8 relative rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <Quote className="h-8 w-8 text-blue-600/20 absolute top-6 right-6" />

              {previewItem.rating && (
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {Array.from({ length: previewItem.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current text-amber-400" />
                  ))}
                </div>
              )}

              <p className="text-sm italic text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                &ldquo;{previewItem.content}&rdquo;
              </p>

              <div className="flex items-center gap-4">
                <div className="relative h-11 w-11 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <Image
                    src={previewItem.avatar || DEFAULT_CLIENT_AVATAR}
                    alt={previewItem.name}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white text-sm">
                    {previewItem.name}
                  </div>
                  <div className="text-xs text-slate-500">
                    {previewItem.role || "Client"}
                    {previewItem.company ? `, ${previewItem.company}` : ""}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button size="sm" onClick={() => setPreviewItem(null)} className="w-full text-xs rounded-xl">
                Close Preview
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
