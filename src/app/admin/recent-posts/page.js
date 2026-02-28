'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaPencilAlt, FaTrashAlt, FaExternalLinkAlt } from 'react-icons/fa';
import { Button, Flex } from '@radix-ui/themes';
import ConfirmDialog from '@/components/ConfirmDialog';
import Toast from '@/components/Toast';

function formatDate(d) {
  if (!d) return '';
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
}

function resolveHref(post) {
  return post.Link || `/blogs/${encodeURIComponent(post.Slug)}`;
}

function isExternal(url) {
  return /^https?:\/\//i.test(url);
}

export default function AdminRecentPostsPage() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [toast, setToast] = useState({ open: false, message: '', type: 'info' });

  useEffect(() => {
    fetch('/api/recent-posts')
      .then((res) => res.json())
      .then((data) => setPosts(Array.isArray(data) ? data : []))
      .catch(() => setPosts([]))
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
      const res = await fetch(`/api/recent-posts/${encodeURIComponent(slug)}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok && data.success) {
        setPosts((prev) => prev.filter((p) => p.Slug !== slug));
        router.refresh();
        setToast({ open: true, message: `"${title}" deleted.`, type: 'success' });
      } else {
        setToast({ open: true, message: data.error || 'Failed to delete', type: 'error' });
      }
    } catch (_) {
      setToast({ open: true, message: 'Failed to delete recent post', type: 'error' });
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="page-content bg-white">
      <div className="dlab-bnr-inr overlay-primary" style={{ backgroundImage: 'url(/images/background/banner_1.png)' }}>
        <div className="container">
          <div className="dlab-bnr-inr-entry">
            <h1 className="text-white">Events & Recent Posts</h1>
            <p className="text-white m-b0">
              Manage homepage recent posts
              {!loading && (
                <span className="m-l10" style={{ fontWeight: 600 }}>
                  · {posts.length} {posts.length === 1 ? 'post' : 'posts'}
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
                  <Link href="/admin/recent-posts/new">Add event / post</Link>
                </Button>
              </Flex>

              {loading && <p className="text-center p-a30">Loading recent posts...</p>}
              {!loading && posts.length === 0 && <p className="text-center p-a30">No recent posts yet.</p>}

              {!loading &&
                posts.map((item) => {
                  const href = resolveHref(item);
                  const external = isExternal(href);
                  return (
                    <div className="blog-post blog-md clearfix my-5" key={item.id}>
                      <div
                        className="dlab-post-media dlab-img-effect zoom-slow"
                        style={{
                          // aspectRatio: '16/9',
                          minHeight: 800,
                          overflow: 'hidden',
                          backgroundColor: '#eee',
                          position: 'relative',
                        }}
                      >
                        {item.Thumbnail ? (
                          <Image
                            src={item.Thumbnail}
                            alt={item.Title || ''}
                            fill
                            sizes="(max-width: 768px) 100vw, 800px"
                            style={{ objectFit: 'cover' }}
                            unoptimized={item.Thumbnail?.startsWith('http')}
                          />
                        ) : (
                          <div className="bg-gray" style={{ width: '100%', height: '100%', minHeight: 320 }} />
                        )}
                      </div>
                      <div className="dlab-post-info">
                        <div className="dlab-post-title">
                          <h4 className="post-title">{item.Title}</h4>
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
                        <div className="dlab-post-readmore blog-share d-flex flex-wrap" style={{ gap: '0.5rem' }}>
                          <Link
                            href={`/admin/recent-posts/edit/${encodeURIComponent(item.Slug)}`}
                            title="Edit"
                            className="site-button outline outline-1"
                          >
                            <FaPencilAlt style={{ marginRight: 6 }} />
                          </Link>
                          {/* <a
                            href={href}
                            target={external ? '_blank' : '_self'}
                            rel={external ? 'noreferrer' : undefined}
                            className="site-button outline outline-1"
                            title="View"
                          >
                            <FaExternalLinkAlt style={{ marginRight: 6 }} />
                          </a> */}
                          <button
                            type="button"
                            className="site-button outline outline-1"
                            style={{ color: '#c00', borderColor: '#c00' }}
                            disabled={deleting === item.Slug}
                            onClick={() => handleDeleteClick(item.Slug, item.Title)}
                            title="Delete"
                          >
                            <FaTrashAlt style={{ marginRight: 6 }} /> {deleting === item.Slug ? 'Deleting...' : ''}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={!!confirmDelete}
        title="Delete recent post?"
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
