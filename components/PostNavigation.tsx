import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { FountainPenDivider } from './FountainPenDivider';

interface AdjacentPost {
  slug: string;
  title: string;
}

interface PostNavigationProps {
  previous: AdjacentPost | null;
  next: AdjacentPost | null;
}

export function PostNavigation({ previous, next }: PostNavigationProps) {
  if (!previous && !next) {
    return null;
  }

  return (
    <>
      <div className="px-10">
        <FountainPenDivider />
      </div>
      <div className="grid grid-cols-1 gap-6 px-10 pb-10 pt-6 md:grid-cols-2">
        {/* Previous Post */}
        {previous ? (
          <Link
            href={`/${previous.slug}`}
            className="group flex flex-col rounded-lg p-6 transition-all hover:scale-[1.02]"
            style={{
              backgroundColor: 'var(--folder-bg-light)',
              border: '1px solid var(--folder-border-light)',
            }}
          >
            <span
              className="mb-2 flex items-center gap-2 text-sm"
              style={{ color: 'var(--folder-text-medium)' }}
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </span>
            <span
              className="font-semibold group-hover:opacity-80"
              style={{ color: 'var(--folder-turquoise-dark)' }}
            >
              {previous.title}
            </span>
          </Link>
        ) : (
          <div />
        )}

        {/* Next Post */}
        {next && (
          <Link
            href={`/${next.slug}`}
            className="group flex flex-col rounded-lg p-6 text-right transition-all hover:scale-[1.02]"
            style={{
              backgroundColor: 'var(--folder-bg-light)',
              border: '1px solid var(--folder-border-light)',
            }}
          >
            <span
              className="mb-2 flex items-center justify-end gap-2 text-sm"
              style={{ color: 'var(--folder-text-medium)' }}
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </span>
            <span
              className="font-semibold group-hover:opacity-80"
              style={{ color: 'var(--folder-turquoise-dark)' }}
            >
              {next.title}
            </span>
          </Link>
        )}
      </div>
    </>
  );
}
