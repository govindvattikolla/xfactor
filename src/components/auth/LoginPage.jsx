import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
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
      // Sign in the user with email and password
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      console.log('User logged in:', formData.email);

      // Fetch the user data from Firestore to check their role
      const userDocRef = doc(db, "users", userCredential.user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userRole = userDoc.data().role;
        
        // Navigate based on user role
        if (userRole === 'admin') {
          navigate('/admin'); // Admin dashboard route
        } else if (userRole === 'user') {
          navigate('/user'); // User dashboard route
        } else {
          setError('User role not found.');
          alert('User role not found.');
        }
      } else {
        setError('User data not found.');
        alert('User data not found.');
      }
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleSignupRedirect = () => {
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
              onClick={handleSignupRedirect} // Redirect to signup page when clicked
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

            <p className="toggle-form-prompt">
              Don't have an account? 
            </p>
            <button type="button" className="social-btn google-btn" onClick={handleSignupRedirect}>
              Create one
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
