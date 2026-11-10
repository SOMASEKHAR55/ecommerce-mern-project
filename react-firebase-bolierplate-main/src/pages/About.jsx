import React from 'react';
import './About.css';

const AboutPage = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1 className="about-heading">👋 Welcome to <span>Akhil’s Trendszz</span></h1>
        <p className="about-text">
          A youth-driven fashion brand that blends bold streetwear with cultural roots. Designed for confidence, comfort, and self-expression.
        </p>

        <div className="about-highlights">
          <div className="highlight-card">
            <img src="https://cdn-icons-png.flaticon.com/512/892/892458.png" alt="Quality" />
            <h3>Premium Quality</h3>
            <p>We ensure that every product is made with attention to quality, comfort, and durability.</p>
          </div>

          <div className="highlight-card">
            <img src="https://cdn-icons-png.flaticon.com/512/1256/1256650.png" alt="Trendy" />
            <h3>Trendy Styles</h3>
            <p>Stay ahead with our frequently updated collections that reflect the latest fashion trends.</p>
          </div>

          <div className="highlight-card">
            <img src="https://cdn-icons-png.flaticon.com/512/1029/1029183.png" alt="Global" />
            <h3>Global Reach</h3>
            <p>Serving happy customers all over the world with fast and secure delivery.</p>
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default AboutPage;
