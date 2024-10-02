import dbConnect from '../../lib/mongodb'; // MongoDB connection utility
import { verifyToken } from '../../lib/jwt'; // JWT verification utility
import { NextApiRequest, NextApiResponse } from 'next';

// In-memory store for chat messages
const chatMessages: { user: string; message: string }[] = []; 

// Type for the decoded JWT payload
interface DecodedToken {
  userId: string; // Adjust based on your token structure
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect(); // Ensure database is connected

  if (req.method === 'GET') {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
      verifyToken(token); // No need to assign since it's not used
      res.status(200).json({ chatMessages }); // Return the chat messages
    } catch (error) {
      console.error('Token verification failed:', error); // Log the error for debugging
      res.status(401).json({ message: 'Invalid token' });
    }
  } else if (req.method === 'POST') {
    const { message } = req.body;

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
      const { userId: username } = verifyToken(token) as DecodedToken; // Extract username directly
      chatMessages.push({ user: username, message }); // Store the new message
      res.status(200).json({ chatMessages }); // Return the updated chat messages
    } catch (error) {
      console.error('Token verification failed:', error); // Log the error for debugging
      res.status(401).json({ message: 'Invalid token' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']); // Allow only GET and POST methods
    res.status(405).end(`Method ${req.method} Not Allowed`); // Return method not allowed
  }
}
