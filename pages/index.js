import React, { useRef } from 'react';
import ReviewsCarousel from '../components/ReviewsCarousel';

import bgimg from '../public/images/background/bg4.jpeg';
import Aman1 from '../public/images/aman1.jpg';
import Aman2 from '../public/images/aman2.jpg';
import Aman3 from '../public/images/aman.jpg';
import bg1 from '../public/images/background/bg4.jpeg';
import bg2 from '../public/images/background/bg4.jpeg';
import { ProjectsDetailsData } from '../data/ProjectsDetailsData';
import ContactForm from '../components/ContactForm';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';

import frontend from "../public/images/skills/frontend.jpg"
import backend from "../public/images/skills/backend.jpg"
import database from "../public/images/skills/database.jpg"
import mapping from "../public/images/skills/mapping.jpg"
import geotech from "../public/images/skills/geotech.jpg"
import othertech from "../public/images/skills/othertech.jpg"
import ImgCarousel from '../components/ImgCarousel';


const carouselImages = [
    { "Image": Aman1, "Description": "" },
    { "Image": Aman2, "Description": "" },
    // { "Image": Aman3, "Description": "Working on geospatial analytics" },
]




const HomePage = () => {
    const aboutProgressRef = useRef(null);
    return (
        <>
            <Head>
                <meta name="description" content="Aman Chaudhary is a skilled Full Stack WebGIS Developer and an IIT Gandhinagar graduate. He specializes in Full Stack and WebGIS Development, building interactive and visually appealing web-based GIS applications." />
                <meta name="keywords" content="Aman Chaudhary, WebGIS Developer, Aman Chaudhary IITGN" />
                <meta name="author" content="Aman Chaudhary" />
                <meta name="google-site-verification" content="MZTK0uf2XlaN0lQNV9tIfP56jnhWKCVj332CE7yK0PM" />
                <title>Aman Chaudhary | Portfolio</title>
            </Head>

            <div className="page-content bg-white rubik">
                {/* <div className="home-banner" style={{ backgroundImage: "url(" + bgimg.src + ")" }}>
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
                            <div className="row mt-3">
                                <div className="col-md-12 col-lg-6 order-2 order-lg-1">
                                    <h2 className="font-weight-300">Aman Chaudhary <br />
                                        <p className="font-weight-300" style={{ fontSize: "16px" }}> Geospatial Technology Developer | Remote Sensing | GeoAI <br />
                                            World Bank Group | University of Twente | IIT Gandhinagar
                                        </p>
                                    </h2>

                                    <p style={{ fontSize: "16px" }}>
                                        I’m a Geospatial Technologies Specialist with a passion for developing intelligent, interactive platforms that transform complex spatial data into actionable insights.
                                        <br /><br />
                                        With deep expertise in WebGIS, remote sensing, spatial analytics, and Earth observation, I build digital tools that enable decision-making, monitoring, and planning across diverse domains — including water resources, agriculture, food systems, climate, urban development, disaster risk, and sustainability.
                                        <br /><br />
                                        From visualizing satellite data to deploying full-stack spatial platforms, I focus on scalable, open-source solutions tailored to real-world impact.


                                    </p>


                                    {/* <div className="progress-section">
                                            <div className="progress-bx">
                                                <h4>Hard Work</h4>
                                                <div className="count-box">70%</div>
                                                <div className="progress">
                                                    <div className="progress-bar bg-success" style={{width:'70%'}} role="progressbar"></div>
                                                </div>
                                            </div>
                                            <div className="progress-bx">
                                                <h4>Projects Delivery</h4>
                                                <div className="count-box">80%</div>
                                                <div className="progress">
                                                    <div className="progress-bar bg-success" style={{width:'80%'}} role="progressbar"></div>
                                                </div>
                                            </div>
                                            <div className="progress-bx">
                                                <h4>Customers Love</h4>
                                                <div className="count-box">90%</div>
                                                <div className="progress">
                                                    <div className="progress-bar bg-success" style={{width:'90%'}} role="progressbar" ></div>
                                                </div>
                                            </div>
                                        </div> */}
                                    {/* <h3 className="m-b10">The Project</h3> */}
                                    {/* <p style={{ fontSize: "18px", textAlign: "justify" }}>
       
                                    I graduated from IIT Gandhinagar, India, with a major in Civil Engineering and a minor in Computer Science and Engineering.
                                     
                                    
                                    Currently working as a consultant in the World Bank&apos;s Hydroinformatics team. Developing WebGIS digital solutions under the Water Accounting Workstream within the Water Global Practice, supporting projects on water accounting, agro-climatic analytics, and irrigation performance monitoring.


                                    </p> */}
                                    <ul className="list-inline m-a0">
                                        <li><a href="https://www.linkedin.com/in/amanchry/" target='_blank' rel="noreferrer" className="site-button  circle mr-1 facebook" style={{ fontSize: "24px" }}><i className="fa fa-linkedin"></i></a></li>
                                        <li><a href="https://github.com/amanchry" target='_blank' rel="noreferrer" className="site-button  circle mr-1 facebook" style={{ fontSize: "24px" }}><i className="fa fa-github"></i></a></li>
                                        <li><a href="https://www.instagram.com/a_man__chaudhary/" target='_blank' rel="noreferrer" className="site-button  circle mr-1 facebook" style={{ fontSize: "24px" }}><i className="fa fa-instagram"></i></a></li>
                                        <li><a href="https://twitter.com/amanchry" target='_blank' rel="noreferrer" className="site-button  circle mr-1 facebook" style={{ fontSize: "24px" }}><i className="fa fa-twitter"></i></a></li>
                                        <li><a href="https://medium.com/@chaudharyaman" target='_blank' rel="noreferrer" className="site-button  circle mr-1 facebook" style={{ fontSize: "24px" }}><i className="fa fa-medium"></i></a></li>
                                        <li><a href="mailto:amanchaudhary.web@gmail.com" className="site-button  circle mr-1 facebook" style={{ fontSize: "24px" }}><i className="fa fa-envelope"></i></a></li>
                                    </ul>

                                </div>
                                <div className="col-md-12 col-lg-6 order-1 order-lg-2">
                                    <div className="img-half-bx align-items-stretch">
                                        <Image src={Aman1} alt="" />
                                        {/* <ImgCarousel Images={carouselImages} /> */}
                                    </div>
                                </div>



                            </div>
                        </div>
                    </div>




                    <div className="section-full about-service bg-img-fix" >
                        {/* <div className="section-full content-inner-1 overlay-primary about-service bg-img-fix" style={{ backgroundImage: "url(" + bg2.src + ")" }}> */}
                        <div className="container">
                            <div className="section-head  text-center">
                                <h2 className="box-title m-tb0 max-w800 m-auto">My Expertise<span className="bg-primary"></span></h2>
                                <p>I integrate open-source technologies with modern cloud architectures to build scalable, intelligent geospatial solutions.</p>
                            </div>
                        </div>
                        <div className="container">
                            <div className="row ">

                                <div className="col-lg-4 col-md-6 col-sm-6 m-b30" >
                                    <div className="icon-bx-wraper bx-style-1 p-a30 center">
                                        <div className="skill_logo m-b20">
                                            <Image src={frontend} title='Frontend Development' alt='tech' />
                                        </div>
                                        <div className="icon-content">
                                            <h5 className="dlab-tilte">Frontend Development</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-6 m-b30" >
                                    <div className="icon-bx-wraper bx-style-1 p-a30 center">
                                        <div className="skill_logo m-b20">
                                            <Image src={mapping} title='Frontend Mapping' alt='tech' />
                                        </div>
                                        <div className="icon-content">
                                            <h5 className="dlab-tilte">Frontend Mapping</h5>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-4 col-md-6 col-sm-6 m-b30" >
                                    <div className="icon-bx-wraper bx-style-1 p-a30 center">
                                        <div className="skill_logo m-b20">
                                            <Image src={backend} title='Backend Development' alt='tech' />
                                        </div>
                                        <div className="icon-content">
                                            <h5 className="dlab-tilte">Backend Development</h5>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-4 col-md-6 col-sm-6 m-b30" >
                                    <div className="icon-bx-wraper bx-style-1 p-a30 center">
                                        <div className="skill_logo m-b20">
                                            <Image src={database} title='Database' alt='tech' />
                                        </div>
                                        <div className="icon-content">
                                            <h5 className="dlab-tilte">Database</h5>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-4 col-md-6 col-sm-6 m-b30" >
                                    <div className="icon-bx-wraper bx-style-1 p-a30 center">
                                        <div className="skill_logo m-b20">
                                            <Image src={geotech} title='Geo Tools' alt='tech' />
                                        </div>
                                        <div className="icon-content">
                                            <h5 className="dlab-tilte">Geo Tools</h5>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-4 col-md-6 col-sm-6 m-b30" >
                                    <div className="icon-bx-wraper bx-style-1 p-a30 center">
                                        <div className="skill_logo m-b20">
                                            <Image src={othertech} title='Other Tools' alt='tech' />
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



                    <div className="section-full content-inner bg-white workspace-bx mfp-gallery">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="section-head text-center">
                                        <h2 className="font-weight-300">My Recent Work<p style={{ fontSize: "18px" }}>Here are a few past projects I&apos;ve worked on.</p></h2>

                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                {ProjectsDetailsData.slice(0, 9).map((project, index) => (
                                    <div className="col-lg-4 col-md-12 col-sm-12" key={index}>
                                        <div className="dlab-box portfolio-box m-b30">
                                            <div className="dlab-media dlab-img-effect dlab-img-overlay1" data-tilt=""> <Image src={project.Image} alt="" />
                                                <div className="overlay-bx">
                                                    <div className="overlay-icon text-white">
                                                        <h5>{project.ProjectName}</h5>
                                                        {/* <p className="m-b10">{project.TagLine}</p> */}
                                                        <a href={project.Link} target="bank"><i className="ti-arrow-top-right icon-bx-xs"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="col-lg-12 m-t20 text-center">
                                <Link href="/portfolio" className="site-button long-btn radius-xl shadow">See More</Link>
                            </div>

                        </div>
                    </div>

                    {/* <div className="section-full content-inner-2 bg-img-fix overlay-primary gradient testimonial-curv-bx m-b20" style={{ backgroundImage: "url(" + bg1.src + ")" }}>
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


                    <div className="section-full content-inner-2 bg-img-fix overlay-primary gradient subscribe-bx" style={{ backgroundImage: "url(" + bg1.src + ")" }}>
                        <div className="container">
                            <form className="row text-white dezPlaceAni align-items-center dzSubscribe" action="script/mailchamp.php" method="post">
                                <div className="col-lg-4  col-md-12">
                                    <h2 className="m-b0"> Start a project </h2>
                                </div>
                                <div className="col-lg-6 col-md-9 contact-form-bx">
                                    <p style={{ fontSize: "20px" }}> Interested in working together? We should queue up a time to chat. </p>

                                </div>
                                <div className="col-lg-2 col-md-3">
                                    <Link href="/contact" ><button className="site-button button-md radius-xl white btn-block">Let&apos;s do this</button></Link>
                                </div>
                            </form>
                        </div>
                    </div>


                    <ContactForm />
                </div>
            </div >

        </>
    )
}

export default HomePage