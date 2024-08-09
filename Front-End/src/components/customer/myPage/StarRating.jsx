import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import styles from './StarRating.module.css';

const Star = ({ filled, half }) => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <defs>
      <linearGradient id="half">
        <stop offset="50%" stopColor="gold" />
        <stop offset="50%" stopColor="gray" stopOpacity="1" />
      </linearGradient>
    </defs>
    <polygon 
      points="12,17.27 18.18,21 15.64,13.97 21,9.24 13.81,8.63 12,2 10.19,8.63 3,9.24 8.36,13.97 5.82,21" 
      fill={half ? "url(#half)" : filled ? "gold" : "gray"} 
    />
  </svg>
);

const StarRating = ({ maxStars = 5, onRatingChange }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const bind = useDrag(({ movement: [mx], memo = rating }) => {
    const newRating = Math.min(maxStars, Math.max(0, Math.round((memo + mx / 24) * 2) / 2));
    setHoverRating(newRating);
    return memo;
  }, { axis: 'x' });

  const handleMouseLeave = () => {
    setHoverRating(rating);
  };

  const handleStarClick = (index) => {
    setRating(index + 1);
    setHoverRating(index + 1);
    onRatingChange(index + 1);
  };

  return (
    <div 
      className={styles.starRating} 
      {...bind()} 
      onMouseLeave={handleMouseLeave}
    >
      {[...Array(maxStars)].map((_, i) => (
        <span
          key={i}
          onClick={() => handleStarClick(i)}
        >
          <Star 
            filled={i < hoverRating} 
            half={hoverRating > i && hoverRating < i + 1} 
          />
        </span>
      ))}
    </div>
  );
};

export default StarRating;
