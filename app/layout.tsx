import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Jeongwonshin.dev',
    template: '%s | Jeongwonshin.dev',
  },
  description: 'A personal tech blog inspired by React and Next.js documentation.',
  keywords: ['Next.js', 'React', 'TypeScript', 'Frontend', 'Web Development'],
  authors: [{ name: 'Jeongwonshin' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://jeongwonshin.dev',
    title: 'Jeongwonshin.dev',
    description: 'Frontend Architecture, Design, and Development',
    siteName: 'Jeongwonshin.dev',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jeongwonshin.dev',
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
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
