export interface ServiceOffering {
  title: string;
  description: string;
  iconName: string;
}

export interface ServiceBenefit {
  title: string;
  description: string;
}

export interface ServiceUseCase {
  title: string;
  scenario: string;
}

export interface ServiceProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceDetail {
  slug: string;
  title: string; // Exact match for Contact dropdown option
  eyebrow: string;
  heroHeading: string;
  heroDescription: string;
  metaTitle: string;
  metaDescription: string;
  iconName: string;
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
  offerings: ServiceOffering[];
  benefits: ServiceBenefit[];
  useCases: ServiceUseCase[];
  process: ServiceProcessStep[];
  faqs: ServiceFAQ[];
  ctaHeading: string;
  ctaDescription: string;
}

export const serviceDetailsData: Record<string, ServiceDetail> = {
  "shopify-development": {
    slug: "shopify-development",
    title: "Shopify Development",
    eyebrow: "SHOPIFY STORE DESIGN & DEVELOPMENT",
    heroHeading: "Build a Shopify Store Designed for Growth",
    heroDescription:
      "We design, develop, and customize Shopify stores that deliver a professional shopping experience, work smoothly across devices, and support your business goals.",
    metaTitle: "Shopify Development Services | NexusAgency",
    metaDescription:
      "Professional Shopify store design, Liquid theme customization, responsive mobile storefronts, and conversion-focused e-commerce setup by NexusAgency.",
    iconName: "ShoppingCart",
    visualBadge: {
      label: "E-Commerce Architecture",
      value: "Liquid & Online Store 2.0",
      tag: "Shopify Partnered Work",
    },
    overview: {
      whatItIs:
        "Shopify Development at NexusAgency encompasses end-to-end e-commerce store engineering. From configuring custom Liquid templates and Online Store 2.0 theme sections to building responsive product detail pages and seamless cart drawer flows, we ensure your online store reflects your brand while providing an effortless customer experience.",
      problemsSolved: [
        "Generic off-the-shelf themes that don't match your brand aesthetic or product complexity.",
        "Slow, bloated storefronts that frustrate mobile shoppers and hurt conversion rates.",
        "Difficulty managing custom product variations, swatches, bundles, or size guides.",
        "Broken checkout flows or poorly integrated third-party Shopify apps.",
      ],
      whoItIsFor:
        "Direct-to-consumer (DTC) brands, emerging e-commerce stores, retail businesses transitioning online, and established merchants seeking a clean, maintainable Shopify storefront.",
      whatWeDeliver:
        "A fully customized, mobile-first Shopify store configured with clean Liquid code, optimized product pages, organized collections, essential app integrations, and comprehensive admin guidance.",
      businessImpact:
        "A fast, dependable storefront builds customer trust, simplifies catalogue management for your operations team, and creates a seamless buying journey from discovery to checkout.",
    },
    offerings: [
      {
        title: "Shopify Store Design and Development",
        description:
          "End-to-end setup of modern Shopify stores structured for clear navigation, effortless browsing, and smooth customer transactions.",
        iconName: "ShoppingCart",
      },
      {
        title: "Theme Customization",
        description:
          "Tailoring existing Shopify themes to match your specific typography, colour palette, brand identity, and layout requirements.",
        iconName: "Sliders",
      },
      {
        title: "Liquid Customization",
        description:
          "Custom template and section engineering using clean Liquid code to enable unique page layouts and flexible CMS controls.",
        iconName: "Code2",
      },
      {
        title: "Responsive Store Optimization",
        description:
          "Rigorous testing and styling refinement to ensure seamless browsing and high-speed responsiveness across phones, tablets, and desktops.",
        iconName: "Smartphone",
      },
      {
        title: "Product and Collection Setup",
        description:
          "Configuring product attributes, variant selectors, collection hierarchies, automated tagging, and filtering menus.",
        iconName: "Layers",
      },
      {
        title: "Store Functionality Improvements",
        description:
          "Enhancing UX with slide-out cart drawers, sticky add-to-cart buttons, dynamic swatches, and streamlined checkout options.",
        iconName: "Zap",
      },
    ],
    benefits: [
      {
        title: "Intuitive Shopping Experience",
        description:
          "Clear navigation, informative product pages, and frictionless checkout paths encourage visitors to complete purchases.",
      },
      {
        title: "Mobile-First Storefronts",
        description:
          "With over 70% of e-commerce visits occurring on handheld devices, our layouts are engineered specifically for small screens.",
      },
      {
        title: "Non-Technical Store Administration",
        description:
          "Store owners can effortlessly update banners, launch seasonal promotions, and manage inventory using Shopify's native visual editor.",
      },
      {
        title: "Fast Page Rendering",
        description:
          "We avoid unneeded app bloat and write lightweight Liquid code to maintain fast load times and clean Core Web Vitals.",
      },
    ],
    useCases: [
      {
        title: "New Store Launch",
        scenario:
          "A brand introducing a new physical or digital product line that needs a polished, operational storefront built from scratch.",
      },
      {
        title: "Store Redesign & Theme Migration",
        scenario:
          "An existing merchant upgrading from a legacy Shopify vintage theme to a modern Online Store 2.0 architecture with customizable sections.",
      },
      {
        title: "Custom UX Enhancements",
        scenario:
          "A merchant with an existing theme needing custom Liquid sections, variant swatch selectors, or bespoke landing pages.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Discovery",
        description:
          "We analyze your product catalog, brand guidelines, functional requirements, and target customer demographic.",
      },
      {
        step: "02",
        title: "Planning",
        description:
          "We select the optimal theme foundation, map collection structures, define section specifications, and establish milestone dates.",
      },
      {
        step: "03",
        title: "Implementation",
        description:
          "We build custom Liquid sections, style templates, configure apps, and assemble product and collection layouts.",
      },
      {
        step: "04",
        title: "Review and Handover",
        description:
          "We test responsive viewports, simulate test transactions, review with your team, and provide handover documentation.",
      },
    ],
    faqs: [
      {
        question: "What is included in your Shopify store development service?",
        answer:
          "Our service covers theme setup or customization, custom Liquid development, responsive mobile optimization, product and collection configuration, payment and shipping setup, and basic app integrations.",
      },
      {
        question: "Can you customize an existing Shopify theme?",
        answer:
          "Yes. We regularly help merchants customize existing themes by adding custom Liquid sections, modifying layout styling, and refining mobile UX without rebuilding from scratch.",
      },
      {
        question: "Will my Shopify store work seamlessly on mobile devices?",
        answer:
          "Yes. Every page, collection grid, navigation drawer, and checkout step is tested across iOS and Android viewports to guarantee a frictionless mobile shopping experience.",
      },
      {
        question: "Can I request additional functionality or custom sections?",
        answer:
          "Absolutely. We can create bespoke Liquid sections, product tabs, variant swatch pickers, or custom promotional banners that you can easily edit from the Shopify customizer.",
      },
      {
        question: "How do we get started with a Shopify project?",
        answer:
          "Click 'Start Your Project' to submit your project requirements via our contact form. We will review your goals and schedule a discovery consultation within 24 hours.",
      },
    ],
    ctaHeading: "Ready to Build or Improve Your Shopify Store?",
    ctaDescription:
      "Tell us about your project, and let's discuss the right solution for your business.",
  },

  "figma-to-website": {
    slug: "figma-to-website",
    title: "Figma to Website Conversion",
    eyebrow: "FIGMA TO RESPONSIVE CODE",
    heroHeading: "Turn Your Figma Designs into Responsive Websites",
    heroDescription:
      "We transform approved Figma designs into responsive, polished websites while carefully implementing layouts, typography, spacing, and interactive elements.",
    metaTitle: "Figma to Website Conversion Services | NexusAgency",
    metaDescription:
      "Convert your Figma design files into clean, responsive HTML, CSS, React, or Next.js codebases with pixel-conscious precision and modern web standards.",
    iconName: "Layout",
    visualBadge: {
      label: "Design Fidelity",
      value: "Pixel-Conscious Precision",
      tag: "Figma to Frontend",
    },
    overview: {
      whatItIs:
        "Figma to Website Conversion is our specialized frontend engineering service. We bridge the gap between design and production code, converting your Figma screens, wireframes, and design systems into semantic, responsive, and performant web layouts. We honor design intent down to typography scale, component states, and subtle interaction details.",
      problemsSolved: [
        "Inaccurate design translation where live web pages fail to match design mocks.",
        "Broken mobile layouts resulting from desktop-only design thinking.",
        "Messy, bloated CSS or fragile codebases that are difficult for developers to maintain.",
        "Missing interactive states, hover effects, and accessible focus outlines.",
      ],
      whoItIsFor:
        "Design agencies, freelance designers, startup founders, and marketing teams who have completed Figma designs and require reliable, high-fidelity frontend execution.",
      whatWeDeliver:
        "Clean, maintainable frontend code structured with modern HTML5, Tailwind CSS, TypeScript, and React/Next.js (or specified framework), matching your Figma specifications accurately.",
      businessImpact:
        "Eliminates design discrepancies, accelerates your product launch timeline, and guarantees that your users experience the polished aesthetic your design team intended.",
    },
    offerings: [
      {
        title: "Figma Design Implementation",
        description:
          "Careful translation of desktop, tablet, and mobile Figma frames into production-ready web codebases.",
        iconName: "Layout",
      },
      {
        title: "Responsive Layout Development",
        description:
          "Building fluid grids and flexbox containers that adapt gracefully between various viewport widths without awkward breaks.",
        iconName: "Smartphone",
      },
      {
        title: "Typography and Spacing Accuracy",
        description:
          "Preserving font hierarchies, line heights, letter spacing, and consistent margin/padding scales defined in your design tokens.",
        iconName: "Sliders",
      },
      {
        title: "Reusable UI Components",
        description:
          "Constructing modular, reusable component libraries (buttons, modals, cards, navbars) that maintain stylistic consistency.",
        iconName: "Layers",
      },
      {
        title: "Interactive Element Implementation",
        description:
          "Coding hover states, modal dialogs, drawer menus, accordions, and subtle transitions as indicated in your prototypes.",
        iconName: "Zap",
      },
      {
        title: "Cross-Device Testing",
        description:
          "Thorough verification across Chrome, Safari, Firefox, and Edge on desktop, tablet, and mobile viewports.",
        iconName: "CheckCircle2",
      },
    ],
    benefits: [
      {
        title: "High Design Fidelity",
        description:
          "Your live website mirrors your Figma designs without arbitrary developer alterations or compromised aesthetics.",
      },
      {
        title: "Clean, Maintainable Code",
        description:
          "Organized file structures, semantic HTML tags, and clean styling conventions ensure your code is accessible and easy to extend.",
      },
      {
        title: "Cross-Device Consistency",
        description:
          "Fluid responsiveness ensures that complex design systems look well-proportioned on laptops, tablets, and phones alike.",
      },
      {
        title: "Performance & Accessibility",
        description:
          "Fast-loading assets, proper contrast ratios, and accessible ARIA attributes are built directly into the codebase.",
      },
    ],
    useCases: [
      {
        title: "Agency Design Hand-off",
        scenario:
          "A creative agency that completed a client design project and needs an experienced frontend partner to build the production site.",
      },
      {
        title: "Startup Landing Page Launch",
        scenario:
          "A founder with finalized Figma mockups for a SaaS landing page who needs a high-speed, responsive Next.js build ready for launch.",
      },
      {
        title: "Marketing Site Re-skin",
        scenario:
          "A brand updating their website interface based on fresh Figma designs created by an internal or contract designer.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Discovery",
        description:
          "We inspect your Figma file, audit design tokens, evaluate responsiveness, and clarify interactive requirements.",
      },
      {
        step: "02",
        title: "Planning",
        description:
          "We determine the component architecture, confirm framework preferences, and map out delivery milestones.",
      },
      {
        step: "03",
        title: "Implementation",
        description:
          "We build semantic, responsive UI components, integrate assets, and implement interactive micro-interactions.",
      },
      {
        step: "04",
        title: "Review and Handover",
        description:
          "We perform cross-browser quality checks, compare against Figma frames, and deliver clean, organized source code.",
      },
    ],
    faqs: [
      {
        question: "Can you convert an existing Figma design into a website?",
        answer:
          "Yes. We specialize in taking existing Figma design files and converting them into clean, responsive web code using modern frameworks such as Next.js, React, or standard HTML/CSS.",
      },
      {
        question: "Will the website be responsive across all devices?",
        answer:
          "Yes. Even if your Figma file only includes desktop mockups, we apply responsive engineering best practices to ensure the site looks balanced and functional on tablet and mobile screens.",
      },
      {
        question: "Can you implement interactive elements and animations?",
        answer:
          "Yes. We implement interactive states including hover animations, mobile navigation menus, modal dialogs, tab switchers, and subtle scroll effects.",
      },
      {
        question: "What files or assets do you need to get started?",
        answer:
          "We need view or edit access to your Figma file. Having defined typography styles, component states, and exported vector graphics or images accelerates development.",
      },
      {
        question: "Which technologies do you use for the conversion?",
        answer:
          "We primarily build with modern React, Next.js, TypeScript, and Tailwind CSS, but we can also deliver clean static HTML/CSS/JS or adapt to your preferred tech stack.",
      },
    ],
    ctaHeading: "Ready to Bring Your Figma Design to Life?",
    ctaDescription:
      "Tell us about your project, and let's discuss the right solution for your business.",
  },

  "wordpress-development": {
    slug: "wordpress-development",
    title: "WordPress Development",
    eyebrow: "PROFESSIONAL WORDPRESS SOLUTIONS",
    heroHeading: "Create a Professional WordPress Website for Your Business",
    heroDescription:
      "We build and customize WordPress websites that present your brand professionally, provide a user-friendly experience, and adapt to your business needs.",
    metaTitle: "WordPress Development Services | NexusAgency",
    metaDescription:
      "Custom WordPress website development, theme customization, responsive business sites, and ongoing maintenance services by NexusAgency.",
    iconName: "Globe",
    visualBadge: {
      label: "CMS Architecture",
      value: "Gutenberg & Custom Themes",
      tag: "WordPress Engineering",
    },
    overview: {
      whatItIs:
        "WordPress Development at NexusAgency delivers robust, easy-to-manage websites for corporate brands, service businesses, and publishers. We build clean, lightweight WordPress themes and modular block layouts that eliminate confusing page builders and heavy bloat, allowing your marketing team to create and edit content with total confidence.",
      problemsSolved: [
        "Clunky, bloated page builders that load sluggishly and create technical debt.",
        "Security vulnerabilities caused by outdated plugins or haphazard configurations.",
        "Rigid themes that make updating basic text, team members, or case studies difficult.",
        "Inconsistent mobile rendering across different screen sizes and browsers.",
      ],
      whoItIsFor:
        "B2B service providers, professional consultancies, healthcare practices, legal firms, educational institutions, and corporate businesses seeking a reliable web presence.",
      whatWeDeliver:
        "A customized WordPress website equipped with intuitive block templates, responsive layout designs, security hardening, SEO-friendly site structure, and full admin training.",
      businessImpact:
        "Gives your internal team full ownership over company content updates while maintaining brand consistency, fast page loads, and dependable uptime.",
    },
    offerings: [
      {
        title: "Business Website Development",
        description:
          "Building professional, multi-page company websites tailored to your services, brand messaging, and client inquiry pathways.",
        iconName: "Globe",
      },
      {
        title: "WordPress Theme Customization",
        description:
          "Customizing WordPress themes to align with your brand standards, typography, color palettes, and header/footer configurations.",
        iconName: "Sliders",
      },
      {
        title: "Responsive Page Design",
        description:
          "Engineering fluid templates that ensure every service page, about section, and contact form displays flawlessly across all screen sizes.",
        iconName: "Smartphone",
      },
      {
        title: "Website Content Structure",
        description:
          "Organizing custom post types, service archives, team directories, and case study taxonomies for intuitive visitor navigation.",
        iconName: "Layers",
      },
      {
        title: "Functionality Improvements",
        description:
          "Implementing inquiry forms, interactive FAQs, client testimonials, and essential third-party analytics integrations.",
        iconName: "Zap",
      },
      {
        title: "Maintenance and Support",
        description:
          "Providing routine core and plugin updates, security monitoring, regular database backups, and technical troubleshooting.",
        iconName: "ShieldCheck",
      },
    ],
    benefits: [
      {
        title: "Effortless Content Management",
        description:
          "Your team can easily publish blog articles, edit service descriptions, and update staff bios without touching code.",
      },
      {
        title: "High Performance & Stability",
        description:
          "We avoid bloated plugin stacks, ensuring your WordPress site remains fast, secure, and straightforward to maintain.",
      },
      {
        title: "Scalable Architecture",
        description:
          "Add new service offerings, landing pages, or multi-language features as your business footprint expands over time.",
      },
      {
        title: "Search-Friendly Foundation",
        description:
          "Built-in semantic HTML structure, clean permalinks, and metadata compatibility help search engines index your pages smoothly.",
      },
    ],
    useCases: [
      {
        title: "Corporate Website Redesign",
        scenario:
          "A business with an outdated website needing a modern, responsive WordPress presence that reflects current service offerings.",
      },
      {
        title: "New Service Company Website",
        scenario:
          "An emerging consultancy or agency launching a dedicated multi-page website with case studies, inquiry forms, and team profiles.",
      },
      {
        title: "Site Maintenance & Security Overhaul",
        scenario:
          "An existing WordPress site suffering from slow load speeds, unmaintained plugins, or layout bugs requiring technical remediation.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Discovery",
        description:
          "We examine your business model, service catalog, existing website assets, and content publishing workflows.",
      },
      {
        step: "02",
        title: "Planning",
        description:
          "We define site architecture, recommended theme approach, required plugins, and development schedules.",
      },
      {
        step: "03",
        title: "Implementation",
        description:
          "We configure WordPress, build responsive templates, implement content blocks, and integrate inquiry forms.",
      },
      {
        step: "04",
        title: "Review and Handover",
        description:
          "We test cross-device responsiveness, run security hardening routines, and guide your team on content editing.",
      },
    ],
    faqs: [
      {
        question: "Can you customize an existing WordPress website?",
        answer:
          "Yes. We can work with your existing WordPress setup to refine page layouts, customize theme styling, fix display glitches, and improve load speed.",
      },
      {
        question: "Can I update the website content myself after launch?",
        answer:
          "Yes. We configure WordPress so that editing text, changing images, adding new pages, and posting updates is simple and intuitive through the standard WordPress dashboard.",
      },
      {
        question: "Will the WordPress website be mobile-responsive?",
        answer:
          "Yes. All page templates are engineered to adapt fluidly across phones, tablets, laptops, and wide monitors.",
      },
      {
        question: "What information do you need to begin a WordPress project?",
        answer:
          "We typically need your brand assets (logo, colors), a list of required pages, content copy/drafts, and access to your hosting provider or WordPress admin.",
      },
      {
        question: "Do you offer post-launch maintenance for WordPress?",
        answer:
          "Yes. We offer maintenance packages covering core/plugin updates, automated backups, security checks, and ongoing technical support.",
      },
    ],
    ctaHeading: "Let's Build Your WordPress Website",
    ctaDescription:
      "Tell us about your project, and let's discuss the right solution for your business.",
  },

  "seo-services": {
    slug: "seo-services",
    title: "SEO Services",
    eyebrow: "ORGANIC SEARCH OPTIMIZATION",
    heroHeading: "Improve Your Website’s Search Visibility",
    heroDescription:
      "We help businesses improve their website structure, on-page SEO, technical foundations, and content organization to support sustainable organic search growth.",
    metaTitle: "Technical & On-Page SEO Services | NexusAgency",
    metaDescription:
      "Ethical, data-informed search engine optimization. Technical site audits, on-page SEO, schema markup, and metadata optimization by NexusAgency.",
    iconName: "Search",
    visualBadge: {
      label: "Search Architecture",
      value: "On-Page & Technical SEO",
      tag: "Google Standards Compliant",
    },
    overview: {
      whatItIs:
        "SEO Services at NexusAgency provides practical, white-hat search engine optimization. We focus on the concrete technical and structural elements that allow search engines like Google to crawl, understand, and index your website effectively. Rather than making speculative ranking guarantees, we implement proven structural best practices that build lasting organic search authority.",
      problemsSolved: [
        "Search engines failing to index key service pages due to technical crawl errors.",
        "Missing, duplicate, or unoptimized page titles and meta descriptions across site pages.",
        "Slow page rendering and poor Core Web Vitals dragging down search performance.",
        "Unclear internal linking structures that prevent visitors and search bots from navigating your content.",
      ],
      whoItIsFor:
        "E-commerce merchants, local and national service providers, and business websites that want to strengthen their organic visibility through clean, ethical SEO best practices.",
      whatWeDeliver:
        "A thorough technical audit, optimized title and description tags, structured JSON-LD schema markup, image alt text optimization, and actionable recommendations for content organization.",
      businessImpact:
        "Strengthens your website's search discoverability, ensures search bots accurately interpret your service offerings, and improves the overall quality and speed of the user experience.",
    },
    offerings: [
      {
        title: "On-Page SEO",
        description:
          "Optimizing headings (H1, H2), keyword integration, content clarity, and readability across your core service and product pages.",
        iconName: "Search",
      },
      {
        title: "Technical SEO Improvements",
        description:
          "Auditing robots.txt, XML sitemaps, canonical tags, 301 redirects, and fixing broken links to ensure clean crawler access.",
        iconName: "Sliders",
      },
      {
        title: "Metadata Optimization",
        description:
          "Writing compelling, accurately sized title tags and meta descriptions that accurately describe each page and boost click-through rates.",
        iconName: "FileText",
      },
      {
        title: "Internal Linking and Site Structure",
        description:
          "Structuring clean navigation menus, contextual text links, and logical URL hierarchies to distribute page authority effectively.",
        iconName: "Layers",
      },
      {
        title: "Image Optimization",
        description:
          "Compressing media files, adding descriptive image alt text, and serving modern formats to improve speed and image search visibility.",
        iconName: "Zap",
      },
      {
        title: "SEO Audits and Recommendations",
        description:
          "Delivering comprehensive site audits with prioritized, actionable technical fixes tailored to your specific website framework.",
        iconName: "CheckCircle2",
      },
    ],
    benefits: [
      {
        title: "Solid Technical Foundations",
        description:
          "Eliminating crawl roadblocks ensures search bots can discover, index, and evaluate all your valuable business pages.",
      },
      {
        title: "Higher Relevance & Clarity",
        description:
          "Search engines accurately match your service offerings to queries conducted by users actively seeking your services.",
      },
      {
        title: "Enhanced User Experience",
        description:
          "Faster load times, clean heading structures, and mobile responsiveness improve engagement for both users and search engines.",
      },
      {
        title: "Ethical, Sustainable Approach",
        description:
          "We follow Google's Webmaster Guidelines strictly, protecting your website from algorithmic penalties caused by manipulative tactics.",
      },
    ],
    useCases: [
      {
        title: "Pre-Launch Website Audit",
        scenario:
          "Auditing a newly developed website before public rollout to ensure metadata, sitemaps, and canonical tags are correctly configured.",
      },
      {
        title: "E-Commerce SEO Enhancement",
        scenario:
          "Optimizing product page titles, collection descriptions, and schema markup on a Shopify or WooCommerce store.",
      },
      {
        title: "Technical Remediation",
        scenario:
          "Resolving indexation issues, duplicate title tags, and crawl errors reported in Google Search Console for an existing business website.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Discovery",
        description:
          "We review your current site architecture, search visibility, target keywords, and audit Search Console data.",
      },
      {
        step: "02",
        title: "Planning",
        description:
          "We create a prioritized audit report outlining critical technical fixes, metadata requirements, and on-page improvements.",
      },
      {
        step: "03",
        title: "Implementation",
        description:
          "We apply on-page metadata, add structured schema code, optimize image assets, and fix crawl obstacles.",
      },
      {
        step: "04",
        title: "Review and Handover",
        description:
          "We verify re-indexing in Search Console, provide a summary of completed fixes, and outline best practices for future content.",
      },
    ],
    faqs: [
      {
        question: "What is included in your SEO service?",
        answer:
          "Our services include technical site audits, on-page metadata optimization (titles and descriptions), heading structure alignment, XML sitemap verification, image alt text optimization, and structured schema implementation.",
      },
      {
        question: "Do you guarantee first-page Google rankings?",
        answer:
          "No. Legitimate agencies and Google's own documentation caution that no one can guarantee specific search rankings. We focus on ethical, high-impact optimizations that make your site discoverable, clean, and competitive.",
      },
      {
        question: "How long do SEO improvements take to show results?",
        answer:
          "Technical fixes and indexation updates typically reflect in search engines within several weeks, while broader organic visibility growth generally develops over three to six months as search engines re-evaluate site authority.",
      },
      {
        question: "Can you audit an existing website?",
        answer:
          "Yes. We regularly perform technical SEO audits for existing websites, identifying crawl errors, missing meta tags, slow assets, and opportunities for structural improvement.",
      },
      {
        question: "Do you provide ongoing SEO maintenance?",
        answer:
          "Yes, we can provide ongoing monthly reviews to audit newly published pages, monitor search performance trends, and address new crawl issues as your site grows.",
      },
    ],
    ctaHeading: "Let's Improve Your Website's SEO Foundations",
    ctaDescription:
      "Tell us about your project, and let's discuss the right solution for your business.",
  },

  "ads-management": {
    slug: "ads-management",
    title: "Ads Management",
    eyebrow: "PAID CAMPAIGN MANAGEMENT",
    heroHeading: "Reach the Right Audience with Smarter Advertising",
    heroDescription:
      "We help businesses plan, launch, and optimize paid advertising campaigns based on their objectives, target audiences, budgets, and available performance data.",
    metaTitle: "Ads Management Services | NexusAgency",
    metaDescription:
      "Targeted Google Ads and Meta Ads management. Campaign setup, audience targeting, conversion tracking, and transparent reporting by NexusAgency.",
    iconName: "Megaphone",
    visualBadge: {
      label: "Campaign Channels",
      value: "Google Ads & Meta Ads",
      tag: "Conversion Tracking Verified",
    },
    overview: {
      whatItIs:
        "Ads Management at NexusAgency focuses on structured, transparent paid advertising across Google Ads and Meta (Facebook & Instagram). We handle campaign architecture, audience targeting configuration, conversion tracking verification, and ongoing optimization to ensure your advertising budget reaches potential customers who are genuinely interested in your products or services.",
      problemsSolved: [
        "Wasted ad spend on irrelevant search terms or broad, unfocused audience segments.",
        "Lack of accurate conversion tracking, making it impossible to know which ads generate leads or sales.",
        "Disorganized ad account structures that make performance monitoring confusing.",
        "Fatigued ad creatives and stale copy that cause click-through rates to decline over time.",
      ],
      whoItIsFor:
        "Service businesses seeking qualified leads, e-commerce stores driving product sales, and companies with established budgets looking for disciplined, data-informed campaign management.",
      whatWeDeliver:
        "Carefully structured ad campaigns, verified conversion tracking pixels and events, focused keyword and audience targeting, and transparent performance reporting.",
      businessImpact:
        "Puts your offerings directly in front of active searchers and targeted demographics while providing clear data visibility on which channels generate real inquiries.",
    },
    offerings: [
      {
        title: "Campaign Planning",
        description:
          "Establishing clear campaign objectives, defining budget allocations, and choosing the right mix of search, shopping, or social channels.",
        iconName: "FileText",
      },
      {
        title: "Campaign Setup",
        description:
          "Configuring ad account structures, ad groups, responsive search ads, headlines, descriptions, and extensions.",
        iconName: "Sliders",
      },
      {
        title: "Audience and Targeting Configuration",
        description:
          "Setting up keyword intent match types, negative keyword lists, demographic parameters, and custom custom audience lists.",
        iconName: "Layers",
      },
      {
        title: "Campaign Monitoring and Optimization",
        description:
          "Conducting routine bid adjustments, negative keyword additions, and budget reallocation toward high-performing segments.",
        iconName: "Zap",
      },
      {
        title: "Conversion Tracking",
        description:
          "Configuring Google Tag Manager, Google Analytics 4 key events, and Meta Pixel to accurately track form submissions and purchases.",
        iconName: "ShieldCheck",
      },
      {
        title: "Performance Reporting",
        description:
          "Delivering straightforward, honest performance reports that highlight spend, clicks, conversion actions, and areas for improvement.",
        iconName: "CheckCircle2",
      },
    ],
    benefits: [
      {
        title: "Disciplined Spend Management",
        description:
          "We use targeted match types and negative keyword filtering to minimize wasted spend on irrelevant queries.",
      },
      {
        title: "Verified Conversion Attribution",
        description:
          "Accurate event tracking ensures you have reliable data on exactly how many inquiries or sales your campaigns generate.",
      },
      {
        title: "Transparent Reporting",
        description:
          "No confusing jargon or vanity metrics. We provide clear reporting on ad spend, conversion counts, and campaign efficiency.",
      },
      {
        title: "Continuous Iteration",
        description:
          "We adjust bids, test ad copy variations, and pause non-performing targeting segments based on verifiable data.",
      },
    ],
    useCases: [
      {
        title: "Local & National Service Lead Generation",
        scenario:
          "A professional service firm running Google Search campaigns to capture high-intent users actively searching for their services.",
      },
      {
        title: "E-Commerce Product Promotions",
        scenario:
          "An online merchant driving targeted traffic to specific product categories using Google Shopping and Meta retargeting.",
      },
      {
        title: "Ad Account Audit & Tracking Setup",
        scenario:
          "A business with an existing ad account that lacks accurate conversion tracking, requiring an audit and event configuration overhaul.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Discovery",
        description:
          "We analyze your service offerings, target customer profiles, competitor landscape, and historical advertising data.",
      },
      {
        step: "02",
        title: "Planning",
        description:
          "We define channel strategy, keyword groups, audience targeting criteria, and conversion tracking milestones.",
      },
      {
        step: "03",
        title: "Implementation",
        description:
          "We build ad copy, configure campaign settings, install tracking pixels, and launch campaigns upon your approval.",
      },
      {
        step: "04",
        title: "Review and Handover",
        description:
          "We monitor early search query data, adjust bids, filter unwanted traffic, and provide regular performance summaries.",
      },
    ],
    faqs: [
      {
        question: "Which advertising platforms do you support?",
        answer:
          "We primarily manage campaigns on Google Ads (Search, Shopping, Display) and Meta Ads (Facebook & Instagram).",
      },
      {
        question: "What information do you need to launch an ad campaign?",
        answer:
          "We need your target audience details, monthly ad budget, core offerings, unique value propositions, and access to your Google Ads or Meta Business account.",
      },
      {
        question: "Do you configure conversion tracking?",
        answer:
          "Yes. We consider conversion tracking essential. We configure and test Google Tag Manager, Google Analytics 4 events, and Meta Pixels to verify that form submissions or sales are tracked accurately.",
      },
      {
        question: "Do you guarantee specific sales or lead counts?",
        answer:
          "No. We do not make misleading guarantees regarding revenue or lead quantities, as results depend on market demand, pricing, and client sales processes. We guarantee disciplined setup, accurate tracking, and data-informed optimization.",
      },
      {
        question: "How do you report on campaign performance?",
        answer:
          "We provide scheduled performance summaries reviewing total spend, clicks, conversion actions, cost per conversion, and recommended next steps.",
      },
    ],
    ctaHeading: "Ready to Plan Your Next Advertising Campaign?",
    ctaDescription:
      "Tell us about your project, and let's discuss the right solution for your business.",
  },
  "custom-website-development": {
    slug: "custom-website-development",
    title: "Custom Website Development",
    eyebrow: "CUSTOM WEB DEVELOPMENT",
    heroHeading: "Custom Websites Built Around Your Business",
    heroDescription:
      "We design and develop tailored websites that match your brand, meet your business requirements, and deliver smooth experiences across desktop, tablet, and mobile devices.",
    metaTitle: "Custom Website Development Services | NexusAgency",
    metaDescription:
      "Bespoke websites built around your business goals, brand identity, and unique functionality requirements. Custom design, modern frontend, and seamless integrations.",
    iconName: "Code2",
    visualBadge: {
      label: "Architecture",
      value: "Bespoke & Scalable",
      tag: "Zero Template Bloat",
    },
    overview: {
      whatItIs:
        "Custom website development is the process of planning, designing, and engineering a bespoke digital solution tailored specifically to your company's operational needs, brand aesthetic, and target audience. Unlike generic off-the-shelf templates with locked-in constraints and redundant code, custom development gives you total control over the user experience, architecture, performance, and long-term scalability.",
      problemsSolved: [
        "Rigid template constraints that restrict your branding, layout possibilities, and desired customer journey.",
        "Slow page loading speeds caused by bloated pre-packaged themes and unnecessary third-party scripts.",
        "Difficulty integrating unique business workflows, interactive configurators, customer portals, or specialized forms.",
        "Limited scalability when trying to connect custom APIs, CRMs, or modern marketing technology stacks.",
      ],
      whoItIsFor:
        "Designed for established companies, high-growth startups, professional service firms, and forward-thinking brands that demand a distinct digital identity, optimal search speed, and bespoke functionality that off-the-shelf templates cannot provide.",
      whatWeDeliver:
        "A turnkey, fully bespoke website built with clean modern code, responsive design across all viewports, verified cross-browser compatibility, seamless API integrations, and complete ownership of your codebase.",
      businessImpact:
        "A high-performing, distinctive web presence that elevates your brand authority, accelerates page conversions, ranks better on search engines due to lean architecture, and easily scales alongside your business roadmap.",
    },
    offerings: [
      {
        title: "Custom Website Design",
        description:
          "Bespoke visual layouts crafted around your brand identity, complete with responsive wireframes, tailored typography, intuitive navigation, and high-fidelity UI design.",
        iconName: "Layout",
      },
      {
        title: "Frontend Development",
        description:
          "Clean, modular, and maintainable modern code written in React, Next.js, or HTML5/CSS3 with semantic markup, accessibility standards, and fluid responsive styling.",
        iconName: "Code2",
      },
      {
        title: "Custom Functionality",
        description:
          "Interactive components, dynamic calculators, customized multi-step forms, real-time filtering, and custom user journeys designed for your exact business requirements.",
        iconName: "Sliders",
      },
      {
        title: "API & Third-Party Integrations",
        description:
          "Seamless connection to your preferred CRMs, marketing automation tools, booking engines, payment gateways, newsletter platforms, and external data feeds.",
        iconName: "Zap",
      },
      {
        title: "Responsive & Cross-Browser Optimization",
        description:
          "Pixel-perfect rendering across modern smartphones, tablets, laptops, and ultra-wide desktops, rigorously tested across Chrome, Safari, Firefox, and Edge.",
        iconName: "Smartphone",
      },
      {
        title: "Performance & Maintainability",
        description:
          "Optimized asset loading, clean code splitting, excellent Core Web Vitals, and modular code architecture structured for straightforward ongoing maintenance.",
        iconName: "ShieldCheck",
      },
    ],
    benefits: [
      {
        title: "Tailored to Your Exact Business Goals",
        description:
          "Every layout, user flow, and interaction is engineered specifically to convert your target audience, not adapted from a rigid pre-made template.",
      },
      {
        title: "Sub-Second Performance & Clean Code",
        description:
          "By eliminating heavy plugin bloat and unused CSS/JS scripts, your website achieves lightning-fast load times and superior Core Web Vitals scores.",
      },
      {
        title: "Full Code Ownership & Flexibility",
        description:
          "You own 100% of your source code and assets with no platform lock-in, giving you absolute freedom to expand and iterate anytime.",
      },
      {
        title: "Seamless Future Scalability",
        description:
          "A modular, modern architecture makes adding new landing pages, product catalogs, or API integrations seamless as your business grows.",
      },
    ],
    useCases: [
      {
        title: "Corporate & B2B Service Websites",
        scenario:
          "Professional firms needing a distinctive, high-credibility digital presence with custom lead generation funnels, case study hubs, and team directories.",
      },
      {
        title: "Startup & Digital Product Showcases",
        scenario:
          "Emerging technology and venture-backed brands requiring interactive feature previews, dynamic pricing tables, and investor-ready presentation.",
      },
      {
        title: "Interactive Web Applications & Portals",
        scenario:
          "Businesses requiring interactive tools such as estimate calculators, quote builders, custom multi-step onboarding flows, or authenticated client dashboards.",
      },
      {
        title: "High-Converting Marketing & Landing Hubs",
        scenario:
          "Brands running targeted acquisition campaigns that require custom conversion-optimized landing pages with dedicated tracking and CRM synchronizations.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Discovery & Strategy",
        description:
          "We dive deep into your business goals, target audience, brand requirements, functional needs, and content architecture to define a precise project blueprint.",
      },
      {
        step: "02",
        title: "Planning & UI/UX Design",
        description:
          "We craft interactive wireframes, establish modern visual styles, design responsive UI layouts, and refine the interface collaboratively based on your feedback.",
      },
      {
        step: "03",
        title: "Development & Integration",
        description:
          "We build your website with clean, modular frontend code, implement dynamic interactions, connect required third-party APIs and forms, and conduct thorough code reviews.",
      },
      {
        step: "04",
        title: "Testing, Launch & Handover",
        description:
          "We perform cross-device validation, speed optimizations, Core Web Vitals checks, assist with production deployment, and hand over full repository ownership.",
      },
    ],
    faqs: [
      {
        question:
          "What is the difference between a custom website and a template-based site?",
        answer:
          "A template-based site relies on pre-made themes with fixed layouts, generic styling, and often heavy, unused code that slows down performance. A custom website is architected and built from scratch specifically for your brand. It offers complete visual and functional freedom, significantly faster loading speeds, superior search crawlability, and the flexibility to adapt to your unique business needs without compromise.",
      },
      {
        question:
          "What technologies and tools do you use for custom website development?",
        answer:
          "We primarily use modern, industry-standard frontend technologies including React, Next.js, TypeScript, and Tailwind CSS. For content-driven custom websites, we can integrate headless CMS solutions or custom admin backends. We choose the tech stack based on your project goals, performance requirements, and long-term maintenance preferences.",
      },
      {
        question: "Will my custom website be fully responsive on mobile devices?",
        answer:
          "Yes, absolutely. We follow a mobile-first responsive design philosophy. Your custom website is meticulously styled and tested across an extensive matrix of screen sizes—from smartphones and tablets to high-resolution desktop monitors—ensuring seamless navigation, readable typography, and fluid touch interactions on every device.",
      },
      {
        question:
          "Can you integrate third-party tools like CRMs, analytics, and payment forms?",
        answer:
          "Yes. We regularly connect custom websites to third-party tools and platforms, including CRM platforms (HubSpot, Salesforce), email marketing tools (Mailchimp, Klaviyo), analytics suites (Google Analytics 4, Tag Manager), appointment schedulers (Calendly), and payment gateways (Stripe, PayPal). We verify that data flows accurately and securely upon submission.",
      },
      {
        question:
          "How long does a custom website development project typically take?",
        answer:
          "Project timelines vary based on scope, feature complexity, and page count. A focused custom marketing or business website typically takes 3 to 6 weeks from discovery to launch, while larger interactive web applications or platforms may take 6 to 10 weeks. We establish clear milestone schedules at the start of the project and provide weekly progress updates.",
      },
      {
        question:
          "Who owns the website and the code after the project is completed?",
        answer:
          "You own 100% of the website, design assets, and source code. Upon project completion and final handover, we transfer all repository code, assets, and deployment access directly to you. There are no recurring agency licensing fees or proprietary software lock-ins.",
      },
    ],
    ctaHeading: "Have an Idea for a Custom Website?",
    ctaDescription:
      "Tell us about your goals, required features, and project requirements. Let's discuss a website solution that fits your business.",
  },
};

