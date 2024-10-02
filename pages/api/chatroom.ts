// pages/api/chatroom.ts

import dbConnect from '../../lib/mongodb';
import { verifyToken } from '../../lib/jwt';
import { NextApiRequest, NextApiResponse } from 'next';

let chatMessages: { user: string; message: string }[] = []; // In-memory store for chat messages

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'GET') {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
      const decoded = verifyToken(token); // Get the decoded token
      res.status(200).json({ chatMessages }); // Return the chat messages
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  } else if (req.method === 'POST') {
    const { message } = req.body;

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
      const decoded = verifyToken(token); // Get the decoded token
      const username = decoded.userId; // Access the userId safely

      chatMessages.push({ user: username, message }); // Store the new message
      res.status(200).json({ chatMessages }); // Return the updated chat messages
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
