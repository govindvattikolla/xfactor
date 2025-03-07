import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebaseConfig'; // import firebase auth and firestore
import './AuthPages.css';

const AuthPages = () => {
  const [isLoginActive, setIsLoginActive] = useState(true); // If true, show login; if false, show signup
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoginActive) {
      // Login Logic
      try {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        console.log('User logged in:', formData.email);
      } catch (err) {
        setError('Login failed. Please check your credentials.');
      }
    } else {
      // Sign-up Logic
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords don't match!");
        return;
      }

      try {
        // Create user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;
        console.log('User signed up:', user.email);

        // Save additional info (e.g., name and role) in Firestore
        await setDoc(doc(db, "users", user.uid), {
          name: formData.name,
          email: formData.email,
          role: 'user', // Default role, can be updated to 'admin' later if needed
        });

        console.log('User data saved in Firestore.');
      } catch (err) {
        setError('Sign up failed. Please try again later.');
      }
    }
  };

  const toggleForm = () => {
    setIsLoginActive(!isLoginActive);
    setError(''); // Reset error message when toggling forms
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-side">
          <div className="auth-side-content">
            <h2>XFACTOR</h2>
            <p>Accelerate your career with our expert-led courses</p>
            <div className="auth-features">
              <div className="feature">
                <div className="feature-icon">🚀</div>
                <div className="feature-text">
                  <h3>Expert Courses</h3>
                  <p>Learn from industry professionals</p>
                </div>
              </div>
              <div className="feature">
                <div className="feature-icon">💻</div>
                <div className="feature-text">
                  <h3>Flexible Learning</h3>
                  <p>Study at your own pace, anywhere</p>
                </div>
              </div>
              <div className="feature">
                <div className="feature-icon">🏆</div>
                <div className="feature-text">
                  <h3>Career Success</h3>
                  <p>92% of students report career advancement</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="auth-form-container">
          <div className="tabs">
            <div 
              className={`tab ${isLoginActive ? 'active' : ''}`} 
              onClick={() => setIsLoginActive(true)}
            >
              Login
            </div>
            <div 
              className={`tab ${!isLoginActive ? 'active' : ''}`} 
              onClick={() => setIsLoginActive(false)}
            >
              Sign Up
            </div>
          </div>
          
          <form className="auth-form" onSubmit={handleSubmit}>
            <h2>{isLoginActive ? 'Welcome back' : 'Create account'}</h2>
            <p className="form-subtitle">
              {isLoginActive ? 'Please enter your details to sign in' : 'Please fill out the form to get started'}
            </p>

            {/* Show error message if any */}
            {error && <p className="error-message">{error}</p>}

            {/* Name input (Only visible during signup) */}
            {!isLoginActive && (
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required={!isLoginActive} // Required only during signup
                />
              </div>
            )}

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
            
            {!isLoginActive && (
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required={!isLoginActive}
                />
              </div>
            )}

            <button type="submit" className="submit-btn">
              {isLoginActive ? 'Login' : 'Create Account'}
            </button>
            
            <div className="separator">
              <span>OR</span>
            </div>

            <button type="button" className="social-btn google-btn">
              Continue with Google
            </button>
          </form>
          
          <p className="toggle-form-prompt">
            {isLoginActive ? "Don't have an account? " : "Already have an account? "}
            <button type="button" className="toggle-form-btn" onClick={toggleForm}>
              {isLoginActive ? 'Sign up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPages;
