'use client';

import React, { useEffect, useState } from 'react';
import PageTitle from '@/components/PageTitle';
import Image from 'next/image';
import { useParams, usePathname } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function formatDate(d) {
  if (!d) return '';
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function contentToHtml(content) {
  if (!content || typeof content !== 'string') return '';
  const trimmed = content.trim();
  if (trimmed.startsWith('{')) {
    try {
      const data = JSON.parse(content);
      if (data && data.blocks && Array.isArray(data.blocks)) {
        return data.blocks
          .map((block) => {
            const text = block?.data?.text || '';
            if (!text) return '';
            if (block.type === 'header') {
              const level = Math.min(Math.max(Number(block?.data?.level) || 2, 1), 6);
              return `<h${level}>${text}</h${level}>`;
            }
            if (block.type === 'quote') {
              return `<blockquote>${text}</blockquote>`;
            }
            return `<p>${text}</p>`;
          })
          .join('');
      }
    } catch (_) {}
  }
  return content;
}

function looksLikeHtml(input) {
  if (!input || typeof input !== 'string') return false;
  return /<\/?[a-z][\s\S]*>/i.test(input);
}

function looksLikeMarkdown(input) {
  if (!input || typeof input !== 'string') return false;
  const text = input.trim();
  if (!text) return false;
  return (
    /^#{1,6}\s/m.test(text) ||
    /^\s*[-*+]\s+/m.test(text) ||
    /^\s*\d+\.\s+/m.test(text) ||
    /```[\s\S]*```/m.test(text) ||
    /!\[[^\]]*\]\([^)]+\)/m.test(text) ||
    /\[[^\]]+\]\([^)]+\)/m.test(text) ||
    /^\s*>\s+/m.test(text)
  );
}

function isMarkdownBlog(blog) {
  if (!blog) return false;
  if (blog.ContentFormat === 'markdown') return true;
  if (blog.ContentMarkdown && blog.ContentMarkdown.trim()) return true;
  if (blog.Content && !looksLikeHtml(blog.Content) && looksLikeMarkdown(blog.Content)) return true;
  return false;
}

export default function BlogDetailsPage() {
  const params = useParams();
  const pathname = usePathname();
  const slug =
    (params && (params.blogDetails ?? params.blogdetails)) ||
    (pathname && decodeURIComponent(pathname.replace(/^\/blogs\/?/, '').split('/')[0] || ''));

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const markdownSource =
    blog?.ContentFormat === 'markdown'
      ? blog?.ContentMarkdown || ''
      : blog?.ContentMarkdown?.trim()
        ? blog.ContentMarkdown
        : (blog?.Content || '');

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }
    setLoading(true);
    fetch(`/api/blogs/${encodeURIComponent(slug)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then(setBlog)
      .catch(() => setBlog(null))
      .finally(() => setLoading(false));
  }, [slug]);

  return (
    <div className="page-content bg-white">
      <div
        className="dlab-bnr-inr overlay-primary"
        style={{ backgroundImage: 'url(/images/background/banner_1.png)' }}
      >
        <PageTitle motherMenu="Blogs" activeMenu="Blogs" />
      </div>

      {loading && <div className="container p-a30 text-center">Loading...</div>}
      {!loading && !blog && <div className="container p-a30 text-center">Blog not found.</div>}

      {blog && (
        <div className="content-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 col-xl-9 col-md-12 col-sm-12 mx-auto">
                <div
                  className="blog-post blog-single blog-reader-article"
                  style={{
                    background: '#fff',
                    border: '1px solid #ececec',
                    borderRadius: 12,
                    padding: '1.5rem 1.75rem',
                  }}
                >
                  <div className="dlab-post-title">
                    <h1 className="post-title m-t0" style={{ lineHeight: 1.25 }}>
                      {blog.Title}
                    </h1>
                  </div>
                  <div className="dlab-post-meta m-b20">
                    <ul className="d-flex align-items-center">
                      <li className="post-date">
                        <i className="fa fa-calendar"></i> {formatDate(blog.PublishDate)}
                      </li>
                    </ul>
                  </div>


                  {isMarkdownBlog(blog) ? (
                    <div className="dlab-post-text blog-content blog-reader-content">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          table: ({ children, ...props }) => (
                            <div className="blog-table-wrapper">
                              <table {...props}>{children}</table>
                            </div>
                          ),
                          img: ({ ...props }) => (
                            <img
                              {...props}
                              alt={props.alt || 'Blog image'}
                              style={{ maxWidth: '100%', height: 'auto' }}
                            />
                          ),
                          a: ({ ...props }) => (
                            <a {...props} target="_blank" rel="noreferrer noopener">
                              {props.children}
                            </a>
                          ),
                        }}
                      >
                        {markdownSource}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <div
                      className="dlab-post-text blog-content blog-reader-content blog-reader-content-html"
                      dangerouslySetInnerHTML={{ __html: contentToHtml(blog.Content) }}
                    />
                  )}
                  <div className="dlab-divider bg-gray-dark op4">
                    <i className="icon-dot c-square"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
