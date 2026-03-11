import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromCart } from '../../features/auth/authSlice';
import styles from './CartCard.module.css';

const CartCard = ({ tour }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/cart/remove/${tour._id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to remove item from the cart.');
      }
      dispatch(removeFromCart(tour._id));
    } catch (error) {
      console.error('Error removing item from cart:', error.message);
    }
  };

  const { title, price, image, city } = tour;

  return (
    <div className={styles.cartCard}>
      <img src={image} alt={title} className={styles.tourImage} />
      <div className={styles.cartCardDetails}>
        <div className={styles.tourInfo}>
          <h3 className={styles.tourTitle}>{title}</h3>
          <p className={styles.tourLocation}>{city}</p>
          <p className={styles.tourPrice}>₹{price.toLocaleString()}</p>
        </div>
        <div className={styles.buttonGroup}>
          <button className={styles.btnRemove} onClick={handleRemove}>
            Remove
          </button>
          <button 
            className={styles.btnBook} 
            onClick={() => navigate('/booking', { state: { tour } })}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartCard;