// lib/jwt.ts

import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

interface DecodedToken {
  userId: string; // Define the structure of the decoded token payload
  iat: number;    // Issued at timestamp
  exp: number;    // Expiration timestamp
}

export const signToken = (userId: string) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token: string): DecodedToken => {
  return jwt.verify(token, JWT_SECRET) as DecodedToken; // Cast the token payload to DecodedToken
};
