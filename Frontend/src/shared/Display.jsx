import React, { useState, useEffect } from 'react';
import { Card, CardBody, Button, CardImg } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import './Display.css';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../features/auth/authSlice';

const Display = ({ tour, showReviewButton, showBookButton, showCartButton = true, showUpdateButton, showDeleteButton, isDashboard }) => {
  const { title, city, price, image, _id, creator } = tour;
  const { role, cart = [] } = useSelector((state) => state.auth); // Default cart as empty array
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [reviewText, setReviewText] = useState('');
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tours/${_id}`, {
          method: 'GET',
          credentials: 'include', // Include credentials (cookies)
        });
        const data = await response.json();
        if (response.ok) {
          setReviews(data.reviews);
        } else {
          console.error(`Error fetching reviews: ${data.message}`);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };
    fetchReviews();
  }, [_id]);

  const handleSubmit = () => {
    navigate('/booking', { state: { tour } });
  };

  const handleReview = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tours/${_id}/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include credentials (cookies)
        body: JSON.stringify({ review: reviewText }),
      });
      const data = await response.json();
      if (response.ok) {
        setReviewText('');
        setReviews((prevReviews) => [...prevReviews, reviewText]);
      } else {
        console.error(`Review submission failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const handleAddToCart = async () => {
    console.log(_id)
    try {
      // Send the tour ID to the backend to add it to the user's cart
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/addToCart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Send the credentials (cookies)
        body: JSON.stringify({ tourId: _id }), // Send the current tour's ID
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Dispatch the addToCart action to update the Redux store
        dispatch(addToCart(tour));
        console.log('Tour added to cart:', data.cart);  // Optionally log the updated cart
      } else {
        console.error('Failed to add to cart:', data.message);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };
  

  const isTourInCart = cart.some((item) => item._id === _id); // Safe access of cart

  return (
    <div className="tour-card">
      <div className={isDashboard ? "card-naked" : "card1"}>
        <img 
          src={image} 
          alt={title} 
          className="tour-image-small" 
        />
        <div className="card-body-custom">
          <span className="tour-location">
            <i className="ri-map-pin-line"></i> {city}
          </span>
          {creator?.name && (
            <span className="tour-seller">
              <i className="ri-user-line"></i> Listed by {creator.name}
              {creator?.email && (
                <> · <a href={`mailto:${creator.email}`} className="tour-seller-email">{creator.email}</a></>
              )}
            </span>
          )}
          <h5 className="tour-title">{title}</h5>
          
          <div className="card-bottom">
            <h5 className="price-tag">₹{price}<span>/ per day</span></h5>
            
            {role === "2120" && (
              <div className="button-group">
                {showBookButton === 1 && (
                  <button className="rent-btn" onClick={handleSubmit}>
                    Rent Now
                  </button>
                )}
                {showCartButton && (
                  <button
                    className="cart-btn"
                    onClick={handleAddToCart}
                    disabled={isTourInCart}
                  >
                    {isTourInCart ? 'In Cart' : 'Add to Cart'}
                  </button>
                )}

                {showReviewButton === 1 && (
                  <div className="reviews-section">
                    <h6>Member Reviews</h6>
                    <div className="review-input-group">
                      <input
                        type="text"
                        placeholder="Add a review..."
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                      />
                      <button className="review-submit-btn" onClick={handleReview}>
                        Post
                      </button>
                    </div>
                    {reviews.slice(0, 3).map((review, index) => (
                      <div key={index} className="review-item">{review}</div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Display;
