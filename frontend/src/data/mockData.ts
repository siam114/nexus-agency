import {
  FAQItem,
  NavItem,
  ProcessStep,
  Project,
  Service,
  TeamMember,
  Testimonial,
  WhyChooseUsItem,
} from "@/types";

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
];

export const capabilitiesData = [
  {
    title: "Shopify & Web Development",
    subtitle: "Custom themes & responsive sites.",
    iconName: "RefreshCw",
  },
  {
    title: "Figma to Code & WordPress",
    subtitle: "Pixel-conscious implementation.",
    iconName: "Wrench",
  },
  {
    title: "SEO & Ads Management",
    subtitle: "Search visibility & targeted campaigns.",
    iconName: "TrendingUp",
  },
];

export const trustedLogos = [
  { name: "Brandify", icon: "Sparkles" },
  { name: "NovaTech", icon: "Cpu" },
  { name: "Orbit", icon: "Globe" },
  { name: "Leafly", icon: "Leaf" },
  { name: "PixelCo", icon: "Layers" },
];

export const servicesData: Service[] = [
  {
    id: "shopify-development",
    title: "Shopify Development",
    description:
      "Custom Shopify storefronts, theme customization, and Liquid development built for intuitive shopping and smooth checkout.",
    iconName: "ShoppingCart",
    features: [
      "Custom theme & Liquid development",
      "Responsive desktop, tablet & mobile stores",
      "Product pages, collections & checkout setup",
      "Functionality improvements & store optimization",
    ],
    deliverables: [
      "Fully customized Shopify theme",
      "Mobile-responsive product & cart layouts",
      "Payment gateway & app integrations",
      "Post-launch store administration guidance",
    ],
    link: "/services#shopify-development",
  },
  {
    id: "figma-to-website",
    title: "Figma to Website Conversion",
    description:
      "Transforming your Figma design files into clean, pixel-conscious, and responsive codebases with modern web technologies.",
    iconName: "Layout",
    features: [
      "Accurate implementation of design layouts",
      "Responsive desktop, tablet & mobile experiences",
      "Pixel-conscious styling & layout refinement",
      "Interactive components & frontend execution",
    ],
    deliverables: [
      "Clean, modern HTML/CSS & React/Next.js code",
      "Mobile-friendly adaptive layouts",
      "Interactive animations & UI component states",
      "Cross-browser tested frontend build",
    ],
    link: "/services#figma-to-website",
  },
  {
    id: "wordpress-development",
    title: "WordPress Development",
    description:
      "Reliable WordPress websites for business, professional services, and content creators with easy-to-manage dashboards.",
    iconName: "Globe",
    features: [
      "WordPress website design & development",
      "Business & service company websites",
      "Custom responsive page templates",
      "Theme customization & maintenance",
    ],
    deliverables: [
      "Customized WordPress theme & templates",
      "Intuitive block/content editor setup",
      "Security hardening & speed configuration",
      "Maintenance & backup setup",
    ],
    link: "/services#wordpress-development",
  },
  {
    id: "seo-services",
    title: "SEO Services",
    description:
      "Practical on-page and technical search engine optimization to improve website structure, crawlability, and indexing.",
    iconName: "Search",
    features: [
      "On-page content & metadata optimization",
      "Technical SEO improvements & site audits",
      "Website structure & clean internal linking",
      "Image optimization & performance enhancements",
    ],
    deliverables: [
      "Detailed SEO audit & action report",
      "Title tag, meta description & schema setup",
      "Crawl error identification & recommendations",
      "Site speed & mobile usability enhancements",
    ],
    link: "/services#seo-services",
  },
  {
    id: "ads-management",
    title: "Ads Management",
    description:
      "Structured paid advertising campaign setup, audience targeting, and ongoing optimization across Google Ads and Meta Ads.",
    iconName: "Megaphone",
    features: [
      "Paid advertising campaign setup",
      "Campaign management & budget optimization",
      "Audience & targeting configuration",
      "Conversion tracking & performance reporting",
    ],
    deliverables: [
      "Search & Social campaign architecture",
      "Pixel, tag & conversion event configuration",
      "Target audience & keyword research maps",
      "Scheduled transparent reporting",
    ],
    link: "/services#ads-management",
  },
];

