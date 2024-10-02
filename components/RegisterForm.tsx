"use client"; 
import { useState } from 'react';

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState<string>(''); 
  const [password, setPassword] = useState<string>(''); 
  const [username, setUsername] = useState<string>(''); 
  const [errorMessage, setErrorMessage] = useState<string>(''); // State for error messages

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Input validation - check if fields are empty
    if (!username || !email || !password) {
      setErrorMessage('Please enter a username, email, and password.');
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
        window.location.href = '/login';
      } else {
        // Show error message based on response
        setErrorMessage(data.message || 'Failed to register. Please try again.');
      }
    } catch (error) {
      // Catch network or other errors
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-green-400 to-green-600">
      <h2 className="text-3xl font-bold text-white mb-6">Register</h2>
      <form onSubmit={handleRegister} className="w-full max-w-sm p-6 bg-white rounded-lg shadow-xl">
        {errorMessage && ( // Display error message if exists
          <p className="text-red-500 mb-4">{errorMessage}</p>
        )}
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
