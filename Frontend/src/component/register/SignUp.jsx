import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import axios from 'axios';

function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !password || !confirmPassword) {
            alert("All fields are required!");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:5000/auth/register',
                { name, email, password },
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (response.data.success) {
                alert("Registration successful!");
                navigate('/');
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Registration Error:", error.response?.data || error.message);
            alert("Error signing up. Please try again.");
        }
    };

    return (
        <div className="signup-page">
            <div className="signup-container">
                <h2>Sign Up</h2>
                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter your email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter your password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Confirm your password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <div className="btn-container">
                        <button type="submit" className="btn-submit">Sign Up</button>
                    </div>
                </form>
                <p className="text-center mt-3">
                    Already have an account? <a href="/login" className="signup-link">Log In</a>
                </p>
            </div>
        </div>
    );
}

export default SignUp;
