import React, { useState, useRef, useEffect } from 'react';
import './Gigs.scss';
import { HiOutlineHome } from "react-icons/hi2";
import GigCard from '../../components/gigCard/GigCard';
// import { gigs } from '../../data';
import { Link, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest.js';


const Gigs = () => {
    const [open, setOpen] = useState(false);
    const [sort, setSort] = useState("sales");
    const minRef = useRef();
    const maxRef = useRef();

    const { search } = useLocation();

    // console.log(location);

    const { isPending, error, data, refetch } = useQuery({
        queryKey: ['gigs'],
        queryFn: () => newRequest.get(`/gigs${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`).then((res) => {
            return res.data;
        }),
    })

    // console.log(data);

    const reSort = (type) => {
        setSort(type);
        setOpen(false);
    }

    useEffect(() => {
        refetch();
    }, [sort])

    const apply = () => {
        refetch();
    }

    return (
        <div className='gigs'>
            <div className='container'>
                <div className='path'>
                    <Link to='/' className='link'><HiOutlineHome style={{ marginRight: '5px', width: '14px' }} /></Link>
                    <span style={{ color: '#c5c6c9' }}>/</span>
                    <span className='breadcrumbs'> Graphics & Design </span>
                </div>

                <h1>AI Artists</h1>
                <p>
                    Explore the boundaries of art and technology with Fiverr's AI artists
                </p>

                <div className='menu'>
                    <div className='left'>
                        <span>Budget</span>
                        <input ref={minRef} type="number" placeholder="min" />
                        <input ref={maxRef} type="number" placeholder="max" />
                        <button onClick={apply}>Apply</button>
                    </div>
                    <div className='right'>
                        <span className='sortBy'>Sort By</span>
                        <span className='sortType'>{sort === "sales" ? "Best Selling" : "Newest"}</span>
                        <img src='./img/down.png' alt='' onClick={() => setOpen(!open)} />
                        {open && <div className='rightMenu'>
                            {sort === "sales" ?
                                <span onClick={() => reSort("CreatedAt")}>Newest</span>
                                :
                                <span onClick={() => reSort("sales")}>Best Selling</span>}
                        </div>}
                    </div>
                </div>

                <div className='cards' style={{ marginBottom: '100px', marginTop: '20px' }}>
                    {isPending ? "Loading"
                        : error ? "something went wrong!"
                            : data.map(gig => (
                                <GigCard item={gig} key={gig._id} />
                            ))}
                </div>
            </div>
        </div>
    );
};
export default Gigs;