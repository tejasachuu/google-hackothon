"use client"; 
import { useState, useEffect } from 'react';
import axios from 'axios';

const ChatRoom: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [chat, setChat] = useState<{ user: string; message: string }[]>([]);
  const [code, setCode] = useState<string>(''); // State for access code
  const [accessCode, setAccessCode] = useState<string>(''); // State for access code input
  const [isAdmin, setIsAdmin] = useState<boolean>(false); // State to check if the user is an admin

  useEffect(() => {
    async function fetchChat() {
      const res = await axios.get('/api/chatroom', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setChat(res.data.chatMessages);
      setIsAdmin(res.data.isAdmin); // Assuming you have an isAdmin flag in your response
    }
    fetchChat();
  }, []);

  const handleSendMessage = async () => {
    if (message.trim()) {
      const res = await axios.post(
        '/api/chatroom',
        { message },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setChat(res.data.chatMessages);
      setMessage('');
    }
  };

  const handleGenerateCode = async () => {
    const res = await axios.post('/api/chatroom/code', {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    setCode(res.data.code);
  };

  const handleJoinChatRoom = () => {
    // Logic to handle joining the chat room with the access code
    // Implement whatever logic you need here, such as checking if the code is valid
    console.log(`Joining chat room with code: ${accessCode}`);
  };

  return (
    <div className="h-screen bg-gradient-to-r from-green-400 to-green-600 p-6">
      <h2 className="text-3xl font-bold text-white mb-6">Chat Room</h2>

      {isAdmin && ( // Show code generation button only if user is admin
        <div className="mb-4">
          <button onClick={handleGenerateCode} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Generate Access Code
          </button>
          {code && <p className="mt-2 text-white">Access Code: {code}</p>}
        </div>
      )}

      <div className="bg-white h-2/3 overflow-y-scroll p-4 rounded-lg shadow-lg">
        {chat.map((msg, index) => (
          <div key={index} className="mb-2">
            <strong>{msg.user}</strong>: {msg.message}
          </div>
        ))}
      </div>
      <div className="mt-4 flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow p-3 border rounded-lg"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-2 hover:bg-blue-600"
        >
          Send
        </button>
      </div>

      <div className="mt-4 flex">
        <input
          type="text"
          value={accessCode}
          onChange={(e) => setAccessCode(e.target.value)}
          placeholder="Enter Access Code"
          className="flex-grow p-3 border rounded-lg"
        />
        <button
          onClick={handleJoinChatRoom}
          className="bg-green-500 text-white px-4 py-2 rounded-lg ml-2 hover:bg-green-600"
        >
          Join Chat Room
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
