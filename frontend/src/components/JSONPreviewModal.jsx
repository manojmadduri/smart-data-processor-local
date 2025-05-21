import React from 'react';

export default function JSONPreviewModal({ text, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
      <div className="bg-white dark:bg-darkCard rounded-2xl shadow-xl max-w-2xl w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
        <h2 className="text-lg font-semibold mb-2">Preview (first 10 lines)</h2>
        <pre className="overflow-auto max-h-64 bg-gray-100 dark:bg-slate-800 p-4 rounded">
          {text}
        </pre>
      </div>
    </div>
  );
}
