import React from 'react';

export default function ProcessingOverlay({ message, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
      <div className="flex flex-col items-center gap-6 p-6 bg-base-100 rounded-xl shadow-xl animate-fade-in">
        <div
          className="w-10 h-10 border-4 border-base-300 border-t-primary rounded-full animate-spin"
          role="status"
          aria-label="Processing"
        />
        <p className="text-base text-center text-base-content max-w-xs">
          {message}
        </p>
        <button
          onClick={onCancel}
          className="btn btn-error btn-sm"
        >
          ❌ Cancel
        </button>
      </div>
    </div>
  );
}
