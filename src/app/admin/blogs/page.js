'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaPencilAlt, FaTrashAlt, FaExternalLinkAlt, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Button, Flex } from '@radix-ui/themes';
import ConfirmDialog from '@/components/ConfirmDialog';
import Toast from '@/components/Toast';

function formatDate(d) {
  if (!d) return '';
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function AdminBlogsPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [togglingPublish, setTogglingPublish] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [toast, setToast] = useState({ open: false, message: '', type: 'info' });

  useEffect(() => {
    fetch('/api/blogs?all=1')
      .then((res) => res.json())
      .then((data) => setBlogs(Array.isArray(data) ? data : []))
      .catch(() => setBlogs([]))
      .finally(() => setLoading(false));
  }, []);

  const handleDeleteClick = (slug, title) => {
    setConfirmDelete({ slug, title });
  };

  const handleDeleteConfirm = async () => {
    if (!confirmDelete) return;
    const { slug, title } = confirmDelete;
    setConfirmDelete(null);
    setDeleting(slug);
    try {
      const res = await fetch(`/api/blogs/${encodeURIComponent(slug)}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok && data.success) {
        setBlogs((prev) => prev.filter((b) => b.Slug !== slug));
        router.refresh();
        setToast({ open: true, message: `"${title}" deleted.`, type: 'success' });
      } else {
        setToast({ open: true, message: data.error || 'Failed to delete', type: 'error' });
      }
    } catch (_) {
      setToast({ open: true, message: 'Failed to delete blog', type: 'error' });
    } finally {
      setDeleting(null);
    }
  };

  const handleTogglePublish = async (item) => {
    const nextPublished = item.IsPublished === false;
    setTogglingPublish(item.Slug);
    try {
      const res = await fetch(`/api/blogs/${encodeURIComponent(item.Slug)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: nextPublished }),
      });
      const data = await res.json();

      if (!res.ok || !data?.success) {
        setToast({ open: true, message: data.error || 'Failed to update blog status', type: 'error' });
        return;
      }

      setBlogs((prev) =>
        prev.map((b) => (b.Slug === item.Slug ? { ...b, IsPublished: nextPublished } : b))
      );
      setToast({
        open: true,
        message: `"${item.Title}" is now ${nextPublished ? 'published' : 'hidden'}.`,
        type: 'success',
      });
    } catch (_) {
      setToast({ open: true, message: 'Failed to update blog status', type: 'error' });
    } finally {
      setTogglingPublish(null);
    }
  };

  return (
    <div className="page-content bg-white">
      <div className="dlab-bnr-inr overlay-primary" style={{ backgroundImage: 'url(/images/background/banner_1.png)' }}>
        <div className="container">
          <div className="dlab-bnr-inr-entry">
            <h1 className="text-white">Blogs</h1>
            <p className="text-white m-b0">
              Manage your blog posts
              {!loading && (
                <span className="m-l10" style={{ fontWeight: 600 }}>
                  · {blogs.length} {blogs.length === 1 ? 'blog' : 'blogs'}
                </span>
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="content-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <Flex justify="center" gap="3" wrap="wrap" className="m-b30">
              <Button size="3" variant="soft" asChild>
                  <Link href="/admin">← Back to Admin</Link>
                </Button>
                <Button size="3" asChild>
                  <Link href="/admin/blogs/new">Add new blog</Link>
                </Button>
                
              </Flex>

              {loading && <p className="text-center p-a30">Loading blogs...</p>}
              {!loading && blogs.length === 0 && <p className="text-center p-a30">No blogs yet.</p>}
              {!loading &&
                blogs.map((item) => (
                  <div className="blog-post blog-md clearfix my-5" key={item.id}>
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
                          <li className="m-l15">
                            <span
                              className="badge"
                              style={{
                                background: item.IsPublished === false ? '#fff1f2' : '#ecfdf3',
                                color: item.IsPublished === false ? '#be123c' : '#166534',
                                border: `1px solid ${item.IsPublished === false ? '#fecdd3' : '#bbf7d0'}`,
                                fontWeight: 700,
                              }}
                            >
                              {item.IsPublished === false ? 'Hidden' : 'Published'}
                            </span>
                          </li>
                        </ul>
                      </div>
                      <div className="dlab-post-text">
                        <p>{item.ShortDescription || ''}</p>
                      </div>
                      <div className="dlab-post-readmore blog-share d-flex flex-wrap" style={{ gap: '0.5rem' }}>
                        <Link
                          href={`/admin/blogs/edit/${encodeURIComponent(item.Slug)}`}
                          title="Edit"
                          className="site-button outline outline-1"
                        >
                          <FaPencilAlt style={{ marginRight: 6 }} /> 
                        </Link>

                        <button
                          type="button"
                          className="site-button outline outline-1"
                          disabled={togglingPublish === item.Slug}
                          onClick={() => handleTogglePublish(item)}
                          title={item.IsPublished === false ? 'Unhide (Publish)' : 'Hide'}
                          style={{
                            color: item.IsPublished === false ? '#166534' : '#0f172a',
                            borderColor: item.IsPublished === false ? '#86efac' : '#94a3b8',
                          }}
                        >
                          {item.IsPublished === false ? (
                            <FaEye style={{ marginRight: 6 }} />
                          ) : (
                            <FaEyeSlash style={{ marginRight: 6 }} />
                          )}
                          {togglingPublish === item.Slug
                            ? 'Saving...'
                            : item.IsPublished === false
                              }
                        </button>

                        <button
                          type="button"
                          className="site-button outline outline-1 "
                          style={{ color: '#c00', borderColor: '#c00' }}
                          disabled={deleting === item.Slug}
                          onClick={() => handleDeleteClick(item.Slug, item.Title)}
                          title="Delete"
                        >
                          <FaTrashAlt style={{ marginRight: 6 }} /> {deleting === item.Slug ? 'Deleting...' : ''}
                        </button>

                        <a
                          href={`/blogs/${encodeURIComponent(item.Slug)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="site-button outline outline-1"
                          title="View"
                        >
                          <FaExternalLinkAlt style={{ marginRight: 6 }} /> 
                        </a>
                        
         
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={!!confirmDelete}
        title="Delete blog?"
        message={confirmDelete ? `Delete "${confirmDelete.title}"? This cannot be undone.` : ''}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="danger"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setConfirmDelete(null)}
      />
      <Toast
        open={toast.open}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((t) => ({ ...t, open: false }))}
      />
    </div>
  );
}
