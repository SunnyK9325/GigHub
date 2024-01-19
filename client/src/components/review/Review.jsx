import React from 'react';
import './Review.scss';
import newRequest from '../../utils/newRequest';
import { useQuery } from '@tanstack/react-query';
import noavatar from "/img/noavatar.png";
import like from "/img/like.png";
import star from "/img/star.png";
import dislike from "/img/dislike.png";

const Review = ({ review }) => {
    const { isLoading, error, data } = useQuery(
        {
            queryKey: [review.userId],
            queryFn: () =>
                newRequest.get(`/users/${review.userId}`).then((res) => {
                    return res.data;
                }),
        },
    );


    return (
        <div className="review">
            {isLoading ? (
                "loading"
            ) : error ? (
                "error"
            ) : (
                <div className="user">
                    <img className="pp" src={data.img || noavatar} alt="" />
                    <div className="info">
                        <span>{data.username}</span>
                        <div className="country">
                            <span>{data.country}</span>
                        </div>
                    </div>
                </div>
            )}
            <div className="stars">
                {Array(review.star).fill().map((item, i) =>
                    <img src={star} alt="" key={i} />
                )}
                <span>{review.star}</span>
            </div>
            <p>
                {review.desc}
            </p>
            <div className="helpful">
                <span>Helpful?</span>
                <img src={like} alt="" />
                <span>Yes</span>
                <img src={dislike} alt="" />
                <span>No</span>
            </div>
            <hr />
        </div>

    );
}

export default Review;