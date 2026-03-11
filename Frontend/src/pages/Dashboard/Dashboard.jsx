import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Display from '../../shared/Display';
import styles from './Dashboard.module.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [tours, setTours] = useState([]);
  const { role, username } = useSelector((state) => state.auth);
  const [revenue, setRevenue] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
     const fetchEmployeeTours = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/dashboard`, {
          method: 'GET',
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Failed to fetch tours');
        }
        const data = await response.json();
        setTours(data.tours);
        
        // Calculate total revenue from all equipment rentals (100% goes to owner)
        const totalRevenue = data.tours.reduce((total, tour) => {
          const rentalRequests = tour.bookedBy || [];
          const tourRevenue = rentalRequests.reduce((rentalTotal, rental) => {
            return rentalTotal + (rental.adults || 1) * tour.price;
          }, 0);
          return total + tourRevenue;
        }, 0);
        
        setRevenue(totalRevenue);
      } catch (error) {
        console.error('Error fetching employee tours:', error);
      }
    };
  
    fetchEmployeeTours();
  }, [username]);

  if (role !== '8180') {
    return <div className={styles.accessDenied}>You do not have access to this dashboard.</div>;
  }

  const handleCreateTour = () => {
    navigate('/create');
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.sidebarContainer}>
        <h1 className={styles.dashboardTitle}>Provider Dashboard</h1>
        <p className={styles.welcomeText}>Welcome back, {username}</p>
        <div className={styles.statsCards}>
          <div className={styles.statCard}>
            <h3>Total Revenue</h3>
            <p className={styles.statValue}>₹{revenue.toFixed(2)}</p>
          </div>
          <div className={styles.statCard}>
            <h3>Total Assets</h3>
            <p className={styles.statValue}>{tours.length}</p>
          </div>
          <div className={styles.statCard}>
            <h3>Total Rentals</h3>
            <p className={styles.statValue}>
              {tours.reduce((total, tour) => total + (tour.bookedBy?.length || 0), 0)}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.mainContentContainer}>
        <div className={styles.mainContent}>
          <div className={styles.headerActions}>
            <h2>Your Listed Equipment</h2>
            <button className={styles.createTourBtn} onClick={handleCreateTour}>
              List New Equipment
            </button>
          </div>
          <div className={styles.toursGrid}>
            {tours.length > 0 ? (
              tours.map((tour) => (
                <div key={tour._id} className={styles.tourCard}>
                  <Display
                    tour={tour}
                    showReviewButton={0}
                    showBookButton={0}
                    showUpdateButton={1}
                    showDeleteButton={1}
                    isDashboard={true}
                  />
                  <div className={styles.tourRevenue}>
                    <h4>Asset Revenue</h4>
                    <p className={styles.revenueValue}>₹{((tour.price || 0) * (tour.bookedBy?.length || 0)).toFixed(2)}</p>
                  </div>
                  <div className={styles.bookings}>
                    <div className={styles.bookingsHeader}>
                      <h4>Active Rentals</h4>
                      <span className={styles.badge}>{tour.bookedBy?.length || 0}</span>
                    </div>
                    {tour.bookedBy && tour.bookedBy.length > 0 ? (
                      <ul className={styles.bookingsList}>
                        {tour.bookedBy.map((user) => (
                          <li key={user._id}>
                             <i className="ri-user-line"></i> {user.name}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className={styles.noBookings}>No rentals yet</p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.noTours}>
                <p>No equipment listed yet.</p>
                <button className={styles.createTourBtn} onClick={handleCreateTour}>
                  List Your First Asset
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
