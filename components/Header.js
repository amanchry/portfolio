import React, { Component } from 'react';
import logo from '../public/images/logo.png';
import Link from 'next/link';
import Image from 'next/image';


class Header extends Component {
    componentDidMount() {
        // sidebar open/close
        var Navicon = document.querySelector('.navicon');
        var sidebarmenu = document.querySelector('.myNavbar ');

        function toggleFunc() {
            sidebarmenu.classList.toggle('show');
            Navicon.classList.toggle('open');
        }
        Navicon.addEventListener('click', toggleFunc);


        // Sidenav li open close
        var navUl = [].slice.call(document.querySelectorAll('.navbar-nav > li > a, .sub-menu > li > a'));
        for (var y = 0; y < navUl.length; y++) {
            navUl[y].addEventListener('click', function () { checkLi(this) });
        }


        function checkLi(current) {
            current.parentElement.parentElement.querySelectorAll("li").forEach(el =>
                (current.parentElement !== el) ? el.classList.remove('open') : ''
            );

            setTimeout(() => {
                current.parentElement.classList.toggle('open');

            }, 100);
        }
    }

    render() {
        return (
            <>
                <header className="site-header header mo-left header-ind" id="fix-header">
                    <div className="top-bar bg-light">
                        <div className="container">
                            <div className="row d-flex justify-content-between">
                                <div className="dlab-topbar-left">
                                    <ul>
                                        <li><i className="flaticon-phone-call m-r5"></i> +91 9084844024</li>
                                        <li><i className="ti-location-pin m-r5"></i> IIT Gandhinagar, Gujarat, India</li>
                                    </ul>
                                </div>
                                <div className="dlab-topbar-right">
                                    <ul>
                                        <li><a href='https://www.linkedin.com/in/aman-chaudhary-4a1716203/' target='_blank' rel="noreferrer"> <i className="ti-linkedin m-r5"></i></a></li>
                                        <li><i className="ti-email m-r5"></i> chaudharyaman2604@gmail.com</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="sticky-header main-bar-wraper navbar-expand-lg">
                        <div className="main-bar clearfix">
                            <div className="container clearfix">

                                <div className="logo-header mostion">
                                    <Link href="/" className="dez-page"><Image src={logo} alt="" /></Link>
                                </div>

                                <button className="navbar-toggler collapsed navicon justify-content-end" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </button>

                                <div className="header-nav navbar-collapse collapse myNavbar justify-content-end" id="navbarNavDropdown">
                                    <div className="logo-header mostion d-md-block d-lg-none">
                                        <Link href="/" className="dez-page"><Image src={logo} alt="" /></Link>
                                    </div>
                                    <ul className="nav navbar-nav">
                                        <li><Link href="/">Home</Link></li>
                                        <li><Link href="/resume">Resume</Link></li>
                                        <li><Link href="/portfolio">Portfolio</Link></li>
                                        {/* <li><Link href="/blog">Blogs</Link></li> */}

                                        
                                        {/* <li><Link href="/">Portfolio <i className="fa fa-chevron-down"></i></Link>
                                            <ul className="sub-menu left">
                                                <li><Link href={'/our-projects'} className="dez-page">Our Projects</Link></li>
                                                <li><Link href={'/project-details'} className="dez-page">Project Details </Link></li>
                                                <li><Link href={'/portfolio-full-width'} className="dez-page">Portfolio Full Width  </Link></li>
                                                <li><Link href={'/portfolio-grid-2'} className="dez-page">Portfolio Grid 2 </Link></li>
                                                <li><Link href={'/portfolio-grid-3'} className="dez-page">Portfolio Grid 3 </Link></li>
                                                <li><Link href={'/portfolio-grid-4'} className="dez-page">Portfolio Grid 4 </Link></li>
                                            </ul>
                                        </li> */}
                                        <li><Link href="/contact">Contact</Link></li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </>
        )
    }
}
export default Header;