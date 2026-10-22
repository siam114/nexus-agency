"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Search,
  CheckCircle2,
  Clock,
  Archive,
  Trash2,
  X,
  Reply,
} from "lucide-react";
import { cn } from "@/lib/utils";

type InquiryStatus = "new" | "in_progress" | "resolved" | "archived";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  company?: string;
  service?: string;
  message: string;
  status: InquiryStatus;
  createdAt: string;
}

const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: "inq-1",
    name: "Elena Rostova",
    email: "elena@novatech-solutions.io",
    company: "NovaTech Solutions",
    service: "Shopify Development",
    message:
      "Hello NexusAgency team, we are preparing to launch our next-generation consumer electronics accessories brand. We need an end-to-end custom Shopify store with custom Liquid sections, fast page speeds, and Klaviyo email integration. Looking forward to discussing timeline and pricing.",
    status: "new",
    createdAt: "2026-10-21T09:30:00.000Z",
  },
  {
    id: "inq-2",
    name: "Marcus Vance",
    email: "marcus.vance@orbitlogistics.co",
    company: "Orbit Global Logistics",
    service: "Figma to Website Conversion",
    message:
      "We already have complete Figma designs ready for our B2B logistics platform redesign (around 12 unique responsive pages). We need clean Next.js/Tailwind CSS implementation with pixel-perfect attention to detail and SEO optimization. Can we schedule a brief discovery call this week?",
    status: "in_progress",
    createdAt: "2026-10-20T14:15:00.000Z",
  },
  {
    id: "inq-3",
    name: "Sarah Jenkins",
    email: "sarah@luminahealth.org",
    company: "Lumina Wellness",
    service: "Custom Website Development",
    message:
      "Hi Siam, we loved your portfolio case studies! We are a healthcare clinic network looking to overhaul our public portal with appointment scheduling inquiries, clinic location finder, and accessible typography. Please let us know your current availability.",
    status: "new",
    createdAt: "2026-10-19T18:45:00.000Z",
  },
  {
    id: "inq-4",
    name: "David Kim",
    email: "dkim@apexventures.capital",
    company: "Apex Capital Partners",
    service: "WordPress Development",
    message:
      "We require a fast, high-security corporate site on WordPress with custom Gutenberg blocks for our portfolio companies. Please send over your recent enterprise project examples and standard engagement contract terms.",
    status: "resolved",
    createdAt: "2026-10-15T11:20:00.000Z",
  },
];

const STATUS_CONFIG: Record<
  InquiryStatus,
  { label: string; bg: string; text: string; icon: React.ComponentType<{ className?: string }> }
