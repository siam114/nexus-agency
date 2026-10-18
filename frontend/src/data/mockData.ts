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
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/#portfolio" },
  { label: "About", href: "/#about" },
  { label: "Team", href: "/#team" },
  { label: "Contact", href: "/contact" },
];

export const capabilitiesData = [
  {
    title: "Shopify & Web Development",
    subtitle: "Modern, scalable and fast.",
    iconName: "RefreshCw",
  },
  {
    title: "Strategy to Launch",
    subtitle: "From idea to live.",
    iconName: "Wrench",
  },
  {
    title: "Built for Growth",
    subtitle: "Focused on your long-term success.",
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
    id: "1",
    title: "Shopify Store Design & Development",
    description: "High-converting Shopify stores with custom design and functionality.",
    iconName: "ShoppingCart",
    features: [
      "Custom theme development",
      "Liquid customization",
      "Mobile responsive",
    ],
    link: "/services",
  },
  {
    id: "2",
    title: "Custom Web Applications",
    description: "Scalable web apps tailored to your business needs.",
    iconName: "Code2",
    features: [
      "React / Next.js / Node.js",
      "API integration",
      "Database & backend",
    ],
    link: "/services",
  },
  {
    id: "3",
    title: "UI/UX & Product Design",
    description: "User-focused design that turns visitors into customers.",
    iconName: "Palette",
    features: [
      "Wireframes & prototypes",
      "Modern UI design",
      "Conversion optimization",
    ],
    link: "/services",
  },
  {
    id: "4",
    title: "AI & Automation",
    description: "Smarter workflows and tools to save time and increase efficiency.",
    iconName: "Bot",
    features: [
      "Chatbots & AI tools",
      "Workflow automation",
      "Integration & setup",
    ],
    link: "/services",
  },
];

export const projectsData: Project[] = [
  {
    id: "1",
    title: "Outdoor Essentials",
    category: "Shopify",
    tags: ["Shopify", "Ecommerce"],
    description: "A clean, modern Shopify store for an outdoor lifestyle brand with custom design and integrations.",
    image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=800&q=80",
    client: "Outdoor Essentials Co.",
    year: "2025",
    featured: true,
    metrics: [
      { label: "Conversion rate", value: "+48%" },
      { label: "Revenue growth", value: "2.8x" },
    ],
  },
  {
    id: "2",
    title: "Lumière Beauty",
    category: "Shopify",
    tags: ["Shopify", "Beauty"],
    description: "A high-converting Shopify store with elegant design, custom features and mobile optimization.",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
    client: "Lumière Beauty Labs",
    year: "2025",
    featured: true,
    metrics: [
      { label: "Conversion rate", value: "+38%" },
      { label: "Average order value", value: "1.9x" },
    ],
  },
  {
    id: "3",
    title: "FocusFlow",
    category: "Custom",
    tags: ["Custom", "Web App"],
    description: "A custom web application for task management with real-time collaboration and analytics.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    client: "FocusFlow HQ",
    year: "2026",
    featured: true,
    metrics: [
      { label: "User engagement", value: "+60%" },
      { label: "Faster workflow", value: "3x" },
    ],
  },
];

export const processSteps: ProcessStep[] = [
  {
    step: "1",
    title: "Discover",
    description: "We learn about your goals, understand your audience and analyze your needs.",
    iconName: "Search",
  },
  {
    step: "2",
    title: "Plan",
    description: "We create a clear roadmap, set timelines and define the right solution.",
    iconName: "FileText",
  },
  {
    step: "3",
    title: "Design",
    description: "We design beautiful, user-friendly experiences that match your brand and goals.",
    iconName: "Palette",
  },
  {
    step: "4",
    title: "Build & Support",
    description: "We develop, test and launch — then provide ongoing support as you grow.",
    iconName: "Rocket",
  },
];

export const teamData: TeamMember[] = [
  {
    id: "1",
    name: "Siam Ahmed",
    role: "Founder & Lead Developer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      website: "https://example.com",
    },
  },
  {
    id: "2",
    name: "Sarah Khan",
    role: "UI/UX Designer",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      website: "https://example.com",
    },
  },
  {
    id: "3",
    name: "David Miller",
    role: "Frontend Developer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      website: "https://example.com",
    },
  },
  {
    id: "4",
    name: "Nadia Rahman",
    role: "Backend Developer",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      website: "https://example.com",
    },
  },
  {
    id: "5",
    name: "James Carter",
    role: "Project Manager",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
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
    company: "PureLife",
    content: "NexusAgency delivered a beautiful Shopify store for our brand. The team was professional, responsive and easy to work with.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "2",
    name: "Michael Tan",
    role: "Product Owner",
    company: "FocusFlow",
    content: "They understood our requirements perfectly and delivered the project on time. Great communication throughout the process.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "3",
    name: "Priya Sharma",
    role: "COO",
    company: "Lumière Beauty",
    content: "Highly skilled team with a clear process. Our web application works flawlessly and has already helped us grow our user base.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
  },
];

export const whyChooseUsData: WhyChooseUsItem[] = [
  {
    id: "1",
    title: "Clear Communication",
    description: "Regular updates, no confusion.",
    iconName: "MessageSquare",
  },
  {
    id: "2",
    title: "Defined Scope",
    description: "Transparent process & timeline.",
    iconName: "ClipboardCheck",
  },
  {
    id: "3",
    title: "Responsive Support",
    description: "We're here when you need us.",
    iconName: "Headphones",
  },
  {
    id: "4",
    title: "Performance Focused",
    description: "Fast, secure and scalable.",
    iconName: "Gauge",
  },
  {
    id: "5",
    title: "Smooth Handover",
    description: "Full documentation & guidance.",
    iconName: "ShieldCheck",
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
