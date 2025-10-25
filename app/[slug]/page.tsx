import { ArrowLeft, ArrowRight, Calendar, Clock } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
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
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="lg:flex lg:gap-12">
        {/* Main Content */}
        <article className="min-w-0 flex-1">
          {/* Back Link */}
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          {/* Post Header */}
          <header className="mb-8">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 md:text-5xl">
              {post.metadata.title}
            </h1>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-4 text-base text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.metadata.date}>{formatDate(post.metadata.date)}</time>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{post.readingTime} min read</span>
              </div>
            </div>

            {/* Tags */}
            {post.metadata.tags && post.metadata.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {post.metadata.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-gray-100 px-3 py-1 text-base font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* MDX Content */}
          <div className="prose prose-gray max-w-none dark:prose-invert prose-headings:scroll-mt-24 prose-a:text-blue-600 prose-a:transition-colors hover:prose-a:text-blue-700 dark:prose-a:text-blue-400 dark:hover:prose-a:text-blue-300 prose-code:text-gray-800 prose-code:before:content-none prose-code:after:content-none dark:prose-code:text-gray-200">
            {post.content}
          </div>

          {/* Previous/Next Navigation */}
          {(adjacentPosts.previous || adjacentPosts.next) && (
            <nav className="mt-16 border-t border-gray-200 pt-8 dark:border-gray-800">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {/* Previous Post */}
                {adjacentPosts.previous ? (
                  <Link
                    href={`/${adjacentPosts.previous.slug}`}
                    className="group flex flex-col rounded-lg border border-gray-200 p-6 transition-colors hover:border-gray-300 hover:bg-gray-50 dark:border-gray-800 dark:hover:border-gray-700 dark:hover:bg-gray-900"
                  >
                    <span className="mb-2 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <ArrowLeft className="h-4 w-4" />
                      Previous
                    </span>
                    <span className="font-semibold text-gray-900 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
                      {adjacentPosts.previous.title}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}

                {/* Next Post */}
                {adjacentPosts.next && (
                  <Link
                    href={`/${adjacentPosts.next.slug}`}
                    className="group flex flex-col rounded-lg border border-gray-200 p-6 text-right transition-colors hover:border-gray-300 hover:bg-gray-50 dark:border-gray-800 dark:hover:border-gray-700 dark:hover:bg-gray-900"
                  >
                    <span className="mb-2 flex items-center justify-end gap-2 text-sm text-gray-600 dark:text-gray-400">
                      Next
                      <ArrowRight className="h-4 w-4" />
                    </span>
                    <span className="font-semibold text-gray-900 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
                      {adjacentPosts.next.title}
                    </span>
                  </Link>
                )}
              </div>
            </nav>
          )}
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
    </div>
  );
}
