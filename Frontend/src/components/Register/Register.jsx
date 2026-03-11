import React, { useState } from 'react';
import './Register.css';
import hello from '../../assets/images/hero-video.mp4'; // Ensure this path is correct
import { useNavigate, Link } from 'react-router-dom';

export const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState(''); // Add email state
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [signedin, setSignedin] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    const navigate = useNavigate();

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid email address');
        } else {
            setEmailError('');
        }
    };

    const validatePassword = () => {
        if (password.length > 0 && password.length < 6) {
            setPasswordError('Password must be at least 6 characters long');
        } else {
            setPasswordError('');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters long');
            setLoading(false);
            return;
        } else {
            setPasswordError('');
        }

        const newUser = {
            name,
            email, // Include email in the user object
            password,
            role
        };

        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });

            if (res.ok) {
                setName('');
                setEmail(''); // Reset email field
                setPassword('');
                setRole('user');
                setSignedin(true);
                navigate('/login');
            } else {
                const errorMessage = await res.text();
                setError(`Error during signup: ${res.status} ${errorMessage}`);
            }
        } catch (error) {
            setError(`Network error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <form onSubmit={handleSubmit} className="form-container">
                    <h2 id='text'>
                        {signedin ? 'Access Granted' : 'Register'}
                    </h2>

                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full Name"
                        className="input-field"
                        required
                    />

                    <input
                        className="input-field"
                        id="email"
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={validateEmail}
                        required
                    />
                    {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}

                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="input-field"
                        required
                    />

                    <select
                        id="role"
                        value={role}
                        onChange={handleRoleChange}
                        className="input-field"
                        required
                    >
                        <option value="user">Individual User (Student)</option>
                        <option value="employee">Equipment Provider (Lab/Admin)</option>
                    </select>


                    <p>
                        Already registered? <Link to="/login">Sign In</Link>
                    </p>

                    {passwordError && (
                        <p className="error-message-compact">
                            {passwordError}
                        </p>
                    )}

                    {error && (
                        <p className="error-message-compact">
                            {error}
                        </p>
                    )}

                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? 'Processing...' : 'Create Account'}
                    </button>
                </form>

                <div className="video-container">
                    <div className="video-text-overlay">
                        <h1>Hello, Friend!</h1>
                        <p>Enter your personal details and start journey with us</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
