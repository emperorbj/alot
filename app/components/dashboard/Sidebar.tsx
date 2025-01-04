'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { FaHome, FaUser, FaCog } from 'react-icons/fa';

const navItems = [
  { name: 'Home', href: '/dashboard', icon: FaHome },
  { name: 'Profile', href: '/dashboard/profile', icon: FaUser },
  { name: 'Settings', href: '/dashboard/settings', icon: FaCog },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col">
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
  );
}
