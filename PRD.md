# 🧩 React/Next.js Style Blog - Product Requirements Document (PRD)

**Version:** 1.1
**Last Updated:** 2025-10-18
**Project:** Jeongwonshin Tech Blog
**Status:** Planning Phase

---

## 🎯 Project Overview

### Purpose

Build a **minimalist, documentation-style blog** inspired by React and Next.js official documentation, featuring:

- Clean, readable typography and layout
- MDX-based content with syntax highlighting
- Table of contents for long-form articles
- Dark mode support
- Static site generation for optimal performance

### Target Audience

- Developers and technical readers
- Users seeking high-quality technical content
- Mobile and desktop users

---

## 🏗️ Technical Stack (Updated)

### Core Framework

| Technology     | Version        | Purpose                         |
| -------------- | -------------- | ------------------------------- |
| **Next.js**    | 15.x (latest)  | React framework with App Router |
| **React**      | 19.x           | UI library                      |
| **TypeScript** | 5.7.x (latest) | Type safety                     |
| **Node.js**    | 24.x LTS       | Runtime environment             |

### Package Management

| Technology | Version      | Purpose                              |
| ---------- | ------------ | ------------------------------------ |
| **pnpm**   | 9.x (latest) | Fast, disk-efficient package manager |

### Styling

| Technology                  | Version | Purpose                       |
| --------------------------- | ------- | ----------------------------- |
| **Tailwind CSS**            | 4.x     | Utility-first CSS framework   |
| **@tailwindcss/typography** | Latest  | Prose styling for MDX content |
| **next-themes**             | Latest  | Dark mode management          |

### Content & MDX

| Technology                   | Version | Purpose                      |
| ---------------------------- | ------- | ---------------------------- |
| **@next/mdx**                | Latest  | MDX integration for Next.js  |
| **gray-matter**              | Latest  | Frontmatter parsing          |
| **rehype-pretty-code**       | Latest  | Syntax highlighting          |
| **shiki**                    | Latest  | Code highlighting engine     |
| **rehype-slug**              | Latest  | Auto-generate heading IDs    |
| **rehype-autolink-headings** | Latest  | Add anchor links to headings |
| **remark-gfm**               | Latest  | GitHub Flavored Markdown     |

### Code Quality & Linting

| Technology              | Version        | Purpose                              |
| ----------------------- | -------------- | ------------------------------------ |
| **Biome.js**            | 1.9.x (latest) | Fast linter + formatter (Rust-based) |
| **ESLint**              | 9.x            | Additional linting (flat config)     |
| **eslint-config-biome** | Latest         | Integrate Biome with ESLint          |

### Deployment

| Technology                 | Version    | Purpose                        |
| -------------------------- | ---------- | ------------------------------ |
| **Cloudflare Pages**       | Latest     | Edge hosting platform          |
| **@opennextjs/cloudflare** | 1.0.0-beta | Next.js adapter for Cloudflare |
| **Wrangler**               | Latest     | Cloudflare CLI tool            |

### Additional Tools

| Technology       | Version | Purpose              |
| ---------------- | ------- | -------------------- |
| **lucide-react** | Latest  | Icon library         |
| **Geist Font**   | Latest  | Vercel's font family |

---

## 📁 Project Structure

```
jeongwonshin-blog/
├── .wrangler/                    # Wrangler build output (gitignored)
├── .cloudflare/                  # Cloudflare adapter output
├── app/
│   ├── layout.tsx                # Root layout (Header + Providers)
│   ├── page.tsx                  # Intro page (/)
│   ├── blog/
│   │   ├── [slug]/
│   │   │   ├── page.tsx          # Blog detail page
│   │   │   └── layout.tsx        # Blog layout (ToC)
│   │   └── posts/                # MDX blog posts
│   │       ├── first-post.mdx
│   │       ├── second-post.mdx
│   │       └── third-post.mdx
│   ├── docs/
│   │   └── page.tsx              # Documentation page (optional)
│   └── about/
│       └── page.tsx              # About page
├── components/
│   ├── Header.tsx                # Top navigation bar
│   ├── BlogCard.tsx              # Post thumbnail card
│   ├── MDXContent.tsx            # MDX renderer with custom components
│   ├── TableOfContents.tsx       # Right sidebar ToC
│   ├── CodeBlock.tsx             # Custom code block component
│   ├── ThemeToggle.tsx           # Dark mode toggle
│   └── Footer.tsx                # Footer component
├── lib/
│   ├── mdx.ts                    # MDX compilation logic
│   ├── getPostMetadata.ts        # Extract post frontmatter
│   ├── getPostContent.ts         # Load and parse MDX file
│   └── getTableOfContents.ts     # Extract headings for ToC
├── public/
│   ├── thumbnails/               # Blog post thumbnails
│   │   ├── post-1.png
│   │   └── post-2.png
│   └── images/                   # Other images
├── styles/
│   └── globals.css               # Global Tailwind styles
├── biome.json                    # Biome configuration
├── eslint.config.js              # ESLint v9 flat config
├── next.config.js                # Next.js config (MDX + Cloudflare)
├── tailwind.config.ts            # Tailwind theme
├── tsconfig.json                 # TypeScript config
├── wrangler.toml                 # Cloudflare Wrangler config
├── .nvmrc                        # Node version (20)
├── package.json                  # Dependencies
└── pnpm-lock.yaml                # pnpm lockfile
```

