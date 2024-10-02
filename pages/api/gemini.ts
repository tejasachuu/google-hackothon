import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { query } = req.body;

    try {
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.status(500).json({ message: "API key is missing" });
      }

      // Fetch request to Gemini API
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { text: query }
                ]
              }
            ],
            generationConfig: {
              maxOutputTokens: 10000, // Increase this value to generate longer content
              temperature: 0.7,     // Optional: control the randomness of the response
              topP: 1.0             // Optional: can influence how creative the responses are
            }
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error('Gemini API Error:', data);
        return res.status(500).json({ message: 'Failed to fetch from Gemini API', error: data });
      }

      // Extract the answer from the response
      const answer = data.candidates[0].content.parts
        .map((part: { text: string }) => part.text) // Specify the type
        .join(' ');

      // Clean up the answer (remove unwanted formatting)
      const cleanAnswer = answer.replace(/\*\*|\*/g, '').trim(); // Remove asterisks
      // Send the full AI response back to the frontend
      res.status(200).json({ result: cleanAnswer });
    } catch (error) {
      console.error('Error fetching from Gemini API:', error);
      res.status(500).json({ message: 'Error fetching response from Gemini API' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
