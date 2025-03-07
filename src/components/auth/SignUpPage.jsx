import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebaseConfig';
import AuthAside from './Asidepage'; // Import AuthAside
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './AuthPages.css';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  
  const navigate = useNavigate(); // Initialize the navigate function

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      console.log('User signed up:', user.email);
      alert("Signup success");

      await setDoc(doc(db, "users", user.uid), {
        name: formData.name,
        email: formData.email,
        role: 'user'
      });

      console.log('User data saved in Firestore.');
    } catch (err) {
      setError('Sign up failed. Please try again later.');
      alert("Signup failed");
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <AuthAside /> {/* Use AuthAside here */}

        <div className="auth-form-container">
          <div className="tabs">
            <div
              className="tab" onClick={handleLoginRedirect}
            >
              Login
            </div>
            <div
              className="tab active"
            >
              Sign Up
            </div>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <h2>Create account</h2>
            <p className="form-subtitle">Please fill out the form to get started</p>

            {error && <p className="error-message">{error}</p>}

            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

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

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>

            <button type="submit" className="submit-btn">Create Account</button>

            <div className="separator">
              <span>OR</span>
            </div>

            <button type="button" className="social-btn google-btn">
              Continue with Google
            </button>

            <p className="toggle-form-prompt">
              Already have an account? 
              <button 
                type="button" 
                className="toggle-form-btn"
                onClick={handleLoginRedirect} // Call handleLoginRedirect when clicked
              >
                Login
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
