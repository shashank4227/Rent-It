import React, { useEffect, useState } from 'react';
import './Customers.css';

const Customers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users`, {
          credentials: 'include',
        });
        if (!response.ok) throw new Error('Failed to fetch users');
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) return <div className="maincontainer"><div className="customers-loading">Loading users...</div></div>;
  if (error) return <div className="maincontainer"><div className="customers-error">Error: {error}</div></div>;

  return (
    <main className="maincontainer">
      <h1 className="customers-title">👥 Customers</h1>
      <p className="customers-subtitle">{users.length} registered users</p>

      <input
        type="text"
        placeholder="🔍 Search by name or email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="customers-search"
      />

      {filteredUsers.length > 0 ? (
        <div className="customers-grid">
          {filteredUsers.map((user) => (
            <div key={user._id} className="customer-card">
              <div className="customer-avatar">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="customer-info">
                <h3 className="customer-name">{user.name}</h3>
                <p className="customer-email">{user.email || 'No email'}</p>
                <span className={`customer-role ${user.role}`}>
                  {user.role === 'employee' ? '🔧 Provider' : '👤 User'}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="customers-empty">No users found</div>
      )}
    </main>
  );
};

export default Customers;
