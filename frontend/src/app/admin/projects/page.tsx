"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Project, ProjectDetail, ProjectDetailFeature } from "@/types";
import {
  getAdminProjects,
  saveAdminProjects,
  getAdminProjectDetails,
  saveAdminProjectDetails,
} from "@/lib/liveContent";
import { useAdminAuth } from "@/lib/adminAuth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Search,
  ExternalLink,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  FolderKanban,
  X,
  Sparkles,
  Upload,
  Globe,
  Layers,
  Check,
  Star,
  FileText,
  Image as ImageIcon,
  AlertTriangle,
  Save,
} from "lucide-react";
import { cn } from "@/lib/utils";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api/v1";

const CATEGORIES = [
  "All",
  "Shopify Development",
  "Figma to Website Conversion",
  "WordPress Development",
  "Custom Website Development",
  "SEO",
  "Ads Management",
];

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80";

type EditTab =
  | "general"
  | "images"
  | "overview"
  | "challenge_solution"
  | "features_seo";

export default function AdminProjectsPage() {
  const { token } = useAdminAuth();
  const [projects, setProjects] = React.useState<Project[]>(() =>
    getAdminProjects(),
  );
  const [search, setSearch] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  // Modals state
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [editingProjectId, setEditingProjectId] = React.useState<string | null>(
    null,
  );
  const [activeTab, setActiveTab] = React.useState<EditTab>("general");
  const [isSaving, setIsSaving] = React.useState(false);
  const [saveSuccess, setSaveSuccess] = React.useState(false);
  const [modalError, setModalError] = React.useState("");
  const [isDirty, setIsDirty] = React.useState(false);

  // New Project simple form
  const [newTitle, setNewTitle] = React.useState("");
  const [newCategory, setNewCategory] = React.useState("Shopify Development");
  const [newDescription, setNewDescription] = React.useState("");
  const [newImage, setNewImage] = React.useState(DEFAULT_IMAGE);
  const [newClient, setNewClient] = React.useState("");

  // Edit Project comprehensive form state
  const [editTitle, setEditTitle] = React.useState("");
  const [editSlug, setEditSlug] = React.useState("");
  const [editOriginalSlug, setEditOriginalSlug] = React.useState("");
  const [editCategory, setEditCategory] = React.useState("Shopify Development");
  const [editServiceSlug, setEditServiceSlug] = React.useState(
    "shopify-development",
  );
  const [editClient, setEditClient] = React.useState("");
  const [editYear, setEditYear] = React.useState("");
  const [editLiveUrl, setEditLiveUrl] = React.useState("");
  const [editSortOrder, setEditSortOrder] = React.useState(1);
  const [editFeatured, setEditFeatured] = React.useState(false);
  const [editPublished, setEditPublished] = React.useState(true);

  // Images & Gallery
  const [editImage, setEditImage] = React.useState(DEFAULT_IMAGE);
  const [editGallery, setEditGallery] = React.useState<string[]>([]);
  const [newGalleryUrl, setNewGalleryUrl] = React.useState("");
  const [editDesktopAspect, setEditDesktopAspect] = React.useState("");
  const [editMobileAspect, setEditMobileAspect] = React.useState("");

  // Overview & Scope
  const [editSummary, setEditSummary] = React.useState("");
  const [editPurpose, setEditPurpose] = React.useState("");
  const [editRequirements, setEditRequirements] = React.useState("");
  const [editAudience, setEditAudience] = React.useState("");
  const [editGoals, setEditGoals] = React.useState<string[]>([]);
  const [newGoalInput, setNewGoalInput] = React.useState("");
  const [editTechnologies, setEditTechnologies] = React.useState("");
  const [editServicesProvided, setEditServicesProvided] = React.useState("");

  // Challenge & Solution
  const [editChallengeSummary, setEditChallengeSummary] = React.useState("");
  const [editChallengePoints, setEditChallengePoints] = React.useState<
    string[]
  >([]);
  const [newChallengePoint, setNewChallengePoint] = React.useState("");
  const [editSolutionSummary, setEditSolutionSummary] = React.useState("");
  const [editSolutionPoints, setEditSolutionPoints] = React.useState<string[]>(
    [],
  );
  const [newSolutionPoint, setNewSolutionPoint] = React.useState("");

  // Features, Outcomes & SEO
  const [editFeatures, setEditFeatures] = React.useState<
    ProjectDetailFeature[]
  >([]);
  const [newFeatureTitle, setNewFeatureTitle] = React.useState("");
  const [newFeatureDesc, setNewFeatureDesc] = React.useState("");
  const [editOutcomeSummary, setEditOutcomeSummary] = React.useState("");
  const [editOutcomeHighlights, setEditOutcomeHighlights] = React.useState<
    string[]
  >([]);
  const [newOutcomeHighlight, setNewOutcomeHighlight] = React.useState("");
  const [editMetaTitle, setEditMetaTitle] = React.useState("");
  const [editMetaDescription, setEditMetaDescription] = React.useState("");

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase());
    const matchesCat =
      selectedCategory === "All" || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const syncBackend = async (
    action: "update" | "create" | "delete",
    data: Partial<Project>,
  ) => {
    if (!token) return;
    try {
      if (action === "update" && data.id) {
        await fetch(`${BACKEND_URL}/admin/projects/${data.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
      } else if (action === "create") {
        await fetch(`${BACKEND_URL}/admin/projects`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
      } else if (action === "delete" && data.id) {
        await fetch(`${BACKEND_URL}/admin/projects/${data.id}`, {
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

  const handleTogglePublish = (project: Project) => {
    const isPub = project.published !== false;
    const updated: Project = { ...project, published: !isPub };
    const updatedList = projects.map((p) =>
      p.id === project.id ? updated : p,
    );
    setProjects(updatedList);
    saveAdminProjects(updatedList);

    // Also update detail record
    const allDetails = getAdminProjectDetails();
    if (allDetails[project.slug]) {
      allDetails[project.slug].published = !isPub;
      saveAdminProjectDetails(allDetails);
    }
    syncBackend("update", updated);
  };

  const handleDelete = (id: string, title: string) => {
    if (
      confirm(
        `Are you sure you want to remove "${title}"? This cannot be undone.`,
      )
    ) {
      const projectToDelete = projects.find((p) => p.id === id);
      const updatedList = projects.filter((p) => p.id !== id);
      setProjects(updatedList);
      saveAdminProjects(updatedList);

      if (projectToDelete) {
        const allDetails = getAdminProjectDetails();
        delete allDetails[projectToDelete.slug];
        saveAdminProjectDetails(allDetails);
        syncBackend("delete", { id: projectToDelete.id });
      }
    }
  };

  // Open Edit Modal and load project by ID
  const handleOpenEdit = (project: Project) => {
    setEditingProjectId(project.id);
    setEditOriginalSlug(project.slug);
    setActiveTab("general");
    setModalError("");
    setIsDirty(false);
    setSaveSuccess(false);

    const allDetails = getAdminProjectDetails();
    const detail: ProjectDetail | undefined =
      allDetails[project.slug] ||
      Object.values(allDetails).find((d) => d.id === project.id);

    // Populate Tab 1: General
    setEditTitle(project.title);
    setEditSlug(project.slug);
    setEditCategory(project.category);
    setEditServiceSlug(
      detail?.serviceSlug ||
        project.category.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    );
    setEditClient(project.client || detail?.client || "");
    setEditYear(
      project.year || detail?.year || new Date().getFullYear().toString(),
    );
    setEditLiveUrl(project.liveUrl || detail?.liveUrl || "");
    setEditSortOrder(project.sortOrder ?? 1);
    setEditFeatured(project.featured === true);
    setEditPublished(project.published !== false);

    // Populate Tab 2: Images
    setEditImage(project.image || detail?.image || DEFAULT_IMAGE);
    setEditGallery(detail?.gallery || []);
    setNewGalleryUrl("");
    setEditDesktopAspect(
      detail?.showcase?.desktopAspect ||
        "Clean navigation headers, multi-column gear grids, and prominent lifestyle banners.",
    );
    setEditMobileAspect(
      detail?.showcase?.mobileAspect ||
        "Touch-optimized filters, sticky checkout controls, and fast-rendering product previews.",
    );

    // Populate Tab 3: Overview & Scope
    setEditSummary(project.description || detail?.summary || "");
    setEditPurpose(detail?.overview?.purpose || "");
    setEditRequirements(detail?.overview?.requirements || "");
    setEditAudience(detail?.overview?.audience || "");
    setEditGoals(detail?.overview?.goals || []);
    setNewGoalInput("");
    setEditTechnologies(
      (detail?.technologies || project.tags || []).join(", "),
    );
    setEditServicesProvided(
      (detail?.servicesProvided || [project.category]).join(", "),
    );

    // Populate Tab 4: Challenge & Solution
    setEditChallengeSummary(detail?.challenge?.summary || "");
    setEditChallengePoints(detail?.challenge?.points || []);
    setNewChallengePoint("");
    setEditSolutionSummary(detail?.solution?.summary || "");
    setEditSolutionPoints(detail?.solution?.points || []);
    setNewSolutionPoint("");

    // Populate Tab 5: Features, Outcomes & SEO
    setEditFeatures(detail?.features || []);
    setNewFeatureTitle("");
    setNewFeatureDesc("");
    setEditOutcomeSummary(detail?.outcome?.summary || "");
    setEditOutcomeHighlights(detail?.outcome?.highlights || []);
    setNewOutcomeHighlight("");
    setEditMetaTitle(
      detail?.metaTitle ||
        `${project.title} | ${project.category} Case Study | NexusAgency`,
    );
    setEditMetaDescription(
      detail?.metaDescription ||
        `Explore how NexusAgency engineered ${project.title} for ${project.client || "our client partner"} with modern responsive web architecture.`,
    );

    setShowEditModal(true);
  };

  const handleCloseEdit = () => {
    if (isDirty) {
      if (confirm("You have unsaved changes. Discard and close editor?")) {
        setShowEditModal(false);
        setIsDirty(false);
      }
    } else {
      setShowEditModal(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setModalError("Please select a valid image file (PNG, JPG, WebP).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setModalError("Image file size should be less than 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === "string") {
        setEditImage(event.target.result);
        setIsDirty(true);
        setModalError("");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddGalleryImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalleryUrl.trim()) return;
    setEditGallery([...editGallery, newGalleryUrl.trim()]);
    setNewGalleryUrl("");
    setIsDirty(true);
  };

  const handleRemoveGalleryImage = (index: number) => {
    setEditGallery(editGallery.filter((_, i) => i !== index));
    setIsDirty(true);
  };

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalInput.trim()) return;
    setEditGoals([...editGoals, newGoalInput.trim()]);
    setNewGoalInput("");
    setIsDirty(true);
  };

  const handleRemoveGoal = (index: number) => {
    setEditGoals(editGoals.filter((_, i) => i !== index));
    setIsDirty(true);
  };

  const handleAddChallengePoint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChallengePoint.trim()) return;
    setEditChallengePoints([...editChallengePoints, newChallengePoint.trim()]);
    setNewChallengePoint("");
    setIsDirty(true);
  };

  const handleRemoveChallengePoint = (index: number) => {
    setEditChallengePoints(editChallengePoints.filter((_, i) => i !== index));
    setIsDirty(true);
  };

  const handleAddSolutionPoint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSolutionPoint.trim()) return;
    setEditSolutionPoints([...editSolutionPoints, newSolutionPoint.trim()]);
    setNewSolutionPoint("");
    setIsDirty(true);
  };

  const handleRemoveSolutionPoint = (index: number) => {
    setEditSolutionPoints(editSolutionPoints.filter((_, i) => i !== index));
    setIsDirty(true);
  };

  const handleAddFeature = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFeatureTitle.trim()) return;
    setEditFeatures([
      ...editFeatures,
      {
        title: newFeatureTitle.trim(),
        description:
          newFeatureDesc.trim() ||
          "Engineered for optimal performance and user satisfaction.",
      },
    ]);
    setNewFeatureTitle("");
    setNewFeatureDesc("");
    setIsDirty(true);
  };

  const handleRemoveFeature = (index: number) => {
    setEditFeatures(editFeatures.filter((_, i) => i !== index));
    setIsDirty(true);
  };

  const handleAddOutcomeHighlight = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOutcomeHighlight.trim()) return;
    setEditOutcomeHighlights([
      ...editOutcomeHighlights,
      newOutcomeHighlight.trim(),
    ]);
    setNewOutcomeHighlight("");
    setIsDirty(true);
  };

  const handleRemoveOutcomeHighlight = (index: number) => {
    setEditOutcomeHighlights(
      editOutcomeHighlights.filter((_, i) => i !== index),
    );
    setIsDirty(true);
  };

  // Submit and Save Project Updates
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProjectId) return;

    if (!editTitle.trim()) {
      setModalError("Project title is required.");
      setActiveTab("general");
      return;
    }

    const cleanSlug = editSlug
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    if (!cleanSlug) {
      setModalError("Valid project slug is required.");
      setActiveTab("general");
      return;
    }

    // Check slug collision with other projects
    const collision = projects.find(
      (p) => p.slug === cleanSlug && p.id !== editingProjectId,
    );
    if (collision) {
      setModalError(
        `A project with slug "${cleanSlug}" already exists. Please choose a unique slug.`,
      );
      setActiveTab("general");
      return;
    }

    setIsSaving(true);
    setModalError("");

    const techArray = editTechnologies
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const servicesArray = editServicesProvided
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    // 1. Updated Project Summary Object
    const updatedProject: Project = {
      id: editingProjectId,
      slug: cleanSlug,
      title: editTitle.trim(),
      category: editCategory,
      tags: techArray.length > 0 ? techArray : [editCategory],
      description:
        editSummary.trim() || "Professional agency project deliverable.",
      image: editImage.trim() || DEFAULT_IMAGE,
      client: editClient.trim() || undefined,
      year: editYear.trim() || new Date().getFullYear().toString(),
      liveUrl: editLiveUrl.trim() || undefined,
      featured: editFeatured,
      published: editPublished,
      sortOrder: Number(editSortOrder) || 1,
      metrics: [
        { label: "Status", value: "Verified Delivery" },
        { label: "Responsive", value: "100%" },
      ],
    };

    // 2. Updated Full ProjectDetail Case Study
    const updatedDetail: ProjectDetail = {
      id: editingProjectId,
      slug: cleanSlug,
      title: editTitle.trim(),
      category: editCategory,
      serviceSlug: editServiceSlug.trim() || cleanSlug,
      client: editClient.trim() || "Client Partner",
      year: editYear.trim() || new Date().getFullYear().toString(),
      tags: techArray.length > 0 ? techArray : [editCategory],
      image: editImage.trim() || DEFAULT_IMAGE,
      gallery: editGallery,
      liveUrl: editLiveUrl.trim() || undefined,
      summary: editSummary.trim() || "Professional agency project deliverable.",
      metaTitle:
        editMetaTitle.trim() ||
        `${editTitle.trim()} | ${editCategory} Case Study | NexusAgency`,
      metaDescription:
        editMetaDescription.trim() ||
        `Explore how NexusAgency delivered ${editTitle.trim()} with modern responsive web engineering.`,
      metrics: [
        { label: "Mobile Usability", value: "100%" },
        { label: "Performance Score", value: "95+" },
        { label: "Platform", value: editCategory },
        { label: "Year Delivered", value: editYear.trim() || "2025" },
      ],
      overview: {
        purpose:
          editPurpose.trim() ||
          `${editTitle.trim()} required an upgraded modern digital experience to drive online engagement.`,
        requirements:
          editRequirements.trim() ||
          "Full responsiveness, performant frontend code, intuitive user flow, and clean code architecture.",
        audience:
          editAudience.trim() ||
          "Online visitors, prospective clients, and target market users.",
        goals:
          editGoals.length > 0
            ? editGoals
            : [
                "Deliver a high-converting, responsive layout.",
                "Ensure clean code and fast load times across viewports.",
              ],
      },
      challenge: {
        summary:
          editChallengeSummary.trim() ||
          "Legacy performance bottlenecks and inconsistent responsive scaling across viewports.",
        points:
          editChallengePoints.length > 0
            ? editChallengePoints
            : [
                "Slow initial loading and layout shifting.",
                "Inconsistent styling across mobile and desktop devices.",
              ],
      },
      solution: {
        summary:
          editSolutionSummary.trim() ||
          "Engineered a streamlined, modern component architecture optimized for fast delivery.",
        points:
          editSolutionPoints.length > 0
            ? editSolutionPoints
            : [
                "Designed fluid responsive layouts tested across multiple screen sizes.",
                "Implemented clean component code with high-performance CSS standards.",
              ],
      },
      features:
        editFeatures.length > 0
          ? editFeatures
          : [
              {
                title: "Responsive Multi-Viewport Layout",
                description:
                  "Optimized for mobile, tablet, and desktop browsing.",
              },
            ],
      showcase: {
        title: "Storefront Layout & Multi-Viewport Experience",
        description:
          "Engineered to balance aesthetics with swift loading speeds across desktop and mobile.",
        desktopAspect:
          editDesktopAspect.trim() ||
          "Clean navigation, fluid grid alignment, and prominent branding.",
        mobileAspect:
          editMobileAspect.trim() ||
          "Touch-friendly controls, fast tap targets, and streamlined layouts.",
      },
      technologies:
        techArray.length > 0
          ? techArray
          : [editCategory, "Tailwind CSS", "Next.js"],
      servicesProvided:
        servicesArray.length > 0
          ? servicesArray
          : [editCategory, "Responsive Web Development"],
      outcome: {
        summary:
          editOutcomeSummary.trim() ||
          "Delivered on time with verified performance, high mobile usability, and positive client feedback.",
        highlights:
          editOutcomeHighlights.length > 0
            ? editOutcomeHighlights
            : [
                "100% responsive fluid scaling across all tested viewports.",
                "Delivered clean, maintainable code architecture.",
              ],
      },
      featured: editFeatured,
      published: editPublished,
      sortOrder: Number(editSortOrder) || 1,
    };

    // Update Project list
    const updatedProjects = projects
      .map((p) => (p.id === editingProjectId ? updatedProject : p))
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));

    // Update Project Details dictionary (safely remove old slug key if slug changed)
    const allDetails = getAdminProjectDetails();
    if (editOriginalSlug && editOriginalSlug !== cleanSlug) {
      delete allDetails[editOriginalSlug];
    }
    allDetails[cleanSlug] = updatedDetail;

    // Save to persistent storage
    setProjects(updatedProjects);
    saveAdminProjects(updatedProjects);
    saveAdminProjectDetails(allDetails);

    // Sync to backend API
    await syncBackend("update", updatedProject);

    setIsSaving(false);
    setIsDirty(false);
    setSaveSuccess(true);

    setTimeout(() => {
      setSaveSuccess(false);
      setShowEditModal(false);
    }, 900);
  };

  // Add new project handler
  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const slug = newTitle
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const newId = `project-${Date.now()}`;
    const cleanSlug = slug || newId;

    const createdProject: Project = {
      id: newId,
      slug: cleanSlug,
      title: newTitle.trim(),
      category: newCategory,
      tags: [newCategory, "Web Development"],
      description:
        newDescription.trim() || "Professional agency project deliverable.",
      image: newImage.trim() || DEFAULT_IMAGE,
      client: newClient.trim() || "Client Partner",
      year: new Date().getFullYear().toString(),
      featured: true,
      published: true,
      sortOrder: projects.length + 1,
      metrics: [
        { label: "Status", value: "Verified Delivery" },
        { label: "Responsive", value: "100%" },
      ],
    };

    const createdDetail: ProjectDetail = {
      id: newId,
      slug: cleanSlug,
      title: newTitle.trim(),
      category: newCategory,
      serviceSlug: newCategory.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      client: newClient.trim() || "Client Partner",
      year: new Date().getFullYear().toString(),
      tags: [newCategory, "Web Development"],
      image: newImage.trim() || DEFAULT_IMAGE,
      gallery: [],
      summary:
        newDescription.trim() || "Professional agency project deliverable.",
      metaTitle: `${newTitle.trim()} | ${newCategory} Case Study | NexusAgency`,
      metaDescription: `Case study of ${newTitle.trim()} built by NexusAgency.`,
      metrics: [
        { label: "Mobile Usability", value: "100%" },
        { label: "Performance Score", value: "95+" },
      ],
      overview: {
        purpose:
          "Project delivery aimed at elevating digital presence and brand reach.",
        requirements:
          "Clean architecture, cross-device responsiveness, and high speed.",
        audience: "Prospective customers and targeted audience.",
        goals: [
          "Deliver high quality frontend architecture.",
          "Ensure smooth mobile experience.",
        ],
      },
      challenge: {
        summary:
          "Need for modern, fast-loading interfaces with pixel-conscious layout fidelity.",
        points: ["Cross-browser responsiveness.", "Fast mobile loading."],
      },
      solution: {
        summary:
          "Crafted clean code architecture tailored to the client's specifications.",
        points: ["Modular layout control.", "Optimized frontend assets."],
      },
      features: [
        {
          title: "Fluid Responsive Layout",
          description: "Tested across mobile, tablet, and desktop displays.",
        },
      ],
      showcase: {
        title: "Multi-Screen Presentation",
        description: "Balanced visual appeal and fast performance.",
        desktopAspect: "Clean desktop header and structured grid.",
        mobileAspect: "Mobile-first controls and responsive touch targets.",
      },
      technologies: [newCategory, "Tailwind CSS", "TypeScript"],
      servicesProvided: [newCategory],
      outcome: {
        summary:
          "Delivered on schedule with 100% verified responsive fluidity.",
        highlights: ["100% verified mobile usability.", "Fast page rendering."],
      },
      featured: true,
      published: true,
      sortOrder: projects.length + 1,
    };

    const updatedProjects = [createdProject, ...projects];
    setProjects(updatedProjects);
    saveAdminProjects(updatedProjects);

    const allDetails = getAdminProjectDetails();
    allDetails[cleanSlug] = createdDetail;
    saveAdminProjectDetails(allDetails);

    syncBackend("create", createdProject);

    setShowAddModal(false);
    setNewTitle("");
    setNewDescription("");
    setNewClient("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <FolderKanban className="h-3.5 w-3.5" />
            <span>Portfolio Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Projects Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Create, edit, toggle publication status, and manage portfolio case
            studies and live URLs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/projects" target="_blank">
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl border-slate-300 dark:border-slate-700"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Public Portfolio
            </Button>
          </Link>
          <Button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-xs"
          >
            <Plus className="h-4 w-4 mr-1.5" />
            <span>New Project</span>
          </Button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search projects by title, category, or slug..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 pl-9 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1 sm:pb-0">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors cursor-pointer",
                selectedCategory === cat
                  ? "bg-blue-600 text-white font-semibold shadow-xs"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white",
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Table */}
      <Card className="p-0 rounded-2xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <th className="py-3.5 px-4">Project</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Client / Year</th>
                <th className="py-3.5 px-4">Order</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs sm:text-sm">
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <FolderKanban className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <span>No projects found matching your criteria.</span>
                  </td>
                </tr>
              ) : (
                filteredProjects.map((project) => {
                  const isPublished = project.published !== false;

                  return (
                    <tr
                      key={project.id}
                      className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                    >
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative h-12 w-16 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 border border-slate-200 dark:border-slate-700">
                            <Image
                              src={project.image || DEFAULT_IMAGE}
                              alt={project.title}
                              fill
                              unoptimized
                              className="object-cover"
                              sizes="64px"
                            />
                          </div>
                          <div className="min-w-0">
                            <div className="font-bold text-slate-900 dark:text-white truncate flex items-center gap-1.5">
                              <span>{project.title}</span>
                              {project.featured && (
                                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-md bg-purple-500/15 text-purple-600 dark:text-purple-400 text-[10px] font-semibold">
                                  <Star className="h-2.5 w-2.5 fill-current" />
                                  <span>Featured</span>
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-400 font-mono truncate">
                              /projects/{project.slug}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                        <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-medium">
                          {project.category}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400">
                        <div className="font-medium text-slate-700 dark:text-slate-300">
                          {project.client || "—"}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {project.year}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400 font-mono text-xs">
                        #{project.sortOrder ?? 0}
                      </td>

                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => handleTogglePublish(project)}
                          className={cn(
                            "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold cursor-pointer transition-colors border",
                            isPublished
                              ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
                              : "bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800",
                          )}
                          title="Click to toggle publication"
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
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1">
                          {/* Edit Project Button */}
                          <button
                            onClick={() => handleOpenEdit(project)}
                            className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-colors cursor-pointer"
                            title="Edit Project & Case Study"
                          >
                            <Edit className="h-4 w-4" />
                          </button>

                          {/* Preview Public Detail Page */}
                          <Link
                            href={`/projects/${project.slug}`}
                            target="_blank"
                            className="p-2 rounded-lg text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            title="View on public site"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Link>

                          {/* Delete Project Button */}
                          <button
                            onClick={() =>
                              handleDelete(project.id, project.title)
                            }
                            className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                            title="Delete project"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* =========================================================================
          FULL EDIT PROJECT MODAL (5 Organized Tabs)
         ========================================================================= */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <Card className="w-full max-w-4xl p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto">
            {/* Modal Top Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
                    Edit Project Case Study
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    /projects/{editSlug}
                  </span>
                </div>
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  {editTitle || "Edit Project"}
                </h2>
              </div>

              <button
                onClick={handleCloseEdit}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Error & Success Banners */}
            {modalError && (
              <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-xs font-semibold flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <span>{modalError}</span>
              </div>
            )}

            {saveSuccess && (
              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                <Check className="h-4 w-4 shrink-0" />
                <span>
                  Project updated successfully! Syncing live changes...
                </span>
              </div>
            )}

            {/* Tab Navigation */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80">
              {[
                { id: "general", label: "1. General & Meta", icon: FileText },
                { id: "images", label: "2. Images & Gallery", icon: ImageIcon },
                { id: "overview", label: "3. Overview & Scope", icon: Globe },
                {
                  id: "challenge_solution",
                  label: "4. Challenge & Solution",
                  icon: Layers,
                },
                {
                  id: "features_seo",
                  label: "5. Features, Outcomes & SEO",
                  icon: Sparkles,
                },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as EditTab)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer",
                      activeTab === tab.id
                        ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white",
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <form onSubmit={handleSaveProject} className="space-y-6">
              {/* =============================================================
                  TAB 1: GENERAL & METADATA
                 ============================================================= */}
              {activeTab === "general" && (
                <div className="space-y-4 text-xs animate-in fade-in duration-150">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                        Project Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={editTitle}
                        onChange={(e) => {
                          setEditTitle(e.target.value);
                          setIsDirty(true);
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                        Project URL Slug <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-center">
                        <span className="px-3 py-2 rounded-l-xl bg-slate-100 dark:bg-slate-800 border border-r-0 border-slate-200 dark:border-slate-700 text-slate-400 text-xs font-mono">
                          /projects/
                        </span>
                        <input
                          type="text"
                          required
                          value={editSlug}
                          onChange={(e) => {
                            setEditSlug(e.target.value);
                            setIsDirty(true);
                          }}
                          className="w-full px-3 py-2 rounded-r-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-xs focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                        Category
                      </label>
                      <select
                        value={editCategory}
                        onChange={(e) => {
                          setEditCategory(e.target.value);
                          setEditServiceSlug(
                            e.target.value
                              .toLowerCase()
                              .replace(/[^a-z0-9]+/g, "-"),
                          );
                          setIsDirty(true);
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500"
                      >
                        {CATEGORIES.filter((c) => c !== "All").map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                        Client or Brand Name
                      </label>
                      <input
                        type="text"
                        value={editClient}
                        onChange={(e) => {
                          setEditClient(e.target.value);
                          setIsDirty(true);
                        }}
                        placeholder="e.g. Outdoor Essentials Co."
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                        Delivery Year
                      </label>
                      <input
                        type="text"
                        value={editYear}
                        onChange={(e) => {
                          setEditYear(e.target.value);
                          setIsDirty(true);
                        }}
                        placeholder="e.g. 2025"
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                        Live Website URL (Optional)
                      </label>
                      <input
                        type="url"
                        value={editLiveUrl}
                        onChange={(e) => {
                          setEditLiveUrl(e.target.value);
                          setIsDirty(true);
                        }}
                        placeholder="https://example.com"
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                        Display Order Index
                      </label>
                      <input
                        type="number"
                        min={1}
                        value={editSortOrder}
                        onChange={(e) => {
                          setEditSortOrder(Number(e.target.value));
                          setIsDirty(true);
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex items-center gap-6 pt-5">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={editPublished}
                          onChange={(e) => {
                            setEditPublished(e.target.checked);
                            setIsDirty(true);
                          }}
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                        />
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          Published to Public Site
                        </span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={editFeatured}
                          onChange={(e) => {
                            setEditFeatured(e.target.checked);
                            setIsDirty(true);
                          }}
                          className="rounded border-slate-300 text-purple-600 focus:ring-purple-500 h-4 w-4"
                        />
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          Featured on Homepage
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* =============================================================
                  TAB 2: IMAGES & GALLERY
                 ============================================================= */}
              {activeTab === "images" && (
                <div className="space-y-6 text-xs animate-in fade-in duration-150">
                  {/* Primary Thumbnail */}
                  <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-3">
                    <label className="font-bold block text-sm text-slate-900 dark:text-white">
                      Featured Cover / Thumbnail Image
                    </label>

                    <div className="flex flex-col sm:flex-row items-start gap-4">
                      <div className="relative h-28 w-44 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 shrink-0">
                        <Image
                          src={editImage || DEFAULT_IMAGE}
                          alt="Cover Preview"
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
                            Upload &amp; Replace Image
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setEditImage(DEFAULT_IMAGE);
                              setIsDirty(true);
                            }}
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
                            value={editImage}
                            onChange={(e) => {
                              setEditImage(e.target.value);
                              setIsDirty(true);
                            }}
                            placeholder="https://images.unsplash.com/..."
                            className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Multi-Image Project Gallery */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="font-bold text-sm text-slate-900 dark:text-white">
                        Project Image Gallery ({editGallery.length})
                      </label>
                      <span className="text-[11px] text-slate-400">
                        Screenshots &amp; Visual Showcase
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="url"
                        value={newGalleryUrl}
                        onChange={(e) => setNewGalleryUrl(e.target.value)}
                        placeholder="Add gallery image URL (https://...)"
                        className="flex-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono"
                      />
                      <Button
                        type="button"
                        size="sm"
                        onClick={handleAddGalleryImage}
                        className="text-xs rounded-xl"
                      >
                        <Plus className="h-3.5 w-3.5 mr-1" />
                        Add Image
                      </Button>
                    </div>

                    {editGallery.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                        {editGallery.map((imgUrl, idx) => (
                          <div
                            key={idx}
                            className="relative h-24 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 group"
                          >
                            <Image
                              src={imgUrl}
                              alt={`Gallery ${idx + 1}`}
                              fill
                              unoptimized
                              className="object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveGalleryImage(idx)}
                              className="absolute top-1 right-1 p-1 rounded-md bg-black/70 text-white hover:bg-red-600 transition-colors"
                              title="Remove image"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Viewport Showcase Notes */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                        Desktop Viewport Showcase Aspect
                      </label>
                      <textarea
                        rows={2}
                        value={editDesktopAspect}
                        onChange={(e) => {
                          setEditDesktopAspect(e.target.value);
                          setIsDirty(true);
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                      />
                    </div>

                    <div>
                      <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                        Mobile Viewport Showcase Aspect
                      </label>
                      <textarea
                        rows={2}
                        value={editMobileAspect}
                        onChange={(e) => {
                          setEditMobileAspect(e.target.value);
                          setIsDirty(true);
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* =============================================================
                  TAB 3: OVERVIEW & SCOPE
                 ============================================================= */}
              {activeTab === "overview" && (
                <div className="space-y-4 text-xs animate-in fade-in duration-150">
                  <div>
                    <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                      Short Summary / Description
                    </label>
                    <textarea
                      rows={2}
                      value={editSummary}
                      onChange={(e) => {
                        setEditSummary(e.target.value);
                        setIsDirty(true);
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                        Background &amp; Purpose
                      </label>
                      <textarea
                        rows={3}
                        value={editPurpose}
                        onChange={(e) => {
                          setEditPurpose(e.target.value);
                          setIsDirty(true);
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                      />
                    </div>

                    <div>
                      <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                        Client &amp; Business Requirements
                      </label>
                      <textarea
                        rows={3}
                        value={editRequirements}
                        onChange={(e) => {
                          setEditRequirements(e.target.value);
                          setIsDirty(true);
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                        Target Audience
                      </label>
                      <input
                        type="text"
                        value={editAudience}
                        onChange={(e) => {
                          setEditAudience(e.target.value);
                          setIsDirty(true);
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                      />
                    </div>
                  </div>

                  {/* Project Goals List */}
                  <div className="space-y-2 pt-2">
                    <label className="font-semibold block text-slate-700 dark:text-slate-300">
                      Key Project Goals ({editGoals.length})
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={newGoalInput}
                        onChange={(e) => setNewGoalInput(e.target.value)}
                        placeholder="Add a measurable project goal..."
                        className="flex-1 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                      />
                      <Button
                        type="button"
                        size="sm"
                        onClick={handleAddGoal}
                        className="text-xs rounded-lg"
                      >
                        <Plus className="h-3.5 w-3.5 mr-1" />
                        Add Goal
                      </Button>
                    </div>

                    <div className="space-y-1.5">
                      {editGoals.map((goal, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700"
                        >
                          <span className="text-slate-700 dark:text-slate-300 text-xs truncate">
                            {idx + 1}. {goal}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveGoal(idx)}
                            className="text-slate-400 hover:text-red-500"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies & Services tags */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                        Technologies &amp; Tools (comma-separated)
                      </label>
                      <input
                        type="text"
                        value={editTechnologies}
                        onChange={(e) => {
                          setEditTechnologies(e.target.value);
                          setIsDirty(true);
                        }}
                        placeholder="Shopify Liquid, Next.js, Tailwind CSS, TypeScript"
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                      />
                    </div>

                    <div>
                      <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                        Services Provided (comma-separated)
                      </label>
                      <input
                        type="text"
                        value={editServicesProvided}
                        onChange={(e) => {
                          setEditServicesProvided(e.target.value);
                          setIsDirty(true);
                        }}
                        placeholder="Custom Theme Development, Mobile Optimization"
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* =============================================================
                  TAB 4: CHALLENGE & SOLUTION
                 ============================================================= */}
              {activeTab === "challenge_solution" && (
                <div className="space-y-6 text-xs animate-in fade-in duration-150">
                  {/* Challenge */}
                  <div className="space-y-3 p-4 rounded-xl border border-rose-200/80 dark:border-rose-950/60 bg-rose-50/20 dark:bg-rose-950/10">
                    <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-sm">
                      <AlertTriangle className="h-4 w-4" />
                      <span>The Technical Challenge</span>
                    </div>

                    <div>
                      <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                        Challenge Overview Summary
                      </label>
                      <textarea
                        rows={2}
                        value={editChallengeSummary}
                        onChange={(e) => {
                          setEditChallengeSummary(e.target.value);
                          setIsDirty(true);
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="font-semibold block text-slate-700 dark:text-slate-300">
                        Friction Points &amp; Roadblocks (
                        {editChallengePoints.length})
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={newChallengePoint}
                          onChange={(e) => setNewChallengePoint(e.target.value)}
                          placeholder="Add a challenge point..."
                          className="flex-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs"
                        />
                        <Button
                          type="button"
                          size="sm"
                          onClick={handleAddChallengePoint}
                          className="text-xs rounded-lg"
                        >
                          <Plus className="h-3.5 w-3.5 mr-1" />
                          Add Point
                        </Button>
                      </div>

                      <div className="space-y-1.5">
                        {editChallengePoints.map((pt, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                          >
                            <span className="text-slate-700 dark:text-slate-300 text-xs truncate">
                              • {pt}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRemoveChallengePoint(idx)}
                              className="text-slate-400 hover:text-red-500"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Solution */}
                  <div className="space-y-3 p-4 rounded-xl border border-emerald-200/80 dark:border-emerald-950/60 bg-emerald-50/20 dark:bg-emerald-950/10">
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Our Engineered Solution</span>
                    </div>

                    <div>
                      <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                        Solution Overview Summary
                      </label>
                      <textarea
                        rows={2}
                        value={editSolutionSummary}
                        onChange={(e) => {
                          setEditSolutionSummary(e.target.value);
                          setIsDirty(true);
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="font-semibold block text-slate-700 dark:text-slate-300">
                        Solution Delivery Points ({editSolutionPoints.length})
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={newSolutionPoint}
                          onChange={(e) => setNewSolutionPoint(e.target.value)}
                          placeholder="Add an execution point..."
                          className="flex-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs"
                        />
                        <Button
                          type="button"
                          size="sm"
                          onClick={handleAddSolutionPoint}
                          className="text-xs rounded-lg"
                        >
                          <Plus className="h-3.5 w-3.5 mr-1" />
                          Add Point
                        </Button>
                      </div>

                      <div className="space-y-1.5">
                        {editSolutionPoints.map((pt, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                          >
                            <span className="text-slate-700 dark:text-slate-300 text-xs truncate">
                              ✓ {pt}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRemoveSolutionPoint(idx)}
                              className="text-slate-400 hover:text-red-500"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* =============================================================
                  TAB 5: FEATURES, OUTCOMES & SEO
                 ============================================================= */}
              {activeTab === "features_seo" && (
                <div className="space-y-6 text-xs animate-in fade-in duration-150">
                  {/* Features List */}
                  <div className="space-y-3">
                    <label className="font-bold text-sm text-slate-900 dark:text-white block">
                      Key Delivered Features ({editFeatures.length})
                    </label>

                    <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 space-y-2">
                      <input
                        type="text"
                        value={newFeatureTitle}
                        onChange={(e) => setNewFeatureTitle(e.target.value)}
                        placeholder="Feature Title (e.g. Multi-Attribute Collection Filtering)"
                        className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                      />
                      <textarea
                        rows={2}
                        value={newFeatureDesc}
                        onChange={(e) => setNewFeatureDesc(e.target.value)}
                        placeholder="Feature description explaining technical value..."
                        className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs"
                      />
                      <Button
                        type="button"
                        size="sm"
                        onClick={handleAddFeature}
                        className="text-xs rounded-lg"
                      >
                        <Plus className="h-3.5 w-3.5 mr-1" />
                        Add Feature Card
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {editFeatures.map((feat, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 relative group space-y-1"
                        >
                          <button
                            type="button"
                            onClick={() => handleRemoveFeature(idx)}
                            className="absolute top-2 right-2 text-slate-400 hover:text-red-500"
                            title="Remove feature"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                          <div className="font-bold text-slate-900 dark:text-white pr-5">
                            {feat.title}
                          </div>
                          <p className="text-slate-500 dark:text-slate-400 text-[11px] line-clamp-2">
                            {feat.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Outcome & Results */}
                  <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <label className="font-bold text-sm text-slate-900 dark:text-white block">
                      Project Outcome &amp; Results
                    </label>

                    <div>
                      <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                        Outcome Summary
                      </label>
                      <textarea
                        rows={2}
                        value={editOutcomeSummary}
                        onChange={(e) => {
                          setEditOutcomeSummary(e.target.value);
                          setIsDirty(true);
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={newOutcomeHighlight}
                          onChange={(e) =>
                            setNewOutcomeHighlight(e.target.value)
                          }
                          placeholder="Add verified outcome highlight..."
                          className="flex-1 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                        />
                        <Button
                          type="button"
                          size="sm"
                          onClick={handleAddOutcomeHighlight}
                          className="text-xs rounded-lg"
                        >
                          <Plus className="h-3.5 w-3.5 mr-1" />
                          Add Highlight
                        </Button>
                      </div>

                      <div className="space-y-1.5">
                        {editOutcomeHighlights.map((hl, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                          >
                            <span className="text-slate-700 dark:text-slate-300 text-xs truncate">
                              ★ {hl}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRemoveOutcomeHighlight(idx)}
                              className="text-slate-400 hover:text-red-500"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* SEO Metadata */}
                  <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <label className="font-bold text-sm text-slate-900 dark:text-white block">
                      Search Engine Optimization (SEO)
                    </label>

                    <div className="grid grid-cols-1 gap-3">
                      <div>
                        <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                          Meta Title Tag
                        </label>
                        <input
                          type="text"
                          value={editMetaTitle}
                          onChange={(e) => {
                            setEditMetaTitle(e.target.value);
                            setIsDirty(true);
                          }}
                          className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                        />
                      </div>

                      <div>
                        <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                          Meta Description Tag
                        </label>
                        <textarea
                          rows={2}
                          value={editMetaDescription}
                          onChange={(e) => {
                            setEditMetaDescription(e.target.value);
                            setIsDirty(true);
                          }}
                          className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Actions Bar */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleCloseEdit}
                  className="rounded-xl"
                >
                  Cancel
                </Button>

                <div className="flex items-center gap-2">
                  <Link href={`/projects/${editOriginalSlug}`} target="_blank">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-xs text-slate-500 hover:text-blue-600"
                    >
                      <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                      View Live Page
                    </Button>
                  </Link>

                  <Button
                    type="submit"
                    disabled={isSaving}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-xs"
                  >
                    <Save className="h-4 w-4 mr-1.5" />
                    {isSaving ? "Saving Changes..." : "Save Project"}
                  </Button>
                </div>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* =========================================================================
          ADD PROJECT MODAL
         ========================================================================= */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <Card className="w-full max-w-lg p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-blue-600" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Add New Portfolio Project
                </h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                  Project Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Brandify Minimal Store"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                  Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                >
                  {CATEGORIES.filter((c) => c !== "All").map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                  Client Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Brandify Inc."
                  value={newClient}
                  onChange={(e) => setNewClient(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-xs font-mono text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                  Brief Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Short description of the deliverable and results..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-xs"
                >
                  Create Project
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
