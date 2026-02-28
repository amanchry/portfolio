'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaPencilAlt, FaTrashAlt, FaExternalLinkAlt, FaCalendarAlt } from 'react-icons/fa';
import { Button, Flex } from '@radix-ui/themes';
import ConfirmDialog from '@/components/ConfirmDialog';
import Toast from '@/components/Toast';

function stripHtml(html) {
  if (!html || typeof html !== 'string') return '';
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

export default function AdminProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [toast, setToast] = useState({ open: false, message: '', type: 'info' });

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => setProjects(Array.isArray(data) ? data : []))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  const handleDeleteClick = (projectName, name) => {
    setConfirmDelete({ projectName, name });
  };

  const handleDeleteConfirm = async () => {
    if (!confirmDelete) return;
    const { projectName, name } = confirmDelete;
    setConfirmDelete(null);
    setDeleting(projectName);
    try {
      const res = await fetch(`/api/projects/${encodeURIComponent(projectName)}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok && data.success) {
        setProjects((prev) => prev.filter((p) => p.ProjectName !== projectName));
        router.refresh();
        setToast({ open: true, message: `"${name}" deleted.`, type: 'success' });
      } else {
        setToast({ open: true, message: data.error || 'Failed to delete', type: 'error' });
      }
    } catch (_) {
      setToast({ open: true, message: 'Failed to delete project', type: 'error' });
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="page-content bg-white">
      <div className="dlab-bnr-inr overlay-primary" style={{ backgroundImage: 'url(/images/background/banner_1.png)' }}>
        <div className="container">
          <div className="dlab-bnr-inr-entry">
            <h1 className="text-white">Projects</h1>
            <p className="text-white m-b0">
              Manage your projects
              {!loading && (
                <span className="m-l10" style={{ fontWeight: 600 }}>
                  · {projects.length} {projects.length === 1 ? 'project' : 'projects'}
                </span>
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="section-full content-inner portfolio-section">
        <div className="container">
          <h4 className="text-gray-dark font-weight-300 m-b20 text-center">Manage your projects</h4>
          <Flex justify="center" gap="3" wrap="wrap" className="m-b30">
            <Button size="3" variant="soft" asChild>
              <Link href="/admin">← Back to Admin</Link>
            </Button>
            <Button size="3" asChild>
              <Link href="/admin/projects/new">Add new project</Link>
            </Button>
          </Flex>

          {loading && <p className="text-center">Loading projects...</p>}
          {!loading && projects.length === 0 && <p className="text-center">No projects yet.</p>}
          {!loading && projects.length > 0 && (
            <div className="row">
              {projects.map((project) => {
                const descriptionText = stripHtml(project.Description || '').slice(0, 140);
                const descriptionDisplay = descriptionText + (descriptionText.length >= 140 ? '…' : '');
                const projectDate = project.ProjectDate
                  ? new Date(project.ProjectDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
                  : null;
                return (
                  <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 m-b30" key={project.id}>
                    <div
                      className="dlab-box portfolio-box bg-white border"
                      style={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: 8,
                        overflow: 'hidden',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                      }}
                    >
                      <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden', backgroundColor: '#eee' }}>
                        <Image
                          src={project.Image}
                          alt={project.ProjectName || ''}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          style={{ objectFit: 'cover' }}
                          unoptimized={project.Image?.startsWith('http')}
                        />
                      </div>
                      <div className="p-a20" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <h5 className="font-weight-600 m-b10 m-t0" style={{ fontSize: '1.1rem' }}>
                          {project.ProjectName}
                        </h5>
                        {projectDate && (
                          <p className="text-muted small m-b10 d-flex align-items-center" style={{ fontSize: '0.85rem', gap: 6 }}>
                            <FaCalendarAlt style={{ flexShrink: 0, opacity: 0.8 }} />
                            {projectDate}
                          </p>
                        )}
                        <p className="m-b15 text-gray-dark" style={{ fontSize: '0.9rem', lineHeight: 1.5, flex: 1 }}>
                          {descriptionDisplay || 'No description.'}
                        </p>
                        <div className="d-flex flex-wrap align-items-center" style={{ gap: 8 }}>
                          <Link
                            href={`/admin/projects/edit/${encodeURIComponent(project.ProjectName)}`}
                            className="site-button button-sm outline radius-xl d-inline-flex align-items-center"
                            style={{ gap: 6 }}
                            title="Edit"
                          >
                            <FaPencilAlt /> Edit
                          </Link>
                          <Link
                            href={`/projects/${encodeURIComponent(project.ProjectName)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="site-button button-sm outline radius-xl d-inline-flex align-items-center"
                            style={{ gap: 6 }}
                            title="View"
                          >
                            <FaExternalLinkAlt /> View
                          </Link>
                          <button
                            type="button"
                            className="site-button button-sm outline radius-xl d-inline-flex align-items-center"
                            style={{ gap: 6, color: 'var(--danger, #dc3545)', borderColor: 'var(--danger, #dc3545)' }}
                            disabled={deleting === project.ProjectName}
                            onClick={() => handleDeleteClick(project.ProjectName, project.ProjectName)}
                            title="Delete"
                          >
                            <FaTrashAlt /> {deleting === project.ProjectName ? 'Deleting...' : 'Delete'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog
        open={!!confirmDelete}
        title="Delete project?"
        message={confirmDelete ? `Delete "${confirmDelete.name}"? This cannot be undone.` : ''}
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
