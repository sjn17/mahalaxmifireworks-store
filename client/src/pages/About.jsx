import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about">
      {/* About Hero */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-content">
            <h1>About Mahalaxmi Fireworks</h1>
            <p>Your trusted partner for safe and spectacular celebrations</p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="company-story">
        <div className="container">
          <div className="story-grid">
            <div className="story-content">
              <h2>Our Story</h2>
              <p>Founded with a passion for bringing joy to celebrations, Mahalaxmi Fireworks has been serving our community for over a decade.</p>
              <p>We believe that every celebration deserves to be special, and our carefully curated selection of fireworks ensures that your moments are truly memorable.</p>
            </div>
            <div className="story-image">
              <div className="image-placeholder">
                <p>Company Image</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision">
        <div className="container">
          <div className="mission-grid">
            <div className="mission-card">
              <h3>Our Mission</h3>
              <p>To provide safe, high-quality fireworks that create unforgettable moments of joy and celebration for families and communities.</p>
            </div>
            <div className="mission-card">
              <h3>Our Vision</h3>
              <p>To be the most trusted name in fireworks, known for safety, quality, and the magic we bring to every celebration.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
