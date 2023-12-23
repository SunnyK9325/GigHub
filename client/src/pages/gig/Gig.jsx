import React from "react";
import "./Gig.scss";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Reviews from "../../components/reviews/Reviews";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function Gig() {
    const { id } = useParams();

    const { isLoading, error, data } = useQuery({
        queryKey: ["gig"],
        queryFn: () =>
            newRequest.get(`/gigs/single/${id}`).then((res) => {
                return res.data;
            }),
    });

    const userId = data?.userId;

    const {
        isLoading: isLoadingUser,
        error: errorUser,
        data: dataUser,
    } = useQuery({
        queryKey: ["user"],
        queryFn: () =>
            newRequest.get(`/users/${userId}`).then((res) => {
                return res.data;
            }),
        enabled: !!userId,
    });

    // console.log(dataUser);

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        },
        // tablet: {
        //     breakpoint: { max: 1024, min: 464 },
        //     items: 2,
        //     slidesToSlide: 2 // optional, default to 1.
        // },
        // mobile: {
        //     breakpoint: { max: 464, min: 0 },
        //     items: 1,
        //     slidesToSlide: 1 // optional, default to 1.
        // }
    };

    return (
        <div className="gig">
            {isLoading ? (
                "loading"
            ) : error ? (
                "Something went wrong!"
            ) : (
                <div className="container">
                    <div className="left">
                        <span className="breadcrumbs">
                            Fiverr {">"} Graphics & Design {">"}
                        </span>
                        <h1>{data.title}</h1>
                        {isLoadingUser ? (
                            "loading"
                        ) : errorUser ? (
                            "Something went wrong!"
                        ) : (
                            <div className="user">
                                <img
                                    className="pp"
                                    src={dataUser.img || "/img/noavatar.jpg"}
                                    alt=""
                                />
                                <span>{dataUser.username}</span>
                                {!isNaN(data.totalStars / data.starNumber) && (
                                    <div className="stars">
                                        {Array(Math.round(data.totalStars / data.starNumber))
                                            .fill()
                                            .map((item, i) => (
                                                <img src="/img/star.png" alt="" key={i} />
                                            ))}
                                        <span>{Math.round(data.totalStars / data.starNumber)}</span>
                                    </div>
                                )}
                            </div>
                        )}
                        <Carousel
                            swipeable={true} 
                            draggable={true} 
                            showDots={false}
                            responsive={responsive}
                            ssr={true}
                            infinite={true}
                            autoPlay={false} 
                            keyBoardControl={true}
                            customTransition="transform 1000ms ease-in-out" 
                            transitionDuration={1000} 
                            className="slider">

                            {data.images.map((item, index) => (
                                <img key={index} src={item} alt="" />
                            ))}

                        </Carousel>
                        <h2>About This Gig</h2>
                        <p>{data.desc}</p>
                        {isLoadingUser ? (
                            "loading"
                        ) : errorUser ? (
                            "Something went wrong!"
                        ) : (
                            <div className="seller">
                                <h2>About The Seller</h2>
                                <div className="user">
                                    <img src={dataUser.img || "/img/noavatar.jpg"} alt="" />
                                    <div className="info">
                                        <span>{dataUser.username}</span>
                                        {!isNaN(data.totalStars / data.starNumber) && (
                                            <div className="stars">
                                                {Array(Math.round(data.totalStars / data.starNumber))
                                                    .fill()
                                                    .map((item, i) => (
                                                        <img src="/img/star.png" alt="" key={i} />
                                                    ))}
                                                <span>
                                                    {Math.round(data.totalStars / data.starNumber)}
                                                </span>
                                            </div>
                                        )}
                                        <button>Contact Me</button>
                                    </div>
                                </div>
                                <div className="box">
                                    <div className="items">
                                        <div className="item">
                                            <span className="title">From</span>
                                            <span className="desc">{dataUser.country}</span>
                                        </div>
                                        <div className="item">
                                            <span className="title">Member since</span>
                                            <span className="desc">Aug 2022</span>
                                        </div>
                                        <div className="item">
                                            <span className="title">Avg. response time</span>
                                            <span className="desc">4 hours</span>
                                        </div>
                                        <div className="item">
                                            <span className="title">Last delivery</span>
                                            <span className="desc">1 day</span>
                                        </div>
                                        <div className="item">
                                            <span className="title">Languages</span>
                                            <span className="desc">English</span>
                                        </div>
                                    </div>
                                    <hr />
                                    <p>{dataUser.desc}</p>
                                </div>
                            </div>
                        )}
                        <Reviews gigId={id} />
                    </div>
                    <div className="right">
                        <div className="price">
                            <h3>{data.shortTitle}</h3>
                            <h2>$ {data.price}</h2>
                        </div>
                        <p>{data.shortDesc}</p>
                        <div className="details">
                            <div className="item">
                                <img src="/img/clock.png" alt="" />
                                <span>{data.deliveryDate} Days Delivery</span>
                            </div>
                            <div className="item">
                                <img src="/img/recycle.png" alt="" />
                                <span>{data.revisionNumber} Revisions</span>
                            </div>
                        </div>
                        <div className="features">
                            {data.features.map((feature) => (
                                <div className="item" key={feature}>
                                    <img src="/img/greencheck.png" alt="" />
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>
                        <Link to={`/pay/${id}`}>
                            <button>Continue</button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Gig;