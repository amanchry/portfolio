'use client';

import React from 'react';
import { techSkillCategories } from '@/data/techSkills';

function TechMarqueeRow({ category, reverse = false }) {
  const items = [...category.items, ...category.items];

  return (
    <div className="tech-marquee-row">
      <h5 className="tech-marquee-title">{category.title}</h5>
      <div className="tech-marquee">
        <div
          className={`tech-marquee-track${reverse ? ' tech-marquee-track-reverse' : ''}`}
          style={{ '--marquee-duration': `${Math.max(category.items.length * 4, 24)}s` }}
        >
          {items.map((item, index) => {
            const Icon = item.Icon;
            return (
              <div className="tech-chip" key={`${category.title}-${item.name}-${index}`}>
                <span className="tech-chip-icon" style={{ color: item.color }}>
                  <Icon aria-hidden="true" />
                </span>
                <span className="tech-chip-label">{item.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function TechSkillsScroller() {
  return (
    <div className="tech-skills-scroller">
      {techSkillCategories.map((category, index) => (
        <TechMarqueeRow key={category.title} category={category} reverse={index % 2 === 1} />
      ))}
    </div>
  );
}
