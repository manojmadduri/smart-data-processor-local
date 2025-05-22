import React from 'react';

export default function FullscreenSpinner({ message = 'Processing...' }) {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div
          className="w-10 h-10 border-[4px] border-base-300 border-t-primary rounded-full animate-[spin_1s_linear_infinite]"
          role="status"
          aria-label="Loading"
        />
        <p className="text-base text-base-content font-medium">{message}</p>
      </div>
    </div>
  );
}
