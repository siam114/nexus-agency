export interface ProjectMetric {
  label: string;
  value: string;
  icon?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  tags: string[];
  description: string;
  image: string;
  client?: string;
  year?: string;
  link?: string;
  liveUrl?: string;
  featured?: boolean;
  published?: boolean;
  sortOrder?: number;
  metrics?: ProjectMetric[];
}

export interface ProjectDetailFeature {
  title: string;
  description: string;
  iconName?: string;
}

export interface ProjectDetail {
  id: string;
  slug: string;
  title: string;
  category: string;
  serviceSlug: string;
  client: string;
  year: string;
  tags: string[];
  image: string;
  gallery?: string[];
  liveUrl?: string;
  summary: string;
  metaTitle: string;
  metaDescription: string;
  metrics: ProjectMetric[];
  overview: {
    purpose: string;
    requirements: string;
    audience: string;
    goals: string[];
  };
  challenge: {
    summary: string;
    points: string[];
  };
  solution: {
    summary: string;
    points: string[];
  };
  features: ProjectDetailFeature[];
  showcase: {
    title: string;
    description: string;
    desktopAspect: string;
    mobileAspect: string;
  };
  technologies: string[];
  servicesProvided: string[];
  outcome: {
    summary: string;
    highlights: string[];
  };
  featured?: boolean;
  published?: boolean;
  sortOrder?: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  features: string[];
  deliverables?: string[];
  link?: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  iconName: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  company?: string;
  content: string;
  avatar?: string;
  rating?: number;
  published?: boolean;
  featured?: boolean;
  sortOrder?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  image: string;
  skills?: string[];
  published?: boolean;
  featured?: boolean;
  sortOrder?: number;
  createdAt?: string;
  socials?: {
    github?: string;
    linkedin?: string;
    dribbble?: string;
    website?: string;
    facebook?: string;
    whatsapp?: string;
  };
}

export interface WhyChooseUsItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface NavItem {
  label: string;
  href: string;
}
