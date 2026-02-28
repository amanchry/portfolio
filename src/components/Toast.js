'use client';

import { useEffect } from 'react';

export default function Toast({ message, type = 'info', open, onClose, duration = 4000 }) {
  useEffect(() => {
    if (!open || !onClose || duration <= 0) return;
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, [open, onClose, duration]);

  if (!open || !message) return null;

  const isSuccess = type === 'success';
  const isError = type === 'error';

  return (
    <div className="admin-toast-wrap" role="status" aria-live="polite">
      <div
        className={`admin-toast ${isSuccess ? 'admin-toast-success' : ''} ${isError ? 'admin-toast-error' : ''}`}
      >
        {isSuccess && <span className="admin-toast-icon">✓</span>}
        {isError && <span className="admin-toast-icon admin-toast-icon-error">✕</span>}
        <span className="admin-toast-message">{message}</span>
      </div>
    </div>
  );
}