export const projectsData: Project[] = [
  {
    id: "1",
    title: "Outdoor Essentials Store",
    category: "Shopify Development",
    tags: ["Shopify Development", "Liquid Customization", "E-commerce"],
    description:
      "A modern, responsive Shopify storefront for an outdoor lifestyle brand with custom collection filtering and mobile-first product pages.",
    image:
      "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=800&q=80",
    client: "Outdoor Essentials Co.",
    year: "2025",
    featured: true,
    metrics: [
      { label: "Mobile Usability", value: "100%" },
      { label: "Performance Score", value: "95+" },
    ],
  },
  {
    id: "2",
    title: "Apex Cloud SaaS Interface",
    category: "Figma to Website Conversion",
    tags: ["Figma to Website Conversion", "Next.js", "Tailwind CSS"],
    description:
      "Pixel-conscious translation of a multi-screen Figma design system into a responsive, accessible, and fast web application interface.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    client: "Apex Systems",
    year: "2025",
    featured: true,
    metrics: [
      { label: "Design Fidelity", value: "Pixel-Accurate" },
      { label: "Responsive", value: "Desktop & Mobile" },
    ],
  },
  {
    id: "3",
    title: "Veritas Advisory Corporate Site",
    category: "WordPress Development",
    tags: ["WordPress Development", "Custom Theme", "Business Site"],
    description:
      "A clean, professional WordPress website for an advisory firm featuring custom service templates and an easy-to-use editorial workflow.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    client: "Veritas Partners",
    year: "2025",
    featured: true,
    metrics: [
      { label: "CMS Flexibility", value: "Full Admin Control" },
      { label: "Load Time", value: "Under 1.2s" },
    ],
  },
  {
    id: "4",
    title: "EcoLiving Home Technical Audit",
    category: "SEO",
    tags: ["SEO", "Technical SEO", "Metadata Architecture"],
    description:
      "On-page metadata alignment, structured schema markup, and technical site architecture improvements to enhance crawl efficiency.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    client: "EcoLiving Products",
    year: "2025",
    featured: false,
    metrics: [
      { label: "Technical Health", value: "Audited & Fixed" },
      { label: "Indexing Status", value: "Optimized" },
    ],
  },
  {
    id: "5",
    title: "Nordic Living Multi-Channel Ads",
    category: "Ads Management",
    tags: ["Ads Management", "Google Ads", "Meta Ads"],
    description:
      "Configured audience targeting, ad groups, and accurate conversion tracking across Google Search and Meta platforms for a home décor brand.",
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
    client: "Nordic Living",
    year: "2025",
    featured: false,
    metrics: [
      { label: "Tracking Setup", value: "Verified Events" },
      { label: "Campaign Focus", value: "Targeted Audience" },
    ],
  },
  {
    id: "6",
    title: "Lumière Beauty Storefront",
    category: "Shopify Development",
    tags: ["Shopify Development", "Theme Customization", "Mobile Responsive"],
    description:
      "Theme customization with custom product option selectors, lifestyle collection showcases, and streamlined mobile checkout navigation.",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
    client: "Lumière Labs",
    year: "2025",
    featured: false,
    metrics: [
      { label: "Store Experience", value: "Mobile First" },
      { label: "Cart Experience", value: "Streamlined" },
    ],
  },
];

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Discover",
    description:
      "Understand your business, target audience, specific goals, project requirements, and current online presence.",
    iconName: "Search",
  },
  {
    step: "02",
    title: "Plan",
    description:
      "Define project scope, recommend the appropriate service, establish deliverables, timelines, and implementation strategy.",
    iconName: "FileText",
  },
  {
    step: "03",
    title: "Build & Optimize",
    description:
      "Develop your website, convert designs into code, optimize technical SEO, or set up advertising campaigns per agreed scope.",
    iconName: "Wrench",
  },
  {
    step: "04",
    title: "Launch & Improve",
    description:
      "Test thoroughly across devices, launch with approval, monitor performance data, and provide agreed support or ongoing optimization.",
    iconName: "Rocket",
  },
];

