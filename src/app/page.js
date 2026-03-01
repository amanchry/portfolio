'use client';

import React, { useRef } from 'react';
import ContactForm from '@/components/ContactForm';
import Link from 'next/link';
import Image from 'next/image';
import ReviewsCarousel from '@/components/ReviewsCarousel';
import RecentPosts from '@/components/RecentPosts';



const HomePage = () => {
  const aboutProgressRef = useRef(null);
  return (
    <div className="page-content bg-white rubik">
      {/* <div className="home-banner" style={{ backgroundImage: "url(/images/background/banner_1.png)" }}>
        <div className="home-bnr-inner">
          <div className="home-bnr-content">
            <h4 className="sub-title">Hi, I&apos;m</h4>
            <h2 className="dz-title">Aman Chaudhary</h2>
            <h4 className="sub-title">Open-Source WebGIS • Remote Sensing • GIS • GeoAI</h4>

            <div className="home-bnr-btns">
              <Link
                href="#"
                className="site-button white btn-icon mt-4"
                onClick={(e) => {
                  e.preventDefault();
                  aboutProgressRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                  });
                }}
              >
                Know more <i className="fa fa-angle-double-right"></i>


              </Link>
            </div>
          </div>
        </div>
      </div> */}

      <div className="content-block ">
        <div className="section-full content-inner about-progress" ref={aboutProgressRef}>
          <div className="container">
            <div className="row about-row-photo-top-on-mobile mt-3">
              <div className="col-md-12 col-lg-6">
                <h2 className="font-weight-400">Aman Chaudhary</h2>
                <p className="font-weight-300 sub-title" style={{ fontSize: "18px" }}>
                  Geospatial Technology | Remote Sensing | GeoAI<br />
                  The World Bank | University of Twente | IIT Gandhinagar
                </p>

                <p style={{ fontSize: "18px" }}>
                  I’m a Geospatial Technologies Specialist with a passion for developing intelligent, interactive platforms that transform complex spatial data into actionable insights.
                  <br /><br />
                  With deep expertise in WebGIS, remote sensing, spatial analytics, and Earth observation, I build digital tools that enable decision-making, monitoring, and planning across diverse domains - including water resources, agriculture, food systems, climate, urban development, disaster risk, and sustainability.
                  <br /><br />
                  From visualizing satellite data to deploying full-stack spatial platforms, I focus on scalable, open-source solutions tailored to real-world impact.


                </p>

                <div className="dlab-post-readmore blog-share">
                        <Link
                          href={`/about`}
                          title="Know more"
                          className="site-button outline outline-1"
                        >
                          Know more <i className="fa fa-long-arrow-right"></i>
                        </Link>
                      </div>


                
                {/* <h3 className="m-b10">The Project</h3> */}
                {/* <p style={{ fontSize: "18px", textAlign: "justify" }}>
       
                                    I graduated from IIT Gandhinagar, India, with a major in Civil Engineering and a minor in Computer Science and Engineering.
                                     
                                    
                                    Currently working as a consultant in the World Bank&apos;s Hydroinformatics team. Developing WebGIS digital solutions under the Water Accounting Workstream within the Water Global Practice, supporting projects on water accounting, agro-climatic analytics, and irrigation performance monitoring.


                                    </p> */}
              </div>
              <div className="col-md-12 col-lg-6">
                <div className="img-half-bx align-items-stretch">
                  <Image src="/images/aman1.jpg" alt="Aman Chaudhary" width={500} height={600} style={{ width: '100%', height: 'auto' }} />
                </div>
              </div>
              {/* <div className="col-md-12 col-lg-12">
                <ul className="list-inline m-a0">
                  <li><a href="https://www.linkedin.com/in/amanchry/" target='_blank' rel="noreferrer" className="site-button  circle mr-1 facebook" style={{ fontSize: "24px" }}><i className="fa fa-linkedin"></i></a></li>
                  <li><a href="https://github.com/amanchry" target='_blank' rel="noreferrer" className="site-button  circle mr-1 facebook" style={{ fontSize: "24px" }}><i className="fa fa-github"></i></a></li>
                  <li><a href="https://www.instagram.com/a_man__chaudhary/" target='_blank' rel="noreferrer" className="site-button  circle mr-1 facebook" style={{ fontSize: "24px" }}><i className="fa fa-instagram"></i></a></li>
                  <li><a href="https://twitter.com/amanchry" target='_blank' rel="noreferrer" className="site-button  circle mr-1 facebook" style={{ fontSize: "24px" }}><i className="fa fa-twitter"></i></a></li>
                  <li><a href="https://medium.com/@chaudharyaman" target='_blank' rel="noreferrer" className="site-button  circle mr-1 facebook" style={{ fontSize: "24px" }}><i className="fa fa-medium"></i></a></li>
                  <li><a href="mailto:amanchaudhary.web@gmail.com" className="site-button  circle mr-1 facebook" style={{ fontSize: "24px" }}><i className="fa fa-envelope"></i></a></li>
                </ul>
              </div> */}


            </div>
          </div>
        </div>




        <div className="content-block">
          <div className="section-full content-inner">
            <div className="container">
              <div className="section-head text-black">
                <h2 className="box-title m-tb0">Core Focus Areas<span className="bg-primary"></span></h2>
                <p>I design and build spatial systems that transform complex geodata into tools for real-world decision-making.</p>
              </div>
            </div>
            <div className="container">
              <div className="row focus-areas-row">

                <div className="col-12 col-sm-6 col-lg-3 m-b30">
                  <div className="icon-bx-wraper expertise bx-style-1 p-a20 center focus-area-card">
                    <div className="icon-lg m-b20"> <Link href={"#"} className="icon-cell"><i className="flaticon-tracking-map " /></Link> </div>
                    <div className="icon-content">
                      <h5 className="dlab-tilte">Geospatial Data Analytics</h5>
                      <p>Spatial analysis, data modeling, and large-scale geospatial data processing.</p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-lg-3 m-b30">
                  <div className="icon-bx-wraper expertise bx-style-1 p-a20 center focus-area-card">
                  
                    <div className="icon-lg m-b20"> <Link href={"#"} className="icon-cell"><i className="flaticon-devices" /></Link> </div>
                    {/* <div className="icon-lg m-b20"> <Link href={"#"} className="icon-cell"><i className="flaticon-layers" /></Link> </div> */}

                    <div className="icon-content">
                      <h5 className="dlab-tilte">Open-Source WebGIS & Spatial Infrastructure</h5>
                      <p>Scalable, production-ready geospatial systems and web-based GIS applications.</p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-lg-3 m-b30">
                  <div className="icon-bx-wraper expertise bx-style-1 p-a20 center focus-area-card">
                    <div className="icon-lg m-b20"> <Link href={"#"} className="icon-cell"><i className="flaticon-map-location" /></Link> </div>
                    <div className="icon-content">
                      <h5 className="dlab-tilte">Remote Sensing</h5>
                      <p>Satellite data processing and Earth observation workflows.</p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-lg-3 m-b30">
                  <div className="icon-bx-wraper expertise bx-style-1 p-a20 center focus-area-card">
                    <div className="icon-lg m-b20"> <Link href={"#"} className="icon-cell"><i className="flaticon-mind" /></Link> </div>
                    <div className="icon-content">
                      <h5 className="dlab-tilte">GeoAI</h5>
                      <p>Artificial intelligence for spatial data analysis.</p>
                    </div>
                  </div>
                </div>


              </div>
            </div>
          </div>
        </div>









        {/* <div className="section-full content-inner-2 bg-img-fix overlay-primary gradient testimonial-curv-bx m-b20" style={{ backgroundImage: "url(/images/background/bg1.jpeg)" }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-2"></div>
              <div className="col-lg-8">
                <div className="section-head text-center">
                  <h2 className="text-uppercase"><span className="font-weight-300">Happy Clients</span> <br /> Project Reviews</h2>
                  <h5 className="font-weight-300 text-gray-dark">People I&apos;ve worked with have said some nice things...</h5>

                </div>
                <ReviewsCarousel />
              </div>
            </div>
          </div>
        </div> */}

        <div className="section-full bg-white content-inner">
          <div className="container">
            <div className="section-head text-black">
              <h2 className="box-title m-tb0">Latest Posts<span className="bg-primary"></span></h2>
              <p>Recent updates, events, and reflections.</p>
            </div>

            <RecentPosts />
          </div>
        </div>








      </div>
    </div>
  );
}

export default HomePage