---

## 🌐 Page Requirements

### 1. Common Layout (app/layout.tsx)

**Features:**

- `<Header />` component (sticky, backdrop blur)
- Dark mode provider (`next-themes`)
- Geist Sans and Geist Mono fonts
- Global metadata (SEO)

**Design:**

- Border bottom with subtle shadow
- Sticky top navigation
- Responsive mobile menu (hamburger icon)

---

### 2. Intro Page (/) - app/page.tsx

**Purpose:** Landing page introducing the blog and listing all posts

**Sections:**

#### Hero Section

- **Headline:** "Frontend Architecture, Design, and Development"
- **Subheadline:** "A personal tech blog inspired by React and Next.js documentation."
- **CTA Button:** "View Posts" (scroll to grid or navigate)

#### Post Grid Section

- Grid layout: 1 column (mobile), 2 columns (tablet), 3 columns (desktop)
- Each card includes:
  - Thumbnail image (16:9 or 4:3 ratio)
  - Title (bold, large)
  - Short description (2-3 lines)
  - Date published
  - Hover effects: `shadow-lg`, `scale-105`, smooth transition

**Data Source:**

- `getPostMetadata()` function reads all MDX files from `app/blog/posts/`
- Sorts by date (newest first)

**Tech Notes:**

- Use `next/image` for optimized thumbnails
- Cards are clickable links to `/blog/[slug]`

---

### 3. Blog Detail Page (/blog/[slug]) - app/blog/[slug]/page.tsx

**Purpose:** Display individual blog post with Table of Contents

**Layout:**

````
┌──────────────────────────────────────────────────────┬──────────────────┐
│                                                      │                  │
│                    Article Content                   │  Table of        │
│                    (MDX Rendered)                    │  Contents        │
│                                                      │  (Fixed)         │
│                                                      │                  │
│  # Post Title                                        │  - Section 1     │
│  Published: 2025-10-18                               │  - Section 2     │
│                                                      │    - Subsection  │
│  ## Introduction                                     │  - Section 3     │
│  Lorem ipsum dolor sit amet...                       │                  │
│                                                      │                  │
│  ```typescript                                       │                  │
│  const example = "code block"                        │                  │
│  ```                                                 │                  │
│                                                      │                  │
└──────────────────────────────────────────────────────┴──────────────────┘
````

**Features:**

- Two-column layout (content + ToC)
  - Content: 70% width (desktop), 100% (mobile)
  - ToC: 30% width (desktop), hidden/collapsible (mobile)
- MDX content with:
  - Custom components for headings, code blocks, links
  - Syntax highlighting via `rehype-pretty-code`
  - Auto-generated heading IDs via `rehype-slug`
  - Anchor links via `rehype-autolink-headings`
- Responsive typography using `@tailwindcss/typography`
- Previous/Next post navigation at bottom

**Table of Contents (Right Sidebar):**

- Extract `h2`, `h3` headings
- Active section highlighting (scroll-based)
- Fixed positioning on desktop
- Smooth scroll on click
- Collapsible drawer on mobile

**SEO:**

- Dynamic metadata generation:
  - `title`: Post title + site name
  - `description`: Post description from frontmatter
  - `og:image`: Post thumbnail
  - `og:type`: "article"
  - `article:published_time`: Post date

**Static Generation:**

- Use `generateStaticParams()` to pre-render all posts at build time
- Fetch post content via `getPostContent(slug)`

---

### 4. Header Component (components/Header.tsx)

**Features:**

- Logo/brand: "Jeongwonshin.dev" or custom logo
- Navigation links:
  - Home (/)
  - Blog (/blog)
  - About (/about)
- Right side:
  - Dark mode toggle button
  - Optional: Search icon (future feature)

