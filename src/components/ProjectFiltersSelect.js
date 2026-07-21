'use client';

import { useEffect, useRef, useState } from 'react';

export default function ProjectFiltersSelect({ value = [], onChange, options = [] }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleCategory = (category) => {
    if (value.includes(category)) {
      onChange(value.filter((item) => item !== category));
      return;
    }
    onChange([...value, category]);
  };

  const summaryLabel =
    value.length === 0
      ? 'Select tags'
      : value.length === 1
        ? value[0]
        : `${value.length} tags selected`;

  return (
    <div className="project-filters-select" ref={rootRef}>
      <button
        type="button"
        className="project-filters-select-trigger form-control text-start"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{summaryLabel}</span>
        <span aria-hidden="true">{open ? '▴' : '▾'}</span>
      </button>

      {open && (
        <div className="project-filters-select-menu" role="listbox" aria-multiselectable="true">
          {options.map((category) => {
            const checked = value.includes(category);
            return (
              <label key={category} className="project-filters-select-option">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleCategory(category)}
                />
                <span>{category}</span>
              </label>
            );
          })}
        </div>
      )}

      {value.length > 0 && (
        <div className="project-filters-select-tags">
          {value.map((category) => (
            <button
              key={category}
              type="button"
              className="project-filters-select-tag"
              onClick={() => toggleCategory(category)}
            >
              {category} ×
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
