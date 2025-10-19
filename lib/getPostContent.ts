import fs from 'node:fs';
import path from 'node:path';
import { convertDateToString } from './dateUtils';
import type { PostMetadata } from './getPostMetadata';
import { calculateReadingTime, compileMDXContent } from './mdx';

const postsDirectory = path.join(process.cwd(), 'app/blog/posts');

export interface PostContent {
  metadata: PostMetadata;
  content: React.ReactElement;
  readingTime: number;
  source: string;
}

/**
 * Get post content and metadata by slug
 */
export async function getPostContent(slug: string): Promise<PostContent | null> {
  try {
    const filePath = path.join(postsDirectory, `${slug}.mdx`);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.warn(`Post not found: ${slug}`);
      return null;
    }

    // Read file content
    const source = fs.readFileSync(filePath, 'utf8');

    // Compile MDX
    const { content, frontmatter } = await compileMDXContent<PostMetadata>(source);

    // Calculate reading time
    const readingTime = calculateReadingTime(source);

    return {
      metadata: {
        slug,
        title: frontmatter.title || 'Untitled',
        description: frontmatter.description || '',
        date: convertDateToString(frontmatter.date),
        thumbnail: frontmatter.thumbnail,
        tags: frontmatter.tags || [],
        author: frontmatter.author,
        draft: frontmatter.draft,
      },
      content,
      readingTime,
      source,
    };
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error);
    return null;
  }
}

/**
 * Get adjacent posts (previous and next)
 */
export interface AdjacentPosts {
  previous: Pick<PostMetadata, 'slug' | 'title'> | null;
  next: Pick<PostMetadata, 'slug' | 'title'> | null;
}

export async function getAdjacentPosts(
  currentSlug: string,
  allSlugs: string[]
): Promise<AdjacentPosts> {
  const currentIndex = allSlugs.indexOf(currentSlug);

  if (currentIndex === -1) {
    return { previous: null, next: null };
  }

  const previousSlug = currentIndex > 0 ? allSlugs[currentIndex - 1] : null;
  const nextSlug = currentIndex < allSlugs.length - 1 ? allSlugs[currentIndex + 1] : null;

  const previous = previousSlug ? await getPostMetadataFromFile(previousSlug) : null;
  const next = nextSlug ? await getPostMetadataFromFile(nextSlug) : null;

  return {
    previous: previous ? { slug: previous.slug, title: previous.title } : null,
    next: next ? { slug: next.slug, title: next.title } : null,
  };
}

/**
 * Helper function to get metadata from a single file
 */
async function getPostMetadataFromFile(slug: string): Promise<PostMetadata | null> {
  try {
    const filePath = path.join(postsDirectory, `${slug}.mdx`);

    if (!fs.existsSync(filePath)) {
      return null;
    }

    const source = fs.readFileSync(filePath, 'utf8');
    const { frontmatter } = await compileMDXContent<PostMetadata>(source);

    return {
      slug,
      title: frontmatter.title || 'Untitled',
      description: frontmatter.description || '',
      date: convertDateToString(frontmatter.date),
      thumbnail: frontmatter.thumbnail,
      tags: frontmatter.tags || [],
      author: frontmatter.author,
      draft: frontmatter.draft,
    };
  } catch (error) {
    console.error(`Error loading metadata for ${slug}:`, error);
    return null;
  }
}
