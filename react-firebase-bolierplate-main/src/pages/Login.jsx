import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';



const ADMIN_EMAIL = "admin@gmail.com"; // <-- Replace with your actual admin email

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e, isAdmin = false) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log("Logged in user email:", user.email); // Debug email

      // Check if this is admin login
      if (isAdmin && user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
        alert("Admin login successful!");
        navigate("/addproduct");
      } else if (isAdmin) {
        alert("Access denied. You are not the admin.");
        setLoading(false);
        return;
      } else {
        alert("Login successful!");
        navigate("/home");
      }

    } catch (err) {
      let message = 'Login failed. Please try again.';
      if (err.code === 'auth/user-not-found') {
        message = 'No user found with this email.';
      } else if (err.code === 'auth/wrong-password') {
        message = 'Incorrect password.';
      } else if (err.code === 'auth/invalid-email') {
        message = 'Invalid email format.';
      }
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="input1">
      <form>
        <h3>LOG IN</h3>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input 
            id="email"
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Enter your Email" 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            id="password"
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Enter your Password" 
            required 
          />
        </div>

        <div className="form-group">
          <label>
            <input type="checkbox" /> Remember me
          </label>
        </div>

        {/* Normal User Login */}
        <button 
          onClick={(e) => handleLogin(e, false)} 
          disabled={loading}
          type="button"
        >
          {loading ? "Logging in..." : "Login as User"}
        </button>

        {/* Admin Login */}
        <button 
          onClick={(e) => handleLogin(e, true)} 
          disabled={loading}
          type="button"
        >
          {loading ? "Checking..." : "Login as Admin"}
        </button>

        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>

        <p className="terms">
          By logging in, you agree to our <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>.
        </p>
      </form>
    </div>
  );
};

export default Login;
