import React from "react";
import "./GigCard.scss";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest.js";

import { FaRupeeSign } from "react-icons/fa";
import noavatar from "/img/noavatar.png";
import star from "/img/star.png";
import heart from "/img/heart.png";


const GigCard = ({ item }) => {

    const { isLoading, error, data } = useQuery({
        queryKey: [`userGig-${item.userId}`],
        queryFn: () => newRequest.get(`/users/${item.userId}`).then((res) => {
            return res.data;
        }),
    })

    // console.log(data);

    return (
        <Link to={`/gig/${item._id}`} className="link">
            <div className="gigCard">

                <img src={item.cover} alt="" />

                <div className="info">
                    {isLoading ? ("Loading")
                        : error ? ("something went wrong!")
                            : (<div className="user">
                                <img src={data.img || { noavatar }} alt="" />
                                <span>{data.username}</span>
                            </div>)}
                    <p>{item.title.substring(0, 35)}...</p>
                    <div className="star">
                        <img src={star} alt="" />
                        <span>
                            {(!isNaN(item.totalStars / item.starNumber) &&
                                Math.round((item.totalStars / item.starNumber) * 10) / 10)}
                        </span>
                    </div>
                </div>

                <hr />

                <div className="detail">
                    <img src={heart} alt="" />

                    <div className="price">
                        <span>STARTING AT</span>
                        <div className="amount">
                            <FaRupeeSign style={{ fontSize: '12px' }} />
                            <span>{item.price}</span>
                        </div>
                    </div>

                </div>

            </div>
        </Link>
    );
};

export default GigCard;