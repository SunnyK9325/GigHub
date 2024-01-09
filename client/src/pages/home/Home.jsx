import React from 'react';
import Featured from '../../components/featured/Featured';
import './Home.scss';
import TrustedBy from '../../components/trustedBy/TrustedBy';
import Slide from '../../components/slide/Slide';
import { cards } from '../../data';
import { projects } from '../../data';
import CatCard from '../../components/catCard/CatCard';

import VerifiedIcon from '@mui/icons-material/Verified';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ProjectCard from '../../components/projectCard/ProjectCard';

const Home = () => {
    return (
        <div className='home'>
            <Featured />
            <TrustedBy />
            <Slide flag={1} slidesToShow = {5} slidesToSlide={5}>
                {cards.map((card) => (
                    <CatCard key={card.id} item={card} />
                ))}
            </Slide>

            {/* selling proposition section  | Not gonna use elsewhere, that's why coded here itself*/}

            <div className="features">
                <div className="container">
                    <div className="item">
                        <h1>The best part? Everything.</h1>
                        <div className="title">
                            <CheckCircleOutlineIcon style={{ width: '25px', fill: '#7A7D85' }} />
                            The best for every budget
                        </div>
                        <p>
                            Find high-quality services at every price point. No hourly rates,
                            just project-based pricing.
                        </p>
                        <div className="title">
                            <CheckCircleOutlineIcon style={{ width: '25px', fill: '#7A7D85' }} />
                            Quality work done quickly
                        </div>
                        <p>
                            Find the right freelancer to begin working on your project within
                            minutes.
                        </p>
                        <div className="title">
                            <CheckCircleOutlineIcon style={{ width: '25px', fill: '#7A7D85' }} />
                            Protected payments, every time
                        </div>
                        <p>
                            Always know what you'll pay upfront. Your payment isn't released
                            until you approve the work.
                        </p>
                        <div className="title">
                            <CheckCircleOutlineIcon style={{ width: '25px', fill: '#7A7D85' }} />
                            24/7 support
                        </div>
                        <p>
                            Find high-quality services at every price point. No hourly rates,
                            just project-based pricing.
                        </p>
                    </div>
                    <div className="item">
                        <video src="../../public/img/video.mp4" controls > </video>
                    </div>
                </div>
            </div>

            <div className='features dark'>
                <div className='container'>
                    <div className='item'>
                        <div className='heading'>
                            <span className='text'>fiverr</span>
                            <FiberManualRecordIcon style={{ color: '#1dbf73', width: '12px', marginBottom: '-8px' }} />
                            <span className='text2'> Business Solutions</span>
                        </div>

                        <h1>Advanced solutions and <br /> professional talent for<br /> businesses</h1>

                        <div className='title'>
                            <VerifiedIcon className='icon' style={{ fill: '#B1ABFF', fontSize: '28px' }} />
                            <div className='listItem'>
                                <span>Fiverr Pro</span>
                                <p>Access top freelancers and professional business tools for any project</p>
                            </div>
                        </div>

                        <div className='title'>
                            <VerifiedIcon className='icon' style={{ fill: '#B1ABFF', fontSize: '28px' }} />
                            <div className='listItem'>
                                <span>Fiverr Certified</span>
                                <p>Build your own branded marketplace of certified experts</p>
                            </div>
                        </div>

                        <div className='title'>
                            <VerifiedIcon className='icon' style={{ fill: '#B1ABFF', fontSize: '28px' }} />
                            <div className='listItem'>
                                <span>Fiverr Enterprise</span>
                                <p>Manage your freelance workforce and onboard additional talent with an end-to-end SaaS solution</p>
                            </div>
                        </div>

                        <button>Learn more</button>

                    </div>

                    <div className='item'>
                        <img
                            src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_2.0/v1/attachments/generic_asset/asset/d9c17ceebda44764b591a8074a898e63-1599597624768/business-desktop-870-x2.png"
                            alt=""
                        />
                    </div>
                </div>

            </div>

            <div className='projects'>
                <Slide flag={2} slidesToShow = {4} slidesToSlide={1}>
                    {projects.map((card) => (
                        <ProjectCard key={card.id} card={card} />
                    ))}
                </Slide>
            </div>

            

        </div>
    );
};
export default Home;