'use client';

import { useState } from 'react';
import { BlogCard } from '@/components/BlogCard';
import type { PostMetadata } from '@/lib/getPostMetadata';

interface FolderBlogLayoutProps {
  posts: PostMetadata[];
}

export function FolderBlogLayout({ posts }: FolderBlogLayoutProps) {
  // Dynamically generate categories from posts
  const uniqueCategories = Array.from(new Set(posts.map((post) => post.category).filter(Boolean)));
  const categories = [
    { id: 1, name: 'All', color: '#80B6C6' },
    ...uniqueCategories.map((category, index) => ({
      id: index + 2,
      name: category as string,
      color: '#80B6C6',
    })),
  ];

  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts =
    selectedCategory === 'All' ? posts : posts.filter((post) => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[var(--folder-bg-light)] py-12">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Main Folder Container */}
        <div className="relative">
          {/* Folder with tabs on top */}
          <div className="relative">
            {/* Category Tabs - Positioned on TOP */}
            <div className="relative mb-0 flex gap-1" style={{ paddingLeft: '0' }}>
              {categories.map((category, index) => {
                const isSelected = selectedCategory === category.name;
                const zIndex = isSelected ? 50 : 40 - index;

                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.name)}
                    className="relative transition-all duration-300"
                    style={{
                      zIndex: zIndex,
                      transform: isSelected ? 'translateY(-6px)' : 'translateY(0)',
                    }}
                    type="button"
                  >
                    {/* Tab sticking up */}
                    <div
                      className="relative overflow-hidden rounded-t-lg border-2 shadow-lg"
                      style={{
                        width: '140px',
                        height: '60px',
                        backgroundColor: isSelected
                          ? 'var(--folder-turquoise-dark)'
                          : 'var(--folder-turquoise-light)',
                        borderColor: isSelected
                          ? 'var(--folder-turquoise-dark)'
                          : 'var(--folder-turquoise-light)',
                      }}
                    >
                      {/* Number and category name - LEFT ALIGNED */}
                      <div className="absolute left-4 top-3 flex items-center gap-3">
                        <span
                          className="text-2xl"
                          style={{
                            color: isSelected ? 'var(--folder-white)' : 'var(--folder-text-dark)',
                          }}
                        >
                          {category.id}
                        </span>
                        <div
                          className="text-sm"
                          style={{
                            color: isSelected ? 'var(--folder-white)' : 'var(--folder-text-dark)',
                          }}
                        >
                          {category.name}
                        </div>
                      </div>

                      {/* Small horizontal lines at bottom */}
                      <div className="absolute bottom-2 left-4 right-4">
                        {[...Array(2)].map((_, i) => (
                          <div
                            key={`tab-line-${category.id}-${i}`}
                            className="my-1 border-t opacity-30"
                            style={{
                              borderColor: isSelected
                                ? 'var(--folder-white)'
                                : 'var(--folder-text-dark)',
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Main Folder Body */}
            <div
              className="relative overflow-hidden rounded-lg shadow-2xl"
              style={{
                minHeight: '700px',
                backgroundColor: 'var(--folder-turquoise-light)',
              }}
            >
              {/* Horizontal ruled lines on folder */}
              <div className="pointer-events-none absolute inset-0 opacity-20">
                {[...Array(35)].map((_, i) => (
                  <div
                    key={`folder-line-${i}`}
                    className="border-t"
                    style={{
                      marginTop: i === 0 ? '30px' : '18px',
                      borderColor: 'var(--folder-line-dark)',
                    }}
                  />
                ))}
              </div>

              {/* White content paper inside folder */}
              <div
                className="relative m-10 mt-16 rounded bg-white p-10 shadow-lg"
                style={{
                  minHeight: '600px',
                }}
              >
                {/* Header */}
                <div
                  className="mb-8 border-b-2 pb-6"
                  style={{ borderColor: 'var(--folder-border-light)' }}
                >
                  <div className="flex items-baseline gap-4">
                    <h1
                      className="text-4xl font-bold"
                      style={{ color: 'var(--folder-turquoise-dark)' }}
                    >
                      {selectedCategory}
                    </h1>
                    <span style={{ color: 'var(--folder-text-medium)' }}>
                      {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
                    </span>
                  </div>
                </div>

                {/* Blog Posts Grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {filteredPosts.map((post) => (
                    <BlogCard
                      key={post.slug}
                      slug={post.slug}
                      title={post.title}
                      description={post.description}
                      date={post.date}
                      thumbnail={post.thumbnail}
                      tags={post.tags}
                    />
                  ))}
                </div>

                {filteredPosts.length === 0 && (
                  <div className="py-20 text-center" style={{ color: 'var(--folder-text-light)' }}>
                    <p>No articles found in this category.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
