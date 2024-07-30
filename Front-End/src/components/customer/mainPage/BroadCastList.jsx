import React from 'react';
import Slider from 'react-slick';
import BroadCastItem from './BroadCastItem';
import styles from './BroadCastList.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function BroadCastList() {
  const items = [1, 2, 3, 4, 5, 6]; // 예시 데이터

  const settings = {
    dots: false,
    infinite: false,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,  
  };

  return (
    <div className={styles.container}>
      <Slider {...settings} className={styles.slider}>
        {items.map((item, index) => (
          <div key={index} className={styles.slide}>
            <BroadCastItem />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default BroadCastList;
