// src/app/admin/page.tsx
"use client";

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [blogs, setBlogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = Cookies.get('admin_authenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
      fetchBlogs();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      setBlogs(data.slugs || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      Cookies.set('admin_authenticated', 'true', { expires: 1 });
      setIsAuthenticated(true);
      fetchBlogs();
    } else {
      alert('Incorrect password. Please try again.');
    }
  };

  const handleLogout = () => {
    Cookies.remove('admin_authenticated');
    setIsAuthenticated(false);
    setPassword('');
  };

  const handleEdit = (slug: string) => {
    window.location.href = `/blog/${slug}?edit=true`;
  };

  if (!isAuthenticated) {
    return (
      <div style={{
        maxWidth: 420,
        margin: '100px auto',
        padding: '40px',
        background: '#fff',
        borderRadius: '12px',
        boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
        border: '1px solid #e5e3e6',
        textAlign: 'center'
      }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', color: '#12106e', fontSize: '1.8rem', marginBottom: '8px' }}>
          Admin Login
        </h1>
        <p style={{ color: '#5c5a61', marginBottom: '24px' }}>
          Enter the admin password to access the dashboard.
        </p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter admin password"
          onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          style={{
            width: '100%',
            padding: '12px 16px',
            border: '1px solid #e5e3e6',
            borderRadius: '8px',
            fontSize: '1rem',
            marginBottom: '12px',
            outline: 'none',
          }}
          onFocus={(e) => e.target.style.borderColor = '#a6238f'}
          onBlur={(e) => e.target.style.borderColor = '#e5e3e6'}
        />
        <button
          onClick={handleLogin}
          style={{
            width: '100%',
            padding: '12px',
            background: '#a6238f',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          Login
        </button>
        <p style={{ marginTop: '16px', fontSize: '0.8rem', color: '#7a7880' }}>
          This page is protected. Only authorized users can access.
        </p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 800, margin: '40px auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', color: '#12106e' }}>Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          style={{
            padding: '8px 20px',
            background: 'transparent',
            color: '#7a7880',
            border: '1px solid #e5e3e6',
            borderRadius: '50px',
            cursor: 'pointer',
            fontSize: '0.85rem',
          }}
        >
          Logout
        </button>
      </div>

      {loading ? (
        <p>Loading blogs...</p>
      ) : (
        <div style={{ marginTop: '20px' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', color: '#12106e', marginBottom: '16px' }}>
            Your Blogs
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {blogs.map((slug) => (
              <div
                key={slug}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '14px 20px',
                  background: '#f9f8f9',
                  borderRadius: '8px',
                  border: '1px solid #e5e3e6',
                }}
              >
                <span style={{ fontWeight: '500' }}>{slug.replace(/-/g, ' ')}</span>
                <button
                  onClick={() => handleEdit(slug)}
                  style={{
                    padding: '8px 20px',
                    background: '#a6238f',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                  }}
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginTop: '40px', padding: '20px', background: '#f9f8f9', borderRadius: '8px', border: '1px solid #e5e3e6' }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', color: '#12106e' }}>Create New Blog</h3>
        <p style={{ color: '#5c5a61', marginTop: '8px' }}>
          Create a new JSON file in <code style={{ background: '#e5e3e6', padding: '2px 6px', borderRadius: '4px' }}>content/blog/</code> with the slug as the filename.
        </p>
        <p style={{ color: '#7a7880', fontSize: '0.9rem', marginTop: '8px' }}>
          Example: <code style={{ background: '#e5e3e6', padding: '2px 6px', borderRadius: '4px' }}>content/blog/my-new-blog.json</code>
        </p>
      </div>
    </div>
  );
}