**Design:**

- Sticky top, `backdrop-blur-md`
- Border bottom: `border-b border-gray-200 dark:border-gray-800`
- Hover effect on links: underline or color change
- Mobile: Hamburger menu (collapsible)

**Accessibility:**

- Semantic HTML (`<nav>`, `<header>`)
- Keyboard navigation
- ARIA labels for icons

---

## 🎨 Design System

### Colors (Tailwind Config)

**Light Mode:**

- Background: `#ffffff`
- Text: `#111111`
- Accent: `#0070f3` (Next.js blue)
- Border: `#e5e5e5`
- Code background: `#f6f6f6`

**Dark Mode:**

- Background: `#0a0a0a`
- Text: `#ededed`
- Accent: `#3b82f6` (lighter blue)
- Border: `#262626`
- Code background: `#1e1e1e`

### Typography

**Fonts:**

- **Sans-serif:** Geist Sans (headings, body text)
- **Monospace:** Geist Mono (code, inline code)

**Scale:**

- Heading 1 (`h1`): `text-4xl md:text-5xl font-bold`
- Heading 2 (`h2`): `text-3xl md:text-4xl font-semibold`
- Heading 3 (`h3`): `text-2xl md:text-3xl font-semibold`
- Body: `text-base leading-7`
- Code: `text-sm`

### Spacing

- Container max-width: `1280px`
- Padding: `px-4 md:px-8`
- Section gaps: `space-y-16`

### Shadows

- Card hover: `shadow-lg hover:shadow-xl`
- Header: `shadow-sm`

### Animations

- Transitions: `transition-all duration-300`
- Hover scale: `hover:scale-105`
- Smooth scroll: `scroll-smooth`

---

## 🔧 Core Features

### 1. MDX Rendering with Syntax Highlighting

**Requirements:**

- Parse MDX files with frontmatter
- Support GitHub Flavored Markdown (tables, task lists, strikethrough)
- Syntax highlight code blocks with line numbers
- Support multiple languages (TypeScript, JavaScript, Python, Rust, etc.)
- Dark/light theme for code blocks

**Implementation:**

- Use `rehype-pretty-code` with Shiki
- Configure themes:
  - Light: `github-light` or `min-light`
  - Dark: `github-dark` or `nord`
- Custom code block component:
  - Copy button
  - Language label
  - Line highlighting support

**Example:**

````mdx
```typescript
const greeting = (name: string): string => {
  return `Hello, ${name}!`;
};
```
````

---

### 2. Table of Contents (ToC)

**Requirements:**

- Auto-generate from `h2` and `h3` headings
- Nested structure (h2 → h3)
- Highlight active section based on scroll position
- Smooth scroll to section on click
- Fixed position on desktop, collapsible on mobile

**Implementation:**

- Extract headings using `rehype-slug` and `rehype-autolink-headings`
- Use Intersection Observer API to track active section
- Store in state and update on scroll

**Example Structure:**

```typescript
interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

const toc: TocItem[] = [
  { id: "introduction", text: "Introduction", level: 2 },
  { id: "getting-started", text: "Getting Started", level: 2 },
  { id: "installation", text: "Installation", level: 3 },
];
```

---

### 3. Dark Mode

**Requirements:**

- Toggle between light and dark themes
- Persist user preference in localStorage
- System preference detection (prefers-color-scheme)
- Smooth transition between themes

**Implementation:**

- Use `next-themes` library
- Toggle button in Header
- Apply Tailwind dark mode classes

**Example:**

```typescript
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  );
};
```

---

### 4. Static Site Generation (SSG)

**Requirements:**

- Pre-render all blog posts at build time
- Generate static HTML for optimal performance
- SEO-friendly metadata for each page

**Implementation:**

- Use `generateStaticParams()` in `/blog/[slug]/page.tsx`
- Fetch all post slugs from file system
- Generate metadata using `generateMetadata()`

**Example:**

```typescript
export async function generateStaticParams() {
  const posts = getPostMetadata();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
```

---

### 5. Responsive Design

**Requirements:**

- Mobile-first approach
- Breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px)
- Collapsible navigation on mobile
- Stacked layout on mobile, two-column on desktop

**Implementation:**

- Use Tailwind responsive utilities
- Mobile ToC: Drawer or accordion
- Mobile header: Hamburger menu

---

## 📦 MDX Frontmatter Schema

Each MDX file must include the following frontmatter:

