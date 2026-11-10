import React, { useState } from 'react';
import { auth, provider } from '../firebase';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Signup successful!');
      navigate('/home');
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        alert('This email is already registered. Please log in.');
      } else {
        alert(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
      navigate('/home');
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-box">
        <h2>Create an account</h2>
        <form onSubmit={handleSignup}>
          <label>Email address</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="off"
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="off"
          />

          <button type="submit" className="continue-button" disabled={loading}>
            {loading ? 'Signing up...' : 'Continue'}
          </button>
        </form>

        <p className="login-link">
          Already have an account? <Link to="/login">LOGIN</Link>
        </p>

        <div className="divider"><span>OR</span></div>

        <button className="google-btn" onClick={handleGoogleSignup} disabled={loading}>
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
          />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Signup;
