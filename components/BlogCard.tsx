import { Calendar, User } from 'lucide-react';
import Link from 'next/link';
import { MemoChip } from './MemoChip';

interface BlogCardProps {
  slug: string;
  title: string;
  description: string;
  date?: string;
  thumbnail?: string;
  tags?: string[];
  index: number;
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

export function BlogCard({ slug, title, description, date, tags, index }: BlogCardProps) {
  const readTime = calculateReadTime(description);

  // Alternate slight rotations for a more natural, handwritten note feel
  const rotations = ['-0.5deg', '0.5deg', '-0.8deg', '0.3deg', '-0.3deg', '0.6deg'];
  const rotation = rotations[index % rotations.length];

  return (
    <Link
      href={`/${slug}`}
      className="group relative block p-2 sm:p-4 md:p-6 transition-all duration-300 hover:scale-[1.02]"
      style={{
        transform: `rotate(${rotation})`,
        transformOrigin: 'center',
      }}
    >
      {/* Note card with shadow */}
      <div
        className="relative rounded-sm p-4 sm:p-5 md:p-6 shadow-md transition-shadow hover:shadow-lg"
        style={{
          backgroundColor: 'var(--folder-paper)',
          boxShadow: '2px 3px 8px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08)',
        }}
      >
        {/* Corner fold effect (top-right) */}
        <div
          className="absolute right-0 top-0 h-6 w-6 overflow-hidden"
          style={{ transform: 'rotate(0deg)' }}
        >
          <div
            className="absolute right-0 top-0 h-8 w-8 border-r-2 border-t-2"
            style={{
              backgroundColor: 'var(--folder-bg-light)',
              borderColor: 'var(--folder-border-light)',
              transform: 'rotate(45deg) translate(50%, -50%)',
              transformOrigin: 'top right',
              opacity: 0.3,
            }}
          />
        </div>

        {/* Title with underline (handwritten style) */}
        <div className="relative mb-4 pb-3">
          <h3 className="mb-2 font-bold text-lg" style={{ color: 'var(--folder-text-dark)' }}>
            {title}
          </h3>
          {/* Hand-drawn underline */}
          <svg
            width="100%"
            height="3"
            viewBox="0 0 200 3"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="opacity-30"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <title>Decorative underline</title>
            <path
              d="M 0 1.5 Q 50 1, 100 1.5 T 200 1.5"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              style={{ color: 'var(--folder-turquoise-dark)' }}
            />
          </svg>
        </div>

        {/* Tags/Chips */}
        {tags && tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <MemoChip key={tag} label={tag} />
            ))}
          </div>
        )}

        {/* Excerpt text */}
        <p
          className="mb-5 leading-relaxed"
          style={{
            color: 'var(--folder-text-dark)',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          {description}
        </p>

        {/* Metadata - styled like handwritten notes */}
        <div
          className="flex flex-wrap items-center gap-3 pt-2 text-sm"
          style={{ color: 'var(--folder-text-light)' }}
        >
          <div className="flex items-center gap-1.5">
            <User className="h-3.5 w-3.5" style={{ color: 'var(--folder-turquoise-dark)' }} />
            <span style={{ color: 'var(--folder-text-medium)' }}>Jeongwon Shin</span>
          </div>
          {date && (
            <>
              <span className="opacity-40">•</span>
              <div className="flex items-center gap-1.5">
                <Calendar
                  className="h-3.5 w-3.5"
                  style={{ color: 'var(--folder-turquoise-dark)' }}
                />
                <span>{formatDate(date)}</span>
              </div>
            </>
          )}
          <span className="opacity-40">•</span>
          <span>{readTime}</span>
        </div>

        {/* Subtle ruled line pattern in background (like notepad paper) */}
        <div className="pointer-events-none absolute inset-0 opacity-5" style={{ zIndex: 0 }}>
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={`${slug}-line-${i}`}
              className="border-t"
              style={{
                borderColor: 'var(--folder-line)',
                marginTop: i === 0 ? '40px' : '28px',
              }}
            />
          ))}
        </div>
      </div>
    </Link>
  );
}
