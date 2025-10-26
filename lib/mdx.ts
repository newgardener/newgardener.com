import { compileMDX } from 'next-mdx-remote/rsc';
import { mdxComponents } from '@/components/MDXContent';
import { getMDXOptions } from './mdx-config';

interface CompileMDXResult<TFrontmatter> {
  content: React.ReactElement;
  frontmatter: TFrontmatter;
}

/**
 * Compile MDX content with rehype and remark plugins
 */
export async function compileMDXContent<TFrontmatter = Record<string, unknown>>(
  source: string
): Promise<CompileMDXResult<TFrontmatter>> {
  const { content, frontmatter } = await compileMDX<TFrontmatter>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: getMDXOptions() as any,
    },
    components: mdxComponents,
  });

  return {
    content,
    frontmatter,
  };
}

/**
 * Extract plain text from MDX content (useful for excerpts)
 */
export function extractExcerpt(content: string, maxLength = 160): string {
  // Remove frontmatter
  const withoutFrontmatter = content.replace(/^---[\s\S]*?---/, '');

  // Remove MDX/JSX components
  const withoutComponents = withoutFrontmatter.replace(/<[^>]*>/g, '');

  // Remove markdown syntax
  const plainText = withoutComponents
    .replace(/#{1,6}\s/g, '') // headings
    .replace(/\*\*(.+?)\*\*/g, '$1') // bold
    .replace(/\*(.+?)\*/g, '$1') // italic
    .replace(/\[(.+?)\]\(.+?\)/g, '$1') // links
    .replace(/`(.+?)`/g, '$1') // inline code
    .replace(/```[\s\S]*?```/g, '') // code blocks
    .trim();

  // Truncate to maxLength
  if (plainText.length > maxLength) {
    return `${plainText.slice(0, maxLength).trim()}...`;
  }

  return plainText;
}

/**
 * Validate frontmatter has required fields
 */
export function validateFrontmatter(
  frontmatter: Record<string, unknown>,
  requiredFields: string[]
): boolean {
  return requiredFields.every((field) => {
    const value = frontmatter[field];
    return value !== undefined && value !== null && value !== '';
  });
}

/**
 * Format date string
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Calculate reading time in minutes
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}
