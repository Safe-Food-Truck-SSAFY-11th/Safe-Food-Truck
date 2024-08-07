import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import styles from './CustomerCart.module.css';
import { useNavigate } from 'react-router-dom';

const CustomerCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  
  const nickname = sessionStorage.getItem('nickname');
  
  useEffect(() => {
    // 장바구니에 저장된 쿠키 가져옴!
    const cart = Cookies.get('cart');

    // 장바구니에 상품이 있을때 파싱함
    if (cart) {
      setCartItems(JSON.parse(cart));
    }
    
  }, []);

  const updateCartInCookies = (updatedItems) => {
    setCartItems(updatedItems);
    Cookies.set('cart', JSON.stringify(updatedItems), { expires: 1 / 72 });
  };

  const handleIncrease = (index) => {
    const updatedItems = [...cartItems];
    updatedItems[index].quantity += 1;
    updateCartInCookies(updatedItems);
  };

  const handleDecrease = (index) => {
    const updatedItems = [...cartItems];
    if (updatedItems[index].quantity > 1) {
      updatedItems[index].quantity -= 1;
    } else {
      updatedItems.splice(index, 1);
    }
    updateCartInCookies(updatedItems);
  };

  const handleCheckout = () => {
    alert('결제가 완료되었습니다!');
    Cookies.remove('cart');
    navigate('/mypageCustomer'); 
  };

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className={styles.cartContainer}>
      <h1>{nickname} 님의 결제예정 금액이에요!</h1>
      {cartItems.length > 0 ? (
        <>
          {cartItems.map((item, index) => (
            <div key={item.menuId} className={styles.cartItem}>
              <img src={item.menuImageDto.savedUrl} alt={item.name} className={styles.image} />
              <div className={styles.details}>
                <h3>{item.name}</h3>
                <p>{item.price}원</p>
              </div>
              <div className={styles.quantityControl}>
                <button onClick={() => handleDecrease(index)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncrease(index)}>+</button>
              </div>
            </div>
          ))}
          <button className={styles.checkoutButton} onClick={handleCheckout}>
            {totalAmount}원 결제 할게요!
          </button>
        </>
      ) : (
        <div className={styles.emptyCartMessage}>
          <p>장바구니에 담긴 상품이 없어요 🤣</p>
        </div>
      )}
    </div>
  );
};

export default CustomerCart;
