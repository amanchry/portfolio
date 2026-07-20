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


                <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 500, lineHeight: 1.15, marginBottom: "1.2rem" }}>
                  Hey, I&apos;m{' '}Aman.
        
                </h1>


                {/* <h2 className="font-weight-400">Aman Chaudhary</h2> */}
                <p className="font-weight-300 sub-title home-sub-title">
                  Geospatial Technology | Earth Observation | GeoAI<br />
                  The World Bank Group | University of Twente | IIT Gandhinagar
                </p>

                <p className="home-body-text">
                  I’m a Geospatial Technology Specialist focused on transforming complex spatial and environmental data into actionable intelligence for planning, monitoring, and decision-making.
                  <br /><br />

 My work combines GIS, Earth Observation, Machine Learning, Geospatial Artificial Intelligence (GeoAI), spatial analytics, cloud computing, and software engineering to develop data-driven solutions 
 across water resources, agriculture, food systems, climate resilience, urban development, disaster risk reduction, and sustainable development.

                  <br /><br />

From large-scale satellite data analytics to the design and deployment of geospatial platforms and decision-support systems, I focus on building scalable, open-source solutions that create real-world impact.

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
                {/* <div className="img-half-bx align-items-stretch"> */}
                  <img src="/images/Aman_WB.png" alt="Aman Chaudhary" width={500} height={500}  style={{ width: '100%', height: 'auto', borderRadius:"20px" }} />

                  {/* <Image src="/images/Aman_WB2.png" alt="Aman Chaudhary" width={500} height={600} style={{ width: '100%', height: 'auto' }} /> */}
                {/* </div> */}
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
                  <Link href={"#"} className="focus-area-card focus-card-1">
                    <div className="focus-card-bg" style={{ backgroundImage: "url(/images/areas/geospatial.jpg)" }}></div>
                    <div className="focus-card-tint"></div>
                    <div className="focus-card-overlay"></div>
                    <div className="focus-card-content">
                      <h5 className="dlab-tilte">Geospatial Data Analytics</h5>
                      <p>Spatial analysis, data modeling, and large-scale geospatial data processing.</p>
                    </div>
                  </Link>
                </div>
                <div className="col-12 col-sm-6 col-lg-3 m-b30">
                  <Link href={"#"} className="focus-area-card focus-card-2">
                    <div className="focus-card-bg" style={{ backgroundImage: "url(/images/areas/webgis.png)" }}></div>
                    <div className="focus-card-tint"></div>
                    <div className="focus-card-overlay"></div>
                    <div className="focus-card-content">
                      <h5 className="dlab-tilte">Open-Source WebGIS & Spatial Infrastructure</h5>
                      <p>Scalable, production-ready geospatial systems and web-based GIS applications.</p>
                    </div>
                  </Link>
                </div>
                <div className="col-12 col-sm-6 col-lg-3 m-b30">
                  <Link href={"#"} className="focus-area-card focus-card-3">
                    <div className="focus-card-bg" style={{ backgroundImage: "url(/images/areas/remote_sensing.jpg)" }}></div>
                    <div className="focus-card-tint"></div>
                    <div className="focus-card-overlay"></div>
                    <div className="focus-card-content">
                      <h5 className="dlab-tilte">Remote Sensing</h5>
                      <p>Satellite data processing and Earth observation workflows.</p>
                    </div>
                  </Link>
                </div>
                <div className="col-12 col-sm-6 col-lg-3 m-b30">
                  <Link href={"#"} className="focus-area-card focus-card-4">
                    <div className="focus-card-bg" style={{ backgroundImage: "url(/images/areas/geoai.jpg)" }}></div>
                    <div className="focus-card-tint"></div>
                    <div className="focus-card-overlay"></div>
                    <div className="focus-card-content">
                      <h5 className="dlab-tilte">GeoAI</h5>
                      <p>Artificial intelligence for spatial data analysis.</p>
                    </div>
                  </Link>
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