import React from 'react';

export default function FileUploader({ files, setFiles }) {
  const onChange = e => setFiles(Array.from(e.target.files));

  return (
    <label className="
      block 
      border-2 border-dashed border-gray-300 
      rounded-lg 
      p-6 
      text-center 
      cursor-pointer 
      hover:border-primary 
      transition-colors duration-200
    ">
      <input
        type="file"
        multiple
        accept=".txt"
        className="hidden"
        onChange={onChange}
      />
      <p className="text-gray-500">
        {files.length
          ? files.map(f => f.name).join(', ')
          : 'Click or drag files here to upload'}
      </p>
    </label>
  );
}
