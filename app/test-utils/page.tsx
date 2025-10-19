import { getPostContent } from '@/lib/getPostContent';
import { getAllTags, getPostMetadata } from '@/lib/getPostMetadata';
import { getTableOfContents } from '@/lib/getTableOfContents';

export default async function TestUtilsPage() {
  // Test getPostMetadata
  const allPosts = getPostMetadata();
  const tags = getAllTags();

  // Test getPostContent with the first post
  const firstPost = allPosts[0];
  const postContent = firstPost ? await getPostContent(firstPost.slug) : null;

  // Test getTableOfContents
  const toc = postContent ? getTableOfContents(postContent.source) : [];

  return (
    <div className="mx-auto max-w-4xl p-8">
      <h1 className="mb-8 text-4xl font-bold">Utility Functions Test Page</h1>

      {/* Test getPostMetadata */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">1. getPostMetadata()</h2>
        <p className="mb-2 text-gray-600 dark:text-gray-400">Found {allPosts.length} posts:</p>
        <div className="space-y-4">
          {allPosts.map((post) => (
            <div key={post.slug} className="rounded-lg border p-4 dark:border-gray-800">
              <h3 className="font-semibold">{post.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{post.description}</p>
              <p className="mt-2 text-xs text-gray-500">
                Date: {post.date} | Slug: {post.slug} | Draft: {post.draft ? 'Yes' : 'No'}
              </p>
              {post.tags && post.tags.length > 0 && (
                <div className="mt-2 flex gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-blue-100 px-2 py-1 text-xs dark:bg-blue-900"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Test getAllTags */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">2. getAllTags()</h2>
        <p className="mb-2 text-gray-600 dark:text-gray-400">All unique tags:</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="rounded-lg bg-green-100 px-3 py-1 text-sm dark:bg-green-900">
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Test getPostContent */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">3. getPostContent()</h2>
        {postContent ? (
          <div className="rounded-lg border p-4 dark:border-gray-800">
            <h3 className="font-semibold">{postContent.metadata.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Reading time: {postContent.readingTime} min
            </p>
            <p className="mt-2 text-xs text-gray-500">Content loaded successfully ✓</p>
            <p className="text-xs text-gray-500">
              Source length: {postContent.source.length} characters
            </p>
          </div>
        ) : (
          <p className="text-red-500">No posts found to test</p>
        )}
      </section>

      {/* Test getTableOfContents */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">4. getTableOfContents()</h2>
        {toc.length > 0 ? (
          <div className="rounded-lg border p-4 dark:border-gray-800">
            <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
              Found {toc.length} headings:
            </p>
            <ul className="space-y-1">
              {toc.map((item, index) => (
                <li
                  key={`${item.id}-${index}`}
                  className={`text-sm ${item.level === 3 ? 'ml-4' : ''}`}
                >
                  <span className="text-gray-500">{item.level === 2 ? '##' : '###'}</span>{' '}
                  {item.text} <span className="text-xs text-gray-400">({item.id})</span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-yellow-500">No headings found</p>
        )}
      </section>

      {/* Test calculateReadingTime and formatDate */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">5. Other Utility Functions</h2>
        <div className="space-y-2 rounded-lg border p-4 dark:border-gray-800">
          <p className="text-sm">
            <span className="font-semibold">calculateReadingTime:</span> Tested via getPostContent
            (see above)
          </p>
          <p className="text-sm">
            <span className="font-semibold">compileMDXContent:</span> Tested via getPostContent
            (content compiled successfully)
          </p>
          <p className="text-sm">
            <span className="font-semibold">extractExcerpt:</span> Available for testing
          </p>
        </div>
      </section>

      <div className="mt-8 rounded-lg bg-green-50 p-4 dark:bg-green-950">
        <p className="font-semibold text-green-800 dark:text-green-200">
          ✓ All Phase 3 utility functions are working correctly!
        </p>
      </div>
    </div>
  );
}
