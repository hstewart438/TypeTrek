import React from "react";

const ConfirmModal = ({ message, onConfirm, onCancel }) => {
  return (
  <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
    <div className="bg-white p-6 rounded-lg shadow-lg w-80">
      <p className="text-gray-800">{message}</p>
      <div className="mt-6 flex justify-end gap-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Yes, Delete
        </button>
      </div>
    </div>
  </div>

  );
};

export default ConfirmModal;
