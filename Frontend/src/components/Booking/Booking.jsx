import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Booking.css';
import { useSelector } from 'react-redux';

const Booking = () => {
    const { username } = useSelector((state) => state.auth);
    const location = useLocation();
    const navigate = useNavigate();
    const { tour } = location.state || {};

    if (!tour) {
        return <div>No equipment data available</div>;
    }

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [errors, setErrors] = useState({});
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [apiError, setApiError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    React.useEffect(() => {
        if (startDate && adults) {
            const start = new Date(startDate);
            const end = new Date(start);
            end.setDate(start.getDate() + adults);
            setEndDate(end.toISOString().split('T')[0]);
        }
    }, [startDate, adults]);

    const today = new Date().toISOString().split('T')[0];

    const validateFields = () => {
        let formErrors = {};
        const phoneRegex = /^\d{10}$/;

        if (name.trim() === '') {
            formErrors.name = 'Name is required';
        }

        if (!phoneRegex.test(phone)) {
            formErrors.phone = 'Phone number must be exactly 10 digits';
        }

        if (startDate === '') {
            formErrors.startDate = 'Start date is required';
        } else if (new Date(startDate) < new Date(today)) {
            formErrors.startDate = 'Start date cannot be in the past';
        }

        if (adults <= 0) {
            formErrors.adults = 'Duration must be at least 1 day';
        }

        return formErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateFields();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setApiError('');
        setIsSubmitting(true);

        const bookingData = {
            username,
            tourId: tour._id,
            name,
            phone,
            startDate,
            endDate,
            adults,
            children,
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/book`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(bookingData),
            });

            let data;
            try {
                data = await response.json();
            } catch {
                data = { message: 'Server returned an invalid response.' };
            }

            if (response.ok) {
                setBookingSuccess(true);
                setName('');
                setPhone('');
                setStartDate('');
                setEndDate('');
                setAdults(1);
                setChildren(0);
                setErrors({});
                setApiError('');
            } else {
                setApiError(data.message || 'Booking failed. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            setApiError('Network error. Please check your connection and try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="booking-container">
            <div className="tour-details">
                <div className="tour-info">
                    <h2>{tour.title}</h2>
                    <img
                        src={tour.image} 
                        alt={tour.title}
                        className="tour-image"
                    />
                    <div className="info-grid">
                        <p><i className="ri-map-pin-line"></i> <strong>Campus/Lab:</strong> {tour.city}</p>
                        {tour.creator?.name && (
                            <>
                                <p><i className="ri-user-line"></i> <strong>Seller:</strong> {tour.creator.name}</p>
                                {tour.creator?.email && (
                                    <p><i className="ri-mail-line"></i> <strong>Contact:</strong> <a href={`mailto:${tour.creator.email}`}>{tour.creator.email}</a></p>
                                )}
                            </>
                        )}
                        <p><i className="ri-checkbox-circle-line"></i> <strong>Status:</strong> Available for Rent</p>
                        <p className="rental-fee"><i className="ri-money-rupee-circle-line"></i> <strong>Rental Fee:</strong> ₹{tour.price} per day</p>
                    </div>
                    
                    <div className="description-section">
                        <h3>About this Asset</h3>
                        <p>{tour.desc}</p>
                    </div>

                    <div className="reviews">
                        <h3>Member Reviews</h3>
                        {tour.reviews && tour.reviews.length > 0 ? (
                            <div className="reviews-list">
                                {tour.reviews.map((review, index) => (
                                    <div key={index} className="review-item">
                                        <i className="ri-double-quotes-l"></i> {review}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="no-reviews">No reviews yet for this equipment.</p>
                        )}
                    </div>
                </div>
            </div>
            <div className="booking-form">
                <h2>Request Equipment</h2>
                {bookingSuccess ? (
                    <div className="success-message">
                        <p>Rental request submitted successfully!</p>
                        <p className="success-hint">Your booking will appear under "Upcoming Orders" in your profile.</p>
                        <button
                            type="button"
                            className="view-rentals-btn"
                            onClick={() => navigate('/profile')}
                        >
                            View my rentals
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        {apiError && <div className="api-error">{apiError}</div>}
                        <label>
                            Name:
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            {errors.name && <span className="error">{errors.name}</span>}
                        </label>
                        <label>
                            Phone:
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                            {errors.phone && <span className="error">{errors.phone}</span>}
                        </label>
                        <label>
                            Start Date:
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                min={today}
                                required
                            />
                            {errors.startDate && <span className="error">{errors.startDate}</span>}
                        </label>
                        <label>
                            Rental Duration (Days):
                            <input
                                type="number"
                                value={adults || ''}
                                onChange={(e) => setAdults(e.target.value === '' ? '' : parseInt(e.target.value))}
                                min="1"
                                required
                            />
                        </label>


                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : 'Rent Now'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Booking;
