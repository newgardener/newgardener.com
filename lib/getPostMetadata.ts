import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { convertDateToString } from './dateUtils';

export interface PostMetadata {
  slug: string;
  title: string;
  description: string;
  date: string;
  thumbnail?: string;
  tags?: string[];
  category?: string;
  author?: string;
  draft?: boolean;
}

const postsDirectory = path.join(process.cwd(), 'app/blog/posts');

/**
 * Get all post metadata from MDX files
 */
export function getPostMetadata(): PostMetadata[] {
  // Check if posts directory exists
  if (!fs.existsSync(postsDirectory)) {
    console.warn(`Posts directory not found: ${postsDirectory}`);
    return [];
  }

  // Get all MDX files
  const files = fs.readdirSync(postsDirectory);
  const mdxFiles = files.filter((file) => file.endsWith('.mdx'));

  // Parse each file and extract frontmatter
  const posts = mdxFiles.map((filename) => {
    const slug = filename.replace('.mdx', '');
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');

    // Parse frontmatter
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title || 'Untitled',
      description: data.description || '',
      date: convertDateToString(data.date),
      thumbnail: data.thumbnail,
      tags: data.tags || [],
      category: data.category || 'All',
      author: data.author,
      draft: data.draft || false,
    } as PostMetadata;
  });

  // Filter out drafts in production
  const filteredPosts =
    process.env.NODE_ENV === 'production' ? posts.filter((post) => !post.draft) : posts;

  // Sort by date (newest first)
  return filteredPosts.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
}

/**
 * Get metadata for a single post by slug
 */
export function getPostMetadataBySlug(slug: string): PostMetadata | null {
  const allPosts = getPostMetadata();
  return allPosts.find((post) => post.slug === slug) || null;
}

/**
 * Get all unique tags from all posts
 */
export function getAllTags(): string[] {
  const posts = getPostMetadata();
  const tagSet = new Set<string>();

  for (const post of posts) {
    if (post.tags) {
      for (const tag of post.tags) {
        tagSet.add(tag);
      }
    }
  }

  return Array.from(tagSet).sort();
}

/**
 * Get posts by tag
 */
export function getPostsByTag(tag: string): PostMetadata[] {
  const posts = getPostMetadata();
  return posts.filter((post) => post.tags?.includes(tag));
}

/**
 * Get all post slugs (for static generation)
 */
export function getAllPostSlugs(): string[] {
  const posts = getPostMetadata();
  return posts.map((post) => post.slug);
}

/**
 * Check if a post exists
 */
export function postExists(slug: string): boolean {
  const filePath = path.join(postsDirectory, `${slug}.mdx`);
  return fs.existsSync(filePath);
}
