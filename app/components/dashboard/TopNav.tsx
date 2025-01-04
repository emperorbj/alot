'use client';

import { FaBell } from 'react-icons/fa';

export default function TopNav() {
  return (
    <header className="bg-white shadow flex items-center justify-between px-4 h-16">
      <h1 className="text-lg font-semibold">Dashboard</h1>
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
          <FaBell />
        </button>
        <div className="w-8 h-8 rounded-full bg-gray-300" />
      </div>
    </header>
  );
}
