"use client";

import * as React from "react";
import Link from "next/link";
import { servicesData as initialServices } from "@/data/mockData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Layers,
  ExternalLink,
  Edit,
  CheckCircle2,
  Search,
  Check,
  X,
} from "lucide-react";
import { Service } from "@/types";

export default function AdminServicesPage() {
  const [services, setServices] = React.useState<Service[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("nexus_admin_services");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return initialServices;
  });

  const [search, setSearch] = React.useState("");
  const [editingService, setEditingService] = React.useState<Service | null>(
    null,
  );

  // Form states for editing
  const [editTitle, setEditTitle] = React.useState("");
  const [editDescription, setEditDescription] = React.useState("");
  const [editFeatures, setEditFeatures] = React.useState("");
  const [editDeliverables, setEditDeliverables] = React.useState("");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("nexus_admin_services", JSON.stringify(services));
    }
  }, [services]);

  const handleOpenEdit = (service: Service) => {
    setEditingService(service);
    setEditTitle(service.title);
    setEditDescription(service.description);
    setEditFeatures(service.features.join("\n"));
    setEditDeliverables((service.deliverables || []).join("\n"));
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    const updated: Service = {
      ...editingService,
      title: editTitle.trim(),
      description: editDescription.trim(),
      features: editFeatures
        .split("\n")
        .map((f) => f.trim())
        .filter(Boolean),
      deliverables: editDeliverables
        .split("\n")
        .map((d) => d.trim())
        .filter(Boolean),
    };

    setServices((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
    setEditingService(null);
  };

  const filteredServices = services.filter((s) => {
    const q = search.toLowerCase();
    return (
      s.title.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.id.toLowerCase().includes(q)
    );
  });

  const totalFeatures = services.reduce((acc, s) => acc + s.features.length, 0);
  const totalDeliverables = services.reduce(
    (acc, s) => acc + (s.deliverables?.length || 0),
    0,
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Layers className="h-3.5 w-3.5" />
            <span>Service Catalog</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Agency Services Management
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Manage your 6 core agency offerings, features, deliverables, and
            public service landing pages.
          </p>
        </div>

        <Link href="/services" target="_blank">
          <Button
            variant="outline"
            size="sm"
            className="rounded-xl border-slate-300 dark:border-slate-700"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            View Public Services
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 rounded-xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Active Offerings
          </div>
          <div className="mt-1 text-2xl font-black text-slate-900 dark:text-white">
            {services.length} Services
          </div>
        </Card>
        <Card className="p-4 rounded-xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Core Capabilities Listed
          </div>
          <div className="mt-1 text-2xl font-black text-purple-600 dark:text-purple-400">
            {totalFeatures} Features
          </div>
        </Card>
        <Card className="p-4 rounded-xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Total Deliverables
          </div>
          <div className="mt-1 text-2xl font-black text-blue-600 dark:text-blue-400">
            {totalDeliverables} Deliverables
          </div>
        </Card>
      </div>

      {/* Search Bar */}
      <Card className="p-4 rounded-2xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search service name, slug or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
          Showing {filteredServices.length} of {services.length} services
        </div>
      </Card>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredServices.map((service) => (
          <Card
            key={service.id}
            className="p-6 rounded-2xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between hover:border-purple-500/40 hover:shadow-lg transition-all"
          >
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 text-[11px] font-mono font-medium">
                    /services/{service.id}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {service.title}
                  </h3>
                </div>

                <div className="flex items-center gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleOpenEdit(service)}
                    className="h-8 w-8 p-0 text-slate-500 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950/50 rounded-lg"
                    title="Edit Service"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Link href={`/services/${service.id}`} target="_blank">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/50 rounded-lg"
                      title="View Live Page"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                {service.description}
              </p>

              {/* Key Features Preview */}
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Included Features ({service.features.length})
                </div>
                <div className="grid grid-cols-1 gap-1.5">
                  {service.features.slice(0, 3).map((feat, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300"
                    >
                      <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                  {service.features.length > 3 && (
                    <div className="text-[11px] text-slate-400 pl-5.5">
                      +{service.features.length - 3} more features
                    </div>
                  )}
                </div>
              </div>

              {/* Deliverables Preview */}
              {service.deliverables && service.deliverables.length > 0 && (
                <div className="space-y-1.5 pt-2">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Deliverables ({service.deliverables.length})
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {service.deliverables.map((item, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-5 mt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Live on Website
              </span>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleOpenEdit(service)}
                  className="text-xs h-8 rounded-lg"
                >
                  Edit Content
                </Button>
                <Link href={`/services/${service.id}`} target="_blank">
                  <Button
                    size="sm"
                    className="text-xs h-8 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
                  >
                    Preview Page
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Edit Service Modal */}
      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <Card className="w-full max-w-xl rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Edit Service: {editingService.title}
                </h2>
                <span className="text-xs text-slate-400 font-mono">
                  Slug: {editingService.id}
                </span>
              </div>
              <button
                onClick={() => setEditingService(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                  Service Title
                </label>
                <input
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:ring-2 focus:ring-purple-500 text-sm"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                  Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:ring-2 focus:ring-purple-500 text-xs"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                  Features (one per line)
                </label>
                <textarea
                  rows={4}
                  value={editFeatures}
                  onChange={(e) => setEditFeatures(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:ring-2 focus:ring-purple-500 font-mono text-xs"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                  Deliverables (one per line)
                </label>
                <textarea
                  rows={4}
                  value={editDeliverables}
                  onChange={(e) => setEditDeliverables(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:ring-2 focus:ring-purple-500 font-mono text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingService(null)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  className="bg-purple-600 hover:bg-purple-700 text-white font-semibold"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
