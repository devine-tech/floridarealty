"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '../login/auth.module.css';

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me');
        const data = await response.json();
        
        if (data.success) {
          router.push('/dashboard');
        }
      } catch (error) {
        console.error('Auth check error:', error);
      }
    };
    
    checkAuth();
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      });
      
      const data = await response.json();
      
      if (!data.success) {
        setError(data.error || 'Registration failed');
        return;
      }
      
      // Redirect to dashboard on successful registration
      router.push('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h1>Register</h1>
        
        {error && <div className={styles.error}>{error}</div>}
        
        <form onSubmit={handleSubmit} className={styles.authForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              minLength={6}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm your password"
              minLength={6}
            />
          </div>
          
          <div className={styles.roleSelect}>
            <label>Register as:</label>
            <div className={styles.roleOptions}>
              <label className={styles.roleOption}>
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={formData.role === 'user'}
                  onChange={handleChange}
                />
                User (Home Buyer/Renter)
              </label>
              
              <label className={styles.roleOption}>
                <input
                  type="radio"
                  name="role"
                  value="realtor"
                  checked={formData.role === 'realtor'}
                  onChange={handleChange}
                />
                Realtor
              </label>
            </div>
          </div>
          
          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        
        <div className={styles.authLinks}>
          <p>
            Already have an account?{' '}
            <Link href="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
