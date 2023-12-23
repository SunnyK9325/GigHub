import React, { useState } from 'react';
import './Featured.scss';
import { IoSearch } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const Featured = () => {

    const [input, setInput] = useState('');
    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate(`gigs?search=${input}`);
    }

    return (
        <div className='featured'>
            <div className='container'>

                <div className='left'>
                    <h1>Find the right <i><span>freelance</span></i> <br />service, right away</h1>

                    <div className='search'>
                        <div className='searchInput'>
                            <input type="text"
                                placeholder='Search for any service...'
                                onChange={(e) => setInput(e.target.value)}
                            />
                        </div>
                        <button onClick={handleSubmit}><IoSearch style={{ fontSize: '20px', color: 'white' }} /></button>
                    </div>

                    <div className='popular'>
                        <span>Popular:</span>
                        <button>Website Design</button>
                        <button>WordPress</button>
                        <button>Logo Design</button>
                        <button>AI Services</button>
                    </div>
                </div>

                <div className='right'>
                    <img src='../../public/img/man.png' alt='' />
                </div>
            </div>
        </div>
    );
}

export default Featured;