export const teamData: TeamMember[] = [
  {
    id: "1",
    name: "Siam Ahmed",
    role: "Founder & Lead Developer",
    bio: "Specializes in Shopify theme engineering, responsive web development, and frontend architecture.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      website: "https://example.com",
    },
  },
  {
    id: "2",
    name: "Sarah Khan",
    role: "UI/UX & Figma Specialist",
    bio: "Focuses on design system consistency, accessible layouts, and seamless Figma-to-code collaboration.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      website: "https://example.com",
    },
  },
  {
    id: "3",
    name: "David Miller",
    role: "WordPress & Frontend Developer",
    bio: "Crafts clean, maintainable WordPress themes and responsive web layouts tailored to client requirements.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      website: "https://example.com",
    },
  },
  {
    id: "4",
    name: "Nadia Rahman",
    role: "Technical SEO Specialist",
    bio: "Conducts technical site audits, structured metadata implementation, and search-friendly site architecture reviews.",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      website: "https://example.com",
    },
  },
  {
    id: "5",
    name: "James Carter",
    role: "Ads Campaign Specialist",
    bio: "Manages audience targeting, campaign setups, and conversion tracking across Google and Meta ad platforms.",
    image:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      website: "https://example.com",
    },
  },
];

export const testimonialsData: Testimonial[] = [
  {
    id: "1",
    name: "Emily Carter",
    role: "Founder",
    company: "Outdoor Essentials",
    content:
      "NexusAgency delivered a clean, fast Shopify storefront that represents our brand perfectly. Their communication and attention to mobile responsiveness made the entire project seamless.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "2",
    name: "Michael Tan",
    role: "Product Lead",
    company: "Apex Systems",
    content:
      "Converting our complex Figma design system into responsive code was handled with remarkable accuracy. Every component looks and behaves exactly as specified in our mockups.",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "3",
    name: "Priya Sharma",
    role: "Marketing Director",
    company: "Veritas Advisory",
    content:
      "The WordPress website they developed gives our team full editorial flexibility without compromising performance. Their technical advice and support were top notch throughout.",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
  },
];

export const whyChooseUsData: WhyChooseUsItem[] = [
  {
    id: "1",
    title: "Business-Focused Solutions",
    description:
      "Recommendations based on your goals and specific operational requirements.",
    iconName: "Target",
  },
  {
    id: "2",
    title: "Responsive Website Experiences",
    description:
      "Websites designed and tested to work seamlessly across desktop, tablet, and mobile.",
    iconName: "Smartphone",
  },
  {
    id: "3",
    title: "Clear Communication",
    description:
      "Transparent project updates, defined expectations, and responsive collaboration.",
    iconName: "MessageSquare",
  },
  {
    id: "4",
    title: "Practical Optimization",
    description:
      "Tangible improvements guided by your project scope and verified technical data.",
    iconName: "Gauge",
  },
  {
    id: "5",
    title: "Ongoing Support",
    description:
      "Dependable maintenance and technical support according to your agreed service package.",
    iconName: "ShieldCheck",
  },
];

export const faqsData: FAQItem[] = [
  {
    question: "What core services does NexusAgency provide?",
    answer:
      "We specialize exclusively in five core digital services: Shopify Development, Figma to Website Conversion, WordPress Development, SEO Services, and Ads Management.",
  },
  {
    question: "How do you handle Figma to website conversions?",
    answer:
      "We convert your design files into pixel-conscious, responsive, and semantic web layouts using modern frontend technologies (such as React, Next.js, and clean CSS/Tailwind), ensuring smooth performance across all device viewports.",
  },
  {
    question: "Do you guarantee first-page Google search rankings?",
    answer:
      "No. In line with ethical search engine standards and Google guidelines, no agency can guarantee specific keyword positions or first-page rankings. We focus on proven, data-informed optimizations: technical audits, metadata alignment, site speed, and search-friendly site architecture.",
  },
  {
    question: "What ad platforms do you support for Ads Management?",
    answer:
      "We set up and manage targeted campaigns primarily on Google Ads (Search, Performance Max, Display) and Meta Ads (Facebook & Instagram), complete with conversion tracking and event configuration.",
  },
  {
    question: "Do you offer post-launch support and maintenance?",
    answer:
      "Yes. We offer agreed support and maintenance packages for Shopify stores, WordPress websites, and custom web builds to ensure ongoing security, template updates, and troubleshooting.",
  },
];
