'use client';

import React, { useEffect, useState } from 'react';
import PageTitle from '@/components/PageTitle';
import ImgCarousel from '@/components/ImgCarousel';
import { useParams, usePathname } from 'next/navigation';
import { FaExternalLinkAlt } from 'react-icons/fa';
export default function ProjectDetailsPage() {
	const params = useParams();
	const pathname = usePathname();
	// Param key can be ProjectName or projectname depending on Next.js; fallback to path segment
	const projectName =
		(params && (params.ProjectName ?? params.projectname)) ||
		(pathname && decodeURIComponent(pathname.replace(/^\/portfolio\/?/, '').split('/')[0] || ''));

	const [Project, setProject] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!projectName) {
			setLoading(false);
			return;
		}
		setLoading(true);
		fetch(`/api/projects/${encodeURIComponent(projectName)}`)
			.then((res) => (res.ok ? res.json() : null))
			.then(setProject)
			.catch(() => setProject(null))
			.finally(() => setLoading(false));
	}, [projectName]);

	const projectDisplayName =
		(Project && Project.ProjectName) ||
		(projectName && projectName.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()));

	return (
		<div className="page-content bg-white">
			<div
				className="dlab-bnr-inr overlay-primary"
				style={{ backgroundImage: 'url(/images/background/banner_1.png)' }}
			>
				<PageTitle
					motherMenu={projectDisplayName || 'Project'}
					activeMenu={projectDisplayName || 'Project'}
					middleMenu="Projects"
					middleMenuHref="/projects"
				/>
			</div>
			{loading && <div className="container p-a30 text-center">Loading...</div>}
			{!loading && !Project && <div className="container p-a30 text-center">Project not found.</div>}
			{Project && (
				<div className="content-block">
					<div className="section-full content-inner-2">
						<div className="container">
							<div className="row m-b40">
								<div className="col-lg-6 col-md-6 m-b20">
									<h2 className="m-b10 m-t0">{Project.ProjectName}</h2>
									{Project.ProjectDate && (
										<p className="text-muted m-b20">
											<i className="fa fa-calendar"></i>{' '}
											{new Date(Project.ProjectDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
										</p>
									)}
									<p className="m-b10">{Project.Description}</p>
									{Project.Link && (
										<a
											href={Project.Link}
											target="_blank"
											rel="noreferrer"
											className="site-button radius-xl outline d-inline-flex align-items-center"
											style={{ gap: 6 }}
										>
											Visit Website <FaExternalLinkAlt /> 
										</a>
									)}

									<div className="p-a15 mt-3 bg-gray" style={{ borderRadius: 8 }}>
										<p className="m-b10 font-weight-600 small text-muted">Technologies</p>
										<div className="d-flex flex-wrap" style={{ gap: '6px' }}>
											{(Project.Technology || []).map((item, index) => (
												<span
													key={index}
													className="badge"
													style={{
														fontSize: '0.75rem',
														fontWeight: 500,
														padding: '4px 10px',
														borderRadius: 9999,
														backgroundColor: 'rgba(0,0,0,0.08)',
														color: '#333',
														border: '1px solid rgba(0,0,0,0.12)',
													}}
												>
													{item}
												</span>
											))}
										</div>
									</div>

								</div>
								<div className="col-lg-6 col-md-6">
									<ImgCarousel Images={Project.CarouselImages || []} />

								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
