// File: pages/index.tsx
import React, { useState, useEffect } from 'react';
import ChildForm from '../components/ChildForm';
import ChildCard from '../components/ChildCard';
import UploadDownload from '../components/UploadDownload';

interface Child {
  name: string;
  parentage: string;
  dob: string;
  gender: 'boy' | 'girl';
}

const Home: React.FC = () => {
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
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Child Growth Tracker</h1>
      <ChildForm onAddChild={addChild} />
      <UploadDownload onUpload={handleUpload} onDownload={handleDownload} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {children.map((child, index) => (
          <ChildCard key={index} child={child} />
        ))}
      </div>
    </div>
  );
};

export default Home;
