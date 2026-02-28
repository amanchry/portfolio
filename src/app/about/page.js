'use client';

import React from 'react';
import PageTitle from '@/components/PageTitle';
import Image from 'next/image';
import Slider from "react-slick";
import Link from 'next/link';
import RecentPosts from '@/components/RecentPosts';
import GallerySection from '@/components/GallerySection';



const AboutPage = () => {




    return (
        <div className="page-content bg-white">
            <div
                className="dlab-bnr-inr overlay-primary"
                style={{ backgroundImage: "url(/images/background/banner_1.png)" }}
            >
                <PageTitle motherMenu="About" activeMenu="About" />
            </div>

            <div className="content-block">
                <div className="section-full content-inner-2">
                    {/* Header */}
                    <div className="container">
                        <div className="section-head text-black text-center">
                            {/* <h4 className="text-gray-dark m-b10">About</h4> */}
                            {/* <h2 className="box-title m-tb0">
                                Building spatial intelligence for real-world decisions
                                <span className="bg-primary"></span>
                            </h2> */}

                        </div>
                    </div>





                    <div className="container">
                        <div className="row">
                            <div className="col-lg-5 col-md-4 about-img">
                                <img src="/images/Aman_WB.png" data-tilt alt="Aman Chaudhary" />
                            </div>

                            <div className="col-lg-7 col-md-8">
                                <div className="abuot-box left row m-lr0">
                                    <div className="col-lg-4">
                                        <h2 className="box-title m-tb0">
                                            About me<span className="bg-primary"></span>
                                        </h2>
                                        {/* <h4 className="text-gray-dark">GeoAI · Remote Sensing · WebGIS</h4> */}
                                    </div>

                                    <div className="col-lg-12 about-bio">
                                        <p>

                                            The world is constantly generating data — from satellites orbiting above us to sensors embedded across landscapes.
                                            But data alone doesn’t change anything. Decisions do. I build spatial intelligence infrastructures that transform
                                            raw geodata into tools for planning, monitoring, and meaningful action.

                                        </p>

                                        <p>
                                            Hi, I’m Aman Chaudhary. I graduated from <a href="https://iitgn.ac.in" target="_blank" rel="noreferrer noopener">IIT Gandhinagar</a>, India, with a B.Tech in Civil Engineering and a minor
                                            in Computer Science and Engineering. I am currently pursuing my Master’s in Geo-Information Science and Earth Observation
                                            (GeoAI specialization) at <a href="https://www.itc.nl/" target="_blank" rel="noreferrer noopener">ITC, University of Twente</a>, where I explore how artificial intelligence can strengthen spatial
                                            systems and Earth observation workflows.


                                        </p>

                                        <p>
                                            In my current role, I work as a Geospatial Solutions Developer and Consultant with the <a href="https://www.worldbank.org" target="_blank" rel="noreferrer noopener">World Bank Group</a>,
                                            contributing to the Global Water Informatics team. My work focuses on developing WebGIS-based digital solutions under
                                            the Water Accounting workstream within the <a href="https://www.worldbank.org/en/topic/water" target="_blank" rel="noreferrer noopener">Water Global Practice</a>, supporting initiatives in water accounting,
                                            agro-climatic analytics, and irrigation performance monitoring across diverse regions.

                                        </p>


                                        <p className="m-b0">
                                            My work spans WebGIS, open-source software development, remote sensing, GeoAI, and scalable geospatial infrastructure.
                                            From satellite data processing to deploying full-stack spatial platforms, I work on building systems that are reliable, practical, and easy to use.

                                        </p>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>





                    <div className="section-full content-inner bg-white mfp-gallery">


                        {/* <div className="section-full content-inner-1 overlay-primary about-service bg-img-fix" style={{ backgroundImage: "url(" + bg2.src + ")" }}> */}
                        <div className="container">
                            <div className="section-head  text-center">
                                        <h2 className="box-title m-tb0 max-w800 m-auto">Technologies I Work With<span className="bg-primary"></span></h2>
                                        <p>I integrate open-source technologies with modern cloud architectures to build scalable, intelligent geospatial solutions.</p>
                                    </div>

                            <div className="row ">

                                <div className="col-lg-4 col-md-6 col-sm-6 m-b30" >
                                    <div className="icon-bx-wraper bx-style-1 p-a30 center">
                                        <div className="skill_logo m-b20">
                                            <Image src="/images/skills/frontend.jpg" title="Frontend Development" alt="Frontend Development" width={400} height={400} />
                                        </div>
                                        <div className="icon-content">
                                            <h5 className="dlab-tilte">Frontend Development</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-6 m-b30" >
                                    <div className="icon-bx-wraper bx-style-1 p-a30 center">
                                        <div className="skill_logo m-b20">
                                            <Image src="/images/skills/mapping.jpg" title="Frontend Mapping" alt="Frontend Mapping" width={400} height={400} />
                                        </div>
                                        <div className="icon-content">
                                            <h5 className="dlab-tilte">Frontend Mapping</h5>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-4 col-md-6 col-sm-6 m-b30" >
                                    <div className="icon-bx-wraper bx-style-1 p-a30 center">
                                        <div className="skill_logo m-b20">
                                            <Image src="/images/skills/backend.jpg" title="Backend Development" alt="Backend Development" width={400} height={400} />
                                        </div>
                                        <div className="icon-content">
                                            <h5 className="dlab-tilte">Backend Development</h5>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-4 col-md-6 col-sm-6 m-b30" >
                                    <div className="icon-bx-wraper bx-style-1 p-a30 center">
                                        <div className="skill_logo m-b20">
                                            <Image src="/images/skills/database.jpg" title="Database" alt="Database" width={400} height={400} />
                                        </div>
                                        <div className="icon-content">
                                            <h5 className="dlab-tilte">Database</h5>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-4 col-md-6 col-sm-6 m-b30" >
                                    <div className="icon-bx-wraper bx-style-1 p-a30 center">
                                        <div className="skill_logo m-b20">
                                            <Image src="/images/skills/geotech.jpg" title="Geo Tools" alt="Geo Tools" width={400} height={400} />
                                        </div>
                                        <div className="icon-content">
                                            <h5 className="dlab-tilte">Geo Tools</h5>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-4 col-md-6 col-sm-6 m-b30" >
                                    <div className="icon-bx-wraper bx-style-1 p-a30 center">
                                        <div className="skill_logo m-b20">
                                            <Image src="/images/skills/othertech.jpg" title="Other Tools" alt="Other Tools" width={400} height={400} />
                                        </div>
                                        <div className="icon-content">
                                            <h5 className="dlab-tilte">Other Tools</h5>
                                        </div>
                                    </div>
                                </div>


                                {/* <div className="col-lg-6 col-md-6 col-sm-6 m-b30">
                                    <div className="icon-bx-wraper bx-style-1 p-a30 center">
                                        <div className="icon-lg text-white m-b20"> <Link href={"#"} className="icon-cell text-white"><i className="flaticon-map-location" /></Link> </div>
                                        <div className="icon-content">
                                            <h5 className="dlab-tilte">Other Tools</h5>
                                            <p>Leaflet JS, Openlayers, ArcGIS API</p>
                                        </div>
                                    </div>
                                </div> */}



                            </div>
                        </div>

                    </div>






                    {/* <RecentPosts /> */}
                    {/* <GallerySection /> */}


                    {/* /Content */}
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
