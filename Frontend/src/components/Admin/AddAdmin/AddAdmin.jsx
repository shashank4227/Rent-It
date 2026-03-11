import React, { useState } from 'react';
import './AddAdmin.css';

const AddAdmin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(''); // 'success' or 'error'

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage('');
    
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/adminSignup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: username, password }),
      });

      if (response.ok) {
        setMessage('Admin created successfully!');
        setStatus('success');
        setUsername('');
        setPassword('');
      } else {
        const data = await response.json();
        setMessage(data.message || 'Signup failed.');
        setStatus('error');
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
      setStatus('error');
    }
  };

  return (
    <main className="maincontainer">
      <h1 className="addadmin-title">🛡️ Add New Admin</h1>
      <p className="addadmin-subtitle">Create a new administrator account</p>

      <div className="addadmin-card">
        <form onSubmit={handleSignup} className="addadmin-form">
          <div className="addadmin-field">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter admin username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="addadmin-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter secure password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="addadmin-button">Create Admin</button>
        </form>

        {message && (
          <div className={`addadmin-message ${status}`}>
            {status === 'success' ? '✅' : '❌'} {message}
          </div>
        )}
      </div>
    </main>
  );
};

export default AddAdmin;
