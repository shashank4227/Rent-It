import React from 'react';
import './Legal.css';

const Terms = () => {
  return (
    <div className="legal-container">
      <h1>Terms of Service</h1>
      <p className="legal-subtitle">Please read these terms carefully before using our platform.</p>
      <div className="legal-content">
        <section>
          <h3>1. Acceptance of Terms</h3>
          <p>By accessing Rent It, you agree to comply with all safety protocols and lab regulations regarding the equipment rented.</p>
        </section>
        <section>
          <h3>2. Proper Use</h3>
          <p>Equipment must be used only for intended academic or research purposes. Any damage caused by negligence may result in fines or suspension of access.</p>
        </section>
      </div>
    </div>
  );
};

export default Terms;
