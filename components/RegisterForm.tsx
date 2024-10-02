"use client";

import { useState } from 'react';

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Input validation - check if fields are empty
    if (!username || !email || !password) {
      alert('Please enter a username, email, and password.');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, profileType: 'solo' }),
      });

      const data = await res.json();
      if (res.ok) {
        alert('User registered successfully');
        window.location.href = '/login'; // Redirect to login page
      } else {
        alert(data.message || 'Failed to register. Please try again.');
      }
    } catch (error) {
      alert('An error occurred. Please try again later.');
      console.error('Registration error:', error); // Log error for debugging
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-green-400 to-green-600">
      <h2 className="text-3xl font-bold text-white mb-6">Register</h2>
      <form onSubmit={handleRegister} className="w-full max-w-sm p-6 bg-white rounded-lg shadow-xl">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
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
        <button className="bg-gradient-to-r from-yellow-400 to-yellow-600 w-full py-3 text-white rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;