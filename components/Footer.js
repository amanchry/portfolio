import React, { Component } from 'react';
import Logo from "../public/images/logo.png"
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
                                    <div className="footer_logo">
                                        <Image src={Logo} alt='logo' />
                                    </div>
                                    <h4>
                                        Designing tomorrow&apos;s possibilities <br /> through today&apos;s creativity.
                                    </h4>
                                    <a href="https://clustrmaps.com/site/1c1eu" target='_blank' title="Visit tracker">
                                        Visitors count

                                        <img style={{display:"none"}} src="//www.clustrmaps.com/map_v2.png?d=K8WdSOM7rI24lyqsLSPAv43unUJeVyGLR-WYhFLHRTs&cl=ffffff" />
                                    </a>

                                    <ul className="list-inline m-a0 text-center">
                                        <li><a href="https://github.com/aman1chaudhary" target='_blank' rel="noreferrer" className="site-button facebook circle mr-1"><i className="fa fa-github"></i></a></li>
                                        <li><a href="https://www.linkedin.com/in/amanchaudhary-com/" target='_blank' rel="noreferrer" className="site-button linkedin circle mr-1"><i className="fa fa-linkedin"></i></a></li>
                                        <li><a href="https://www.instagram.com/a_man__chaudhary/" target='_blank' rel="noreferrer" className="site-button instagram circle mr-1"><i className="fa fa-instagram"></i></a></li>
                                        <li><a href="https://twitter.com/ChaudharyAman__" target='_blank' rel="noreferrer" className="site-button twitter circle mr-1"><i className="fa fa-twitter"></i></a></li>
                                        <li><a href="https://medium.com/@chaudharyaman" target='_blank' rel="noreferrer" className="site-button medium circle mr-1"><i className="fa fa-medium"></i></a></li>
                                        <li><a href="mailto:amanchaudhary.web@gmail.com" className="site-button google-plus circle mr-1"><i className="fa fa-envelope"></i></a></li>
                                    </ul>



                                </div>

                            </div>

                        </div>
                    </div>

                    <div className="footer-bottom bg-primary">
                        <div className="container">
                            <div className="text-center"> <span>Copyright © 2024 aman chaudhary</span> </div>
                        </div>
                    </div>



                </footer>

            </>
        );
    }
}

export default Footer;