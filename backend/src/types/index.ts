export interface IProjectMetric {
  label: string;
  value: string;
}

export interface IProjectFeature {
  title: string;
  description: string;
}

export interface IProjectShowcase {
  title: string;
  description: string;
  desktopAspect: string;
  mobileAspect: string;
}

export interface IProjectOverview {
  purpose: string;
  requirements: string;
  audience: string;
  goals: string[];
}

export interface IProjectChallenge {
  summary: string;
  points: string[];
}

export interface IProjectSolution {
  summary: string;
  points: string[];
}

export interface IProjectOutcome {
  summary: string;
  highlights: string[];
}

export interface IProjectSEO {
  metaTitle: string;
  metaDescription: string;
}

export interface IProject {
  id?: string;
  slug: string;
  title: string;
  category: string;
  tags: string[];
  description: string;
  image: string;
  client?: string;
  year?: string;
  liveUrl?: string;
  featured: boolean;
  published: boolean;
  sortOrder: number;
  metrics: IProjectMetric[];
  overview: IProjectOverview;
  challenge: IProjectChallenge;
  solution: IProjectSolution;
  features: IProjectFeature[];
  showcase: IProjectShowcase;
  technologies: string[];
  servicesProvided: string[];
  outcome: IProjectOutcome;
  seo?: IProjectSEO;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IServiceOffering {
  title: string;
  description: string;
  iconName: string;
}

export interface IServiceBenefit {
  title: string;
  description: string;
}

export interface IServiceUseCase {
  title: string;
  scenario: string;
}

export interface IServiceProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface IServiceFAQ {
  question: string;
  answer: string;
}

export interface IServiceDetails {
  eyebrow: string;
  heroHeading: string;
  heroDescription: string;
  metaTitle: string;
  metaDescription: string;
  visualBadge: {
    label: string;
    value: string;
    tag: string;
  };
  overview: {
    whatItIs: string;
    problemsSolved: string[];
    whoItIsFor: string;
    whatWeDeliver: string;
    businessImpact: string;
  };
  offerings: IServiceOffering[];
  benefits: IServiceBenefit[];
  useCases: IServiceUseCase[];
  process: IServiceProcessStep[];
  faqs: IServiceFAQ[];
  ctaHeading: string;
  ctaDescription: string;
}

export interface IService {
  id?: string;
  slug: string;
  title: string;
  description: string;
  iconName: string;
  features: string[];
  deliverables?: string[];
  published: boolean;
  sortOrder: number;
  details?: IServiceDetails;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITeamMemberSocials {
  github?: string;
  linkedin?: string;
  website?: string;
  facebook?: string;
  whatsapp?: string;
}

export interface ITeamMember {
  id?: string;
  name: string;
  role: string;
  bio?: string;
  image: string;
  skills: string[];
  socials?: ITeamMemberSocials;
  published: boolean;
  sortOrder: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITestimonial {
  id?: string;
  name: string;
  role?: string;
  company?: string;
  content: string;
  avatar?: string;
  published: boolean;
  sortOrder: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type InquiryStatus = "new" | "in_progress" | "resolved" | "archived";

export interface IContactInquiry {
  id?: string;
  name: string;
  email: string;
  company?: string;
  service?: string;
  message: string;
  status: InquiryStatus;
  ipAddress?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISetting {
  key: string;
  data: Record<string, unknown>;
  updatedAt?: Date;
}

export interface IUser {
  id?: string;
  email: string;
  passwordHash: string;
  name: string;
  role: "admin" | "superadmin";
  lastLogin?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAuthTokenPayload {
  userId: string;
  email: string;
  role: string;
}

