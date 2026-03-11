import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! We will get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p className="contact-subtitle">Have questions? We're here to help.</p>
      
      <div className="contact-content">
        <div className="contact-info">
          <div className="info-item">
            <i className="ri-map-pin-line"></i>
            <div>
              <h3>Our Location</h3>
              <p>321-1, Mumbai, India</p>
            </div>
          </div>
          <div className="info-item">
            <i className="ri-mail-line"></i>
            <div>
              <h3>Email Us</h3>
              <p>support@rentit.com</p>
            </div>
          </div>
          <div className="info-item">
            <i className="ri-phone-line"></i>
            <div>
              <h3>Call Us</h3>
              <p>+91 8639464273</p>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Subject</label>
            <input type="text" name="subject" value={formData.subject} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea name="message" value={formData.message} onChange={handleChange} rows="5" required></textarea>
          </div>
          <button type="submit" className="contact-btn">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
