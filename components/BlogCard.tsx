import { Calendar, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface BlogCardProps {
  slug: string;
  title: string;
  description: string;
  date?: string;
  thumbnail?: string;
  tags?: string[];
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function calculateReadTime(description: string): string {
  // Simple estimation: ~200 words per minute
  const words = description.split(' ').length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

export function BlogCard({ slug, title, description, date, thumbnail, tags }: BlogCardProps) {
  const readTime = calculateReadTime(description);

  return (
    <Link
      href={`/${slug}`}
      className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md"
    >
      {/* Thumbnail */}
      {thumbnail && (
        <div className="relative h-40 w-full overflow-hidden bg-gray-100">
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover transition-transform duration-200 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      <div className="p-6">
        {/* Title */}
        <h3 className="mb-3 text-lg font-semibold tracking-tight text-gray-900">{title}</h3>

        {/* Description */}
        <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-600">{description}</p>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer Metadata */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
          {date && (
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(date)}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>{readTime}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
