
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} Akhil's Trendszz</p>
        <p>All rights reserved · Designed with 💖 and beauty</p>
        <p>Follow us: Instagram @trendszz.akhil · YouTube: Akhil Edits</p>
      </div>
    </footer>
  );
};

export default Footer;
