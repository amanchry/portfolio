import React from 'react'
import PageTitle from '../../components/PageTitle';
import bannerIMG from '../../public/images/background/banner_1.png';
import { BlogData } from '../../data/BlogData';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';

const BlogPage = () => {
  return (
    <>
		            <Head>
                <title>Aman Chaudhary | Portfolio</title>
            </Head>

        <div className="page-content bg-white">
					<div className="dlab-bnr-inr overlay-primary" style={{ backgroundImage: "url(" + bannerIMG.src + ")" }}>
						<PageTitle motherMenu="Blogs" activeMenu="Blogs" />
					</div>

					<div className="content-area">
						<div className="container">
							<div className="row">

								<div className="col-lg-12">
									{BlogData.map((item, index) => (
										<div className="blog-post blog-md clearfix" key={index}>
											<div className="dlab-post-media dlab-img-effect zoom-slow">
												<Link href={`/blogs/${item.BlogTitle}`}><Image src={item.Thumbnail} alt="" /></Link>
											</div>
											<div className="dlab-post-info">
												<div className="dlab-post-title ">
													<h4 className="post-title"><Link href={`/blogs/${item.BlogTitle}`}>{item.BlogTitle}</Link></h4>
												</div>
												<div className="dlab-post-meta">
													<ul className="d-flex align-items-center">
														<li className="post-date"> <i className="fa fa-calendar"></i>{item.PublishDate}</li>
														{/* <li className="post-author"><i className="fa fa-user"></i>By <Link href={"#"}>demongo</Link> </li> */}
														{/* <li className="post-comment"><i className="fa fa-comments"></i> <Link href={"#"}>0</Link> </li> */}
													</ul>
												</div>
												<div className="dlab-post-text">
													<p>{item.ShortDescription}</p>
												</div>
												<div className="dlab-post-readmore blog-share">
													<Link href={`/blogs/${item.BlogTitle}`} title="READ MORE" rel="bookmark" className="site-button outline outline-1">READ MORE
														<i className="fa fa-long-arrow-right"></i>
													</Link>
												</div>
											</div>
										</div>
									))}
									{/* <div className="pagination-bx clearfix text-center">
										<ul className="pagination">
											<li className="previous"><Link href={"#"}><i className="ti-arrow-left"></i> Prev</Link></li>
											<li className="active"><Link href={"#"}>1</Link></li>
											<li><Link href={"#"}>2</Link></li>
											<li><Link href={"#"}>3</Link></li>
											<li className="next"><Link href={"#"}>Next <i className="ti-arrow-right"></i></Link></li>
										</ul>
									</div> */}
								</div>
							</div>
						</div>
					</div>
				</div>
    </>
  )
}

export default BlogPage