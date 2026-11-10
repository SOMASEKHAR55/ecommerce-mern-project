import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const MainLayout = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const goToCartPage = () => {
    navigate('/cart', { state: { cart } });
  };

  return (
    <>
      <Navbar cartCount={cart.length} onCartClick={goToCartPage} />
      <Outlet context={{ cart, setCart }} />
      <Footer />
    </>
  );
};

export default MainLayout;
