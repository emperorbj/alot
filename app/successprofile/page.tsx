'use client'
import { useState } from 'react';
import ConfirmationModal from '../../components/ui/ConfirmationalModal';

export default function SignupSuccess() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ConfirmationModal
        message="Profile Picture Updated!"
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
