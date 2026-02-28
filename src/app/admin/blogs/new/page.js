'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import BlogEditor from '@/components/BlogEditor';

export default function NewBlogPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [contentMarkdown, setContentMarkdown] = useState('');
  const [isPublished, setIsPublished] = useState(true);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbPreviewUrl, setThumbPreviewUrl] = useState(null);

  useEffect(() => {
    if (!thumbnailFile) {
      if (thumbPreviewUrl) URL.revokeObjectURL(thumbPreviewUrl);
      setThumbPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(thumbnailFile);
    setThumbPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [thumbnailFile]);

  const handleTitleChange = (e) => {
    const v = e.target.value;
    setTitle(v);
    if (!slug || slug === title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')) {
      setSlug(v.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const s = slug.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    if (!title.trim() || !s) {
      setError('Title and slug are required.');
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', title.trim());
      formData.append('slug', s);
      formData.append('shortDescription', shortDescription.trim());
      formData.append('contentMarkdown', contentMarkdown || '');
      formData.append('isPublished', String(isPublished));
      if (thumbnailFile) formData.append('thumbnail', thumbnailFile);

      const res = await fetch('/api/blogs', { method: 'POST', body: formData });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to create blog');
        return;
      }

      router.push('/admin');
      router.refresh();
    } catch (err) {
      setError('Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-content bg-white">
      <div className="dlab-bnr-inr overlay-primary" style={{ backgroundImage: 'url(/images/background/banner_1.png)' }}>
        <div className="container">
          <div className="dlab-bnr-inr-entry">
            <h1 className="text-white">Write Blog</h1>
          </div>
        </div>
      </div>
      <div className="section-full content-inner">
        <div className="">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div className="p-a30">
                <Link href="/admin" className="site-button outline button-sm m-b20">
                  ← Back to Admin
                </Link>
                <h2 className="font-weight-700 m-t0 m-b20">Create new blog post</h2>
                {error && <p className="text-danger m-b15">{error}</p>}

                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="font-weight-700">Title *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Blog title"
                      value={title}
                      onChange={handleTitleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="font-weight-700">URL slug *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="url-friendly-slug"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      required
                    />

                  </div>
                  <div className="form-group">
                    <label className="font-weight-700">Short description</label>
                    <textarea
                      className="form-control"
                      rows={2}
                      placeholder="Brief summary for list view"
                      value={shortDescription}
                      onChange={(e) => setShortDescription(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="font-weight-700">Thumbnail (optional)</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="form-control"
                      onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
                    />
                    {thumbPreviewUrl && (
                      <div className="m-t15">
                        <p className="text-muted small m-b5">Preview:</p>
                        <div className="border p-a10 bg-gray" style={{ maxWidth: 280 }}>
                          <Image src={thumbPreviewUrl} alt="Thumb" width={260} height={160} style={{ width: '100%', height: 'auto' }} unoptimized />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label className="font-weight-700">Main Content</label>
                    <BlogEditor value={contentMarkdown} onChange={setContentMarkdown} />
                  </div>
                  <div className="form-group">
                    <label className="font-weight-700 d-block m-b8">Visibility</label>
                    <label
                      className="d-flex align-items-center justify-content-between"
                      style={{
                        gap: 14,
                        border: `1px solid ${isPublished ? '#86efac' : '#fecdd3'}`,
                        background: isPublished ? '#ecfdf3' : '#fff1f2',
                        borderRadius: 10,
                        padding: '12px 14px',
                        cursor: 'pointer',
                      }}
                    >
                      <span className="d-flex align-items-center" style={{ gap: 10 }}>
                        <input
                          type="checkbox"
                          checked={isPublished}
                          onChange={(e) => setIsPublished(e.target.checked)}
                          style={{ width: 18, height: 18 }}
                        />
                        <span style={{ fontWeight: 700, color: '#111827' }}>
                          Published (uncheck to hide from users)
                        </span>
                      </span>
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          color: isPublished ? '#166534' : '#be123c',
                          background: '#fff',
                          borderRadius: 999,
                          padding: '4px 10px',
                          border: `1px solid ${isPublished ? '#bbf7d0' : '#fecdd3'}`,
                        }}
                      >
                        {isPublished ? 'PUBLISHED' : 'HIDDEN'}
                      </span>
                    </label>
                  </div>
                  <div className="form-group m-t20">
                    <button type="submit" className="site-button button-lg radius-no" disabled={isLoading}>
                      {isLoading ? 'Saving...' : 'Save changes'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
