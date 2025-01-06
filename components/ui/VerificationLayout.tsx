'use client';

import React from 'react';

interface FormLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const VerifyLayout: React.FC<FormLayoutProps> = ({ title, description, children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#EEEFF8]">
      
      <div className="w-full max-w-md bg-[#EEEFF8] border border-[#3D6FAB] rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4">{title}</h1>
        <p className="text-sm text-gray-600 text-center mb-6">{description}</p>
        {children}
      </div>
    </div>
  );
};

export default VerifyLayout;
