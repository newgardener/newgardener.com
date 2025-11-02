'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only render after component has mounted on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent rendering during SSR to avoid hydration mismatch
  if (!mounted) {
    return (
      <button
        type="button"
        className="inline-flex items-center justify-center p-3 rounded-full shadow-lg transition-all hover:scale-110 z-50"
        style={{
          backgroundColor: 'var(--folder-bg-dark)',
          color: 'var(--folder-white)',
        }}
        aria-label="Toggle theme"
        disabled
      >
        <div className="h-5 w-5" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="cursor-pointer inline-flex items-center justify-center p-3 rounded-full shadow-lg transition-all hover:scale-110 z-50"
      style={{
        backgroundColor: 'var(--folder-bg-dark)',
        color: 'var(--folder-white)',
      }}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
    </button>
  );
}
