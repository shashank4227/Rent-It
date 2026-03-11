import React from 'react';
import './Footer.css';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section brand">
          <h2 className="footer-logo">Rent It</h2>
          <p className='theme'>
            Access over Ownership, Innovation through Sharing!
          </p>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer"><i className="ri-facebook-fill"></i></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer"><i className="ri-twitter-fill"></i></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer"><i className="ri-instagram-line"></i></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer"><i className="ri-linkedin-fill"></i></a>
          </div>
        </div>

        <div className="footer-section links-wrapper">
          <div className="links-column">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/adminLogin">Admin Login</a></li>
            </ul>
          </div>

          <div className="links-column">
            <h4>Support</h4>
            <ul>
              <li><a href="/help">Help Center</a></li>
              <li><a href="/terms">Terms of Service</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
            </ul>
          </div>

          <div className="links-column contact">
            <h4>Contact Info</h4>
            <p><i className="ri-map-pin-2-line"></i> 321-1, Mumbai, India</p>
            <p><i className="ri-phone-line"></i> +91 8639464273</p>
            <p><i className="ri-mail-line"></i> support@rentit.com</p>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Rent It. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
