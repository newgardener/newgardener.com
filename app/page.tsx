import type { Metadata } from 'next';
import { FolderBlogLayout } from '@/components/FolderBlogLayout';
import { getPostMetadata } from '@/lib/getPostMetadata';

export const metadata: Metadata = {
  title: 'jeongwonshin.dev',
  description:
    'Technical articles about frontend architecture, React, Next.js, TypeScript, and modern web development.',
};

export default function HomePage() {
  const posts = getPostMetadata();

  return <FolderBlogLayout posts={posts} />;
}
