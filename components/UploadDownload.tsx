// File: components/UploadDownload.tsx
import React from 'react';

interface UploadDownloadProps {
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDownload: () => void;
}

const UploadDownload: React.FC<UploadDownloadProps> = ({ onUpload, onDownload }) => {
  return (
    <div className="flex justify-center space-x-4 my-4">
      <button onClick={onDownload} className="bg-green-500 text-white p-2 rounded">
        Download Data as JSON
      </button>
      <input type="file" accept=".json" onChange={onUpload} className="hidden" id="upload" />
      <label htmlFor="upload" className="bg-blue-500 text-white p-2 rounded cursor-pointer">
        Upload JSON
      </label>
    </div>
  );
};

export default UploadDownload;
