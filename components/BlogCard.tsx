import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface BlogCardProps {
  slug: string;
  title: string;
  description: string;
  date?: string;
  thumbnail?: string;
  tags?: string[];
  icon?: React.ReactNode;
}

export function BlogCard({ slug, title, description, date, thumbnail, tags, icon }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-200 hover:border-gray-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-700"
    >
      {/* Thumbnail / Illustration Area */}
      <div className="relative mb-6 flex h-48 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : icon ? (
          <div className="flex h-24 w-24 items-center justify-center text-gray-400 dark:text-gray-600">
            {icon}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-2 text-gray-300 dark:text-gray-700">
            <div className="h-16 w-16 rounded-lg bg-gray-200 dark:bg-gray-800" />
            <div className="h-2 w-24 rounded bg-gray-200 dark:bg-gray-800" />
            <div className="h-2 w-16 rounded bg-gray-200 dark:bg-gray-800" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col">
        {/* Title */}
        <h3 className="mb-3 text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
          {title}
        </h3>

        {/* Description */}
        <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          {description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          {/* Tags or Date */}
          {tags && tags.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : date ? (
            <span className="text-xs text-gray-500 dark:text-gray-500">{formatDate(date)}</span>
          ) : (
            <div />
          )}

          {/* Arrow Icon */}
          <ArrowRight className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-gray-600 dark:text-gray-600 dark:group-hover:text-gray-400" />
        </div>
      </div>
    </Link>
  );
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
