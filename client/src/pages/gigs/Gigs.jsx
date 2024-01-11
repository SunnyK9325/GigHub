import React, { useState, useRef, useEffect } from 'react';
import './Gigs.scss';
import { HiOutlineHome } from "react-icons/hi2";
import GigCard from '../../components/gigCard/GigCard';
// import { gigs } from '../../data';
import { Link, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest.js';
import queryString from 'query-string';

const Gigs = () => {
    const [open, setOpen] = useState(false);
    const [sort, setSort] = useState("sales");
    const minRef = useRef();
    const maxRef = useRef();

    const { search } = useLocation();
    const { cat } = queryString.parse(location.search);
    // console.log(cat);

    const category = {
        'ai' : 'AI Artists',
        'design' : 'Design',
        'wordpress' : 'WordPress',
        'voiceover' : 'Voice Over',
        'video' : 'Video Explainer',
        'social' : 'Social Media',
        'seo' : 'SEO',
        'illustration' : 'Illustration',
    };

    const title = {
        'ai': 'Explore the boundaries of art and technology with GitHub AI artists',
        'design': 'Transforming visions into stunning designs with a touch of creativity',
        'wordpress': 'Crafting powerful websites with WordPress magic',
        'voiceover': 'Give life to your words with captivating voiceovers',
        'video': 'Bring stories to life through compelling and engaging videos',
        'social': 'Boost your online presence with strategic social media solutions',
        'seo': 'Optimize your digital presence and climb the ranks with SEO mastery',
        'illustration': 'Illustrate your ideas with captivating and meaningful visuals',
    };

    const path = {
        'ai' : 'Graphics & Design',
        'design' : 'Graphics & Design',
        'wordpress' : 'Programming & Tech',
        'voiceover' : 'Music & Audio',
        'video' : 'Video & Animation',
        'social' : 'Digital Marketing',
        'seo' : 'Digital Marketing',
        'illustration' : 'Graphics & Design',
    };

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
                    <span className='breadcrumbs'> {path[cat]} </span>
                </div>

                <h1>{category[cat]}</h1>
                <p>
                    {title[cat]}
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