import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import './AdminDashboard.css'; // Import the CSS file

const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { username } = useParams(); // Access the username from the route params

  const handleLogout = async () => {
    try {
        // Call the backend API to log out the admin
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/adminLogout`, {
            method: 'POST',
            credentials: 'include', // Ensure cookies are sent
        });

        const result = await response.json();

        if (response.ok) {
            // Dispatch the logout action to Redux
            dispatch(logout());

            // Navigate to the home page after logout
            navigate('/');
        } else {
            // Handle logout failure
            console.error('Logout failed:', result.message);
        }
    } catch (error) {
        // Handle any errors that occur during the fetch
        console.error('An error occurred while logging out:', error);
    }
};


  return (
    <div className="navbar">
      <div>
        <div className="companyname">⚙️ Rent It</div>
        <div className="admin-subtitle">Admin Control Panel</div>
        <div className="navsections">
          <button className="navitem" onClick={() => navigate(`/dashboard1`)}>📊 Login Status</button>
          <button className="navitem" onClick={() => navigate(`/statistics/${username}`)}>📈 Statistics & Revenue</button>
          <button className="navitem" onClick={() => navigate(`/customers`)}>👥 Customers</button>
          <button className="navitem" onClick={() => navigate(`/tours`)}>🔧 Equipment</button>
          <button className="navitem" onClick={() => navigate(`/AddAdmin`)}>🛡️ Add Admin</button>
          <button className="navitem" onClick={() => navigate(`/recent-bookings`)}>📋 Recent Bookings</button>
          <button className="navitem" onClick={() => navigate(`/`)}>🏠 Home Site</button>
        </div>
      </div>
      <div className="logoutButton" onClick={handleLogout}>
        Logout
      </div>
    </div>
  );
};

export default AdminDashboard;
