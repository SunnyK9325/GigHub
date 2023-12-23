import React from 'react';
import './Review.scss';
import newRequest from '../../utils/newRequest';
import { useQuery } from '@tanstack/react-query';

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
                    <img className="pp" src={data.img || "/img/noavatar.png"} alt="" />
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
                    <img src="/img/star.png" alt="" key={i} />
                )}
                <span>{review.star}</span>
            </div>
            <p>
                {review.desc}
            </p>
            <div className="helpful">
                <span>Helpful?</span>
                <img src="/img/like.png" alt="" />
                <span>Yes</span>
                <img src="/img/dislike.png" alt="" />
                <span>No</span>
            </div>
            <hr />
        </div>

    );
}

export default Review;