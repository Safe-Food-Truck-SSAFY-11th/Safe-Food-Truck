import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import styles from './FoodTruckMenuDetail.module.css';

function FoodTruckMenuDetail() {
  // location 훅 사용
  const location = useLocation();
  const navigate = useNavigate();

  // 부모 컴포넌트로 부터 전달받은 메뉴 객체 (item) 선언 및 사용
  const { item } = location.state;
  
  // 수량 변경을 위한 상태 선언
  const [quantity, setQuantity] = useState(1);

  // 장바구니 수량 증가 함수
  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  // 장바구니 수량 감소 함수
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // 장바구니 추가 함수
  const handleAddToCart = () => {

    const cartItem = {
      ...item,
      quantity,
    };

    // 쿠키 가져와서 카트에 담는 로직
    let cart = Cookies.get('cart');
    if (cart) {
      cart = JSON.parse(cart);
    } else {
      cart = [];
    }

    // 동일한 메뉴가 장바구니에 있는지 확인함
    const existingItemIndex = cart.findIndex(cartItem => cartItem.menuId === item.menuId);

    if (existingItemIndex !== -1) {

      // 동일한 메뉴가 있으면 수량을 증가시킴
      cart[existingItemIndex].quantity += quantity;

    } else {

      // 동일한 메뉴가 없으면 새 항목 추가
      cart.push(cartItem);
    }
    
    // 현재 시간 기준으로 20분 후의 시간을 계산하여 쿠키 만료 시간 설정 함
    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + 20);

    Cookies.set('cart', JSON.stringify(cart), { expires: expirationDate });

    console.log(cart);
  };

  // 뒤로가기 함수
  const handleBack = () => {
    navigate(-1); 
  };

  // 장바구니로 바로 이동시키는 함수
  const handleGoToCart = () => {
    navigate('/cart'); 
  };

  return (
    <div className={styles.menuDetail}>
      <h2 className={styles.title}>{item.name}</h2>
      {item.menuImageDto ? (
        <img src={item.menuImageDto.savedUrl} alt={item.name} className={styles.image} />
      ) : (
        <div className={styles.placeholder}>이미지 없음</div>
      )}
      <div className={styles.quantityControl}>
        <button onClick={handleDecrease} className={styles.button}>-</button>
        <span className={styles.quantity}>{quantity}</span>
        <button onClick={handleIncrease} className={styles.button}>+</button>
      </div>
      <p className={styles.descriptionTitle}>상세 설명이에요!</p>
      <p className={styles.description}>{item.description}</p>
      <button onClick={handleAddToCart} className={styles.addToCartButton}>
        {item.price * quantity}원 장바구니에 담을게요!
      </button>
      <div className={styles.navigationButtons}>
        <button onClick={handleBack} className={styles.navButton}>뒤로가기</button>
        <button onClick={handleGoToCart} className={styles.navButton}>장바구니로 이동</button>
      </div>
    </div>
  );
}

export default FoodTruckMenuDetail;
