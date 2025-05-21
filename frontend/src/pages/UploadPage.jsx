import React, { useState, useCallback } from 'react';
import FileUploader from '../components/FileUploader';
import ProgressSpinner from '../components/ProgressSpinner';
import DownloadLinks from '../components/DownloadLinks';
import JSONPreviewModal from '../components/JSONPreviewModal';
import { uploadFiles } from '../services/api';

export default function UploadPage() {
  const [files, setFiles]       = useState([]);
  const [loading, setLoading]   = useState(false);
  const [endpoints, setEndpoints] = useState(null);
  const [preview, setPreview]   = useState(null);

  const handleProcess = async () => {
    setLoading(true);
    setEndpoints(null);
    try {
      const { data } = await uploadFiles(files);
      setEndpoints(data);
    } catch (e) {
      alert('Error: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const showPreview = useCallback(async (endpoint) => {
    const res = await fetch(`http://localhost:4000${endpoint}`);
    const text = await res.text();
    setPreview(text.split('\n').slice(0, 10).join('\n'));
  }, []);

  return (
    <div className="card max-w-lg w-full">
      <h2 className="text-2xl font-semibold text-center mb-4">
        Upload & Generate
      </h2>

      <FileUploader files={files} setFiles={setFiles} />

      <button
        className="btn btn-primary w-full mt-4 flex items-center justify-center"
        disabled={!files.length || loading}
        onClick={handleProcess}
      >
        {loading ? <ProgressSpinner /> : 'Process Files'}
      </button>

      {endpoints && (
        <div className="mt-6 space-y-4">
          <DownloadLinks endpoints={endpoints} />

          <button
            className="btn btn-accent w-full"
            onClick={() => showPreview(endpoints.smart)}
          >
            Preview Smart JSONL
          </button>
          <button
            className="btn btn-accent w-full"
            onClick={() => showPreview(endpoints.finetune)}
          >
            Preview Finetune JSONL
          </button>
        </div>
      )}

      {preview && (
        <JSONPreviewModal text={preview} onClose={() => setPreview(null)} />
      )}
    </div>
  );
}
