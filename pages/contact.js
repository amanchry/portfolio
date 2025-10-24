import React, { useState, useEffect } from 'react';


import bgimg from '../public/images/background/bg1.jpg';
import Head from 'next/head';
import axios from 'axios';
import PageTitle from '../components/PageTitle';
import bannerIMG from "../public/images/background/banner_1.png";




const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: 'Portfolio Website Contact Form', phone: '', message: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("")


    useEffect(() => {
        const messageTimer = setTimeout(() => {
            setMessage('');
        }, 2000);

        return () => {
            clearTimeout(messageTimer);
        };
    }, [message]);


    const handleChange = ({ target }) =>
        setFormData((prev) => ({
            ...prev,
            [target.name]: target.value,
        }));

    const onSubmit = async () => {
        const hasNullValue = Object.values(formData).some(value => value === null || value === '');
        if (hasNullValue) {
            setMessage('Please fill in all fields before submitting.');
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post('/api/contact', formData, {
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            });

            if (response.status !== 200) {
                throw new Error('Failed to send message');
            }

            setIsLoading(false);
            setFormData({ name: '', email: '', subject: 'Portfolio Website Contact Form', phone: '', message: '' });
            setMessage('Message Sent Successfully');
        } catch (error) {
            setIsLoading(false);
            setMessage('Error sending message:', error);

        }
    };




    return (
        <>
            <Head>
                <title>Aman Chaudhary | Contact</title>
                <meta name="description" content="Get in touch with Aman for inquiries, collaborations, or project opportunities" />
            </Head>

            <div className="page-content bg-white">
                {/*  banner  */}
                <div className="dlab-bnr-inr overlay-primary" style={{ backgroundImage: "url(" + bannerIMG.src + ")" }}>
                    <PageTitle motherMenu="Contact" activeMenu="Contact" />
                </div>
                {/*  Section-1 Start  */}
                
                <div className='page-content'>
                    <div className="full-section">
                       
                            <div className="container">
                                <div className="row">
                                    {/* <div className="col-lg-4 col-xs-4">
                                    <div className="row text-white">
                                        <div className="col-lg-12 col-md-6 m-b50" >
                                            <div className="icon-bx-wraper bx-style-1 p-a50 radius-sm">
                                                <div className="icon-content">
                                                    <h5 className="dlab-tilte">
                                                        <span className="icon-sm text-primary text-left"><i className="ti-location-pin"></i></span>
                                                        Location
                                                    </h5>
                                                    <p>Agra, Uttar Pradesh, India </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-md-6 m-b30 ">
                                            <div className="icon-bx-wraper bx-style-1 p-a50 radius-sm">
                                                <div className="icon-content">
                                                    <h5 className="dlab-tilte">
                                                        <span className="icon-sm text-primary text-left"><i className="ti-email"></i></span>
                                                        E-mail
                                                    </h5>
                                                    <p className="m-b0">chaudharyaman2604@gmail.com</p>
                                     
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-md-6 m-b30 ">
                                            <div className="icon-bx-wraper bx-style-1 p-a20 radius-sm">
                                                <div className="icon-content">
                                                    <h5 className="dlab-tilte">
                                                        <span className="icon-sm text-primary text-left"><i className="ti-mobile"></i></span>
                                                        Phone Numbers
                                                    </h5>
                                                    <p>+91 9084844024</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                                    <div className="col-lg-12 col-xs-12">
                                        <div className="inquiry-form dzForm" >
                                            <div className="dzFormMsg"></div>
                                            <h3 className="box-title m-t0 m-b10">Let&apos;s Convert Your Idea into Reality <span className="bg-primary"></span></h3>
                                            <p className="m-b0">Get in touch!</p>
                                            <p >Email: amanchaudhary.web@gmail.com</p>
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <div className="input-group">
                                                            <span className="input-group-addon"><i className="ti-user text-primary"></i></span>
                                                            <input
                                                                name="name"
                                                                type="text" required className="form-control"
                                                                placeholder="Your Name"
                                                                value={formData.name}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <div className="input-group">
                                                            <span className="input-group-addon"><i className="ti-mobile text-primary"></i></span>
                                                            <input
                                                                name="phone"
                                                                type="text"
                                                                className="form-control"
                                                                value={formData.phone}
                                                                onChange={handleChange}
                                                                placeholder="Your Phone Number" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <div className="input-group">
                                                            <span className="input-group-addon"><i className="ti-email text-primary"></i></span>
                                                            <input name="email"
                                                                type="email"
                                                                value={formData.email}
                                                                onChange={handleChange}

                                                                className="form-control" required placeholder="Your Email" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <div className="input-group">
                                                            <span className="input-group-addon"><i className="ti-agenda text-primary"></i></span>
                                                            <textarea
                                                                name="message"
                                                                value={formData.message}
                                                                onChange={handleChange}

                                                                rows="4" className="form-control" required placeholder="Tell us about your project or idea"></textarea>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-lg-12">
                                                    <button
                                                        onClick={onSubmit}
                                                        className="site-button button-lg"
                                                        disabled={isLoading}
                                                        style={{ opacity: isLoading ? 0.5 : 1, pointerEvents: isLoading ? 'none' : 'auto' }}
                                                    >
                                                        <span>{isLoading ? 'Sending...' : 'Send Message'}</span>
                                                    </button>
                                                    <p>{message}</p>
                                                </div>



                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
            
         
                    </div>

                </div>

            </div>




        </>
    )
}

export default Contact