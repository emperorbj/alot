'use client';

import React from 'react';

interface UploadLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const UploadLayout: React.FC<UploadLayoutProps> = ({ title, description, children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className=" w-[700px] bg-white shadow-md rounded-lg p-4">
        <h1 className="text-2xl font-bold text-center mb-4">{title}</h1>
        <p className="text-sm text-gray-600 text-center mb-6">{description}</p>
        {children}
      </div>
    </div>
  );
};

export default UploadLayout;
