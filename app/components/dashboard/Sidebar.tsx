'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { FaHome, FaUser, FaCog, FaBars } from 'react-icons/fa';
import { useState } from 'react';

const navItems = [
  { name: 'Home', href: '/dashboard', icon: FaHome },
  { name: 'Profile', href: '/dashboard/profile', icon: FaUser },
  { name: 'Settings', href: '/dashboard/settings', icon: FaCog },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      {/* Mobile Hamburger Icon */}
      <div className="lg:hidden p-4 bg-slate-100 text-black">
        <button
          onClick={toggleSidebar}
          className="text-xl focus:outline-none "
          aria-label="Toggle Sidebar"
        >
          <FaBars />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 w-64 bg-slate-200 text-black transform transition-transform lg:static lg:translate-x-0',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="p-4 text-lg font-bold">My Dashboard</div>
        <nav className="flex-1 space-y-2 p-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center p-2 rounded hover:bg-gray-700',
                pathname === item.href ? 'bg-gray-700' : ''
              )}
            >
              <item.icon className="mr-3" />
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Overlay when sidebar is open on mobile */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
        ></div>
      )}
    </>
  );
}
