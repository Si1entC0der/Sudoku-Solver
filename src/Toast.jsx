import { useState } from "react";

const Toast = ({ message, show, onClose }) => {
  return (
    show && (
      <div
        className="fixed inset-0 flex items-center justify-center z-50"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} // Optional background overlay for better visibility
      >
        <div className="p-4 bg-red-500 text-white rounded-md shadow-lg flex items-center space-x-4">
          <span>{message}</span>
          <button
            className="text-white font-bold px-2 py-1 bg-red-700 rounded-md"
            onClick={onClose}
          >
            X
          </button>
        </div>
      </div>
    )
  );
};

export default Toast;
