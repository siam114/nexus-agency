"use client";

import * as React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { projectsData, servicesData } from "@/data/mockData";
import { getAdminTeam, getAdminTestimonials } from "@/lib/liveContent";
import { useAdminAuth } from "@/lib/adminAuth";
import {
  FolderKanban,
  Layers,
  Mail,
  Users,
  Quote,
  ArrowRight,
  Plus,
  ExternalLink,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";

export default function AdminDashboardPage() {
  const { user } = useAdminAuth();
  const [inquiriesCount] = React.useState(3);
  const [teamMembersCount, setTeamMembersCount] = React.useState(() => getAdminTeam().length);
  const [testimonialsCount, setTestimonialsCount] = React.useState(() => getAdminTestimonials().length);

  React.useEffect(() => {
    const handleUpdate = () => {
      setTeamMembersCount(getAdminTeam().length);
      setTestimonialsCount(getAdminTestimonials().length);
    };
    window.addEventListener("nexus_content_update", handleUpdate);
    return () => window.removeEventListener("nexus_content_update", handleUpdate);
  }, []);

  const stats = [
    {
      label: "Total Projects",
      value: projectsData.length.toString(),
      icon: FolderKanban,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-950/60",
      href: "/admin/projects",
    },
    {
      label: "Active Services",
      value: servicesData.length.toString(),
      icon: Layers,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-950/60",
      href: "/admin/services",
    },
    {
      label: "Team Members",
      value: teamMembersCount.toString(),
      icon: Users,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-950/60",
      href: "/admin/team",
    },
    {
      label: "Testimonials",
      value: testimonialsCount.toString(),
      icon: Quote,
      color: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-50 dark:bg-indigo-950/60",
      href: "/admin/testimonials",
    },
    {
      label: "Client Inquiries",
      value: inquiriesCount.toString(),
      icon: Mail,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-950/60",
      href: "/admin/inquiries",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 text-[11px] font-semibold text-blue-100 uppercase tracking-wider">
            <Sparkles className="h-3 w-3" />
            <span>NexusAgency Administrator</span>
          </div>
          <h1 className="text-2xl font-extrabold">
            Welcome back, {user?.name && user.name !== "Siam Ahmed" ? user.name : "SM SIAM"}!
          </h1>
          <p className="text-xs sm:text-sm text-blue-100">
            Manage your agency portfolio projects, services, client inquiries, and live settings.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/admin/projects">
            <Button size="sm" className="bg-white text-blue-700 hover:bg-blue-50 font-semibold rounded-xl">
              <Plus className="h-4 w-4 mr-1" />
              Add Project
            </Button>
          </Link>
          <Link href="/" target="_blank">
            <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-xl">
              <ExternalLink className="h-4 w-4 mr-1" />
              Live Site
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.label} href={stat.href}>
              <Card className="p-5 rounded-2xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-500/40 hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {stat.label}
                    </div>
                    <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                      {stat.value}
                    </div>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Main 2-Column Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Projects (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Recent Projects
            </h2>
            <Link
              href="/admin/projects"
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
            >
              <span>View all</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <Card className="p-0 rounded-2xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
            {projectsData.slice(0, 4).map((project) => (
              <div
                key={project.id}
                className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors"
              >
                <div className="min-w-0">
                  <div className="font-semibold text-sm text-slate-900 dark:text-white truncate">
                    {project.title}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-0.5">
                    <span>{project.category}</span>
                    <span>•</span>
                    <span>{project.year}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>Published</span>
                  </span>
                  <Link
                    href={`/projects/${project.slug}`}
                    target="_blank"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    title="Preview on website"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </Card>
        </div>

        {/* Recent Inquiries (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Recent Inquiries
            </h2>
            <Link
              href="/admin/inquiries"
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
            >
              <span>View all</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <Card className="p-0 rounded-2xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
            <div className="p-4 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900 dark:text-white">
                  John Davidson
                </span>
                <span className="text-[10px] text-slate-400 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>2 hours ago</span>
                </span>
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                Shopify Development
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                &ldquo;We need custom Liquid theme customization and product option swatches for our apparel store.&rdquo;
              </p>
            </div>

            <div className="p-4 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900 dark:text-white">
                  Elena Rostova
                </span>
                <span className="text-[10px] text-slate-400 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>Yesterday</span>
                </span>
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                Figma to Website Conversion
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                &ldquo;We completed a Figma design system for our SaaS dashboard and need pixel-conscious Next.js implementation.&rdquo;
              </p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 text-center">
              <Link
                href="/admin/inquiries"
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Open Inquiry Inbox →
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

