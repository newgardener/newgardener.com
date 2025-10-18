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
  {
    name: 'Email',
    href: 'jennyshin106@gmail.com',
    icon: Mail,
  },
];

const navigation = {
  main: [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Brand */}
          <div>
            <Link href="/" className="text-xl font-bold text-gray-900 dark:text-gray-100">
              jeongwonshin<span className="text-blue-600">.dev</span>
            </Link>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Frontend Architecture, Design, and Development
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Navigation</h3>
            <ul className="mt-4 space-y-2">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Connect</h3>
            <div className="mt-4 flex space-x-4">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                    aria-label={item.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 border-t border-gray-200 pt-8 dark:border-gray-800">
          <p className="text-center text-sm text-gray-500 dark:text-gray-500">
            © {currentYear} Jeongwon Shin
          </p>
        </div>
      </div>
    </footer>
  );
}
