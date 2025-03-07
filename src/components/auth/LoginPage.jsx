import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import AuthAside from './Asidepage'; // Import AuthAside
import { useNavigate } from 'react-router-dom'; 
import './AuthPages.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize the navigate function

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      console.log('User logged in:', formData.email);
      alert("Login success");
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleSigninRedirect = () => {
    navigate('/signup'); // Redirect to the signup page when clicked
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <AuthAside /> {/* Use AuthAside here */}

        <div className="auth-form-container">
          <div className="tabs">
            <div className="tab active">
              Login
            </div>
            <div
              className="tab"
              onClick={handleSigninRedirect} // Redirect to signup page when clicked
            >
              Sign Up
            </div>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <h2>Welcome back</h2>
            <p className="form-subtitle">Please enter your details to sign in</p>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="submit-btn">Login</button>

            <div className="separator">
              <span>OR</span>
            </div>

            <button type="button" className="social-btn google-btn">
              Continue with Google
            </button>

            <p className="toggle-form-prompt">
              Don't have an account? 
              <button 
                type="button" 
                className="toggle-form-btn"
                onClick={handleSigninRedirect} // Call handleSigninRedirect when clicked
              >
                Sign up
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
