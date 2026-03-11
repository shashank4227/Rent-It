import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import './Navbar.css';

export const Navbar = () => {
    const { isAuthenticated, role, cart } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cart }), // Send cart data in the body
                credentials: 'include',
            });

            if (res.ok) {
                dispatch(logout()); // Clear user data and cart on logout
            } else {
                console.error('Failed to log out');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    // Get the length of the cart array to display total items in the cart
    const totalCartItems = Array.isArray(cart) ? cart.length : 0;

    return (
        <div>
            <nav>
                <h2 className="logo1">Rent It</h2>
                <div className="nav-links">
                    <NavLink to="/" end className={({ isActive }) => isActive ? "active-link" : ""}>
                        <li>Home</li>
                    </NavLink>
                    <NavLink to="/about" className={({ isActive }) => isActive ? "active-link" : ""}>
                        <li>About</li>
                    </NavLink>
                    {!isAuthenticated ? (
                        <NavLink to="/adminLogin" className={({ isActive }) => isActive ? "active-link" : ""}>
                            <li>Admin</li>
                        </NavLink>
                    ) : null}
                    {isAuthenticated && role === '8180' ? (
                        <>
                            <NavLink to="/create" className={({ isActive }) => isActive ? "active-link" : ""}>
                                <li>List Equipment</li>
                            </NavLink>
                            <NavLink to="/Dashboard" className={({ isActive }) => isActive ? "active-link" : ""}>
                                <li>Dashboard</li>
                            </NavLink>
                        </>
                    ) : null}
                    {isAuthenticated && role === '2120' ? (
                        <>
                            <NavLink to="/book" className={({ isActive }) => isActive ? "active-link" : ""}>
                                <li>Rent Equipment</li>
                            </NavLink>
                            <NavLink to="/profile" className={({ isActive }) => isActive ? "active-link" : ""}>
                                <li>Profile</li>
                            </NavLink>
                            {/* Conditionally render Cart button */}
                            <NavLink to="/cart" className={({ isActive }) => isActive ? "active-link" : ""}>
                                <li>Cart ({totalCartItems})</li> {/* Display total items in the cart */}
                            </NavLink>
                        </>
                    ) : null}
                    {isAuthenticated && (role === '8180' || role === '2120') ? (
                        <li>
                            <span onClick={handleLogout} className="span">
                                Logout
                            </span>
                        </li>
                    ) : (
                        <>
                            <NavLink to="/login" className={({ isActive }) => isActive ? "active-link" : ""}>
                                <li>Login</li>
                            </NavLink>
                            <NavLink to="/register" className={({ isActive }) => isActive ? "active-link" : ""}>
                                <li>Register</li>
                            </NavLink>
                        </>
                    )}
                </div>
            </nav>
        </div>
    );
};