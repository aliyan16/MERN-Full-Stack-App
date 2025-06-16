import React from 'react';
import { FaFacebook, FaHome, FaVideo, FaUserFriends, FaBell, FaUserCircle } from 'react-icons/fa';

export default function Header() {
  return (
    <header className="flex items-center justify-between p-2 bg-white shadow-md sticky top-0 z-50">
      <div className="flex items-center space-x-2">
        <FaFacebook className="text-blue-600 text-3xl" />
        <input type="text" placeholder="Search Facebook" className="p-2 rounded-full bg-gray-200" />
      </div>
      <div className='flex space-x-12 text-2xl justify-between'>
        <FaHome className="cursor-pointer" />
        <FaVideo className="cursor-pointer" />
        <FaUserFriends className="cursor-pointer" />

      </div>
      <div className="flex space-x-8 text-2xl">
        <FaBell className="cursor-pointer" />
        <FaUserCircle className="cursor-pointer" />
      </div>
    </header>
  );
}
