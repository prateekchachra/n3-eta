import React from 'react';
import ReactStars from 'react-stars';

import './CustomerReview.scss';

export type CustomerReviewType = {
    title: string,
    text: string,
    date: string,
    reviewerName: string,
    score: number,
}

export type CustomerReviewProps = {
    review: CustomerReviewType
}


const CustomerReview = ({review} : CustomerReviewProps) : JSX.Element => {
    const {title, text, date, reviewerName, score} = review;
    return (
    <div className="reviewContainer">
        <span className="reviewTitle">{title}</span>
        <span className="reviewDetails">{reviewerName} | {date}</span>
        <span className="reviewText">{text}</span>
        <ReactStars
            count={5}
            value={score}
            edit={false}
            size={24} />
    </div>
    )
}
export default CustomerReview;