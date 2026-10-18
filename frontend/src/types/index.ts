export interface ProjectMetric {
  label: string;
  value: string;
  icon?: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  tags: string[];
  description: string;
  image: string;
  client?: string;
  year?: string;
  link?: string;
  featured?: boolean;
  metrics?: ProjectMetric[];
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
  role: string;
  company: string;
  content: string;
  avatar: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  image: string;
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
