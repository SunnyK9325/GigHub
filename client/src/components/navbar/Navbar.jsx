import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.scss';
import newRequest from '../../utils/newRequest';
import { useNavigate } from 'react-router-dom';

import VerifiedIcon from '@mui/icons-material/Verified';
import { FaChevronDown } from "react-icons/fa";
import LanguageIcon from '@mui/icons-material/Language';
import { IoSearch } from "react-icons/io5";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import MessageIcon from '@mui/icons-material/Message';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import AddBoxIcon from '@mui/icons-material/AddBox';
import LoginIcon from '@mui/icons-material/Login';
import noavatar from "/img/noavatar.png";

const Navbar = () => {

    const [active, setActive] = useState(false);
    const [open, setOpen] = useState(false);

    const { pathname } = useLocation();
    const dropdownRef = useRef(null);


    const isActive = () => {
        window.scrollY > 0 ? setActive(true) : setActive(false);
    }

    useEffect(() => {
        window.addEventListener('scroll', isActive);
        return () => {
            window.removeEventListener('scroll', isActive);
        }
    }, []);

    // Handle click outside the dropdown to close it
    const handleClickOutside = (event) => {
        // consitional statement to check if the click is outside the dropdown
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setOpen(false);
        }
    };

    // Event listener for click outside dropdown
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await newRequest.post("/auth/logout");
            localStorage.setItem("currentUser", null);
            navigate("/")

        } catch (err) {
            console.log(err);
        }
    }

    const [input, setInput] = useState('');

    const handleSubmit = () => {
        navigate(`gigs?search=${input}`);
    }

    return (
        <div className={(active || pathname !== '/') ? 'navbar active' : 'navbar'}>
            <div className='container'>
                <div className='logo'>
                    <Link to="/" className='link'>
                        <span className='text'>GigHub</span>
                    </Link>
                    <FiberManualRecordIcon style={{ color: '#1dbf73', width: '12px', marginBottom: '-8px' }} />
                </div>

                {active && <div className='search'>
                    <div className='searchInput'>
                        <input
                            type="text"
                            placeholder='What service are you looking for today?'
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </div>
                    <button onClick={handleSubmit}><IoSearch style={{ fontSize: '20px', color: 'white' }} /></button>
                </div>}

                <div className='links'>

                    <div className='item special'>
                        <VerifiedIcon style={{ width: '20px' }} className='symbol' />
                        <span>GigHub Pro</span>
                    </div>
                    <div className='item'>
                        <span>Explore</span>
                        <FaChevronDown style={{ width: '20px' }} />
                    </div>
                    <div className='item'>
                        <LanguageIcon style={{ width: '20px' }} />
                        <span>English</span>
                    </div>

                    {!currentUser && <Link to="/login" className='link'>
                        <div className='item'>
                            <LoginIcon style={{ width: '20px' }} />
                            <span>Sign in</span>
                        </div>
                    </Link>}
                    {!currentUser?.isSeller && <span>Become a seller</span>}
                    {/* {!currentUser && <span>Join</span>} */}
                    {currentUser && (
                        <div ref={dropdownRef} className='user' onClick={() => setOpen(!open)}>
                            <img src={currentUser.img || { noavatar }}
                                alt='' />
                            <span>{currentUser.username}</span>
                            {open && <div className='options'>
                                {currentUser?.isSeller && (
                                    <>
                                        <Link to='/myGigs' className='link'>
                                            <div className='menuItem'>
                                                <HomeRepairServiceIcon style={{ fontSize: '18px' }} />
                                                <span>Gigs</span>
                                            </div>
                                        </Link>
                                        <Link to='/add' className='link'>
                                            <div className='menuItem'>
                                                <AddBoxIcon style={{ fontSize: '18px' }} />
                                                <span>Add New Gig</span>
                                            </div>
                                        </Link>
                                    </>
                                )}
                                <Link to='/orders' className='link'>
                                    <div className='menuItem'>
                                        <ShoppingBasketIcon style={{ fontSize: '18px' }} /><span>Orders</span>
                                    </div>
                                </Link>
                                <Link to='/messages' className='link'>
                                    <div className='menuItem'>
                                        <MessageIcon style={{ fontSize: '18px' }} /><span>Messages</span>
                                    </div>
                                </Link>
                                <Link className='link' onClick={handleLogout}>
                                    <div className='menuItem'>
                                        <LogoutIcon style={{ fontSize: '18px' }} /><span>Logout</span>
                                    </div>
                                </Link>
                            </div>}
                        </div>
                    )}
                </div>
            </div>

            {(active || pathname !== '/') &&
                <>
                    <hr />
                    <div className="menu">
                        <Link className="link menuLink" to="/">
                            Graphics & Design
                        </Link>
                        <Link className="link menuLink" to="/">
                            Video & Animation
                        </Link>
                        <Link className="link menuLink" to="/">
                            Writing & Translation
                        </Link>
                        <Link className="link menuLink" to="/">
                            AI Services
                        </Link>
                        <Link className="link menuLink" to="/">
                            Digital Marketing
                        </Link>
                        <Link className="link menuLink" to="/">
                            Music & Audio
                        </Link>
                        <Link className="link menuLink" to="/">
                            Programming & Tech
                        </Link>
                        <Link className="link menuLink" to="/">
                            Business
                        </Link>
                        <Link className="link menuLink" to="/">
                            Lifestyle
                        </Link>
                    </div>
                    <hr />
                </>
            }
        </div>
    );
};
export default Navbar;