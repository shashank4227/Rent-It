import React from 'react';
import './Legal.css';

const Help = () => {
  return (
    <div className="legal-container">
      <h1>Help Center</h1>
      <p className="legal-subtitle">Find answers to common questions about Rent It.</p>
      
      <div className="legal-content">
        <section>
          <h3>How do I rent equipment?</h3>
          <p>Browse our catalog, select the gear you need, and click "Rent Now". You'll be guided through the booking process where you can select dates and lab locations.</p>
        </section>
        
        <section>
          <h3>What are the rental requirements?</h3>
          <p>You must be a verified student or faculty member. Some high-end equipment may require a brief orientation or safety verification before use.</p>
        </section>
        
        <section>
          <h3>How do I return equipment?</h3>
          <p>Equipment should be returned to the designated lab or campus location by the end of your rental period. Please ensure all accessories are included.</p>
        </section>

        <section>
          <h3>Need further assistance?</h3>
          <p>Contact our support team at <a href="mailto:support@rentit.com">support@rentit.com</a> or visit the Contact Us page.</p>
        </section>
      </div>
    </div>
  );
};

export default Help;
