import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FountainPenDivider } from '@/components/FountainPenDivider';
import { Giscus } from '@/components/Giscus';
import { MemoChip } from '@/components/MemoChip';
import { PostNavigation } from '@/components/PostNavigation';
import { TableOfContents } from '@/components/TableOfContents';
import { getAdjacentPosts, getPostContent } from '@/lib/getPostContent';
import { getAllPostSlugs } from '@/lib/getPostMetadata';
import { getTableOfContents } from '@/lib/getTableOfContents';
import { formatDate } from '@/lib/mdx';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostContent(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.metadata.title} | Jeongwonshin.dev`,
    description: post.metadata.description,
    authors: post.metadata.author ? [{ name: post.metadata.author }] : undefined,
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.description,
      type: 'article',
      publishedTime: post.metadata.date,
      authors: post.metadata.author ? [post.metadata.author] : undefined,
      images: post.metadata.thumbnail ? [{ url: post.metadata.thumbnail }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metadata.title,
      description: post.metadata.description,
      images: post.metadata.thumbnail ? [post.metadata.thumbnail] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostContent(slug);

  if (!post) {
    notFound();
  }

  // Get table of contents from the source
  const toc = getTableOfContents(post.source);

  // Get adjacent posts for navigation
  const allSlugs = getAllPostSlugs();
  const adjacentPosts = await getAdjacentPosts(slug, allSlugs);

  return (
    <div className="min-h-screen py-12 px-4" style={{ backgroundColor: 'var(--folder-bg-light)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="lg:flex lg:gap-12 pb-16">
          {/* Main Content */}
          <article className="min-w-0 flex-1">
            {/* Back Button */}
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:scale-105"
              style={{
                color: 'var(--folder-text-medium)',
                backgroundColor: 'var(--folder-paper)',
                border: '1px solid var(--folder-border-light)',
              }}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Blog</span>
            </Link>

            {/* Main Content Container - Clean white paper */}
            <div
              className="rounded-lg shadow-lg"
              style={{ backgroundColor: 'var(--folder-paper)' }}
            >
              {/* Header Section - Top of the note */}
              <div className="p-10 pb-6">
                {/* Title with hand-drawn underline */}
                <div className="mb-6">
                  <h1
                    className="mb-4 text-5xl font-bold"
                    style={{ color: 'var(--folder-text-dark)' }}
                  >
                    {post.metadata.title}
                  </h1>
                  {/* Hand-drawn underline for title */}
                  <svg
                    width="100%"
                    height="4"
                    viewBox="0 0 400 4"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="opacity-30"
                    preserveAspectRatio="none"
                  >
                    <title>Decorative title underline</title>
                    <path
                      d="M 0 2 Q 100 1, 200 2 T 400 2"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      style={{ color: 'var(--folder-turquoise-dark)' }}
                    />
                  </svg>
                </div>

                {/* Metadata row */}
                <div
                  className="flex flex-wrap items-center gap-4 mb-4 text-sm"
                  style={{ color: 'var(--folder-text-medium)' }}
                >
                  <div className="flex items-center gap-2">
                    <Calendar
                      className="w-4 h-4"
                      style={{ color: 'var(--folder-turquoise-dark)' }}
                    />
                    <time dateTime={post.metadata.date}>{formatDate(post.metadata.date)}</time>
                  </div>
                  <span className="opacity-40">•</span>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" style={{ color: 'var(--folder-turquoise-dark)' }} />
                    <span>{post.readingTime} min read</span>
                  </div>
                </div>

                {/* Tags */}
                {post.metadata.tags && post.metadata.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.metadata.tags.map((tag) => (
                      <MemoChip key={tag} label={tag} />
                    ))}
                  </div>
                )}
              </div>

              <div className="px-10">
                <FountainPenDivider />
              </div>

              {/* MDX Content Area */}
              <div className="p-10 pt-6">{post.content}</div>

              {/* Previous/Next Navigation */}
              <PostNavigation previous={adjacentPosts.previous} next={adjacentPosts.next} />
            </div>
          </article>

          {/* Table of Contents Sidebar */}
          {toc.length > 0 && (
            <aside className="hidden lg:block lg:w-64 lg:flex-shrink-0">
              <div className="sticky top-24">
                <TableOfContents items={toc} />
              </div>
            </aside>
          )}
        </div>
        <Giscus />
      </div>
    </div>
  );
}
