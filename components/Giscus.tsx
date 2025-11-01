'use client';

import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useEffect, useRef } from 'react';

export function Giscus() {
  const ref = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const pathname = usePathname();

  const theme = resolvedTheme === 'dark' ? 'dark_high_contrast' : 'light_high_contrast';

  useEffect(() => {
    if (!ref.current) return;

    // 경로가 바뀌면 이전 iframe 제거
    ref.current.innerHTML = '';

    const s = document.createElement('script');
    s.src = 'https://giscus.app/client.js';
    s.async = true;
    s.crossOrigin = 'anonymous';

    s.setAttribute('data-repo', process.env.NEXT_PUBLIC_GISCUS_REPO || '');
    s.setAttribute('data-repo-id', process.env.NEXT_PUBLIC_GISCUS_REPO_ID || '');
    s.setAttribute('data-category', process.env.NEXT_PUBLIC_GISCUS_CATEGORY || '');
    s.setAttribute('data-category-id', process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || '');
    s.setAttribute('data-mapping', 'pathname');
    s.setAttribute('data-strict', '0');
    s.setAttribute('data-reactions-enabled', '1');
    s.setAttribute('data-emit-metadata', '0');
    s.setAttribute('data-input-position', 'bottom');
    s.setAttribute('data-theme', theme);
    s.setAttribute('data-lang', 'en');

    ref.current.appendChild(s);
  }, [theme]);

  return <section ref={ref} key={pathname} />;
}
