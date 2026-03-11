import React, { useState, useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const Statistics = () => {
  const [statisticsData, setStatisticsData] = useState(null);
  const chartContainerRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tour-info`, {
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const jsonData = await response.json();
        setStatisticsData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (statisticsData && chartContainerRef.current) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const ctx = chartContainerRef.current.getContext('2d');

      chartInstanceRef.current = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Total Equipment Listed', 'Total Bookings'],
          datasets: [{
            data: [statisticsData.totalTours, statisticsData.totalBookings],
            backgroundColor: ['#0047AB', '#00D1FF'],
            borderWidth: 2,
            borderColor: '#fff',
          }],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom',
              labels: { padding: 20, font: { size: 14, weight: '600' } }
            }
          }
        }
      });
    }
  }, [statisticsData]);

  return (
    <main className="maincontainer">
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '30px' }}>Platform Overview</h1>

      {statisticsData && (
        <div style={{ display: 'flex', gap: '24px', marginBottom: '40px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '200px', background: 'linear-gradient(135deg, #0047AB, #00D1FF)', borderRadius: '16px', padding: '24px', color: 'white' }}>
            <p style={{ fontSize: '0.85rem', opacity: 0.9, margin: 0 }}>Total Equipment</p>
            <p style={{ fontSize: '2.5rem', fontWeight: 900, margin: '8px 0 0' }}>{statisticsData.totalTours}</p>
          </div>
          <div style={{ flex: 1, minWidth: '200px', background: 'linear-gradient(135deg, #059669, #34d399)', borderRadius: '16px', padding: '24px', color: 'white' }}>
            <p style={{ fontSize: '0.85rem', opacity: 0.9, margin: 0 }}>Total Bookings</p>
            <p style={{ fontSize: '2.5rem', fontWeight: 900, margin: '8px 0 0' }}>{statisticsData.totalBookings}</p>
          </div>
        </div>
      )}

      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        <h3 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>Equipment vs Bookings</h3>
        <canvas ref={chartContainerRef} />
      </div>
    </main>
  );
};

export default Statistics;