```yaml
---
title: "Post Title"
description: "Brief description of the post (150-200 characters)"
date: "2025-10-18"
thumbnail: "/thumbnails/post-title.png"
tags: ["nextjs", "react", "typescript"]
author: "Jeongwonshin"
---
```

**Fields:**

- `title` (required): Post title displayed on card and detail page
- `description` (required): Short summary for card and SEO
- `date` (required): Publication date (YYYY-MM-DD)
- `thumbnail` (optional): Image path for card thumbnail
- `tags` (optional): Array of tags for filtering (future feature)
- `author` (optional): Author name

---

## 🚀 Deployment Strategy - Cloudflare Pages

### Why Cloudflare Pages?

- **Edge Performance:** Serve from 300+ locations globally
- **Zero Cold Starts:** Instant response times
- **Cost-Effective:** Generous free tier (100k requests/day)
- **Custom Domains:** Easy DNS integration
- **Git Integration:** Auto-deploy on push

### Deployment Workflow

#### Prerequisites

1. **Node.js 24+** (specified in `.nvmrc`)
2. **pnpm** with corepack
3. **Wrangler CLI** installed (`pnpm add -D wrangler`)

#### Configuration Files

**1. wrangler.toml**

```toml
name = "jeongwonshin-blog"
compatibility_date = "2024-09-23"
compatibility_flags = ["nodejs_compat"]
pages_build_output_dir = ".cloudflare/dist"

[site]
bucket = ".cloudflare/dist"
```

**2. next.config.js**

```javascript
const { setupDevPlatform } = require("@cloudflare/next-on-pages/next-dev");

if (process.env.NODE_ENV === "development") {
  setupDevPlatform();
}

module.exports = {
  output: "export", // For static export (SSG only)
  // OR use @opennextjs/cloudflare adapter for SSR
};
```

**3. .nvmrc**

```
20
```

**4. package.json engines**

```json
{
  "engines": {
    "node": ">=24.0.0"
  }
}
```

#### Deployment Steps

**Option 1: Using @opennextjs/cloudflare (Recommended)**

1. Install dependencies:

```bash
pnpm add -D @opennextjs/cloudflare wrangler
```

2. Configure `next.config.js`:

```javascript
const { setupDevPlatform } = require("@cloudflare/next-on-pages/next-dev");
const withCloudflare = require("@opennextjs/cloudflare");

if (process.env.NODE_ENV === "development") {
  setupDevPlatform();
}

module.exports = withCloudflare({
  // Next.js config
});
```

3. Build for Cloudflare:

```bash
pnpm build
pnpm run cloudflare:build
```

4. Deploy:

```bash
npx wrangler pages deploy .cloudflare/dist
```

**Option 2: Static Export (SSG Only)**

1. Configure `next.config.js`:

```javascript
module.exports = {
  output: "export",
  images: {
    unoptimized: true, // Cloudflare Pages doesn't support next/image optimization
  },
};
```

2. Build:

```bash
pnpm build
```

3. Deploy:

```bash
npx wrangler pages deploy out
```

#### Continuous Deployment (CI/CD)

**GitHub Actions Workflow (.github/workflows/deploy.yml)**

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 9

      - name: Install dependencies
        run: pnpm install

      - name: Build
        run: pnpm build

      - name: Deploy to Cloudflare Pages
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: pages deploy .cloudflare/dist --project-name=jeongwonshin-blog
```

#### Custom Domain Setup

1. Add domain in Cloudflare Pages dashboard
2. Update DNS records:
   - CNAME: `www` → `jeongwonshin-blog.pages.dev`
   - CNAME: `@` → `jeongwonshin-blog.pages.dev` (with CNAME flattening)
3. Enable automatic HTTPS

---

## 🧪 Code Quality & Linting

### Biome.js Configuration (biome.json)

```json
{
  "$schema": "https://biomejs.dev/schemas/1.9.0/schema.json",
  "organizeImports": {
    "enabled": true
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "complexity": {
        "noForEach": "warn"
      },
      "style": {
        "useConst": "error",
        "useTemplate": "warn"
      }
    }
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 100
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "trailingCommas": "es5"
    }
  }
}
```

### ESLint v9 Flat Config (eslint.config.js)

```javascript
import biome from "eslint-config-biome";
import tseslint from "@typescript-eslint/eslint-plugin";

export default [
  biome,
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
];
```

### Scripts (package.json)

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "biome lint --write .",
    "format": "biome format --write .",
    "check": "biome check --write .",
    "eslint": "eslint --fix .",
    "type-check": "tsc --noEmit",
    "cloudflare:build": "wrangler pages deploy .cloudflare/dist",
    "cloudflare:dev": "wrangler pages dev .cloudflare/dist"
  }
}
```

