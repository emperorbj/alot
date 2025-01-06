'use client';

import { ReactNode } from 'react';
import Sidebar from '../dashboard/Sidebar';
import TopNav from '../dashboard/TopNav';

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <TopNav />
        <main className="flex-1 p-4 overflow-auto bg-slate-100 flex gap-3 lg:flex-row flex-col">{children}</main>
      </div>
    </div>
  );
}
