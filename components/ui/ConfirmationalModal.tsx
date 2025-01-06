import React from 'react';

interface ConfirmationModalProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ message, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-11/12 max-w-md text-center">
        {/* Icon */}
        <div className="mb-4 flex justify-center">
          <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4M7 12a5 5 0 1110 0 5 5 0 01-10 0z"
              />
            </svg>
          </div>
        </div>

        {/* Message */}
        <h2 className="text-lg font-semibold text-gray-800">{message}</h2>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
