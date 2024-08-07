import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import styles from './CustomerCart.module.css';
import { useNavigate } from 'react-router-dom';

const CustomerCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = Cookies.get('cart');
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
    navigate('/'); // Redirect to home or any other page
  };

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className={styles.cartContainer}>
      <h1>용훈님이 결제💰할 금액이에요!</h1>
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
    </div>
  );
};

export default CustomerCart;
