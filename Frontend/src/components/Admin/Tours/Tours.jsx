import React, { useState, useEffect } from 'react';
import Display from '../../../shared/Display';
import styles from './Tours.module.css';

const Tours = ({role}) => {
  const [toursData, setToursData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    
    const fetchTours = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tours`, {
          credentials: 'include',
          signal: controller.signal
        });
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const jsonData = await response.json();
        setToursData(jsonData);
      } catch (error) {
        if (error.name === 'AbortError') return;
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();

    return () => controller.abort(); // Cleanup on unmount
  }, []);

  const handleDelete = async (tourId) => {
    if (!window.confirm("Are you sure you want to delete this equipment?")) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tours/delete/${tourId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to delete tour');
      }

      setToursData(toursData.filter(tour => tour._id !== tourId));
    } catch (error) {
      alert(error.message);
    }
  };

  const filteredTours = toursData.filter(tour =>
    tour.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <main className="maincontainer">
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1e293b', margin: '0 0 4px' }}>🔧 Equipment</h1>
      <p style={{ color: '#64748b', fontSize: '0.9rem', margin: '0 0 24px' }}>{filteredTours.length} items listed</p>
      <input
        type="text"
        placeholder="🔍 Search equipment..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />
      <div className={styles.toursContainer}>
        {filteredTours.length > 0 ? (
          filteredTours.map((tour) => (
            <div key={tour._id} className={styles.tourItem}>
              <Display 
                tour={tour} 
                showReviewButton={0} 
                showBookButton={0} 
                showUpdateButton={role === 5150 ? 1 : 0}
                showCartButton={false}
              />
              {role === 5150 && (
                <button 
                  className={styles.deleteButton} 
                  onClick={() => handleDelete(tour._id)}
                >
                  🗑️ Delete Equipment
                </button>
              )}
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8', gridColumn: '1/-1' }}>No equipment found</div>
        )}
      </div>
    </main>
  );
};

export default Tours;
