import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'jeongwonshin.dev',
    template: '%s | jeongwonshin.dev',
  },
  description: 'A personal tech blog inspired by React and Next.js documentation.',
  keywords: ['Next.js', 'React', 'TypeScript', 'Frontend', 'Web Development'],
  authors: [{ name: 'jeongwonshin' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://jeongwonshin.dev',
    title: 'jeongwonshin.dev',
    description: 'Frontend Architecture, Design, and Development',
    siteName: 'jeongwonshin.dev',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'jeongwonshin.dev',
    description: 'Frontend Architecture, Design, and Development',
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
