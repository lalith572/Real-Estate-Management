import React, { useState } from 'react';
import * as userService from '../api/userService';
import '../style.css'; 
import Footer from './Footer';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await userService.requestPasswordReset(email);
      setMessage(response.message);
      setMessage("Reset link has been sent to your registered mail");
    } catch (error) {
      setMessage('Sorry!!! your email not found in the database, please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <br /><br />
        <h1 className="form-title">Forgot Password</h1><br />
        <h2 className="form-subtitle">Reset your password</h2>

        <div className="input-group">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="form-input"
          />
        </div>

        <button type="submit" disabled={isLoading} className="form-button">
          {isLoading ? 'Processing...' : 'Submit'}
        </button>

        {message && <p className="message">{message}</p>}
      </form><br /><br />
      <Footer/>
    </div>
  );
};

export default ForgotPassword;