> = {
  new: {
    label: "New",
    bg: "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30",
    text: "text-blue-600 dark:text-blue-400",
    icon: Clock,
  },
  in_progress: {
    label: "In Progress",
    bg: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30",
    text: "text-amber-600 dark:text-amber-400",
    icon: Clock,
  },
  resolved: {
    label: "Resolved",
    bg: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
    text: "text-emerald-600 dark:text-emerald-400",
    icon: CheckCircle2,
  },
  archived: {
    label: "Archived",
    bg: "bg-slate-500/15 text-slate-700 dark:text-slate-300 border-slate-500/30",
    text: "text-slate-500 dark:text-slate-400",
    icon: Archive,
  },
};

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = React.useState<Inquiry[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("nexus_admin_inquiries");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return INITIAL_INQUIRIES;
  });

  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [selectedInquiry, setSelectedInquiry] = React.useState<Inquiry | null>(null);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("nexus_admin_inquiries", JSON.stringify(inquiries));
    }
  }, [inquiries]);

  const updateStatus = (id: string, newStatus: InquiryStatus) => {
    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
    if (selectedInquiry?.id === id) {
      setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const deleteInquiry = (id: string) => {
    if (confirm("Are you sure you want to delete this client inquiry?")) {
      setInquiries((prev) => prev.filter((item) => item.id !== id));
      if (selectedInquiry?.id === id) {
        setSelectedInquiry(null);
      }
    }
  };

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesFilter = statusFilter === "all" || inq.status === statusFilter;
    const q = search.toLowerCase();
    const matchesSearch =
      inq.name.toLowerCase().includes(q) ||
      inq.email.toLowerCase().includes(q) ||
      (inq.company && inq.company.toLowerCase().includes(q)) ||
      (inq.service && inq.service.toLowerCase().includes(q)) ||
      inq.message.toLowerCase().includes(q);

    return matchesFilter && matchesSearch;
  });

  const countByStatus = {
    all: inquiries.length,
    new: inquiries.filter((i) => i.status === "new").length,
    in_progress: inquiries.filter((i) => i.status === "in_progress").length,
    resolved: inquiries.filter((i) => i.status === "resolved").length,
    archived: inquiries.filter((i) => i.status === "archived").length,
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Mail className="h-3.5 w-3.5" />
            <span>Lead Inquiries</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Client Inquiries & Messages
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Review incoming project briefs, contact form submissions, and follow up with potential clients.
          </p>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4 rounded-xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Leads</div>
          <div className="mt-1 text-2xl font-black">{countByStatus.all}</div>
        </Card>
        <Card className="p-4 rounded-xl border-blue-200/80 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-950/20">
          <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>New Leads</span>
          </div>
          <div className="mt-1 text-2xl font-black text-blue-600 dark:text-blue-400">
            {countByStatus.new}
          </div>
        </Card>
        <Card className="p-4 rounded-xl border-amber-200/80 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20">
          <div className="text-xs font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>In Discussion</span>
          </div>
          <div className="mt-1 text-2xl font-black text-amber-600 dark:text-amber-400">
            {countByStatus.in_progress}
          </div>
        </Card>
        <Card className="p-4 rounded-xl border-emerald-200/80 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-950/20">
          <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" />
            <span>Resolved</span>
          </div>
          <div className="mt-1 text-2xl font-black text-emerald-600 dark:text-emerald-400">
            {countByStatus.resolved}
          </div>
        </Card>
      </div>

      {/* Filter & Search Bar */}
      <Card className="p-4 rounded-2xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80">
            {[
              { id: "all", label: "All", count: countByStatus.all },
              { id: "new", label: "New", count: countByStatus.new },
              { id: "in_progress", label: "In Progress", count: countByStatus.in_progress },
              { id: "resolved", label: "Resolved", count: countByStatus.resolved },
              { id: "archived", label: "Archived", count: countByStatus.archived },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
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

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search sender, company, service..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </Card>

      {/* Inquiries Table / Cards */}
      <Card className="rounded-2xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
        {filteredInquiries.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <Mail className="h-10 w-10 text-slate-400 mx-auto opacity-50" />
            <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              No inquiries found
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              There are no messages matching your search or active filter tab.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Sender</th>
                  <th className="py-3 px-4">Service</th>
                  <th className="py-3 px-4">Preview</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredInquiries.map((inq) => {
                  const statusCfg = STATUS_CONFIG[inq.status];
                  const StatusIcon = statusCfg.icon;

                  return (
                    <tr
                      key={inq.id}
                      onClick={() => setSelectedInquiry(inq)}
                      className={cn(
                        "hover:bg-slate-50/70 dark:hover:bg-slate-800/40 cursor-pointer transition-colors",
                        inq.status === "new" ? "bg-blue-50/20 dark:bg-blue-950/10 font-medium" : ""
                      )}
                    >
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border",
                            statusCfg.bg
                          )}
                        >
                          <StatusIcon className="h-3 w-3" />
                          <span>{statusCfg.label}</span>
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-900 dark:text-white">
                          {inq.name}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">
                          {inq.email}
                        </div>
                        {inq.company && (
                          <div className="text-[10px] text-slate-400 mt-0.5">
                            {inq.company}
                          </div>
                        )}
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="inline-block px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-medium">
                          {inq.service || "General Inquiry"}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 max-w-xs">
                        <p className="line-clamp-2 text-slate-600 dark:text-slate-300 text-xs">
                          {inq.message}
                        </p>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap text-slate-500 dark:text-slate-400 text-[11px]">
                        {new Date(inq.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>

                      <td className="py-3.5 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setSelectedInquiry(inq)}
                            className="h-8 px-2.5 text-xs text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950"
                          >
                            Details
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteInquiry(inq.id)}
                            className="h-8 w-8 p-0 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Inquiry Detail Drawer / Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <Card className="w-full max-w-2xl rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border",
                      STATUS_CONFIG[selectedInquiry.status].bg
                    )}
                  >
                    {STATUS_CONFIG[selectedInquiry.status].label}
                  </span>
                  <span className="text-xs text-slate-400">
                    Received: {new Date(selectedInquiry.createdAt).toLocaleString()}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {selectedInquiry.name}
                </h2>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {selectedInquiry.email} {selectedInquiry.company ? `• ${selectedInquiry.company}` : ""}
                </div>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-xs">
              <div>
                <span className="text-slate-400 block mb-0.5">Service Requested</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {selectedInquiry.service || "General Consultation"}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Company / Brand</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {selectedInquiry.company || "Not specified"}
                </span>
              </div>
            </div>

            {/* Message Body */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Client Message
              </label>
              <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-950 text-sm text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed">
                {selectedInquiry.message}
              </div>
            </div>

            {/* Status Change Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Update Status
              </label>
              <div className="flex flex-wrap gap-2">
                {(["new", "in_progress", "resolved", "archived"] as InquiryStatus[]).map((status) => (
                  <button
                    key={status}
                    onClick={() => updateStatus(selectedInquiry.id, status)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all",
                      selectedInquiry.status === status
                        ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-transparent hover:border-slate-300 dark:hover:border-slate-700"
                    )}
                  >
                    {STATUS_CONFIG[status].label}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <Button
                variant="outline"
                size="sm"
                onClick={() => deleteInquiry(selectedInquiry.id)}
                className="text-xs text-red-600 border-red-200 dark:border-red-900/60 hover:bg-red-50 dark:hover:bg-red-950/40"
              >
                <Trash2 className="h-4 w-4 mr-1.5" />
                Delete Inquiry
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedInquiry(null)}
                  className="text-xs"
                >
                  Close
                </Button>
                <a
                  href={`mailto:${selectedInquiry.email}?subject=Regarding your inquiry with NexusAgency&body=Hi ${selectedInquiry.name},\n\nThank you for reaching out to NexusAgency.`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs">
                    <Reply className="h-4 w-4 mr-1.5" />
                    Reply via Email
                  </Button>
                </a>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
