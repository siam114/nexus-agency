import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projectDetailsData } from "@/data/projectDetailsData";
import { projectsData } from "@/data/mockData";
import { ProjectDetailClientView } from "@/components/sections/ProjectDetailClientView";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return Object.keys(projectDetailsData).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectDetailsData[slug];

  if (!project) {
    return {
      title: "Project Not Found | NexusAgency",
      description: "The requested project case study could not be found.",
    };
  }

  return {
    title: project.metaTitle,
    description: project.metaDescription,
    openGraph: {
      title: project.metaTitle,
      description: project.metaDescription,
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projectDetailsData[slug];

  if (!project) {
    notFound();
  }

  // Related projects candidates
  const relatedProjects = projectsData.filter((p) => p.slug !== project.slug);

  return (
    <ProjectDetailClientView
      initialProject={project}
      slug={slug}
      fallbackRelated={relatedProjects}
    />
  );
}
