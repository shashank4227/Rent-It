import React from "react";
import { useNavigate } from "react-router-dom";
import { Parallax } from "react-parallax";
import "./Home.css";
import videoSrc from '../../assets/images/video2.mp4';
import backgroundImage from '../../assets/images/gallery/equipment_parallax_bg.png';
import { SearchBar } from "../../components/SearchBar/SearchBar";
import FeaturedTourList from "../../components/Featured-tours/FeaturedTourList";
import MasonryImagesGallery from "../../components/imagegallery/MansonryImagesGallery";

const Home = () => {
  const navigate = useNavigate(); // Initialize navigate

  const handleNavigateHome = () => {
    
    window.scrollTo({
        top: 0,
        behavior: 'smooth', 
    });
};


  return (
    <>
      <div className="container">
        <div className="video-section">
          <video className="background-video" autoPlay loop muted>
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="video-overlay">
            <h1>Rent It</h1></div>
        </div>

        <SearchBar />

        {/* Why Choose Us Section */}
        <div className="why-choose-us-section">
          <h2 className="why-choose-us-heading">Why Choose Us?</h2>
          <div className="why-choose-us-container">
            <div className="why-choose-us-box">
              <i className="fas fa-award"></i>
              <h3>20+ Year Experience</h3>
              <p>
                Accessing specialized equipment for academics and projects shouldn't be a financial burden. We bridge the gap.
              </p>
            </div>

            <div className="why-choose-us-box">
              <i className="fas fa-users"></i>
              <h3>A Team of Experts</h3>
              <p>
                Our platform is built by students, for students. We understand the specific needs of hackathons and research.
              </p>
            </div>

            <div className="why-choose-us-box">
              <i className="fas fa-rupee-sign"></i>
              <h3>Value for Money Rentals</h3>
              <p>
                Only pay for the time you use. Our rates are designed to be student-friendly and transparent.
              </p>
            </div>
          </div>
        </div>



        <Parallax
          strength={500}
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed',
          }}
        >
          <section className="parallax">
            <div className="parallax-content">
              <div className="parallax-text">
                <p>Access high-cost gadgets for your next project</p>
                <button className="explore-button" onClick={handleNavigateHome}>Rent Now</button>
              </div>
              <h1>High-End Gear at Your Fingertips</h1>
            </div>
          </section>
        </Parallax>

        <FeaturedTourList />
       
      <h3 className="section_subtitle"> GALLERY</h3>
                  <p className="gallery_title">
                    Explore what specialized equipment students are using
                    </p>

        <MasonryImagesGallery />
      </div>
    </>
  );
};

export default Home;
