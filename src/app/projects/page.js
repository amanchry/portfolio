'use client';

import React, { useState, useEffect, useMemo } from 'react';
import PageTitle from '@/components/PageTitle';
import Link from 'next/link';
import Image from 'next/image';
import { FaCalendarAlt, FaExternalLinkAlt, FaInfoCircle } from 'react-icons/fa';

function stripHtml(html) {
	if (!html || typeof html !== 'string') return '';
	return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

function PortfolioItem() {
	const [activeFilter, setActiveFilter] = useState('all');
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch('/api/projects')
			.then((res) => res.json())
			.then((data) => {
				setProjects(Array.isArray(data) ? data : []);
			})
			.catch(() => setProjects([]))
			.finally(() => setLoading(false));
	}, []);

	const filteredProjects = useMemo(() => {
		if (activeFilter === 'all') return projects;
		return projects.filter((project) => project.Tags?.includes(activeFilter));
	}, [projects, activeFilter]);

	const visibleFilters = useMemo(() => {
		const used = new Set();
		projects.forEach((project) => {
			(project.Tags || []).forEach((tag) => used.add(tag));
		});
		return Array.from(used).sort((a, b) => a.localeCompare(b));
	}, [projects]);

	const filterCounts = useMemo(() => {
		const counts = { all: projects.length };
		visibleFilters.forEach((category) => {
			counts[category] = projects.filter((project) => project.Tags?.includes(category)).length;
		});
		return counts;
	}, [projects, visibleFilters]);

	return (
		<div className="section-full content-inner portfolio-section">
			<div className="container">
				<div className="section-head text-black text-center m-b20">
					<h4 className="text-gray-dark font-weight-300 m-b10">Here are some of the Projects I&apos;ve Worked On</h4>
				</div>

				{visibleFilters.length > 0 && (
					<div className="project-filters m-b30">
						<ul className="project-filters-list">
							<li className={activeFilter === 'all' ? 'active' : ''}>
								<button
									type="button"
									className={`project-filter-btn${activeFilter === 'all' ? ' project-filter-btn-active' : ''}`}
									onClick={() => setActiveFilter('all')}
									aria-pressed={activeFilter === 'all'}
								>
									All Projects
									<span className="project-filter-count">{filterCounts.all}</span>
								</button>
							</li>
							{visibleFilters.map((category) => {
								const isActive = activeFilter === category;
								return (
									<li key={category} className={isActive ? 'active' : ''}>
										<button
											type="button"
											className={`project-filter-btn${isActive ? ' project-filter-btn-active' : ''}`}
											onClick={() => setActiveFilter(category)}
											aria-pressed={isActive}
										>
											{category}
											<span className="project-filter-count">{filterCounts[category] ?? 0}</span>
										</button>
									</li>
								);
							})}
						</ul>
					</div>
				)}

				{loading && <p className="text-center">Loading projects...</p>}
				{!loading && projects.length === 0 && <p className="text-center">No projects yet.</p>}
				{!loading && projects.length > 0 && filteredProjects.length === 0 && (
					<p className="text-center text-muted">No projects match this filter.</p>
				)}
				<div className="row">
					{!loading &&
						filteredProjects.map((project) => {
							const descriptionText = stripHtml(project.Description || '').slice(0, 140);
							const descriptionDisplay = descriptionText + (descriptionText.length >= 140 ? '…' : '');
							const projectDate = project.ProjectDate
								? new Date(project.ProjectDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
								: null;
							return (
								<div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 m-b30" key={project.id || project.ProjectName}>
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
										<div style={{ position: 'relative', aspectRatio: '16/8', overflow: 'hidden', backgroundColor: '#eee', width: '100%' }}>
											<Image
												src={project.Image}
												alt={project.ProjectName || ''}
												fill
												sizes="(max-width: 768px) 100vw, 33vw"
												style={{ objectFit: 'contain', width: '100%', height: '100%' }}
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
											<div className="d-flex flex-wrap" style={{ gap: 8 }}>
												<Link
													href={`/projects/${encodeURIComponent(project.ProjectName)}`}
													className="site-button button-sm outline radius-xl d-inline-flex align-items-center"
													style={{ gap: 6 }}
												>
													<FaInfoCircle /> More Details
												</Link>
												{project.Link && (
													<a
														href={project.Link}
														target="_blank"
														rel="noreferrer"
														className="site-button button-sm outline radius-xl d-inline-flex align-items-center"
														style={{ gap: 6 }}
													>
														<FaExternalLinkAlt /> Visit Site
													</a>
												)}
											</div>
										</div>
									</div>
								</div>
							);
						})}
				</div>
			</div>
		</div>
	);
}

export default function PortfolioPage() {
	return (
		<div className="page-content bg-white">
			<div className="dlab-bnr-inr overlay-primary" style={{ backgroundImage: 'url(/images/background/banner_1.png)' }}>
				<PageTitle motherMenu="Projects" activeMenu="Projects" />
			</div>
			<PortfolioItem />
		</div>
	);
}
