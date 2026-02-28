'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PageTitle from '@/components/PageTitle';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';




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
        <div className="page-content bg-white">
            {/*  banner  */}
            <div className="dlab-bnr-inr overlay-primary" style={{ backgroundImage: "url(/images/background/banner_1.png)" }}>
                <PageTitle motherMenu="Contact" activeMenu="Contact" />
            </div>
            {/*  Section-1 Start  */}
            





            <ContactForm />

            {/* <div className="section-full content-inner-2 bg-img-fix overlay-primary gradient subscribe-bx" style={{ backgroundImage: "url(/images/background/banner_2.png)" }}>
                <div className="container">
                    <div className="row text-white dezPlaceAni align-items-center dzSubscribe">
                        <div className="col-lg-4  col-md-12">
                            <h2 className="m-b0"> Start a project </h2>
                        </div>
                        <div className="col-lg-6 col-md-9 contact-form-bx">
                            <p style={{ fontSize: "20px" }}> Interested in working together? We should queue up a time to chat. </p>

                        </div>
                        <div className="col-lg-2 col-md-3">
                            <Link href="/contact"><button type="button" className="site-button button-md radius-xl white btn-block">Let&apos;s do this</button></Link>
                        </div>
                    </div>
                </div>
            </div> */}


            {/* <div className='page-content'>
                <div className="full-section">

                    <div className="container">
                        <div className="row">
                            
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

            </div> */}

        </div>
    );
}

export default Contact