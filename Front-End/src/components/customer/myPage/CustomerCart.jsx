import React, { useEffect } from 'react';
import useCartStore from '../../../store/users/customer/cartStore';
import styles from './CustomerCart.module.css';

const CustomerCart = () => {
  const { cartItems, setCartItems, removeItemFromCart, updateItemQuantity, clearCart } = useCartStore();

  useEffect(() => {
    // 더미 데이터 설정
    const dummyCartItems = [
      {
        id: 1,
        name: '맛있는 닭꼬치',
        price: 8000,
        quantity: 1,
        image: 'https://via.placeholder.com/150',
      },
      {
        id: 2,
        name: '타코야끼',
        price: 4000,
        quantity: 2,
        image: 'https://via.placeholder.com/150',
      },
    ];
    setCartItems(dummyCartItems);
  }, [setCartItems]);

  const handleRemove = (itemId) => {
    removeItemFromCart(itemId);
  };

  const handleQuantityChange = (itemId, quantity) => {
    if (quantity > 0) {
      updateItemQuantity(itemId, quantity);
    }
  };

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className={styles.cart}>
      <h2>용훈님이 결제할 금액이에요!</h2>
      {cartItems.length === 0 ? (
        <p>장바구니가 비어 있습니다.</p>
      ) : (
        <div className={styles.cartItems}>
          {cartItems.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <img src={item.image} alt={item.name} className={styles.cartItemImage} />
              <div className={styles.cartItemDetails}>
                <h3>{item.name}</h3>
                <p>{item.price.toLocaleString()}원</p>
              </div>
              <div className={styles.cartItemControls}>
                <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                <input
                  type="text"
                  value={item.quantity}
                  min="1"
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value, 10))}
                />
                <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
              <button onClick={() => handleRemove(item.id)} className={styles.removeButton}>
              제 거
              </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className={styles.totalAmount}>
        <p>{totalAmount.toLocaleString()}원 결제 할게요!</p>
      </div>
      <button onClick={clearCart} className={styles.clearButton}>
        장바구니 비우기
      </button>
    </div>
  );
};

export default CustomerCart;
