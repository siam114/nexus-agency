import { FAQItem, NavItem, Project, Service, TeamMember, Testimonial } from "@/types";

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const servicesData: Service[] = [
  {
    id: "1",
    title: "Web & Mobile Development",
    description: "Building responsive, high-performance web apps and cross-platform mobile apps with modern tech stacks.",
    iconName: "Code2",
    features: ["Next.js & React 19", "TypeScript Architecture", "Tailwind CSS & Animations", "REST & GraphQL APIs"],
    deliverables: ["Full-stack web application", "Mobile responsive interfaces", "Performance & SEO optimization", "Automated deployment pipeline"],
  },
  {
    id: "2",
    title: "UI/UX & Product Design",
    description: "Crafting intuitive digital experiences, design systems, and wireframes that captivate users and boost conversion.",
    iconName: "Palette",
    features: ["Design Systems & Tokens", "Figma Interactive Prototypes", "User Research & Testing", "Brand Identity & Guidelines"],
    deliverables: ["Complete UI kits", "UX wireframes and user journeys", "Micro-interaction specs", "Asset export libraries"],
  },
  {
    id: "3",
    title: "Full-Stack & Cloud Architecture",
    description: "Architecting resilient, scalable backend infrastructures and secure cloud services built for rapid growth.",
    iconName: "Layers",
    features: ["Microservices & Serverless", "PostgreSQL, Redis & MongoDB", "Docker & Kubernetes CI/CD", "Authentication & Security Audits"],
    deliverables: ["Scalable database schema", "Documented REST/gRPC endpoints", "Cloud deployment configs", "Security & load testing reports"],
  },
  {
    id: "4",
    title: "AI Integration & Automation",
    description: "Empowering your business with custom LLM integrations, automated agents, and intelligent data pipelines.",
    iconName: "Cpu",
    features: ["OpenAI & Anthropic APIs", "Custom RAG Pipelines", "Workflow Automations", "Intelligent Analytics"],
    deliverables: ["AI agent workflows", "Vector database setup", "Prompt engineering framework", "Cost-optimization strategy"],
  },
];

export const projectsData: Project[] = [
  {
    id: "1",
    title: "FinTech Analytics Dashboard",
    category: "Web Application",
    description: "A real-time financial tracking platform with dynamic charts and predictive cash flow insights.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Recharts"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    client: "Apex Financial Group",
    year: "2025",
    featured: true,
  },
  {
    id: "2",
    title: "Luxe eCommerce Storefront",
    category: "E-Commerce",
    description: "High-conversion luxury lifestyle storefront with sub-second page transitions and headless CMS.",
    tags: ["React", "Tailwind CSS", "Stripe", "Next.js"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    client: "Aura Lifestyle",
    year: "2025",
    featured: true,
  },
  {
    id: "3",
    title: "AI Creative Studio Platform",
    category: "SaaS Platform",
    description: "Collaborative generative AI suite for digital artists, creative directors, and marketing agencies.",
    tags: ["Next.js", "Node.js", "TypeScript", "WebSockets"],
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    client: "Synthetix Labs",
    year: "2026",
    featured: true,
  },
  {
    id: "4",
    title: "HealthPulse Telehealth App",
    category: "Mobile & Web",
    description: "HIPAA-compliant patient portal featuring secure video consultations and automated prescription refills.",
    tags: ["React Native", "TypeScript", "Tailwind CSS", "WebRTC"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    client: "HealthPulse Health",
    year: "2025",
    featured: false,
  },
  {
    id: "5",
    title: "Venture Capital Deal Room",
    category: "Web Application",
    description: "Secure investor portal for pitch deck reviews, cap table simulations, and confidential deal tracking.",
    tags: ["Next.js", "PostgreSQL", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    client: "Horizon Ventures",
    year: "2026",
    featured: false,
  },
  {
    id: "6",
    title: "Nova Global Brand Identity",
    category: "Design System",
    description: "Complete design system redesign including 200+ reusable UI components, tokens, and typography guidelines.",
    tags: ["Figma", "Design Systems", "UI/UX"],
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=800&q=80",
    client: "Nova Technologies",
    year: "2025",
    featured: false,
  },
];

export const teamData: TeamMember[] = [
  {
    id: "1",
    name: "Alexander Reed",
    role: "Founder & Creative Director",
    bio: "Ex-lead designer with 10+ years shaping digital identities for Silicon Valley startups and enterprise brands.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "2",
    name: "Elena Rostova",
    role: "VP of Engineering",
    bio: "Full-stack architect specialized in high-throughput distributed systems, Next.js, and cloud scale.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "3",
    name: "Marcus Vance",
    role: "Head of Product Strategy",
    bio: "Data-driven strategist passionate about user conversion, intuitive UX flows, and product validation.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  },
];

export const testimonialsData: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Jenkins",
    role: "Chief Product Officer",
    company: "Apex Financial",
    content: "NexusAgency transformed our legacy software into a breathtaking, lightning-fast web application. User engagement jumped 40% within the first month.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "2",
    name: "David Kim",
    role: "Founder & CEO",
    company: "Synthetix Labs",
    content: "Their mastery of React, Next.js, and UI architecture is second to none. They delivered our entire MVP weeks ahead of schedule.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  },
];

export const faqsData: FAQItem[] = [
  {
    question: "What is your typical project timeline?",
    answer: "Most core MVPs and web applications take between 4 to 8 weeks depending on scope, integrations, and design complexity.",
  },
  {
    question: "What tech stack do you recommend?",
    answer: "We specialize in modern, high-performance technologies: Next.js (App Router), TypeScript, Tailwind CSS, Node.js / Express, and PostgreSQL/MongoDB.",
  },
  {
    question: "Do you offer post-launch support and maintenance?",
    answer: "Yes, we provide flexible monthly retainers for ongoing feature additions, performance monitoring, infrastructure management, and security updates.",
  },
  {
    question: "How do we get started?",
    answer: "Reach out through our Contact page or schedule an introductory discovery call. We'll outline your project requirements, scope, and deliver a detailed proposal.",
  },
];
