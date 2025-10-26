'use client';

import { useEffect, useState } from 'react';

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      {
        rootMargin: '0% 0% -80% 0%',
        threshold: 1,
      }
    );

    // Observe all heading elements
    for (const { id } of items) {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    }

    return () => {
      for (const { id } of items) {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      }
    };
  }, [items]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 120; // Account for sticky header + padding
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      // Update URL without scrolling
      window.history.pushState(null, '', `#${id}`);
      setActiveId(id);
    }
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <nav
      className="sticky top-24 hidden h-fit max-h-[calc(100vh-6rem)] overflow-y-auto lg:block"
      aria-label="Table of contents"
    >
      <div
        className="p-6 rounded-lg border shadow-sm"
        style={{
          backgroundColor: 'var(--folder-paper)',
          borderColor: 'var(--folder-border-light)',
        }}
      >
        {/* Title with hand-drawn underline */}
        <div className="mb-4">
          <h4 className="mb-1 text-sm font-semibold" style={{ color: 'var(--folder-text-dark)' }}>
            On This Page
          </h4>
          {/* Hand-drawn underline */}
          <svg
            width="100%"
            height="2"
            viewBox="0 0 200 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="opacity-30"
            preserveAspectRatio="none"
          >
            <title>Decorative underline</title>
            <path
              d="M 0 1 Q 50 0.5, 100 1 T 200 1"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              style={{ color: 'var(--folder-turquoise-dark)' }}
            />
          </svg>
        </div>

        {/* Navigation list */}
        <ul className="space-y-1 text-sm">
          {items.map((item) => {
            const isActive = activeId === item.id;
            const isH3 = item.level === 3;
            // Calculate indentation based on heading level
            const indent = isH3 ? 16 : 0;

            return (
              <li key={item.id} style={{ paddingLeft: `${indent}px` }}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item.id)}
                  className="relative block py-1.5 px-3 -ml-3 rounded transition-all"
                  style={{
                    color: isActive ? 'var(--folder-turquoise-dark)' : 'var(--folder-text-medium)',
                    backgroundColor: isActive ? 'var(--folder-bg-light)' : 'transparent',
                  }}
                >
                  {/* Active indicator bar */}
                  {isActive && (
                    <div
                      className="absolute left-0 top-1 bottom-1 w-0.5 rounded-full"
                      style={{ backgroundColor: 'var(--folder-turquoise-dark)' }}
                    />
                  )}
                  <span className={isActive ? '' : 'hover:opacity-70'}>{item.text}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

// Mobile version (drawer/accordion)
export function MobileTableOfContents({ items }: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 120; // Account for sticky header + padding
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      window.history.pushState(null, '', `#${id}`);
      setIsOpen(false);
    }
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="mb-8 lg:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-lg border px-4 py-3 text-sm font-medium"
        style={{
          backgroundColor: 'var(--folder-paper)',
          borderColor: 'var(--folder-border-light)',
          color: 'var(--folder-text-dark)',
        }}
        aria-expanded={isOpen}
      >
        <span>Table of Contents</span>
        <svg
          className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <title>Toggle</title>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          className="mt-2 rounded-lg border p-4"
          style={{
            backgroundColor: 'var(--folder-paper)',
            borderColor: 'var(--folder-border-light)',
          }}
        >
          <ul className="space-y-2 text-sm">
            {items.map((item) => {
              const isH3 = item.level === 3;

              return (
                <li key={item.id} className={isH3 ? 'ml-4' : ''}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleClick(e, item.id)}
                    className="block py-1 transition-colors hover:opacity-70"
                    style={{ color: 'var(--folder-text-medium)' }}
                  >
                    {item.text}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
