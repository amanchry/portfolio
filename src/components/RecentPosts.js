'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Slider from "react-slick";
import Link from 'next/link';


function formatDate(d) {
    if (!d) return '';
    return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
}

function resolveHref(item) {
    return item.Link || `/blogs/${encodeURIComponent(item.Slug)}`;
}

function isExternal(url) {
    return /^https?:\/\//i.test(url);
}

function getSlidesToShow() {
    if (typeof window === 'undefined') return 3;
    const w = window.innerWidth;
    if (w <= 768) return 1;
    if (w <= 991) return 2;
    return 3;
}


function SampleNextArrow(props) {
    const { onClick } = props;
    return (
        <div className="owl-nav">
            <div className="owl-next flaticon-right-arrow" onClick={onClick} />
        </div>
    );
}


function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
        <div className="owl-nav">
            <div className=" owl-prev flaticon-left-arrow" onClick={onClick} style={{ zIndex: 1 }} />
        </div>
    );
}


const RecentPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [slidesToShow, setSlidesToShow] = useState(3);

    useEffect(() => {
        setSlidesToShow(getSlidesToShow());
        const onResize = () => setSlidesToShow(getSlidesToShow());
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    var settings = useMemo(() => ({
        arrows: slidesToShow > 1,
        slidesToShow,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            { breakpoint: 1200, settings: { slidesToShow: Math.min(3, slidesToShow), slidesToScroll: 1 } },
            { breakpoint: 1024, settings: { slidesToShow: Math.min(3, slidesToShow), slidesToScroll: 1 } },
            { breakpoint: 991, settings: { slidesToShow: Math.min(2, slidesToShow), slidesToScroll: 1 } },
            { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } },
            { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ],
    }), [slidesToShow]);

    useEffect(() => {
        fetch('/api/recent-posts?limit=8')
            .then((res) => res.json())
            .then((data) => setPosts(Array.isArray(data) ? data : []))
            .catch(() => setPosts([]))
            .finally(() => setLoading(false));
    }, []);


    return (

        <>
            {loading && <p className="text-center p-a20">Loading latest posts...</p>}
            {!loading && posts.length === 0 && <p className="text-center p-a20">No recent posts yet.</p>}
            {!loading && posts.length > 0 && (
                <Slider className="dots-style-center img-carousel owl-carousel owl-btn-center-lr owl-btn-3 " {...settings}>
                    {posts.map((item) => {
                        const href = resolveHref(item);
                        const external = isExternal(href);
                        return (
                            <div className="item pr-3" key={item.id}>
                                <div className="blog-post blog-grid blog-rounded blog-effect1">
                                    <div
                                        className="dlab-post-media dlab-img-effect"
                                        style={{
                                            aspectRatio: '16/9',
                                            overflow: 'hidden',
                                            backgroundColor: '#eee',
                                        }}
                                    >
                                        <img
                                            src={item.Thumbnail || '/images/aman1.jpg'}
                                            alt={item.title || ''}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                display: 'block',
                                            }}
                                        />
                                    </div>
                                    <div className="dlab-info p-a20 border-1">
                                        <div className="dlab-post-title ">
                                            <h5 className="post-title font-weight-500">
                                                {/* {external ? (
                                                        <a href={href} target="_blank" rel="noreferrer">{item.Title}</a>
                                                    ) : (
                                                        <Link href={href}>{item.Title}</Link>
                                                    )} */}
                                                {item.Title}

                                            </h5>
                                        </div>
                                        <div className="dlab-post-meta ">
                                            <ul>
                                                <li className="post-date">
                                                    <i className="fa fa-calendar"></i>{' '}
                                                    <strong>{formatDate(item.PostDate || item.PublishDate)}</strong>
                                                </li>
                                                {item.Place && (
                                                    <li className="post-place" style={{ marginTop: 4 }}>
                                                        <i className="fa fa-map-marker"></i> {item.Place}
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                        {/* <div className="dlab-post-text">
                                                <p style={{ fontSize: '14px' }}>{item.ShortDescription}</p>
                                            </div> */}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </Slider>
            )}
        </>

    )
}

export default RecentPosts