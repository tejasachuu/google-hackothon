/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, // Enable React's Strict Mode
    env: {
      MONGODB_URI: process.env.MONGODB_URI,
      JWT_SECRET: process.env.JWT_SECRET,
      GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    },
  };
  
  export default nextConfig;
  