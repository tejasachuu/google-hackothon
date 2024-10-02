// pages/api/chatroom/code.ts
import { NextApiRequest, NextApiResponse } from 'next';

const generateCode = () => {
  // Generate a random 6-character alphanumeric code
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // You might want to add authentication here to ensure only the admin can generate a code
    const code = generateCode();
    return res.status(200).json({ code });
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
