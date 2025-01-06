'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import { FaBell } from 'react-icons/fa';

export default function TopNav() {

  const [user, setUser] = useState<{ name: string; photoUrl: string } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/user/me");
        setUser(response.data.user);
      } catch (err) {
        console.error("Failed to fetch user data.");
      }
    };

    fetchUser();
  }, []);

  // if (!user) {
  //   return <p>Loading...</p>;
  // }

  return (
    <header className="bg-slate-100 shadow flex items-center justify-between px-4 h-16">
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
