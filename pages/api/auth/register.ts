import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';  // for password hashing
import jwt from 'jsonwebtoken'; // for creating a token
import connectToDatabase from '../../../lib/mongodb'; // ensure you have a working MongoDB connection file

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  const { username, email, password } = req.body;

  // Simple validation
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }

  try {
    const { db } = await connectToDatabase();  // connect to your MongoDB

    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = {
      username,
      email,
      password: hashedPassword,
      profileType: 'solo',
      createdAt: new Date(),
    };

    await db.collection('users').insertOne(newUser);

    // Create JWT
    const token = jwt.sign({ email }, process.env.JWT_SECRET || 'mysecret', { expiresIn: '1h' });

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'An error occurred. Please try again later.' });
  }
}
