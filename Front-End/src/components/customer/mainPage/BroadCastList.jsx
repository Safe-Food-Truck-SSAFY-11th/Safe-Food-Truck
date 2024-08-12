import React from 'react';
import Slider from 'react-slick';
import BroadCastItem from './BroadCastItem';
import styles from './BroadCastList.module.css';

function BroadCastList() {
  const items = [1, 2, 3, 4, 5, 6]; // 예시 데이터

  const settings = {
    infinite: false,
    speed: 1000,
    slidesToShow: 3.5,
    slidesToScroll: 1
  };

  return (
    <div className={styles.container}>
      <Slider {...settings}>
        {items.map((item, index) => (
          <div key={index}>
            <BroadCastItem />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default BroadCastList;
