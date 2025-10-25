'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export function Logo({ width = 200, height = 80, className = '' }: LogoProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only render after component has mounted on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR and initial client render, show light theme logo
  if (!mounted) {
    return (
      <Image
        src="/images/logo.png"
        alt="Memos from Jeongwon"
        width={width}
        height={height}
        className={className}
        priority
      />
    );
  }

  // After mounting, show theme-appropriate logo
  return (
    <Image
      src={theme === 'dark' ? '/images/logo-dark.png' : '/images/logo.png'}
      alt="Memos from Jeongwon"
      width={width}
      height={height}
      className={className}
      priority
    />
  );
}
