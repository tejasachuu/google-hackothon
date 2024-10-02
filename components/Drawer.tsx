// components/Drawer.tsx

"use client"; 
import styles from './Drawer.module.css'; 
import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import Link from 'next/link';
// Import custom CSS module

const Drawer: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={`absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-pink-700 text-white p-3 rounded-full ${styles.drawerButton}`}
      >
        <FaBars />
      </button>
      {open && (
        <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-xl z-50">
          <ul className="mt-6 space-y-4">
            <li className={`p-4 cursor-pointer ${styles.linkHover}`}>
              <Link href="/">Home</Link>
            </li>
            <li className={`p-4 cursor-pointer ${styles.linkHover}`}>
              <Link href="/login">Login</Link>
            </li>
            <li className={`p-4 cursor-pointer ${styles.linkHover}`}>
              <Link href="/register">Register</Link>
            </li>
            <li className={`p-4 cursor-pointer ${styles.linkHover}`}>
              <Link href="/chatroom">Chat Room</Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Drawer;
