import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';
import Link from 'next/link';

// Custom components for MDX
export const mdxComponents: MDXComponents = {
  // Headings
  h1: ({ children, ...props }) => (
    <h1
      className="mb-6 mt-8 scroll-m-20 text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2
      className="mb-4 mt-8 scroll-m-20 text-3xl font-semibold tracking-tight text-gray-900 first:mt-0 dark:text-gray-100"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      className="mb-3 mt-6 scroll-m-20 text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100"
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4
      className="mb-2 mt-4 scroll-m-20 text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100"
      {...props}
    >
      {children}
    </h4>
  ),
  h5: ({ children, ...props }) => (
    <h5
      className="mb-2 mt-4 scroll-m-20 text-lg font-semibold tracking-tight text-gray-900 dark:text-gray-100"
      {...props}
    >
      {children}
    </h5>
  ),
  h6: ({ children, ...props }) => (
    <h6
      className="mb-2 mt-4 scroll-m-20 text-base font-semibold tracking-tight text-gray-900 dark:text-gray-100"
      {...props}
    >
      {children}
    </h6>
  ),

  // Paragraph
  p: ({ children, ...props }) => (
    <p className="mb-4 leading-7 text-gray-700 dark:text-gray-300" {...props}>
      {children}
    </p>
  ),

  // Links
  a: ({ href, children, ...props }) => {
    const isExternal = href?.startsWith('http');
    const Component = isExternal ? 'a' : Link;

    return (
      <Component
        href={href || ''}
        className="font-medium text-blue-600 underline decoration-blue-600/30 underline-offset-2 transition-colors hover:text-blue-700 hover:decoration-blue-700/50 dark:text-blue-400 dark:decoration-blue-400/30 dark:hover:text-blue-300 dark:hover:decoration-blue-300/50"
        {...(isExternal && {
          target: '_blank',
          rel: 'noopener noreferrer',
        })}
        {...props}
      >
        {children}
      </Component>
    );
  },

  // Lists
  ul: ({ children, ...props }) => (
    <ul className="mb-4 ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="mb-4 ml-6 list-decimal space-y-2 text-gray-700 dark:text-gray-300" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="leading-7" {...props}>
      {children}
    </li>
  ),

  // Blockquote
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="my-6 border-l-4 border-gray-300 pl-4 italic text-gray-700 dark:border-gray-700 dark:text-gray-300"
      {...props}
    >
      {children}
    </blockquote>
  ),

  // Code (inline code with backticks)
  // Styling is handled in globals.css via :not(pre) > code selector
  code: ({ children, ...props }) => <code {...props}>{children}</code>,

  // Pre (code blocks are handled by rehype-pretty-code)
  // Styling is handled in globals.css to work with rehype-pretty-code
  pre: ({ children, ...props }) => <pre {...props}>{children}</pre>,

  // Horizontal rule
  hr: (props) => <hr className="my-8 border-t border-gray-200 dark:border-gray-800" {...props} />,

  // Table
  table: ({ children, ...props }) => (
    <div className="my-6 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead className="bg-gray-50 dark:bg-gray-900" {...props}>
      {children}
    </thead>
  ),
  tbody: ({ children, ...props }) => (
    <tbody
      className="divide-y divide-gray-200 bg-white dark:divide-gray-800 dark:bg-gray-950"
      {...props}
    >
      {children}
    </tbody>
  ),
  tr: ({ children, ...props }) => <tr {...props}>{children}</tr>,
  th: ({ children, ...props }) => (
    <th
      className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-300"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300" {...props}>
      {children}
    </td>
  ),

  // Image
  img: ({ src, alt, ...props }) => {
    if (!src) return null;
    return (
      <span className="my-6 block">
        <Image
          src={src}
          alt={alt || ''}
          width={800}
          height={400}
          className="rounded-lg"
          {...props}
        />
      </span>
    );
  },

  // Strong
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-gray-900 dark:text-gray-100" {...props}>
      {children}
    </strong>
  ),

  // Emphasis
  em: ({ children, ...props }) => (
    <em className="italic" {...props}>
      {children}
    </em>
  ),
};

// Wrapper component for MDX content
interface MDXContentProps {
  children: React.ReactNode;
}

export function MDXContent({ children }: MDXContentProps) {
  return (
    <article className="prose prose-gray mx-auto max-w-none dark:prose-invert">{children}</article>
  );
}
