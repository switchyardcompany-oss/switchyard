"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';

interface Blog {
  slug: string;
  title: string;
  date: string;
  category?: string;
  featuredImage?: string;
  metaDescription?: string;
  subtitle?: string;
}

interface BlogFiltersProps {
  blogs: Blog[];
  initialSearch?: string;
}

function formatDate(dateStr: string) {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

export default function BlogFilters({ blogs, initialSearch = '' }: BlogFiltersProps) {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    blogs.forEach(blog => {
      if (blog.category) cats.add(blog.category);
    });
    return ['all', ...Array.from(cats)];
  }, [blogs]);

  // Filter blogs
  const filteredBlogs = useMemo(() => {
    return blogs.filter(blog => {
      const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           blog.metaDescription?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           blog.subtitle?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || blog.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [blogs, searchQuery, selectedCategory]);

  if (blogs.length === 0) {
    return (
      <div className="blog-index-content">
        <div className="blog-no-results">
          <p>No blog articles are currently published.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-index-content">
      {/* Filters */}
      <div className="blog-filters">
        <div className="blog-search">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search blog posts"
          />
          {searchQuery && (
            <button
              className="blog-search-clear"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        {categories.length > 1 && (
          <div className="blog-category-filter">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`blog-category-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Results count */}
      <div className="blog-results-count">
        {filteredBlogs.length} {filteredBlogs.length === 1 ? 'article' : 'articles'} found
      </div>

      {/* Blog Grid */}
      {filteredBlogs.length === 0 ? (
        <div className="blog-no-results">
          <p>No articles found matching your search.</p>
          <button onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}>
            Clear filters
          </button>
        </div>
      ) : (
        <div className="blog-index-grid">
          {filteredBlogs.map((blog) => (
            <Link href={`/blog/${blog.slug}`} key={blog.slug} className="blog-card">
              <div className="blog-card-image">
                {blog.featuredImage ? (
                  <img src={blog.featuredImage} alt={blog.title} loading="lazy" />
                ) : (
                  <div className="blog-card-image-placeholder">
                    <span>📝</span>
                  </div>
                )}
              </div>
              <div className="blog-card-content">
                <div className="blog-card-meta">
                  <span className="blog-card-date">{formatDate(blog.date)}</span>
                  {blog.category && (
                    <span className="blog-card-category">{blog.category}</span>
                  )}
                </div>
                <h2 className="blog-card-title">{blog.title}</h2>
                <p className="blog-card-excerpt">
                  {blog.metaDescription || blog.subtitle || ''}
                </p>
                <span className="blog-card-read-more">Read More →</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
