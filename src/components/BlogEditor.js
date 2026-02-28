'use client';

import React, { useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function createImageMarkdown(url, alt = 'blog image') {
  return `![${alt}](${url})`;
}

export default function BlogEditor({ value = '', onChange }) {
  const paneHeight = 520;
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const setValue = (nextValue) => {
    if (typeof onChange === 'function') onChange(nextValue);
  };

  const insertAtCursor = (textToInsert) => {
    const textarea = textareaRef.current;
    if (!textarea) {
      setValue(`${value || ''}${textToInsert}`);
      return;
    }

    const start = textarea.selectionStart ?? 0;
    const end = textarea.selectionEnd ?? 0;
    const before = value.slice(0, start);
    const after = value.slice(end);
    const inserted = `${before}${textToInsert}${after}`;
    setValue(inserted);

    requestAnimationFrame(() => {
      textarea.focus();
      const pos = start + textToInsert.length;
      textarea.setSelectionRange(pos, pos);
    });
  };

  const handleFileChosen = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadError('');
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);

      const res = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        setUploadError(data.error || 'Failed to upload image.');
        return;
      }

      const imageUrl = data?.file?.url;
      if (!imageUrl) {
        setUploadError('Image URL missing in upload response.');
        return;
      }

      insertAtCursor(`\n${createImageMarkdown(imageUrl)}\n`);
    } catch (_) {
      setUploadError('Failed to upload image.');
    } finally {
      setUploading(false);
      if (event.target) event.target.value = '';
    }
  };

  return (
    <div className="row" style={{ gap: '1rem 0' }}>
      <div className="col-lg-6">
        <div className="d-flex justify-content-between align-items-center m-b10">
          <label className="font-weight-700 m-b0">Write Markdown</label>
          <button
            type="button"
            className="site-button outline button-sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Add image'}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChosen}
            style={{ display: 'none' }}
          />
        </div>

        <textarea
          ref={textareaRef}
          className="form-control"
          placeholder="Write your blog in markdown..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{
            height: paneHeight,
            overflowY: 'auto',
            resize: 'none',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
          }}
        />

        {uploadError ? <p className="text-danger small m-t10 m-b0">{uploadError}</p> : null}
      </div>

      <div className="col-lg-6">
        <label className="font-weight-700 d-block m-b10">Preview</label>
        <div
          className="blog-content border p-a20"
          style={{
            height: paneHeight,
            background: '#fff',
            overflowY: 'auto',
            overflowX: 'auto',
          }}
        >
          {value?.trim() ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
          ) : (
            <p className="text-muted m-b0">Preview will appear here as you type.</p>
          )}
        </div>
      </div>
    </div>
  );
}