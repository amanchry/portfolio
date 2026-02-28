'use client';

import React, { useState, useEffect } from 'react';
import PageTitle from '@/components/PageTitle';
import Link from 'next/link';
import Image from 'next/image';

function formatDate(d) {
  if (!d) return '';
  const date = new Date(d);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blogs')
      .then((res) => res.json())
      .then((data) => setBlogs(Array.isArray(data) ? data : []))
      .catch(() => setBlogs([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-content bg-white">
      <div className="dlab-bnr-inr overlay-primary" style={{ backgroundImage: 'url(/images/background/banner_1.png)' }}>
        <PageTitle motherMenu="Blogs" activeMenu="Blogs" />
      </div>

      <div className="content-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {loading && <p className="text-center p-a30">Loading blogs...</p>}
              {!loading && blogs.length === 0 && <p className="text-center p-a30">No blogs yet.</p>}
              {!loading &&
                blogs.map((item) => (
                  <div className="blog-post blog-md clearfix my-5 dlab-info p-a20 border-1" key={item.id} >
                    <div className="dlab-post-media dlab-img-effect zoom-slow">
                      <Link href={`/blogs/${encodeURIComponent(item.Slug)}`}>
                        {item.Thumbnail ? (
                          <Image
                            src={item.Thumbnail}
                            alt=""
                            width={800}
                            height={450}
                            style={{ width: '100%', height: 'auto' }}
                            unoptimized={item.Thumbnail?.startsWith('http')}
                          />
                        ) : (
                          <div className="bg-gray p-a30" style={{ minHeight: 200 }} />
                        )}
                      </Link>
                    </div>
                    <div className="dlab-post-info">
                      <div className="dlab-post-title">
                        <h4 className="post-title">
                          <Link href={`/blogs/${encodeURIComponent(item.Slug)}`}>{item.Title}</Link>
                        </h4>
                      </div>
                      <div className="dlab-post-meta">
                        <ul className="d-flex align-items-center">
                          <li className="post-date">
                            <i className="fa fa-calendar"></i> {formatDate(item.PublishDate)}
                          </li>
                        </ul>
                      </div>
                      <div className="dlab-post-text">
                        <p>{item.ShortDescription || ''}</p>
                      </div>
                      <div className="dlab-post-readmore blog-share">
                        <Link
                          href={`/blogs/${encodeURIComponent(item.Slug)}`}
                          title="READ MORE"
                          rel="bookmark"
                          className="site-button outline outline-1"
                        >
                          READ MORE <i className="fa fa-long-arrow-right"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}