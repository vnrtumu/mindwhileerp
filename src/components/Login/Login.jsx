import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // In a real app, validation and auth would happen here
        navigate('/dashboard');
    };

    return (
        <div className="login-container">
            <div className="login-left">
                <div className="news-feed">
                    <h3>What's New on MindWhile !!!</h3>

                    <div className="news-card">
                        <div className="news-content">
                            <h4>Summer Vacation Holiday Homework</h4>
                            <p>The school will remain closed from April 20th to June...</p>
                        </div>
                        <div className="news-arrow">»</div>
                    </div>

                    <div className="news-card">
                        <div className="news-content">
                            <h4>New Academic Session Admission Start(2024-25)</h4>
                            <p>An academic term is a portion of an academic year, the time ....</p>
                        </div>
                        <div className="news-arrow">»</div>
                    </div>

                    <div className="news-card">
                        <div className="news-content">
                            <h4>Date sheet Final Exam Nursery to Sr.Kg</h4>
                            <p>Dear Parents, As the final examination for the session 2024-25 is ...</p>
                        </div>
                        <div className="news-arrow">»</div>
                    </div>

                    <div className="news-card">
                        <div className="news-content">
                            <h4>Annual Day Function</h4>
                            <p>Annual functions provide a platform for students to showcase their...</p>
                        </div>
                        <div className="news-arrow">»</div>
                    </div>

                    <div className="news-card">
                        <div className="news-content">
                            <h4>Summer Vacation Holiday Homework</h4>
                            <p>The school will remain closed from April 20th to June 15th for summer...</p>
                        </div>
                        <div className="news-arrow">»</div>
                    </div>

                </div>
            </div>

            <div className="login-right">
                <div className="login-box">
                    <div className="logo-container">
                        <div className="logo-icon"></div>
                        <h1>MindWhile</h1>
                    </div>

                    <h2>Welcome</h2>
                    <p className="subtitle">Please enter your details to sign in</p>

                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <label>Email Address</label>
                            <div className="input-wrapper">
                                <input type="email" placeholder="Enter your email" />
                                <span className="icon-mail">✉️</span>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <div className="input-wrapper">
                                <input type="password" placeholder="Enter your password" />
                                <span className="icon-eye">👁️</span>
                            </div>
                        </div>

                        <div className="form-footer">
                            <label className="checkbox-container">
                                <input type="checkbox" />
                                <span className="checkmark"></span>
                                Remember Me
                            </label>
                            <a href="#" className="forgot-password">Forgot Password?</a>
                        </div>

                        <button type="submit" className="login-btn">Sign In</button>

                        <button
                            type="button"
                            className="login-btn"
                            style={{ marginTop: '10px', backgroundColor: '#4a4a4a' }}
                            onClick={() => navigate('/super/dashboard')}
                        >
                            Super Admin Dashboard
                        </button>

                        <div className="register-link">
                            Don't have an account? <a href="#">Create Account</a>
                        </div>
                    </form>

                    <div className="copyright">
                        Copyright © 2024 - MindWhile
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
