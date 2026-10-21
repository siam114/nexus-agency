import { ProjectDetail } from "@/types";

export const projectDetailsData: Record<string, ProjectDetail> = {
  "outdoor-essentials-store": {
    id: "1",
    slug: "outdoor-essentials-store",
    title: "Outdoor Essentials Store",
    category: "Shopify Development",
    serviceSlug: "shopify-development",
    client: "Outdoor Essentials Co.",
    year: "2025",
    tags: ["Shopify Development", "Liquid Customization", "E-commerce"],
    image:
      "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=800&q=80",
    summary:
      "A modern, responsive Shopify storefront for an outdoor lifestyle brand featuring custom Liquid templates, collection filtering, and streamlined mobile checkout.",
    metaTitle: "Outdoor Essentials Store | Shopify Development Case Study | NexusAgency",
    metaDescription:
      "Explore how NexusAgency designed and developed a high-performing Shopify storefront for Outdoor Essentials Co. with custom Liquid code, collection filters, and 100% mobile usability.",
    metrics: [
      { label: "Mobile Usability", value: "100%" },
      { label: "Performance Score", value: "95+" },
      { label: "Platform", value: "Shopify Liquid" },
      { label: "Year Delivered", value: "2025" },
    ],
    overview: {
      purpose:
        "Outdoor Essentials Co. needed an upgraded, modern Shopify storefront capable of presenting technical outdoor gear with clear product specifications and frictionless mobile browsing.",
      requirements:
        "The project required custom Liquid theme development, multi-attribute collection filtering, fast product card loading, and an intuitive checkout sequence.",
      audience:
        "Outdoor sports enthusiasts, hikers, campers, and active lifestyle shoppers seeking reliable gear on desktop and mobile devices.",
      goals: [
        "Develop a responsive Shopify theme optimized for fast mobile load times.",
        "Implement customized Liquid collection templates with granular attribute filters.",
        "Ensure seamless product variant selection and cart drawer interactions.",
        "Provide a clean, maintainable Shopify theme architecture for ongoing catalog updates.",
      ],
    },
    challenge: {
      summary:
        "The previous store structure struggled with slow mobile browsing speeds, cluttered product filter options, and inconsistent responsive layouts across tablet and smartphone viewports.",
      points: [
        "Heavy legacy theme code resulting in high page weight and sluggish mobile navigation.",
        "Standard Shopify collection templates lacking customized filtering for technical product specifications.",
        "Inconsistent typography and spacing across collection, product, and cart pages.",
      ],
    },
    solution: {
      summary:
        "We built a bespoke Shopify theme utilizing clean Liquid architecture, optimized CSS, and native Shopify features to deliver a lightweight, high-performance customer experience.",
      points: [
        "Engineered custom Liquid section templates and reusable snippets for modular layout control.",
        "Implemented smooth, responsive collection filtering without layout shifts or intrusive popups.",
        "Refined product page layouts with clear variant pickers, accordion details, and mobile-first tap targets.",
        "Tested across mobile, tablet, and desktop devices to ensure 100% responsive consistency.",
      ],
    },
    features: [
      {
        title: "Custom Shopify Liquid Theme",
        description:
          "Handcrafted Liquid templates and reusable theme sections tailored to Outdoor Essentials' brand aesthetics and catalog taxonomy.",
      },
      {
        title: "Multi-Attribute Collection Filtering",
        description:
          "Fast, intuitive filtering allowing customers to narrow gear by size, material, weather rating, and availability.",
      },
      {
        title: "Mobile-First Product Pages",
        description:
          "High-impact product imagery carousels, responsive specification tables, and streamlined sticky add-to-cart actions.",
      },
      {
        title: "Optimized Slide-Out Cart",
        description:
          "Frictionless slide-out cart drawer with dynamic subtotal calculations and clear checkout navigation.",
      },
    ],
    showcase: {
      title: "Storefront Layout & Multi-Viewport Experience",
      description:
        "Every screen was crafted to balance rich photography with swift loading, ensuring outdoor shoppers have an effortless experience whether browsing at home or on mobile.",
      desktopAspect: "Clean navigation headers, multi-column gear grids, and prominent lifestyle banners.",
      mobileAspect: "Touch-optimized filters, sticky checkout controls, and fast-rendering product previews.",
    },
    technologies: ["Shopify Liquid", "HTML5 & Modern CSS", "Vanilla JavaScript", "Shopify Storefront API"],
    servicesProvided: [
      "Custom Shopify Theme Development",
      "Liquid Template Customization",
      "Mobile-First Responsive Design",
      "Collection & Product Page Setup",
    ],
    outcome: {
      summary:
        "Delivered a lightweight, highly responsive Shopify storefront achieving a 95+ performance score and 100% verified mobile usability across all test viewports.",
      highlights: [
        "100% verified responsive layout across smartphones, tablets, and desktop displays.",
        "Substantially reduced mobile page payload with optimized asset delivery.",
        "Empowered the client team to create seasonal landing pages with modular theme sections.",
      ],
    },
  },

  "apex-cloud-saas-interface": {
    id: "2",
    slug: "apex-cloud-saas-interface",
    title: "Apex Cloud SaaS Interface",
    category: "Figma to Website Conversion",
    serviceSlug: "figma-to-website",
    client: "Apex Systems",
    year: "2025",
    tags: ["Figma to Website Conversion", "Next.js", "Tailwind CSS"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    summary:
      "Pixel-conscious translation of a multi-screen Figma design system into a responsive, accessible, and fast web application interface using Next.js and Tailwind CSS.",
    metaTitle: "Apex Cloud SaaS Interface | Figma to Code Case Study | NexusAgency",
    metaDescription:
      "Discover how NexusAgency translated Apex Systems' intricate Figma design files into a pixel-accurate, responsive Next.js frontend with Tailwind CSS and clean UI architecture.",
    metrics: [
      { label: "Design Fidelity", value: "Pixel-Accurate" },
      { label: "Responsive", value: "Desktop & Mobile" },
      { label: "Frontend Stack", value: "Next.js & Tailwind" },
      { label: "Year Delivered", value: "2025" },
    ],
    overview: {
      purpose:
        "Apex Systems designed an advanced cloud management dashboard and marketing website in Figma, requiring accurate frontend code that mirrors their design specifications precisely.",
      requirements:
        "Conversion of high-fidelity desktop and mobile Figma frames into modular, reusable React components with zero layout degradation across breakpoints.",
      audience:
        "DevOps engineers, cloud administrators, and enterprise tech decision-makers needing clear analytics and intuitive user controls.",
      goals: [
        "Accurately translate Figma design tokens (spacing, typography, color palette, radius) into Tailwind utility classes.",
        "Construct modular React components adhering to clean component-driven architecture.",
        "Deliver full mobile, tablet, and high-DPI desktop responsiveness.",
        "Guarantee accessibility standards and keyboard navigable UI components.",
      ],
    },
    challenge: {
      summary:
        "The Figma mockups featured intricate data visualizations, dense navigation headers, and layered modal dialogs that required meticulous CSS implementation to prevent layout clipping.",
      points: [
        "Complex multi-level navigation requiring seamless collapse into mobile drawer menus.",
        "Strict design token fidelity required by the client's internal UI/UX brand guidelines.",
        "Dynamic dark mode styling across nested dashboard cards and interactive UI states.",
      ],
    },
    solution: {
      summary:
        "We structured a clean Next.js and Tailwind CSS codebase, translating each Figma frame into accessible, semantic components backed by rigorous cross-browser testing.",
      points: [
        "Mapped Figma design tokens directly into Tailwind configuration themes for consistent spacing and colors.",
        "Built component primitives with accessible ARIA attributes and keyboard interactions.",
        "Maintained pixel-conscious fidelity from 320px mobile screens up to 2560px ultra-wide displays.",
        "Implemented smooth CSS transitions matching the original Figma prototype animations.",
      ],
    },
    features: [
      {
        title: "Pixel-Conscious Component Architecture",
        description:
          "Reusable React components built with Tailwind CSS, strictly honoring the Figma design system specifications.",
      },
      {
        title: "Adaptive Breakpoint Management",
        description:
          "Carefully calibrated responsive breakpoints ensuring data tables and dashboard widgets reflow smoothly.",
      },
      {
        title: "Theme Consistency (Dark & Light)",
        description:
          "Full support for balanced color schemes matching the client's approved dark UI design mockups.",
      },
      {
        title: "Interactive Prototype States",
        description:
          "Hover, focus, active, and loading states matching the micro-interactions specified in the design files.",
      },
    ],
    showcase: {
      title: "Design System & Code Translation",
      description:
        "Side-by-side verification between Figma frames and rendered DOM components ensured strict adherence to typography scales, border radii, and elevation shadows.",
      desktopAspect: "Spacious dashboard grids, clear data hierarchies, and organized control panels.",
      mobileAspect: "Collapsible drawer navigation, vertical data cards, and touch-friendly interactive targets.",
    },
    technologies: ["Next.js (App Router)", "TypeScript", "Tailwind CSS", "Lucide Icons", "Figma Design System"],
    servicesProvided: [
      "Figma to Code Implementation",
      "Responsive Frontend Development",
      "Design System Translation",
      "Cross-Browser Component Verification",
    ],
    outcome: {
      summary:
        "Delivered a production-ready, pixel-accurate codebase that faithfully matches the approved Figma designs while providing exceptional responsiveness and maintainable code quality.",
      highlights: [
        "100% design fidelity achieved across all reviewed Figma frames.",
        "Accessible, cleanly documented React component library delivered for internal developer handover.",
        "Zero layout regressions detected across Chromium, WebKit, and Gecko browser engines.",
      ],
    },
  },

  "veritas-advisory-corporate-site": {
    id: "3",
    slug: "veritas-advisory-corporate-site",
    title: "Veritas Advisory Corporate Site",
    category: "WordPress Development",
    serviceSlug: "wordpress-development",
    client: "Veritas Partners",
    year: "2025",
    tags: ["WordPress Development", "Custom Theme", "Business Site"],
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    summary:
      "A clean, professional WordPress website for an advisory firm featuring custom service templates, an intuitive editorial workflow, and sub-1.2s loading speeds.",
    metaTitle: "Veritas Advisory Corporate Site | WordPress Case Study | NexusAgency",
    metaDescription:
      "Read how NexusAgency engineered a fast, secure, and easily manageable WordPress website for Veritas Partners featuring custom service page templates and full admin control.",
    metrics: [
      { label: "CMS Flexibility", value: "Full Admin Control" },
      { label: "Load Time", value: "Under 1.2s" },
      { label: "Platform", value: "Custom WordPress" },
      { label: "Year Delivered", value: "2025" },
    ],
    overview: {
      purpose:
        "Veritas Partners needed a credible corporate website that clearly articulates their advisory practices, case studies, and partner bios while empowering their team to publish updates independently.",
      requirements:
        "The project required a custom WordPress theme without bloated multi-purpose page builders, ensuring fast load times and straightforward content editing.",
      audience:
        "C-suite executives, institutional investors, and enterprise leadership looking for trusted strategic advisory counsel.",
      goals: [
        "Develop a lightweight, secure custom WordPress theme aligned with corporate brand standards.",
        "Create structured custom page templates for advisory practices, leadership bios, and client inquiries.",
        "Provide a clutter-free editorial interface allowing staff to edit text and publish insights easily.",
        "Optimize caching and asset loading to achieve page delivery under 1.2 seconds.",
      ],
    },
    challenge: {
      summary:
        "Their prior website relied on an outdated multi-purpose theme weighed down by dozens of unnecessary plugins, causing slow load times and difficult content maintenance.",
      points: [
        "Slow load speeds and poor mobile usability damaging corporate credibility.",
        "Complex administrative interface that required developer intervention for basic text changes.",
        "Absence of structured templates for showcasing practice areas and executive team profiles.",
      ],
    },
    solution: {
      summary:
        "We developed a streamlined, custom WordPress theme built around clean PHP templates, modern CSS, and WordPress block editor patterns.",
      points: [
        "Crafted dedicated page templates for individual service offerings, advisory team bios, and company milestones.",
        "Implemented custom block patterns that give the Veritas team layout consistency without code editing.",
        "Configured server caching, image compression, and security headers for dependable performance.",
        "Trained internal staff on editorial workflows and routine content updates.",
      ],
    },
    features: [
      {
        title: "Custom WordPress Theme",
        description:
          "Lightweight theme built specifically for Veritas Partners, free from generic builder bloat.",
      },
      {
        title: "Practice Area Showcase Templates",
        description:
          "Tailored layouts highlighting core advisory services, deliverables, and direct contact inquiry points.",
      },
      {
        title: "Executive Team Directory",
        description:
          "Professional profile layouts detailing partner backgrounds, credentials, and published insights.",
      },
      {
        title: "Block Editor Patterns",
        description:
          "Pre-styled editorial components enabling rapid drafting of new announcements with design guardrails.",
      },
    ],
    showcase: {
      title: "Corporate Visual Presentation & Editorial Flow",
      description:
        "Designed to communicate prestige and dependability through refined typography, clean margins, and quick navigation.",
      desktopAspect: "Sophisticated corporate layout with balanced white space and structured leadership profiles.",
      mobileAspect: "Streamlined single-column readability and accessible mobile contact pathways.",
    },
    technologies: ["WordPress CMS", "PHP", "Modern CSS", "WordPress Block Editor", "MySQL"],
    servicesProvided: [
      "Custom WordPress Development",
      "Responsive Theme Design",
      "CMS Editor Configuration",
      "Performance Optimization",
    ],
    outcome: {
      summary:
        "Launched a fast, secure corporate website with page load times under 1.2 seconds and complete administrative editorial control for the client's internal team.",
      highlights: [
        "Reduced page loading time to sub-1.2s across all core practice pages.",
        "Streamlined administrative workflow allowing non-technical staff to publish updates in minutes.",
        "Robust security configuration and clean code standards with zero third-party builder lock-in.",
      ],
    },
  },

  "ecoliving-home-technical-audit": {
    id: "4",
    slug: "ecoliving-home-technical-audit",
    title: "EcoLiving Home Technical Audit",
    category: "SEO",
    serviceSlug: "seo-services",
    client: "EcoLiving Products",
    year: "2025",
    tags: ["SEO", "Technical SEO", "Metadata Architecture"],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    summary:
      "On-page metadata alignment, structured schema markup, and technical site architecture improvements to enhance search engine crawl efficiency.",
    metaTitle: "EcoLiving Home Technical Audit | SEO Case Study | NexusAgency",
    metaDescription:
      "Discover how NexusAgency resolved crawl errors, aligned metadata architecture, and implemented structured schema markup for EcoLiving Products.",
    metrics: [
      { label: "Technical Health", value: "Audited & Fixed" },
      { label: "Indexing Status", value: "Optimized" },
      { label: "Scope", value: "Technical & On-Page" },
      { label: "Year Delivered", value: "2025" },
    ],
    overview: {
      purpose:
        "EcoLiving Products was experiencing search crawl inefficiencies, duplicate indexing signals, and missing structured data across their sustainable home goods catalog.",
      requirements:
        "A thorough technical SEO audit followed by hands-on remediation of metadata, canonical tags, XML sitemaps, internal linking, and structured product schema.",
      audience:
        "Eco-conscious consumers searching Google for verified sustainable, non-toxic household products and ethical home furnishings.",
      goals: [
        "Audit existing URL structure and eliminate duplicate content indexing signals.",
        "Standardize title tags, meta descriptions, and header tag hierarchies across all product categories.",
        "Implement JSON-LD Schema markup for organization, breadcrumbs, and product availability.",
        "Improve crawl budget utilization through optimized robots.txt directives and clean XML sitemaps.",
      ],
    },
    challenge: {
      summary:
        "Automated faceted navigation on the client's website had generated thousands of duplicate query URLs, diluting crawl budget and causing canonical confusion in search engines.",
      points: [
        "Thousands of parameter URLs being crawled unnecessarily by search engine bots.",
        "Missing or generic meta descriptions across multiple key catalog categories.",
        "Absence of structured schema data, preventing rich search result enhancements.",
      ],
    },
    solution: {
      summary:
        "We performed a comprehensive technical SEO review and methodically implemented on-page and architectural fixes to establish clean indexing and search crawlability.",
      points: [
        "Configured self-referential canonical tags and parameter handling to consolidate URL signals.",
        "Authored tailored on-page title and meta description templates aligned with target customer search intent.",
        "Deployed valid JSON-LD structured schema across organization, product, and breadcrumb entities.",
        "Refreshed XML sitemaps and verified Google Search Console coverage without errors.",
      ],
    },
    features: [
      {
        title: "Canonical & Indexing Consolidation",
        description:
          "Systematic cleanup of duplicate parameter URLs to ensure search crawlers index only the primary canonical versions.",
      },
      {
        title: "Structured Schema Markup (JSON-LD)",
        description:
          "Implementation of standard schema specifications for Product, Organization, and BreadcrumbList markup.",
      },
      {
        title: "Metadata & Heading Hierarchy",
        description:
          "Structured optimization of H1, H2, and title tag elements across main collections and brand pages.",
      },
      {
        title: "Crawl Optimization & Sitemap Cleanliness",
        description:
          "Updated robots.txt rules and dynamic XML sitemap generation to preserve search bot crawl bandwidth.",
      },
    ],
    showcase: {
      title: "Technical Architecture & Audit Findings",
      description:
        "Remediated URL structures and structured data validations were audited directly through Google Search Console and Schema.org validation tools.",
      desktopAspect: "Clean URL hierarchies, semantic HTML markup, and verified schema integration.",
      mobileAspect: "Mobile-friendly page structure ensuring search engines index mobile viewports accurately.",
    },
    technologies: ["Google Search Console", "JSON-LD Schema", "Screaming Frog SEO", "Technical SEO Auditing"],
    servicesProvided: [
      "Technical SEO Audit",
      "On-Page Metadata Alignment",
      "Schema.org Structured Data",
      "Crawl Efficiency Optimization",
    ],
    outcome: {
      summary:
        "Successfully audited and remediated all critical indexing issues, eliminating crawl waste and ensuring clean search engine interpretation of the client's catalog.",
      highlights: [
        "Resolved 100% of reported canonical discrepancies and duplicate crawl traps.",
        "Successfully validated JSON-LD schema across all indexed product and category pages.",
        "Delivered a clear internal SEO maintenance guide for ongoing product catalog additions.",
      ],
    },
  },

  "nordic-living-multi-channel-ads": {
    id: "5",
    slug: "nordic-living-multi-channel-ads",
    title: "Nordic Living Multi-Channel Ads",
    category: "Ads Management",
    serviceSlug: "ads-management",
    client: "Nordic Living",
    year: "2025",
    tags: ["Ads Management", "Google Ads", "Meta Ads"],
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
    summary:
      "Configured audience targeting, ad groups, and accurate conversion tracking across Google Search and Meta platforms for a Scandinavian home décor brand.",
    metaTitle: "Nordic Living Multi-Channel Ads | Ads Management Case Study | NexusAgency",
    metaDescription:
      "See how NexusAgency established structured advertising campaigns, precise conversion tracking, and audience targeting across Google Ads and Meta Ads for Nordic Living.",
    metrics: [
      { label: "Tracking Setup", value: "Verified Events" },
      { label: "Campaign Focus", value: "Targeted Audience" },
      { label: "Channels", value: "Google & Meta" },
      { label: "Year Delivered", value: "2025" },
    ],
    overview: {
      purpose:
        "Nordic Living sought to transition from ad-hoc promotional boosts to a disciplined, multi-channel paid acquisition system with verified conversion measurement.",
      requirements:
        "Structured setup of Google Ads (Search & Shopping) and Meta Ads (Instagram & Facebook), paired with server-side conversion API and Pixel verification.",
      audience:
        "Homeowners, interior design enthusiasts, and apartment dwellers looking for minimalist Scandinavian home furnishings.",
      goals: [
        "Establish clean campaign naming taxonomies and segmented ad groups for core product lines.",
        "Implement end-to-end conversion tracking to measure view content, add-to-cart, and checkout actions accurately.",
        "Structure custom audience segments based on intent, category interest, and engagement levels.",
        "Provide scheduled, transparent performance dashboards for campaign oversight.",
      ],
    },
    challenge: {
      summary:
        "Previous advertising efforts lacked conversion tracking verification, making it impossible to evaluate which ad creatives or search queries were generating genuine client interest.",
      points: [
        "Disorganized ad account structure with broad keywords triggering irrelevant traffic.",
        "Missing conversion tracking pixels resulting in unmeasured purchase events.",
        "Ad creative fatigue due to unstructured asset rotations.",
      ],
    },
    solution: {
      summary:
        "We restructured the client's ad accounts from the ground up, implementing verified tracking pixels, targeted keyword lists, and intent-focused ad sets.",
      points: [
        "Installed and verified Meta Pixel and Google Tag Manager conversion events across all purchase steps.",
        "Structured tightly themed Google Search campaigns targeting high-intent product terms with negative keyword lists.",
        "Constructed Meta audience segments distinguishing cold prospects from warm catalog engagers.",
        "Standardized weekly performance reporting metrics for full client visibility.",
      ],
    },
    features: [
      {
        title: "Structured Search & Social Campaigns",
        description:
          "Organized campaign architecture separating brand, high-intent category keywords, and social lookalike audiences.",
      },
      {
        title: "Verified Conversion Tracking",
        description:
          "Accurate tracking configuration measuring catalog views, cart additions, and confirmed transactions.",
      },
      {
        title: "Negative Keyword Guardrails",
        description:
          "Extensive negative keyword lists filtering out irrelevant search queries to protect budget efficiency.",
      },
      {
        title: "Audience Segmentation",
        description:
          "Targeted audience segmentation separating new customer discovery from engaged retargeting pools.",
      },
    ],
    showcase: {
      title: "Campaign Structure & Conversion Architecture",
      description:
        "Account configurations were built for longevity, ensuring every dollar spent is connected to verified tracking data and structured audience buckets.",
      desktopAspect: "Clean campaign segmentation, transparent reporting data, and keyword match type discipline.",
      mobileAspect: "Mobile-optimized ad copy and social creative formatting for Instagram and Facebook feeds.",
    },
    technologies: ["Google Ads", "Meta Ads Manager", "Google Tag Manager", "Meta Pixel"],
    servicesProvided: [
      "Paid Campaign Architecture",
      "Conversion Tracking Setup",
      "Audience Targeting Configuration",
      "Transparent Performance Reporting",
    ],
    outcome: {
      summary:
        "Established a disciplined paid advertising infrastructure with verified tracking, eliminating wasteful ad spend and providing reliable data for ongoing campaign optimization.",
      highlights: [
        "100% verified conversion event tracking active across Google and Meta platforms.",
        "Eliminated wasted search spend through proactive negative keyword filters.",
        "Client now possesses an organized, scalable campaign structure for ongoing seasonal campaigns.",
      ],
    },
  },

  "lumiere-beauty-storefront": {
    id: "6",
    slug: "lumiere-beauty-storefront",
    title: "Lumière Beauty Storefront",
    category: "Shopify Development",
    serviceSlug: "shopify-development",
    client: "Lumière Labs",
    year: "2025",
    tags: ["Shopify Development", "Theme Customization", "Mobile Responsive"],
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
    summary:
      "Shopify theme customization with custom product option selectors, lifestyle collection showcases, and streamlined mobile checkout navigation.",
    metaTitle: "Lumière Beauty Storefront | Shopify Development Case Study | NexusAgency",
    metaDescription:
      "Discover how NexusAgency customized a Shopify storefront for Lumière Labs featuring bespoke product option swatches, clean mobile navigation, and streamlined checkout.",
    metrics: [
      { label: "Store Experience", value: "Mobile First" },
      { label: "Cart Experience", value: "Streamlined" },
      { label: "Platform", value: "Shopify Liquid" },
      { label: "Year Delivered", value: "2025" },
    ],
    overview: {
      purpose:
        "Lumière Labs required an elegant Shopify storefront to showcase their premium skincare line, requiring intuitive shade/variant selectors and seamless mobile purchasing.",
      requirements:
        "Customization of an existing Shopify theme with custom product swatches, clean ingredient accordion tabs, and an optimized mobile navigation structure.",
      audience:
        "Consumers seeking clean, cruelty-free beauty and skincare formulations with transparent ingredient details.",
      goals: [
        "Develop custom swatch and shade selectors directly integrated with Shopify inventory variants.",
        "Design clean product description sections highlighting ingredients, usage instructions, and benefits.",
        "Optimize touch navigation and cart interaction for smartphone shoppers.",
        "Ensure fast page load times despite high-resolution cosmetic photography.",
      ],
    },
    challenge: {
      summary:
        "Default theme variant dropdowns were clunky on mobile devices and did not visually communicate product shades or multi-step skin routine options.",
      points: [
        "Generic dropdown menus hindering swift shade selection on mobile screens.",
        "Long, unorganized product descriptions causing endless mobile scrolling.",
        "Heavy uncompressed beauty photography slowing down initial collection page rendering.",
      ],
    },
    solution: {
      summary:
        "We built custom Liquid snippets for visual variant selectors, implemented collapsable product benefit accordions, and optimized asset delivery.",
      points: [
        "Engineered custom color and size swatches connected natively to Shopify variant availability.",
        "Organized product page details into clean, interactive tabbed sections for ingredients and clinical results.",
        "Applied modern image sizing and WebP formatting to maintain visual brilliance without sluggish loading.",
        "Refined checkout touch interactions for convenient mobile payment processing.",
      ],
    },
    features: [
      {
        title: "Visual Variant & Shade Swatches",
        description:
          "Custom visual color swatches providing instant visual feedback on selected skincare shades and sizes.",
      },
      {
        title: "Ingredient & Usage Accordions",
        description:
          "Organized collapsable tabs that keep product pages concise and accessible for mobile shoppers.",
      },
      {
        title: "Responsive Lifestyle Galleries",
        description:
          "High-definition product imagery carousels with smooth swipe navigation on mobile devices.",
      },
      {
        title: "Streamlined Checkout Path",
        description:
          "Direct slide-out cart drawer with quick-add functionality and prominent checkout actions.",
      },
    ],
    showcase: {
      title: "Storefront Design & Mobile Product Experience",
      description:
        "Every element was tailored to reflect beauty industry elegance, combining serene pastel palettes with razor-sharp responsive functionality.",
      desktopAspect: "Spacious product imagery layouts with sticky buy boxes and comprehensive ingredient detail.",
      mobileAspect: "Smooth touch-swipe galleries, thumb-accessible swatches, and clear checkout buttons.",
    },
    technologies: ["Shopify Liquid", "CSS3 / Sass", "JavaScript", "Shopify Theme Architecture"],
    servicesProvided: [
      "Shopify Theme Customization",
      "Product Variant Swatch Integration",
      "Mobile UX Optimization",
      "Asset Performance Refinement",
    ],
    outcome: {
      summary:
        "Delivered a polished, mobile-first Shopify storefront with streamlined variant selection and an intuitive purchasing flow tailored for beauty consumers.",
      highlights: [
        "Enhanced mobile shopping experience with custom visual swatch selectors.",
        "Organized product information into clear, accessible tabs reducing page clutter.",
        "Optimized image loading across all high-resolution beauty product assets.",
      ],
    },
  },

  "venturecraft-digital-platform": {
    id: "7",
    slug: "venturecraft-digital-platform",
    title: "VentureCraft Digital Platform",
    category: "Custom Website Development",
    serviceSlug: "custom-website-development",
    client: "VentureCraft Studio",
    year: "2025",
    tags: ["Custom Website Development", "React / Next.js", "Tailwind CSS"],
    image:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    summary:
      "A bespoke corporate web platform engineered with custom interactive modules, dynamic service configurators, and sub-second load times.",
    metaTitle: "VentureCraft Digital Platform | Custom Web Development Case Study | NexusAgency",
    metaDescription:
      "Read how NexusAgency engineered a custom Next.js web platform for VentureCraft Studio with tailored interactive modules, modern frontend architecture, and sub-second load times.",
    metrics: [
      { label: "Architecture", value: "Bespoke Modern Stack" },
      { label: "Performance", value: "Sub-Second Load" },
      { label: "Frontend", value: "Next.js & Tailwind" },
      { label: "Year Delivered", value: "2025" },
    ],
    overview: {
      purpose:
        "VentureCraft Studio needed a custom corporate platform that outgrew the limitations of standard templates, requiring interactive modules and tailored branding.",
      requirements:
        "Bespoke frontend engineering with Next.js App Router, dynamic interactive service modules, accessible keyboard navigation, and exceptional performance benchmarks.",
      audience:
        "Tech founders, investors, and corporate partners evaluating VentureCraft Studio's incubation capabilities and venture portfolio.",
      goals: [
        "Architect a custom Next.js frontend codebase with complete design and functional freedom.",
        "Build custom interactive modules showcasing venture case studies and service capabilities.",
        "Deliver sub-second page transitions and excellent Core Web Vitals.",
        "Ensure full accessibility, dark/light theme cohesion, and responsive device support.",
      ],
    },
    challenge: {
      summary:
        "Off-the-shelf website builders could not support the complex interactive case study modules and distinctive typography required by VentureCraft's brand guidelines.",
      points: [
        "Template limitations restricting custom interactive layout concepts.",
        "Excessive JavaScript overhead in standard CMS solutions causing sluggish responsiveness.",
        "Need for bespoke responsive navigation that accommodates a growing venture portfolio.",
      ],
    },
    solution: {
      summary:
        "We built a completely custom web platform utilizing Next.js, TypeScript, and Tailwind CSS, engineered specifically around VentureCraft's unique requirements.",
      points: [
        "Crafted custom interactive UI components with React and modern CSS without heavy external libraries.",
        "Optimized client/server rendering boundaries for instantaneous page transitions and sub-second loading.",
        "Constructed a clean, scalable component directory enabling straightforward future feature additions.",
        "Conducted thorough responsive testing from small smartphones to large presentation displays.",
      ],
    },
    features: [
      {
        title: "Bespoke Next.js Architecture",
        description:
          "Engineered with modern Next.js App Router, TypeScript, and Tailwind CSS for speed, stability, and maintainability.",
      },
      {
        title: "Interactive Venture Modules",
        description:
          "Custom interactive cards and sliders illustrating portfolio ventures with smooth animations.",
      },
      {
        title: "Sub-Second Performance",
        description:
          "Static prerendering and optimized asset loading delivering sub-second page loads across viewports.",
      },
      {
        title: "Accessible & Responsive",
        description:
          "Strict semantic HTML, ARIA compliance, and fluid responsive layouts across all screen resolutions.",
      },
    ],
    showcase: {
      title: "Interactive Architecture & Layout Presentation",
      description:
        "Designed to position VentureCraft as a forward-thinking venture studio through crisp typography, purposeful motion, and clean code execution.",
      desktopAspect: "Wide-format interactive venture portfolios with high-contrast typography and subtle interactions.",
      mobileAspect: "Adaptive touch navigation, stacked interactive modules, and instantaneous mobile tap response.",
    },
    technologies: ["Next.js (App Router)", "TypeScript", "Tailwind CSS", "React Primitives", "Vercel Edge Platform"],
    servicesProvided: [
      "Custom Frontend Architecture",
      "Interactive Component Engineering",
      "Performance & Usability Optimization",
      "Deployment & Code Handover",
    ],
    outcome: {
      summary:
        "Delivered a bespoke, high-performance web platform that reflects VentureCraft Studio's innovation leadership with sub-second page loads and custom interactive capabilities.",
      highlights: [
        "Achieved sub-second page loading and stellar Core Web Vitals across viewports.",
        "Provided total creative and functional freedom without CMS template constraints.",
        "Delivered a scalable, well-documented TypeScript codebase for future platform expansions.",
      ],
    },
  },
};

