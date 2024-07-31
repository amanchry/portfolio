import React, { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import { BlogData } from '../../data/BlogData';
import bannerIMG from '../../public/images/background/banner_1.png';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Head from 'next/head';

const BlogDetails = () => {
    const Router = useRouter()
    const BlogTitle = Router.query.blogDetails;

    const [Blog, setBlog] = useState(null);
    useEffect(() => {
        let Blog = BlogData.find((Blog) => Blog.BlogTitle === (BlogTitle));
        if (Blog) {
            setBlog(Blog);
        }
    });




    return (
        <>
            <Head>
                <title>Aman Chaudhary | Portfolio</title>
            </Head>

            <div className="page-content bg-white">
                <div className="dlab-bnr-inr overlay-primary" style={{ backgroundImage: "url(" + bannerIMG.src + ")" }}>
                    <PageTitle motherMenu="Blogs" activeMenu="Blogs" />
                </div>
                {Blog && (
                    <div className="content-area">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12 col-xl-12">
                                    <div className="blog-post blog-single">
                                        <div className="dlab-post-title ">
                                            <h4 className="post-title m-t0"><Link href={"#"}>{Blog.BlogTitle}</Link></h4>
                                        </div>
                                        <div className="dlab-post-meta m-b20">
                                            <ul className="d-flex align-items-center">
                                                <li className="post-date"> <i className="fa fa-calendar"></i>{Blog.PublishDate} </li>
                                                {/* <li className="post-author"><i className="fa fa-user"></i>By<Link href={"#"}> demongo</Link> </li>
                                                <li className="post-comment"><i className="fa fa-comments"></i><Link href={"#"}>0 Comments</Link></li> */}
                                            </ul>
                                        </div>
                                        <div className="dlab-post-media dlab-img-effect zoom-slow">
                                            <Link href={"#"}><Image src={Blog.Thumbnail} alt="" /></Link>
                                        </div>
                                        <div className="dlab-post-text">
                                            <p dangerouslySetInnerHTML={{ __html: Blog.Para1 }} >
                               
                                            </p>
                                            <p dangerouslySetInnerHTML={{ __html: Blog.Para2 }}> 
                                       
                                            </p>
                                            {/* <blockquote>
                                                {Blog.blockquote}
                                            </blockquote> */}
                                            <p dangerouslySetInnerHTML={{ __html: Blog.Para3 }}>
                              
                                            </p>
                                            {/* <h5>Completely Responsive</h5>
                                            <div className='row'>
                                                <div className='col-lg-4 col-xl-4'>
                                                    <Image src={Blog.Image1} alt="" />
                                                </div>
                                                <div className='col-lg-8 col-xl-8'>
                                                    <p>
                                                        {Blog.Para4}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="bg-gray-dark"></div>
                                            <div className='row'>
                                                <div className='col-lg-8 col-xl-8'>
                                                    <p>
                                                        {Blog.Para5}
                                                    </p>
                                                </div>
                                                <div className='col-lg-4 col-xl-4'>
                                                    <p>
                                                        <Image src={Blog.Image2} alt="" />
                                                    </p>
                                                </div>
                                            </div> */}
                                        </div>
                                        <div className="dlab-post-tags clear">
                                            <div className="post-tags">
                                                {Blog.BlogTags.map((item, index) => (
                                                    <Link key={index} href={"#"}>{item} </Link>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="dlab-divider bg-gray-dark op4"><i className="icon-dot c-square"></i></div>
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

export default BlogDetails