# Memos from jeongwon - Tech Blog

A minimalist, documentation-style blog inspired by React and Next.js official documentation.

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5.7+
- **Styling**: Tailwind CSS 4.x
- **Content**: MDX with syntax highlighting
- **Code Quality**: Biome.js + ESLint v9
- **Deployment**: Cloudflare Pages
- **Package Manager**: pnpm (managed via corepack)

## 📦 Installation

### Prerequisites

- Node.js 24+
- Corepack enabled

```bash
# Enable corepack (if not already enabled)
corepack enable

# Install dependencies
pnpm install
```

## 🛠️ Development

```bash
# Start dev server with Turbopack
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## 🧹 Code Quality

```bash
# Format code
pnpm format

# Lint code
pnpm lint

# Check all (format + lint + organize imports)
pnpm check

# Type check
pnpm type-check
```

## 🌐 Deployment

### Cloudflare Pages

```bash
# Build for Cloudflare
pnpm build

# Deploy to Cloudflare Pages
pnpm cloudflare:build

# Or use wrangler directly
npx wrangler pages deploy .cloudflare/dist
```

### Environment Variables

No environment variables required for basic setup.

## 📁 Project Structure

```
jeongwonshin-blog/
├── app/                    # Next.js app directory
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Global styles
│   └── blog/
│       ├── [slug]/         # Blog post pages
│       └── posts/          # MDX blog posts
├── components/             # React components
├── lib/                    # Utility functions
├── public/                 # Static assets
│   ├── thumbnails/         # Blog post thumbnails
│   └── images/             # Other images
├── biome.json              # Biome configuration
├── eslint.config.js        # ESLint v9 flat config
├── tailwind.config.ts      # Tailwind configuration
├── next.config.ts          # Next.js configuration
├── wrangler.toml           # Cloudflare configuration
└── PRD.md                  # Product requirements
```

## ✨ Features

- ✅ MDX support with syntax highlighting
- ✅ Dark mode (system preference detection)
- ✅ Geist Sans & Geist Mono fonts
- ✅ Responsive design
- ✅ SEO optimized
- ✅ Static site generation
- ✅ Code quality tooling (Biome + ESLint)
- ✅ Cloudflare Pages deployment ready

## 📝 Writing Blog Posts

Create MDX files in `app/blog/posts/`:

```mdx
---
title: "Your Post Title"
description: "Brief description"
date: "2025-10-18"
thumbnail: "/thumbnails/your-image.png"
tags: ["nextjs", "react"]
author: "Your Name"
---

# Your Post Title

Your content here...

## Code Example

\`\`\`typescript
const example = "Hello, World!";
\`\`\`
```

## 🎨 Customization

### Colors

Edit `tailwind.config.ts` to customize the color palette:

```typescript
colors: {
  light: {
    bg: '#ffffff',
    text: '#111111',
    accent: '#0070f3',
  },
  dark: {
    bg: '#0a0a0a',
    text: '#ededed',
    accent: '#3b82f6',
  },
}
```

### Fonts

Fonts are configured in `app/layout.tsx` using the Geist font family.

### Syntax Highlighting

Themes are configured in `next.config.ts`:

```typescript
theme: {
  dark: 'github-dark',
  light: 'github-light',
}
```

## 📚 Documentation

- [Next.js 15 Docs](https://nextjs.org/docs)
- [Tailwind CSS 4.0 Docs](https://tailwindcss.com/docs)
- [Biome.js Docs](https://biomejs.dev)
- [MDX Docs](https://mdxjs.com)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages)

## 🔄 Current Status

**Phase 1: COMPLETE ✅**

The project foundation is fully set up. Next steps:
- Phase 2: Core components (Header, BlogCard, etc.)
- Phase 3: MDX infrastructure
- Phase 4: Page implementation
- Phase 5: Content and styling polish

See [SETUP_SUMMARY.md](./SETUP_SUMMARY.md) for detailed setup information.

## 📄 License

MIT

## 👤 Author

Jeongwonshin

---

**Built with** ❤️ **using Next.js 16, TypeScript, and Tailwind CSS**
