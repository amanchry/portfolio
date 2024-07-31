import React, { useEffect, useState } from 'react'
import bannerIMG from "../../public/images/background/banner_1.png";
import PageTitle from '../../components/PageTitle';
import { ProjectsDetailsData } from '../../data/ProjectsDetailsData';
import ImgCarousel from '../../components/ImgCarousel';
import { useRouter } from 'next/router';
import Head from 'next/head';


const ProjectDetails = () => {

    const Router = useRouter()
    const ProjectName = Router.query.ProjectName;


    const [Project, setProject] = useState(null);
    useEffect(() => {
        let Project = ProjectsDetailsData.find((Project) => Project.ProjectName === (ProjectName));
        if (Project) {
            setProject(Project);
        }
    });






    return (
        <>
            <Head>
                <title>Aman Chaudhary | Portfolio</title>
            </Head>
            <div className="page-content bg-white">
                <div className="dlab-bnr-inr overlay-primary" style={{ backgroundImage: "url(" + bannerIMG.src + ")" }}>
                    <PageTitle motherMenu='Project Details' activeMenu='Project Details' />
                </div>
                {Project && (
                    <div className="content-block">
                        <div className="section-full content-inner-2">
                            <div className="container">
                                <div className="row m-b40">
                                    <div className="col-lg-6 col-md-6 m-b20">
                                        <h2 className="m-b10 m-t0">{Project.ProjectName}</h2>
                                        <h5 className="m-b20">{Project.TagLine}</h5>
                                        <p className="m-b10">{Project.Description}</p>
                                        {Project.Link && (
                                            <a href={Project.Link} target='blank' className="site-button radius-xl outline">Visit Website <i className="fa fa-long-arrow-right"></i></a>
                                        )}
                                    </div>

                                    <div className="col-lg-6 col-md-6">
                                        <ImgCarousel Images={Project.CarouselImages} />
                                        <div className="p-a30 bg-gray">
                                            <h2>Technologies</h2>
                                            {Project.Technology.map((item, index) => (
                                                <span className='p-a10 m-r5 bg-red site-button radius-xl outline' key={index}>{item}</span>
                                            ))}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                )}


            </div>
        </>
    )
}

export default ProjectDetails