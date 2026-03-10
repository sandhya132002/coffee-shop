import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await axios.post('http://127.0.0.1:5000/login', 
        { email, password }, 
        { headers: { 'Content-Type': 'application/json' } }  // Fix CORS issue
      );

      if (response.data.success) {
        alert('Login Successful!');
        navigate('/'); // Redirect to home page
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Login Error:', error.response?.data || error.message);
      alert('Error logging in. Please try again.');
    }
  };

 


  return (
    <div className="login-page font-poppins">
  <div className="card shadow p-4">
    <h2 className="text-center mb-4 font-bold ">Login</h2>
    <form onSubmit={handleLogin}>
      <div className="mb-4">
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="Enter your password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="btn-submit">Log In</button>
    </form>

    <div className="text-center mt-3">
      <a href="/forgot-password" className="text-[#fabf41]">Forgot Password?</a>
    </div>
    <p className="text-center mt-3 text-[#fabf41]">
      Don't have an account? <a href="/signup" className="text-[#fabf41]">Sign Up</a>
    </p>
  </div>
</div>
  )
}

export default Login