---

## 📊 Performance Targets

| Metric                             | Target          | Tool                    |
| ---------------------------------- | --------------- | ----------------------- |
| **Performance Score**              | 90+             | Lighthouse              |
| **Accessibility Score**            | 95+             | Lighthouse              |
| **SEO Score**                      | 100             | Lighthouse              |
| **First Contentful Paint (FCP)**   | < 1.5s          | Web Vitals              |
| **Largest Contentful Paint (LCP)** | < 2.5s          | Web Vitals              |
| **Cumulative Layout Shift (CLS)**  | < 0.1           | Web Vitals              |
| **Time to Interactive (TTI)**      | < 3s            | Lighthouse              |
| **Bundle Size (JS)**               | < 200KB gzipped | Webpack Bundle Analyzer |

---

## 🔮 Future Enhancements (Post-MVP)

### Phase 2 Features

- **Search:** Full-text search with Fuse.js or Pagefind
- **Tags/Categories:** Filter posts by topic
- **Series:** Group related posts into a series
- **RSS Feed:** Auto-generate RSS/Atom feed
- **View Counter:** Track post views (Cloudflare Analytics)
- **Reading Time:** Estimate reading time for each post

### Phase 3 Features

- **Comments:** Giscus or Commento integration
- **Newsletter:** Email subscription form (ConvertKit/Mailchimp)
- **Analytics:** Google Analytics or Plausible
- **Sitemap:** Auto-generate sitemap.xml
- **Related Posts:** Recommend similar articles

### Phase 4 Features

- **Multi-language:** i18n support
- **Code Playground:** Embed live code editors (CodeSandbox/StackBlitz)
- **Draft Mode:** Preview unpublished posts
- **Admin Panel:** CMS for non-technical editors

---

## ✅ Success Criteria

**MVP Launch Checklist:**

- [ ] 5+ blog posts published with rich content (code blocks, images, headings)
- [ ] Lighthouse scores: 90+ (Performance), 95+ (Accessibility), 100 (SEO)
- [ ] Mobile-responsive design tested on iPhone and Android
- [ ] Dark mode fully functional across all pages
- [ ] Table of Contents working on detail pages
- [ ] Deployed to Cloudflare Pages with custom domain
- [ ] Zero console errors or warnings
- [ ] Fast build time (< 60 seconds)
- [ ] All links and navigation working correctly

---

## 📝 Appendix

### Sample Blog Post (first-post.mdx)

````mdx
---
title: "Building a Modern Blog with Next.js 15 and MDX"
description: "Learn how to create a fast, SEO-friendly blog using Next.js 15, MDX, and Cloudflare Pages."
date: "2025-10-18"
thumbnail: "/thumbnails/nextjs-blog.png"
tags: ["nextjs", "mdx", "cloudflare"]
author: "Jeongwonshin"
---

# Building a Modern Blog with Next.js 15 and MDX

In this post, we'll explore how to build a performant, developer-friendly blog using the latest tools.

## Why Next.js 15?

Next.js 15 brings several improvements:

- React 19 support
- Improved App Router performance
- Better TypeScript integration

## Setting Up MDX

MDX allows you to use JSX components in Markdown:

```typescript
import { Callout } from "@/components/Callout";

<Callout type="info">This is a custom component inside MDX!</Callout>;
```
````

## Deploying to Cloudflare

Cloudflare Pages offers edge performance with zero configuration:

```bash
pnpm build
npx wrangler pages deploy .cloudflare/dist
```

## Conclusion

Next.js 15 + MDX + Cloudflare = Fast, modern, developer-friendly blogging.

```

---

## 🎯 Next Steps

1. **Review and Approve PRD**
2. **Initialize Project:**
   - Create Next.js 15 app with TypeScript
   - Install all dependencies
   - Configure Biome, ESLint, Tailwind
3. **Phase 1: Foundation** (Days 1-2)
4. **Phase 2: Core Components** (Days 3-4)
5. **Phase 3: MDX Infrastructure** (Days 5-6)
6. **Phase 4: Page Implementation** (Days 7-9)
7. **Phase 5: Styling & Content** (Days 10-11)
8. **Phase 6: Testing & Optimization** (Days 12-13)
9. **Phase 7: Cloudflare Deployment** (Day 14)

---

**Document Owner:** Jeongwonshin
**Stakeholders:** Development Team
**Review Cycle:** Weekly
**Questions?** Open an issue or discussion on GitHub.
```
