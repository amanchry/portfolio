'use client';

import React, { Component } from 'react';
import Image from 'next/image';

class Footer extends Component {
    render() {
        return (
            <>
                <footer className="site-footer footer-white" >
                    <div className="footer-top">
                        <div className="container">
                            <div className="row">
                                <div className="col-12 col-lg-12 col-md-12 text-center">

                                    {/* <h6>
                                    &quot;Somewhere, something incredible is waiting to be known.&quot;
                                    - Carl Sagan
                                        Designing tomorrow&apos;s possibilities <br /> through today&apos;s creativity.
                                    </h6> */}

                                    <h4>
                                        Connect with Me
                                    </h4>


                                    <img style={{ display: "none" }} src="https://mapmyvisitors.com/map.png?d=K9GvT5sHa27xngMXstcKClwUh1dWEH6Z_SkFUTINCME&cl=ffffff" />

                                    <ul className="list-inline m-a0">
                                        <li><a href="https://www.linkedin.com/in/amanchry/" target='_blank' rel="noreferrer" className="site-button  circle mr-1 linkedin" style={{ fontSize: "24px" }}><i className="fa fa-linkedin"></i></a></li>
                                        <li><a href="https://github.com/amanchry" target='_blank' rel="noreferrer" className="site-button  circle mr-1 facebook" style={{ fontSize: "24px" }}><i className="fa fa-github"></i></a></li>
                                        <li><a href="https://www.instagram.com/a.man_chaudhary" target='_blank' rel="noreferrer" className="site-button  circle mr-1 instagram" style={{ fontSize: "24px" }}><i className="fa fa-instagram"></i></a></li>
                                        <li><a href="https://twitter.com/amanchry" target='_blank' rel="noreferrer" className="site-button  circle mr-1 twitter" style={{ fontSize: "24px" }}><i className="fa fa-twitter"></i></a></li>
                                        <li><a href="https://medium.com/@amanchry" target='_blank' rel="noreferrer" className="site-button  circle mr-1 medium" style={{ fontSize: "24px" }}><i className="fa fa-medium"></i></a></li>
                                        <li><a href="mailto:amanchaudhary.web@gmail.com" className="site-button  circle mr-1 facebook" style={{ fontSize: "24px" }}><i className="fa fa-envelope"></i></a></li>
                                    </ul>






                                </div>

                            </div>

                        </div>
                    </div>

                    <div className="footer-bottom bg-primary">
                        <div className="container">
                            <div className="text-center"> <span>Copyright © {new Date().getFullYear()} aman chaudhary</span> </div>
                        </div>
                    </div>



                </footer>

            </>
        );
    }
}

export default Footer;