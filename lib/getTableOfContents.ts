import type { ReactElement } from 'react';

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

/**
 * Extract table of contents from MDX source
 * Parses h2 and h3 headings from markdown content
 */
export function getTableOfContents(source: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: TocItem[] = [];

  let match = headingRegex.exec(source);
  while (match !== null) {
    const level = match[1].length as 2 | 3;
    const text = match[2].trim();

    // Generate ID from heading text (same logic as rehype-slug)
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .trim();

    headings.push({ id, text, level });
    match = headingRegex.exec(source);
  }

  return headings;
}

/**
 * Extract table of contents from compiled MDX content
 * Useful when you already have the compiled React element
 */
export function extractTocFromElement(element: ReactElement): TocItem[] {
  const headings: TocItem[] = [];

  function isHeadingElement(node: ReactElement): boolean {
    return typeof node.type === 'string' && (node.type === 'h2' || node.type === 'h3');
  }

  function extractHeading(node: ReactElement): void {
    const level = node.type as 'h2' | 'h3';
    const props = node.props as { id?: string; children?: React.ReactNode };
    const id = props.id || '';
    const text = extractTextFromChildren(props.children);

    if (id && text) {
      headings.push({ id, text, level: level === 'h2' ? 2 : 3 });
    }
  }

  function traverseChildren(children: React.ReactNode): void {
    if (Array.isArray(children)) {
      for (const child of children) {
        traverse(child as ReactElement);
      }
    } else {
      traverse(children as ReactElement);
    }
  }

  function traverse(node: ReactElement | string | null | undefined): void {
    if (!node || typeof node === 'string') return;

    if (isHeadingElement(node)) {
      extractHeading(node);
    }

    const props = node.props as { children?: React.ReactNode };
    if (props.children) {
      traverseChildren(props.children);
    }
  }

  traverse(element);
  return headings;
}

/**
 * Extract plain text from React children
 */
function extractTextFromChildren(children: React.ReactNode): string {
  if (typeof children === 'string') {
    return children;
  }

  if (Array.isArray(children)) {
    return children.map(extractTextFromChildren).join('');
  }

  if (children && typeof children === 'object' && 'props' in children) {
    const element = children as ReactElement;
    const props = element.props as { children?: React.ReactNode };
    return extractTextFromChildren(props.children);
  }

  return '';
}
