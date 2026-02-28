'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PageTitle from '@/components/PageTitle';
import SimpleReactLightbox from 'simple-react-lightbox';
import { SRLWrapper, useLightbox } from 'simple-react-lightbox';
import Link from 'next/link';

const Iconimage = props => {
	const { openLightbox } = useLightbox()
	return (
		<Link href={"#"} onClick={() => openLightbox(props.imageToOpen)} className="mfp-link" >
			<i className="ti-fullscreen icon-bx-xs"></i>
		</Link>
	)
}



const GallerySection = () => {



	return (



			<div className="section-full content-inner bg-white workspace-bx mfp-gallery">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<div className="section-head text-center">
								<h2 className="text-uppercase "><span className="font-weight-300">Check our space</span> <br />Our Workspace</h2>
							</div>
						</div>
					</div>
					<SimpleReactLightbox>
						<SRLWrapper >
							<div className="row">
								<div className="col-lg-6 col-md-12 col-sm-12">
									<div className="dlab-box portfolio-box m-b30">
										<div className="dlab-media dlab-img-effect dlab-img-overlay1" data-tilt=""> <img src="https://images.unsplash.com/photo-1761839257287-3030c9300ece?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
											<div className="overlay-bx">
												<div className="overlay-icon text-white">
													<h5>Website Name</h5>
													<p className="m-b10">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots</p>
													<Iconimage />
													<a href="https://www.google.com/" target="bank"><i className="ti-arrow-top-right icon-bx-xs"></i></a>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-6 col-md-12 col-sm-12">
									<div className="row">
										<div className="col-lg-6 col-md-6 col-sm-6">
											<div className="dlab-box portfolio-box m-b30">
												<div className="dlab-media dlab-img-effect dlab-img-overlay1" data-tilt=""> <img src="https://images.unsplash.com/photo-1761839257287-3030c9300ece?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
													<div className="overlay-bx">
														<div className="overlay-icon text-white">
															<h5>Website Name</h5>
															<p className="m-b10">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots</p>
															<Iconimage />
															<a href="https://www.google.com/" target="bank"><i className="ti-arrow-top-right icon-bx-xs"></i></a>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="col-lg-6 col-md-6 col-sm-6">
											<div className="dlab-box portfolio-box m-b30">
												<div className="dlab-media dlab-img-effect dlab-img-overlay1" data-tilt=""> <img src="https://images.unsplash.com/photo-1761839257287-3030c9300ece?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
													<div className="overlay-bx">
														<div className="overlay-icon text-white">
															<h5>Website Name</h5>
															<p className="m-b10">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots</p>
															<Iconimage />
															<a href="https://www.google.com/" target="bank"><i className="ti-arrow-top-right icon-bx-xs"></i></a>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="col-lg-12 col-md-12 col-sm-12">
											<div className="dlab-box portfolio-box m-b30">
												<div className="dlab-media dlab-img-effect dlab-img-overlay1" data-tilt=""> <img src="https://images.unsplash.com/photo-1761839257287-3030c9300ece?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
													<div className="overlay-bx">
														<div className="overlay-icon text-white">
															<h5>Website Name</h5>
															<p className="m-b10">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots</p>
															<Iconimage />
															<a href="https://www.google.com/" target="bank"><i className="ti-arrow-top-right icon-bx-xs"></i></a>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-6 col-md-12 col-sm-12">
									<div className="dlab-box portfolio-box m-b30">
										<div className="dlab-media dlab-img-effect dlab-img-overlay1" data-tilt=""> <img src="https://images.unsplash.com/photo-1761839257287-3030c9300ece?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
											<div className="overlay-bx">
												<div className="overlay-icon text-white">
													<h5>Website Name</h5>
													<p className="m-b10">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots</p>
													<Iconimage />
													<a href="https://www.google.com/" target="bank"><i className="ti-arrow-top-right icon-bx-xs"></i></a>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-3 col-md-6 col-sm-6">
									<div className="dlab-box portfolio-box m-b30">
										<div className="dlab-media dlab-img-effect dlab-img-overlay1" data-tilt=""> <img src="https://images.unsplash.com/photo-1761839257287-3030c9300ece?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
											<div className="overlay-bx">
												<div className="overlay-icon text-white">
													<h5>Website Name</h5>
													<p className="m-b10">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots</p>
													<Iconimage />
													<a href="https://www.google.com/" target="bank"><i className="ti-arrow-top-right icon-bx-xs"></i></a>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-3 col-md-6 col-sm-6">
									<div className="dlab-box portfolio-box m-b30">
										<div className="dlab-media dlab-img-effect dlab-img-overlay1" data-tilt=""> <img src="https://images.unsplash.com/photo-1761839257287-3030c9300ece?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
											<div className="overlay-bx">
												<div className="overlay-icon text-white">
													<h5>Website Name</h5>
													<p className="m-b10">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots</p>
													{/* <Iconimage /> */}
													{/* <a href="https://www.google.com/" target="bank"><i className="ti-arrow-top-right icon-bx-xs"></i></a> */}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</SRLWrapper >
					</SimpleReactLightbox>
				</div>
			</div>





	);
}

export default GallerySection