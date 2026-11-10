import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import './Navbar.css';

const Navbar = ({ cartCount = 0, onCartClick }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        alert('Logged out successfully!');
        navigate('/login');
      })
      .catch((error) => {
        alert('Error logging out: ' + error.message);
      });
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">🛍️Akhil's Trendszz</div>
      <div className="navbar-links">
        <p>Welcome Soma Sekhar Veerla</p>
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
        <button className="cart-btn" onClick={onCartClick}>
          Cart ({cartCount})
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
