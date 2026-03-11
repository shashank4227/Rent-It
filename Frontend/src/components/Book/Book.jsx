import React, { useEffect, useState } from 'react';
import Display from '../../shared/Display'; // Import the Display component
import './Book.css';

const Book = () => {
    const [tours, setTours] = useState([]); // All available tours
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch tours from the backend
    useEffect(() => {
        const fetchTours = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tours`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include', // Include credentials (cookies) in the request
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch tours');
                }

                const data = await response.json();
                setTours(data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching tours:', err);
                setError('Failed to fetch tours');
                setLoading(false);
            }
        };

        fetchTours();
    }, []);

    // Handle loading and error states
    if (loading) return <p>Loading tours...</p>;
    if (error) return <p>{error}</p>;

  return (
    <div className="tours-container">
      <h2>Rent Equipment</h2>
      <p className="subtitle">High-performance technical assets for your research and development.</p>
      
      <div className="book-content">
        <aside className="book-sidebar">
          <div className="sidebar-box">
            <h3>Categories</h3>
            <div className="filter-item">
              <i className="ri-printer-line"></i> 3D Printers
            </div>
            <div className="filter-item">
              <i className="ri-camera-lens-line"></i> Photography Rig
            </div>
            <div className="filter-item">
              <i className="ri-pulse-line"></i> Lab Instruments
            </div>
            <div className="filter-item">
              <i className="ri-cpu-line"></i> Computing Nodes
            </div>
          </div>

          <div className="sidebar-box">
            <h3>Rental Benefits</h3>
            <div className="filter-item">
              <i className="ri-checkbox-circle-line"></i> Verified Maintenance
            </div>
            <div className="filter-item">
              <i className="ri-shield-check-line"></i> Asset Insurance
            </div>
          </div>
        </aside>

        <div className="tour-list">
          {loading ? (
            <div className="loading">Initializing catalog...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : tours.length > 0 ? (
            tours.map((tour) => (
              <Display 
                key={tour._id} 
                tour={tour} 
                showReviewButton={1} 
                showBookButton={1} 
              />
            ))
          ) : (
            <div className="no-tours">
              <p>No equipment currently available in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Book;