/* eslint-disable */
import React, { useState, useEffect } from 'react';
import 'whatwg-fetch';
import { getStars, calculateTotalReviewNumber, calculateAverage } from '../../common/helpers.js';
import styled from 'styled-components';

const StarsAndReviews = styled.div`
  display: flex;
`;

const Star = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ReviewLink = styled.p`
  margin: 10px;
  text-decoration: underline;
  font-size: .75rem;
`;

const StarReviews = ({ currentItem, onReviewLinkClick }) => {
  const [rating, setRating] = useState(0);
  const [reviewNum, setReviewNum] = useState(0);
  const stars = [String.fromCharCode(0x2606), String.fromCharCode(0x2606), String.fromCharCode(0x2606), String.fromCharCode(0x2606), String.fromCharCode(0x2606)];
  useEffect(() => {
    if (Object.keys(currentItem).length) {
      getStars(currentItem.id)
      .then((result) => {
        setRating(result[0]);
        setReviewNum(result[1])
      })
    }
  }, [currentItem]);

  if (reviewNum > 0) {
    return (
      <StarsAndReviews>
        {stars.map((star, i) => {
          if (rating - i >= 1) {
            return <Star key={`star${i}`}>{String.fromCharCode(0x2605)}</Star>
          } else if (rating - i < 1 && rating - i > 0) {
            var amt = (i - rating) * -100;
            return <Star key={`star${i}`} className='partly-filled-star' style={{background: `linear-gradient(to left, white ${amt}%, black ${100 - amt}%)`, backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>{String.fromCharCode(0x2605)}</Star>
          } else {
            return <Star key={`star${i}`}>{String.fromCharCode(0x2606)}</Star>
          }
        })}
        <ReviewLink onClick={() =>  onReviewLinkClick() }>Read All {reviewNum} Reviews</ReviewLink>
      </StarsAndReviews>
    );
  }
  return (null);
};

export default StarReviews;
