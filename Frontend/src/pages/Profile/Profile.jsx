import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Display from '../../shared/Display';
import "./Profile.css";

const Profile = () => {
  const { username } = useSelector((state) => state.auth);
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserAndBookings = async () => {
      if (username) {
        try {
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/profile`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
          });

          if (response.ok) {
            const data = await response.json();
            setUserDetails(data);
          } else {
            setError('Error fetching user details or bookings.');
          }
        } catch (err) {
          setError('Failed to fetch user profile.');
          console.error('Error:', err);
        }
      }
    };
    fetchUserAndBookings();
  }, [username]);

  const handleCancelBooking = async (bookingId) => {
    if (!bookingId) {
      console.error("Invalid booking ID");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/cancel/${bookingId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (response.ok) {
        setUserDetails((prev) => ({
          ...prev,
          upcomingBookings: prev.upcomingBookings.filter(booking => booking._id !== bookingId),
        }));
      } else {
        console.error('Failed to cancel booking');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className="profile-container">
      <h1>Member Profile</h1>
      {error ? (
        <div className="error-message">{error}</div>
      ) : userDetails ? (
        <div className="profile-content">
          <p className="account-info">Account ID: {userDetails.user}</p>

          <div className="bookings-details">
            {["ongoingBookings", "upcomingBookings", "completedBookings"].map((category) => (
              <div key={category} className="booking-section">
                <h3>
                  {category === "ongoingBookings" ? "Ongoing Rentals" : 
                   category === "upcomingBookings" ? "Upcoming Orders" : "Order History"}
                </h3>

                {userDetails[category]?.length > 0 ? (
                  <div className="tour-cards-container">
                    {userDetails[category].map((booking) => (
                      <div key={booking._id} className="booking-card">
                        <Display 
                          tour={booking.tour} 
                          showReviewButton={category !== "upcomingBookings"} 
                          showBookButton={category === "completedBookings"}
                          showCartButton={false}
                        />
                        <div className="booking-footer">
                          <p className="booking-cost">Order Total: ₹{booking.cost?.toFixed(2)}</p>
                          {category === "upcomingBookings" && ( 
                            <button 
                              className="cancel-button"
                              onClick={() => handleCancelBooking(booking._id)}
                            >
                              Cancel Rental
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-bookings">No activity found in this category.</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="loading-state">
           <i className="ri-loader-4-line ri-spin"></i>
           <p>Retrieving your technical assets...</p>
        </div>
      )}
    </div>
  );
};

export default Profile;