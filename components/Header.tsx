'use client';

import Link from 'next/link';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';

const navigation: { name: string; href: string }[] = [];

export function Header() {
  return (
    <header
      className="sticky top-0 z-100 w-full border-b backdrop-blur-md"
      style={{
        backgroundColor: 'var(--folder-header-footer-bg)',
        borderColor: 'var(--folder-border-light)',
      }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4">
        {/* Logo */}
        <div className="flex">
          <Link href="/" className="-m-1.5 p-1.5">
            <Logo width={148} height={45} />
          </Link>
        </div>

        {/* Right side: Desktop navigation + Theme toggle + Mobile menu button */}
        <div className="flex items-center gap-4">
          {/* Desktop navigation - right aligned */}
          <div className="hidden min-[1000px]:flex min-[1000px]:gap-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Theme toggle - always visible */}
          <ThemeToggle />

          {/* Mobile menu button - shows below 1000px */}
          {/* TODO: show this after adding extra menus */}
          {/* <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 min-[1000px]:hidden dark:text-gray-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">{mobileMenuOpen ? 'Close menu' : 'Open menu'}</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button> */}
        </div>
      </nav>

      {/* Mobile menu */}
      {/* {mobileMenuOpen && (
        <div className="min-[1000px]:hidden">
          <div className="space-y-1 border-t border-gray-200 px-4 pb-3 pt-2 dark:border-gray-800">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )} */}
    </header>
  );
}
