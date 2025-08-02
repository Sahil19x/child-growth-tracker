import { ChangeEvent, useState } from 'react';
import { Child } from '../types/Child';

interface UploadDownloadProps {
  onUpload: (data: Child[]) => void;
  onDownload: () => void;
  data: Child[];  // Pass current data for download
}

const UploadDownload: React.FC<UploadDownloadProps> = ({ onUpload, onDownload, data }) => {
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return setError('No file selected.');

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target?.result as string);
        if (Array.isArray(parsed) && parsed.every((item): item is Child => 
          typeof item.name === 'string' && 
          typeof item.age === 'number' && 
          typeof item.parentage === 'string' && 
          (typeof item.dob === 'string' || item.dob instanceof Date) && 
          typeof item.gender === 'string'
        )) {
          onUpload(parsed);
          setError(null);
        } else {
          setError('Invalid data structure in file.');
        }
      } catch (err) {
        setError('Failed to parse file - ensure it\'s valid JSON.');
      }
    };
    reader.readAsText(file);
  };

  const triggerDownload = () => {
    onDownload();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'children-data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-6 space-y-4 max-w-md w-full bg-white p-4 rounded-lg shadow">
      <label className="block text-sm font-medium mb-2">Upload JSON File</label>
      <input type="file" accept=".json" onChange={handleFileChange} className="w-full p-2 border rounded" />
      {error && <p className="text-red-600 mt-2">{error}</p>}
      <button onClick={triggerDownload} className="w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded mt-4">
        Download Current Data
      </button>
    </div>
  );
};

export default UploadDownload;
