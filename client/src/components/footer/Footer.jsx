import React from 'react';
import './Footer.scss';

import { FaRegRegistered } from "react-icons/fa6";
import { PiCopyright } from "react-icons/pi";
import { FaRupeeSign } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { GrLanguage } from "react-icons/gr";

const Footer = () => {
    return (
        <>
            <hr style={{ border: '0.5px solid #ebe9e9' }} />
            <div className='footer'>
                <div className='container'>
                    <div className='top'>
                        <div className='item'>
                            <h2>Categories</h2>
                            <span>Digital Marketing</span>
                            <span>Graphics & Design</span>
                            <span>Writing & Translation</span>
                            <span>Video & Animation</span>
                            <span>Music & Audio</span>
                            <span>Fiverr Logo Maker</span>
                            <span>Programming & Tech</span>
                            <span>Data</span>
                            <span>Business</span>
                            <span>Lifestyle</span>
                            <span>Photography</span>
                            <span>End-to-End Projects</span>
                            <span>Sitemap</span>
                        </div>

                        <div className='item'>
                            <h2>About</h2>
                            <span>Careers</span>
                            <span>Press & News</span>
                            <span>Partnerships</span>
                            <span>Privacy Policy</span>
                            <span>Terms of Service</span>
                            <span>Intellectual Property Claims</span>
                            <span>Investor Relations</span>
                        </div>

                        <div className='item'>
                            <h2>Support and Education</h2>
                            <span>Help & Support</span>
                            <span>Trust & Safety</span>
                            <span>Selling on Fiverr</span>
                            <span>Buying on Fiverr</span>
                            <span>Fiverr Guides</span>
                            <span>Fiverr Workspace</span>
                            <p>Invoice Software</p>
                            <span>Learn</span>
                            <span>Online Courses</span>
                        </div>

                        <div className='item'>
                            <h2>Community</h2>
                            <span>Customer Success Stories</span>
                            <span>Community Hub</span>
                            <span>Forum</span>
                            <span>Events</span>
                            <span>Blog</span>
                            <span>Influencers</span>
                            <span>Affiliates</span>
                            <span>Podcast</span>
                            <span>Invite a Friend</span>
                            <span>Become a Seller</span>
                            <span>Community Standards</span>
                        </div>

                        <div className='item'>
                            <h2>Business Solutions</h2>
                            <span>About Business Solutions</span>
                            <span>Fiverr Pro</span>
                            <span>Fiverr Certified</span>
                            <span>Fiverr Enterprise</span>
                            <span>ClearVoice</span>
                            <p>Content Marketing</p>
                            <span>Working Not Working</span>
                            <span>Contact Sales</span>
                        </div>

                    </div>

                    <hr />

                    <div className="bottom">
                        <div className="left">
                            <span className='logo'>fiverr</span>
                            <span>© Fiverr International Ltd. 2023</span>
                        </div>
                        <div className="right">
                            <div className="social">
                                <FaTiktok className='icon' />
                                <FaInstagram className='icon' />
                                <FaLinkedin className='icon' />
                                <FaFacebook className='icon' />
                                <FaPinterest className='icon' />
                                <FaXTwitter className='icon' />
                            </div>
                            <div className="link">
                                <GrLanguage className='icon' />
                                <span>English</span>
                            </div>
                            <div className="link">
                                <FaRupeeSign style={{ fontSize: '12px' }} />
                                <span style={{ fontSize: '14px', fontWeight: 'bold' }}>INR</span>
                            </div>
                            <img src="/img/accessibility.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default Footer;