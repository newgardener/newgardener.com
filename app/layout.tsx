import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://jeongwonshin.com'),
  title: {
    default: 'jeongwonshin.com',
    template: '%s | jeongwonshin.com',
  },
  description:
    'Sharing insights on frontend development, exploring diverse development domains, and documenting my journey through code and life.',
  keywords: [
    'Next.js',
    'React',
    'TypeScript',
    'Frontend',
    'Web Development',
    'Software Engineering',
    'Developer Blog',
  ],
  authors: [{ name: 'Jeongwon Shin' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://jeongwonshin.com',
    title: 'jeongwonshin.com',
    description:
      'Sharing insights on frontend development, exploring diverse development domains, and documenting my journey through code and life.',
    siteName: 'jeongwonshin.com',
    images: [
      {
        url: '/images/thumbnail.png',
        width: 1200,
        height: 630,
        alt: 'jeongwonshin.com - Developer Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'jeongwonshin.com',
    description:
      'Sharing insights on frontend development, exploring diverse development domains, and documenting my journey through code and life.',
    images: ['/images/thumbnail.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
