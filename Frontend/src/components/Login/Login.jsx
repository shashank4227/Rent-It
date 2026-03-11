import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, setCart } from "../../features/auth/authSlice"; 
import "./Login.css";
import hello from "../../assets/images/hero-video.mp4";

export const Login = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const credentials = { name, password };

        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
                credentials: "include", // Include credentials for the session
            });

            if (res.ok) {
                const data = await res.json();
                setName("");
                setPassword("");

                // Dispatch login action with the user data
                dispatch(login({ role: data.role, username: name }));

                // Dispatch the cart data if available
                if (data.cart && Array.isArray(data.cart)) {
                    dispatch(setCart(data.cart)); 
                }

                setError("");
                navigate("/"); // Redirect to home page
            } else if (res.status === 401) {
                setError("Invalid credentials. Please try again.");
            } else {
                const errorMessage = await res.text();
                setError(`Login failed: ${errorMessage}`);
            }
        } catch (error) {
            console.error("Error during login:", error);
            setError("An error occurred during login. Please try again.");
        }
    };

    const { isAuthenticated, role } = useSelector((state) => state.auth);

    return (
        <div className="login-container">
            <div className="login-box">
                <form onSubmit={handleSubmit} className="form-container">
                    <h2 id="text">Sign In</h2>

                    {error && <p className="text-red-500">{error}</p>}

                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Username"
                        required
                    />

                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />

                    <p>
                        Don't have an account? <Link to="/register">Create one</Link>
                    </p>

                    <button type="submit" className="submit-btn">SIGN IN</button>
                </form>

                <div className="video-container">
                    <div className="video-text-overlay">
                        <h1>Welcome Back!</h1>
                        <p>To keep connected with us please login with your personal info</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
