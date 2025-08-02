import { useState } from 'react';
import ChildForm from '../components/ChildForm';
import UploadDownload from '../components/UploadDownload';
import { Child } from '../types/Child';
import Link from 'next/link';

export default function Manage() {
  const [children, setChildren] = useState<Child[]>([]);

  const addChild = (newChild: Child) => {
    const id = newChild.id ?? Date.now();
    setChildren([...children, { ...newChild, id }]);
  };

  const handleUpload = (uploadedData: Child[]) => {
    setChildren(prev => [...prev, ...uploadedData]);  // Append instead of replace for flexibility
  };

  const handleDownload = (data: Child[]) => {  // Pass data for download
    console.log('Downloading:', data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-4 sm:p-6 md:p-8 flex flex-col items-center">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-blue-800">Manage Children</h1>
      <ChildForm onAddChild={addChild} />
      <UploadDownload onUpload={handleUpload} onDownload={() => handleDownload(children)} data={children} />
      <Link href="/" className="mt-8 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded font-medium">
        Back to View Children
      </Link>
    </div>
  );
}
