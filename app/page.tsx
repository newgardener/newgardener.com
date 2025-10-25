import type { Metadata } from 'next';
import { BlogCard } from '@/components/BlogCard';
import { getPostMetadata } from '@/lib/getPostMetadata';

export const metadata: Metadata = {
  title: 'jeongwonshin.dev',
  description:
    'Technical articles about frontend architecture, React, Next.js, TypeScript, and modern web development.',
};

export default function HomePage() {
  const posts = getPostMetadata();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 md:text-5xl">
          Blog
        </h1>
      </div>

      {/* Posts Grid */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard
              key={post.slug}
              slug={post.slug}
              title={post.title}
              description={post.description}
              date={post.date}
              thumbnail={post.thumbnail}
              tags={post.tags}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-12 text-center dark:border-gray-800 dark:bg-gray-900">
          <p className="text-gray-600 dark:text-gray-400">
            No blog posts published yet. Check back soon!
          </p>
        </div>
      )}

      {/* Stats Section */}
      <div className="mt-16 border-t border-gray-200 pt-8 dark:border-gray-800">
        <p className="text-center text-sm text-gray-500 dark:text-gray-500">
          {posts.length} {posts.length === 1 ? 'article' : 'articles'} published
        </p>
      </div>
    </div>
  );
}
