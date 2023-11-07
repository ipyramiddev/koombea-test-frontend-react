import React, { useState } from 'react';
import './Login.css'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();

      try {
        const response = await fetch('http://localhost:3001/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
    
        if (response.ok) {
          const data = await response.json();
          // Store the received JWT token in local storage or a secure cookie
          localStorage.setItem('accessToken', data.token);
          // Redirect the user to a protected route, e.g., the profile page
          window.location.href = '/'
        } else {
          // Handle unsuccessful login (e.g., display error message)
        }
      } catch (error) {
        // Handle any network or server errors
      }
      
    };
  
    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                />
            </div>
            <button type="submit">Login</button>
            </form>
        </div>
    );
  };
  
  export default Login;