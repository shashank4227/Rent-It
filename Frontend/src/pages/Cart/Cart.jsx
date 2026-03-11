import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CartCard from '../../components/Cartcard/Cartcard';
import styles from './Cart.module.css';

const Cart = () => {
  const cart = useSelector((state) => state.auth.cart) || [];
  const navigate = useNavigate();

  const subtotal = cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
  const tax = subtotal * 0.18; // 18% GST example
  const total = subtotal + tax;

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.cartContainer}>
        <h1 className={styles.cartHeader}>Your Cart</h1>
        
        {cart.length === 0 ? (
          <div className={styles.emptyCart}>
            <p>Your cart is empty. Start exploring amazing equipment!</p>
            <button 
              className={styles.browseBtn} 
              onClick={() => navigate('/')}
            >
              Browse Assets
            </button>
          </div>
        ) : (
          <>
            <div className={styles.cartList}>
              {cart.map((tour) => (
                <CartCard key={tour._id} tour={tour} />
              ))}
            </div>

            <div className={styles.summaryCard}>
              <h2 className={styles.summaryTitle}>Order Summary</h2>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Tax (18% GST)</span>
                <span>₹{tax.toLocaleString()}</span>
              </div>
              <div className={styles.totalRow}>
                <span>Total Amount</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
              <button 
                className={styles.checkoutBtn}
                disabled={cart.length === 0}
                onClick={() => cart.length > 0 && navigate('/booking', { state: { tour: cart[0] } })}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;