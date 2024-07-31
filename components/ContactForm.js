import React, { useState, useEffect } from 'react';
import bg16 from '../public/images/background/bg16.jpg';
import axios from 'axios';
const ContactForm = () => {
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
        <div className="section-full content-inner-2 bg-white contact-form-bx" style={{ backgroundImage: "url(" + bg16 + ")", backgroundSize: "100%" }}>
            <div className="container">
                <div className="section-head text-center">
                    <h2 className="text-uppercase"><span className="font-weight-300">Contact </span> me</h2>
                </div>
                <div className="dezPlaceAni">
                    <div className="dzFormMsg"></div>
                    <form>
                        <div className="row">
                            <div className="col-lg-4 col-md-5 col-sm-12">
                                <div className="form-group">
                                    <div className="input-group">
                                        <label>Your Name</label>
                                        <input
                                            name="name" type="text"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required className="form-control" placeholder="" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="input-group">
                                        <label>Your Email Address</label>
                                        <input
                                            name="email" type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="form-control" required placeholder="" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="input-group">
                                        <label>Phone</label>
                                        <input name="phone"
                                            type="text"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required className="form-control" placeholder="" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-8 col-md-7 col-sm-12">
                                <div className="form-group">
                                    <div className="input-group p-a15">
                                        <label>Your Message...</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows="4" className="form-control" required placeholder=""></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 text-center">
                                <button disabled={isLoading} onClick={onSubmit} name="submit"
                                    style={{ opacity: isLoading ? 0.5 : 1, 
                                        pointerEvents: isLoading ? 'none' : 'auto' }}
                                    className="site-button outline outline-2 radius-xl button-md m-t10">{isLoading ? 'Sending...' : 'Send message'}</button>
                                <p>{message}</p>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ContactForm