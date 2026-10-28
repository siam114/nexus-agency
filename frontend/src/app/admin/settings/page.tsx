"use client";

import * as React from "react";
import { personalLinks } from "@/data/personalLinks";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Settings,
  Save,
  CheckCircle2,
  Globe,
  Mail,
  Phone,
  Shield,
  KeyRound,
  Building,
  User,
} from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  FacebookIcon,
  WhatsappIcon,
} from "@/components/ui/SocialIcons";
import { useAdminAuth } from "@/lib/adminAuth";

interface SavedSettings {
  agencyName?: string;
  tagline?: string;
  location?: string;
  availability?: string;
  founderName?: string;
  founderRole?: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  portfolio?: string;
  linkedin?: string;
  github?: string;
  facebook?: string;
}

function getInitialSettings(): SavedSettings {
  if (typeof window === "undefined") return {};
  try {
    const saved = localStorage.getItem("nexus_admin_settings");
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

export default function AdminSettingsPage() {
  const { user } = useAdminAuth();

  const [agencyName, setAgencyName] = React.useState(
    () => getInitialSettings().agencyName || "NexusAgency",
  );
  const [tagline, setTagline] = React.useState(
    () =>
      getInitialSettings().tagline ||
      "High-Impact Digital Solutions & Growth Engineering",
  );
  const [location, setLocation] = React.useState(
    () => getInitialSettings().location || "Dhaka, Bangladesh",
  );
  const [availability, setAvailability] = React.useState(
    () => getInitialSettings().availability || "Available for New Projects",
  );

  const [founderName, setFounderName] = React.useState(
    () => getInitialSettings().founderName || personalLinks.name,
  );
  const [founderRole, setFounderRole] = React.useState(
    () => getInitialSettings().founderRole || personalLinks.role,
  );
  const [email, setEmail] = React.useState(
    () => getInitialSettings().email || personalLinks.email,
  );
  const [phone, setPhone] = React.useState(
    () => getInitialSettings().phone || personalLinks.phoneDisplay,
  );
  const [whatsapp, setWhatsapp] = React.useState(
    () => getInitialSettings().whatsapp || personalLinks.whatsapp,
  );
  const [portfolio, setPortfolio] = React.useState(
    () => getInitialSettings().portfolio || personalLinks.portfolio,
  );
  const [linkedin, setLinkedin] = React.useState(
    () => getInitialSettings().linkedin || personalLinks.linkedin,
  );
  const [github, setGithub] = React.useState(
    () => getInitialSettings().github || personalLinks.github,
  );
  const [facebook, setFacebook] = React.useState(
    () => getInitialSettings().facebook || personalLinks.facebook,
  );

  const [saveSuccess, setSaveSuccess] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const payload = {
      agencyName,
      tagline,
      location,
      availability,
      founderName,
      founderRole,
      email,
      phone,
      whatsapp,
      portfolio,
      linkedin,
      github,
      facebook,
      updatedAt: new Date().toISOString(),
    };

    if (typeof window !== "undefined") {
      localStorage.setItem("nexus_admin_settings", JSON.stringify(payload));
    }

    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3500);
    }, 400);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-500/10 text-slate-600 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Settings className="h-3.5 w-3.5" />
            <span>Configuration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Agency & Contact Settings
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Update your public agency branding, contact credentials, social
            profiles, and admin security.
          </p>
        </div>

        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-xs"
        >
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? "Saving..." : "Save Settings"}
        </Button>
      </div>

      {/* Save Success Alert */}
      {saveSuccess && (
        <div className="flex items-center gap-2.5 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-medium animate-in fade-in slide-in-from-top-1">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
          <span>Agency settings have been saved successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Agency Brand Identity */}
        <Card className="p-6 rounded-2xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white font-bold text-base">
            <Building className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <span>Agency Brand Identity</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                Agency Brand Name
              </label>
              <input
                type="text"
                value={agencyName}
                onChange={(e) => setAgencyName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            <div>
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                Project Availability Status
              </label>
              <input
                type="text"
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            <div className="md:col-span-2">
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                Agency Hero Tagline
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            <div>
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                Operating Location / Base
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>
        </Card>

        {/* Section 2: Founder & Contact Details */}
        <Card className="p-6 rounded-2xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white font-bold text-base">
            <User className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            <span>Founder & Public Contact</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                Founder Full Name
              </label>
              <input
                type="text"
                value={founderName}
                onChange={(e) => setFounderName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            <div>
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                Official Role / Title
              </label>
              <input
                type="text"
                value={founderRole}
                onChange={(e) => setFounderRole(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            <div>
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                Primary Contact Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                Display Phone / Hotline
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                Direct WhatsApp Chat Link
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <WhatsappIcon className="h-4 w-4" />
                </div>
                <input
                  type="url"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-xs font-mono"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Section 3: Social & Developer Profiles */}
        <Card className="p-6 rounded-2xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white font-bold text-base">
            <Globe className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <span>Social & Online Presence</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                Personal Portfolio URL
              </label>
              <input
                type="url"
                value={portfolio}
                onChange={(e) => setPortfolio(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-xs"
              />
            </div>

            <div>
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                LinkedIn Profile URL
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <LinkedinIcon className="h-4 w-4" />
                </div>
                <input
                  type="url"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                GitHub Organization / User URL
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <GithubIcon className="h-4 w-4" />
                </div>
                <input
                  type="url"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                Facebook Page / Profile URL
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <FacebookIcon className="h-4 w-4" />
                </div>
                <input
                  type="url"
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-xs"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Section 4: Security & Authentication Info */}
        <Card className="p-6 rounded-2xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white font-bold text-base">
            <Shield className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            <span>Administrator Credentials</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-xs">
            <div className="space-y-1">
              <div className="font-bold text-slate-900 dark:text-white">
                Active Administrator Account
              </div>
              <div className="text-slate-500 dark:text-slate-400">
                Authenticated as:{" "}
                <span className="font-mono text-blue-600 dark:text-blue-400">
                  {user?.email || "smsiam987@gmail.com"}
                </span>{" "}
                ({user?.role || "super_admin"})
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold text-xs border border-emerald-500/20">
              <KeyRound className="h-3.5 w-3.5" />
              <span>JWT Session Active</span>
            </div>
          </div>
        </Card>

        {/* Bottom Save Bar */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            type="submit"
            disabled={isSaving}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 font-semibold shadow-xs"
          >
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Saving Settings..." : "Save Settings"}
          </Button>
        </div>
      </form>
    </div>
  );
}
