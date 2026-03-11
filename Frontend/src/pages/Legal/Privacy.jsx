import React from 'react';
import './Legal.css';

const Privacy = () => {
  return (
    <div className="legal-container">
      <h1>Privacy Policy</h1>
      <p className="legal-subtitle">Your data security is our priority.</p>
      <div className="legal-content">
        <section>
          <h3>Data Collection</h3>
          <p>We collect minimal data necessary for equipment verification and rental tracking. Your academic records remain private.</p>
        </section>
      </div>
    </div>
  );
};

export default Privacy;
