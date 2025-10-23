import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-gray-100">
          Frontend Architecture,
          <br />
          Design, and Development
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
          A personal tech blog inspired by React and Next.js documentation.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/blog"
            className="rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            View Posts
          </Link>
          <Link
            href="/about"
            className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100"
          >
            About me <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      {/* Coming Soon Section */}
      <div className="mt-24">
        <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-gray-100">
          Coming Soon
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: 'Next.js 15 Deep Dive',
              description: 'Exploring the latest features and improvements in Next.js 15',
              tag: 'Next.js',
            },
            {
              title: 'MDX Best Practices',
              description: 'How to create engaging technical content with MDX',
              tag: 'MDX',
            },
            {
              title: 'Cloudflare Deployment',
              description: 'A complete guide to deploying Next.js apps on Cloudflare Pages',
              tag: 'DevOps',
            },
          ].map((post) => (
            <div
              key={post.title}
              className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900"
            >
              <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                {post.tag}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
                {post.title}
              </h3>
              <p className="mt-2 text-base text-gray-600 dark:text-gray-400">{post.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
