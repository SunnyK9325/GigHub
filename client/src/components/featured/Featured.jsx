import React, { useState } from 'react';
import './Featured.scss';
import { IoSearch } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import man from "/img/man.png";

const Featured = () => {
    const [input, setInput] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const navigate = useNavigate();

    const handleFocus = () => {
        setIsSearchFocused(true);
    };

    const handleBlur = () => {
        setIsSearchFocused(false);
    };

    const handleSubmit = () => {
        navigate(`gigs?search=${input}`);
    };

    return (
        <div className={`featured ${isSearchFocused ? 'search-focused' : ''}`}>
            <div className="container">
                <div className="left">
                    <h1>
                        Find the right <i><span>freelance</span></i> <br />service, right away
                    </h1>
                    {/* search component */}
                    <div className="search">
                        <div className="searchInput">
                            <input
                                type="text"
                                placeholder="Search for any service..."
                                onChange={(e) => setInput(e.target.value)}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                            />
                        </div>
                        <button onClick={handleSubmit}>
                            <IoSearch style={{ fontSize: '20px', color: 'white' }} />
                        </button>
                    </div>

                    <div className="popular">
                        <span>Popular:</span>
                        <button>Website Design</button>
                        <button>WordPress</button>
                        <button>Logo Design</button>
                        <button>AI Services</button>
                    </div>
                </div>

                <div className="right">
                    <img src={man} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Featured;
