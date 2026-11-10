import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

import Welcome from './pages/Welcome';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Cart from './pages/Cart';
import About from './pages/About';
import Contact from './pages/Contact';
import AddProduct from './pages/AddProduct'; // Import this!
import MainLayout from './components/MainLayout';



const ProtectedRoute = ({ user, children }) => {
  const location = useLocation();
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

const AdminRoute = ({ user, children }) => {
  const location = useLocation();
  if (!user || user.email !== 'admin@example.com') {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Welcome />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route element={<MainLayout />}>
        <Route
          path="/home"
          element={
            <ProtectedRoute user={user}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute user={user}>
              <About />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <ProtectedRoute user={user}>
              <Contact />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute user={user}>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-product"
          element={
            <AdminRoute user={user}>
              <AddProduct />
            </AdminRoute>
          }
        />
      </Route>

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/signup" />} />
    </Routes>
  );
};

export default App;
