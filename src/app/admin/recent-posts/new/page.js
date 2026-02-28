'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

function normalizeSlug(value) {
  return value?.trim()?.toLowerCase()?.replace(/\s+/g, '-')?.replace(/[^a-z0-9-]/g, '') || '';
}

export default function NewRecentPostPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [link, setLink] = useState('');
  const [postDate, setPostDate] = useState('');
  const [place, setPlace] = useState('');
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
    if (!slug || slug === normalizeSlug(title)) {
      setSlug(normalizeSlug(v));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const s = normalizeSlug(slug);
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
      formData.append('link', link.trim());
      if (postDate) formData.append('postDate', postDate);
      if (place.trim()) formData.append('place', place.trim());
      if (thumbnailFile) formData.append('thumbnail', thumbnailFile);

      const res = await fetch('/api/recent-posts', { method: 'POST', body: formData });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to create recent post');
        return;
      }

      router.push('/admin/recent-posts');
      router.refresh();
    } catch (_) {
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
            <h1 className="text-white">Add Recent Post</h1>
          </div>
        </div>
      </div>
      <div className="section-full content-inner">
        <div className="container">

              <div className="p-a30 ">
                <Link href="/admin/recent-posts" className="site-button outline button-sm m-b20">
                  ← Back to Recent Posts
                </Link>
                <h2 className="font-weight-700 m-t0 m-b20">Create recent post card</h2>
                {error && <p className="text-danger m-b15">{error}</p>}

                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="font-weight-700">Title *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Post title"
                      value={title}
                      onChange={handleTitleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="font-weight-700">Slug *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="url-friendly-slug"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      required
                    />
                    <small className="text-muted">Fallback link uses /blogs/your-slug when custom link is empty.</small>
                  </div>
                  <div className="form-group">
                    <label className="font-weight-700">Short description</label>
                    <textarea
                      className="form-control"
                      rows={3}
                      placeholder="Brief summary for the card"
                      value={shortDescription}
                      onChange={(e) => setShortDescription(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="font-weight-700">Post date (optional)</label>
                    <input
                      type="date"
                      className="form-control"
                      value={postDate}
                      onChange={(e) => setPostDate(e.target.value)}
                    />
                    <small className="text-muted">Date shown on the card (e.g. event date). Leave empty to use publish date.</small>
                  </div>
                  <div className="form-group">
                    <label className="font-weight-700">Place (optional)</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. City, Venue, or Online"
                      value={place}
                      onChange={(e) => setPlace(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="font-weight-700">Custom link (optional)</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="https://example.com/article"
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
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
                  <div className="form-group m-t20">
                    <button type="submit" className="site-button button-lg radius-no" disabled={isLoading}>
                      {isLoading ? 'Saving...' : 'Save recent post'}
                    </button>
                  </div>
                </form>
     
  
          </div>
        </div>
      </div>
    </div>
  );
}
