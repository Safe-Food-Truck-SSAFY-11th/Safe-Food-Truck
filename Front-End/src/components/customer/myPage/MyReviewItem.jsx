import React from 'react';
import styles from './MyReviewItem.module.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const MyReviewItem = ({ review, onDelete }) => {

  const settings = {
    slide: 'div',
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className={styles.reviewCard}>
      <div className={styles.reviewContent}>
        <div className={styles.reviewImages}>
          {review.reviewImageDtos.length > 0 && review.reviewImageDtos[0].savedUrl !== 'empty' ? (
            review.reviewImageDtos.length === 1 ? (
              <div>
                <img src={review.reviewImageDtos[0].savedUrl} alt="review-single" className={styles.reviewImage} />
              </div>
            ) : (
              <Slider {...settings} className={styles.reviewImageCarousel}>
                {review.reviewImageDtos.map((img, index) => (
                  img.savedUrl !== 'empty' && (
                    <div key={index}>
                      <img src={img.savedUrl} alt={`review-${index}`} className={styles.reviewImage} />
                    </div>
                  )
                ))}
              </Slider>
            )
          ) : (
            <div className={styles.noImage}>리뷰 사진 없음</div>
          )}
        </div>
        <span><button className={styles.deleteButton} reviewId={review.id} onClick={onDelete}>✖</button></span>
      </div>
      <div className={styles.reviewText}>
        <hr className={styles.hrLine}/>
        <h4>{review.nickname} 님 ★ {review.star / 2}</h4>
        <p>{review.content}</p>
      </div>
    </div>
  );
};

export default MyReviewItem;
