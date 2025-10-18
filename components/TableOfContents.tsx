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
      const offset = 80; // Account for sticky header
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
      <div className="space-y-2">
        <h2 className="mb-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
          On This Page
        </h2>
        <ul className="space-y-2 text-sm">
          {items.map((item) => {
            const isActive = activeId === item.id;
            const isH3 = item.level === 3;

            return (
              <li key={item.id} className={isH3 ? 'ml-4' : ''}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item.id)}
                  className={`block border-l-2 py-1 pl-3 transition-colors ${
                    isActive
                      ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                      : 'border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900 dark:border-gray-800 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-100'
                  }`}
                >
                  {item.text}
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
      const offset = 80;
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
        className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100"
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
        <div className="mt-2 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
          <ul className="space-y-2 text-sm">
            {items.map((item) => {
              const isH3 = item.level === 3;

              return (
                <li key={item.id} className={isH3 ? 'ml-4' : ''}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleClick(e, item.id)}
                    className="block py-1 text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
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
