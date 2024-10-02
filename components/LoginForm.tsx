"use client";

import { useState } from 'react';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false); // State for loading

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Input validation - check if fields are empty
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    setIsLoading(true); // Set loading state
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        window.location.href = '/'; // Redirect on successful login
      } else {
        alert(data.message || 'Invalid credentials. If you don\'t have an account, please sign up.');
      }
    } catch (error) {
      alert('An error occurred. Please try again later.');
      console.error('Login error:', error); // Log error for debugging
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-blue-600">
      <h2 className="text-4xl font-bold text-white mb-6">Login</h2>
      <form onSubmit={handleLogin} className="w-full max-w-sm p-6 bg-white rounded-lg shadow-xl">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button disabled={isLoading} className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition">
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p className="mt-4 text-white">
        Dont have an account? <a href="/register" className="underline">Sign up here</a>
      </p>
    </div>
  );
};

export default LoginForm;
