import { Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/newgardener',
    icon: Github,
  },
  {
    name: 'LinkedIn',
    href: 'www.linkedin.com/in/jeongwonshin',
    icon: Linkedin,
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200 pt-8 dark:border-gray-800">
          {/* Social Links */}
          <div className="mb-6 flex justify-center gap-6">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  aria-label={link.name}
                >
                  <Icon className="h-5 w-5" />
                </Link>
              );
            })}
          </div>

          {/* Copyright */}
          <p className="text-center text-sm text-gray-500 dark:text-gray-500">
            © {currentYear} Jeongwon Shin.
          </p>
        </div>
      </div>
    </footer>
  );
}
