import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Modal from './CartAlertModal'; // 모달 컴포넌트 임포트
import styles from './FoodTruckMenuDetail.module.css';

function FoodTruckMenuDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { item, storeId } = location.state;
  
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
  const [modalMessage, setModalMessage] = useState(''); // 모달 메시지 관리

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    const cartItem = {
      ...item,
      quantity,
      storeId: parseInt(location.state.storeId),  
    };
    
    let cart = Cookies.get('cart');
  
    cart = JSON.parse(cart);

    // 이미 장바구니에 물건이 담겨 있으면?
    if (cart.length !== 0) {

      // 이미 존재하는 storeId를 장바구니의 0번째 인덱스에서 꺼내오고
      const existingStoreId = cart[0].storeId;
  
      // 만약 지금 담으려는 storeId와 이전에 담은 메뉴의 storeId가 다르다면 모달 띄워서 경고 함
      if (existingStoreId !== storeId) {
        setModalMessage('다른 푸드트럭의 메뉴는 한 번에 담을 수 없어요.');
        setIsModalOpen(true); // 모달 열기
        return;
      }
      
    } else {
      cart = [];
    }
  
    const existingItemIndex = cart.findIndex(cartItem => cartItem.menuId === item.menuId);
  
    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      cart.push(cartItem);
    }
  
    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + 20);
  
    Cookies.set('cart', JSON.stringify(cart), { expires: expirationDate });
  
    console.log(cart);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleGoToCart = () => {
    navigate('/cart', { state: { storeId } });
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
      
      {/* 모달 컴포넌트 추가 */}
      <Modal isOpen={isModalOpen} onClose={closeModal} message={modalMessage} />
    </div>
  );
}

export default FoodTruckMenuDetail;
