import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

// Types for rehype-pretty-code node objects
interface RehypeNode {
  type: string;
  value?: string;
  children: RehypeNode[];
  properties?: {
    className?: string[];
    [key: string]: unknown;
  };
}

/**
 * Get MDX options for compilation
 * This is in a separate file to avoid serialization issues in production builds
 */
export function getMDXOptions() {
  return {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: {
            dark: 'houston',
            light: 'github-light',
          },
          keepBackground: true,
          defaultLang: 'plaintext',
          onVisitLine(node: RehypeNode) {
            // Prevent lines from collapsing in `display: grid` mode
            if (node.children.length === 0) {
              node.children = [{ type: 'text', value: ' ', children: [] }];
            }
          },
          onVisitHighlightedLine(node: RehypeNode) {
            node.properties?.className?.push('highlighted');
          },
          onVisitHighlightedChars(node: RehypeNode) {
            if (node.properties) {
              node.properties.className = ['word'];
            }
          },
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
          properties: {
            className: ['anchor'],
          },
        },
      ],
    ],
  };
}
