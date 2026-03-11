import React from "react";
import "./Services.css";

const Services = () => {
  const services = [
    {
      title: "Equipment Rental",
      description: "Access high-cost DSLRs, 3D printers, and development kits for your projects.",
      icon: "ri-tools-line",
    },
    {
      title: "Lab Access",
      description: "Book time in specialized campus laboratories and research facilities.",
      icon: "ri-microscope-line",
    },
    {
      title: "Student Support",
      description: "24/7 technical assistance for using rented equipment and project guidance.",
      icon: "ri-customer-service-2-line",
    },
    {
      title: "Peer Sharing",
      description: "List your own unused equipment and help fellow students while earning.",
      icon: "ri-share-line",
    },
  ];

  return (
    <div className="services-container">
      <h1>Industrial Services</h1>
      <p className="services-subtitle">High-end equipment and facilities for specialized innovation.</p>
      
      <div className="services-content">
        <div className="services-sidebar">
          <div className="sidebar-card">
            <h2>Our Vision</h2>
            <p>Empowering student innovation through a high-performance ecosystem of shared technical assets.</p>
            <p>We provide verified, maintained, and state-of-the-art equipment to accelerate your research and development.</p>
          </div>
          <div className="sidebar-card">
            <h2>24/7 Support</h2>
            <p>Our technical team is always available to assist with equipment setup and troubleshooting.</p>
          </div>
        </div>

        <div className="services-list">
          {services.map((service, index) => (
            <div className="service-card" key={index}>
              <div className="service-icon">
                <i className={service.icon}></i>
              </div>
              <div className="service-details">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
