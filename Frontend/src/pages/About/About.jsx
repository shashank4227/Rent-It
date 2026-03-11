import React from 'react';
import './About.css';

export const About = () => {
  


  return (
    <>
      <div className="about-container">
      {/* Company Section */}
      <section className="company-section">
      <img
          src="https://images.pexels.com/photos/1051075/pexels-photo-1051075.jpeg?auto=compress&cs=tinysrgb&w=600"// Replace with your actual image URL
          alt="Logo"
          className="company-image"
        />
        <div className="story-text">
        <h2>Company</h2>
        <p>
        "Rent It" is a technology-driven platform dedicated to providing students with temporary access to high-cost equipment. We solve the problem of affordability and availability for academic projects, hackathons, and research.
        Our platform connects equipment owners with students who need specialized tools for short-term use, fostering a community of shared resources and "access over ownership."
        </p>
        </div>
      </section>

      <hr className="divider" />

      {/* Our Story Section */}
      <section className="story-section">
        <img
          src="https://images.pexels.com/photos/3183186/pexels-photo-3183186.jpeg?auto=compress&cs=tinysrgb&w=600"// Replace with your actual image URL
          alt="Our story"
          className="story-image"
        />
        <div className="story-text">
          <h2>Our Story</h2>
          <p>
          Our journey began with a simple observation: students often need expensive gadgets for short-term projects but can't afford to buy them. 
          We built "Rent It" to make high-end technology accessible to everyone, ensuring that financial constraints never stand in the way of innovation.
          </p>
        </div>
      </section>

      <hr className="divider" />
      {/* Company Section */}
      <section className="company-section">
      <img
          src="https://images.pexels.com/photos/6229/marketing-board-strategy.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" // Replace with your actual image URL
          alt="Stratergy"
          className="company-image"
        />
        <div className="story-text">
        <h2>Our strategy</h2>
        <p>
      At Rent It, we’re passionate about maximizing utility and minimizing waste.
        Whether you’re preparing for a hackathon or a semester-long research project, our platform helps you find the specific tools you need at your campus or lab. 
        We prioritize verification and trust, ensuring every rental is safe and professional. 
        From DSLR cameras to 3D printers and development kits, we guide you through the process of accessing top-tier gear. 
        Innovate faster, spend less—Rent It has you covered.
        </p>
        </div>
      </section>
    </div>
    </>
  );
};

export default About;
