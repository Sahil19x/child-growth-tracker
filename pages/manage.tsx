import React, { useState, useEffect } from 'react';
import ChildForm from '../components/ChildForm';
import UploadDownload from '../components/UploadDownload';
import Link from 'next/link';

interface Child {
  name: string;
  parentage: string;
  dob: string;
  gender: 'boy' | 'girl';
}

const Manage: React.FC = () => {
  const [children, setChildren] = useState<Child[]>([]);

  useEffect(() => {
    const storedChildren = localStorage.getItem('children');
    if (storedChildren) {
      setChildren(JSON.parse(storedChildren));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('children', JSON.stringify(children));
  }, [children]);

  const addChild = (child: Child) => {
    setChildren([...children, child]);
  };

  const handleDownload = () => {
    const dataStr = JSON.stringify(children);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = 'children.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setChildren(JSON.parse(text));
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-4 sm:p-6 md:p-8 flex flex-col items-center">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-blue-800">Manage Children</h1>
      <ChildForm onAddChild={addChild} />
      <UploadDownload onUpload={handleUpload} onDownload={handleDownload} />
      <Link href="/" className="mt-8 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded font-medium">
        Back to View Children
      </Link>
    </div>
  );
};

export default Manage;
