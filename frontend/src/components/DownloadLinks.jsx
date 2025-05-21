import React from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid';

export default function DownloadLinks({ endpoints }) {
  const handleDownload = async (endpoint, filename) => {
    try {
      const url = `http://localhost:4000${endpoint}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const blob = await res.blob();

      const dlUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = dlUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(dlUrl);
    } catch (err) {
      alert('Download failed: ' + err.message);
    }
  };

  const btnClasses =
    'btn btn-primary flex items-center gap-2 justify-center w-full sm:w-auto';

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-6">
      <button
        className={btnClasses}
        onClick={() => handleDownload(endpoints.smart, 'memories.jsonl')}
      >
        <ArrowDownTrayIcon className="w-5 h-5" />
        Download Smart JSONL
      </button>
      <button
        className={btnClasses}
        onClick={() => handleDownload(endpoints.finetune, 'finetune_data.jsonl')}
      >
        <ArrowDownTrayIcon className="w-5 h-5" />
        Download Fine-tune JSONL
      </button>
    </div>
  );
}
