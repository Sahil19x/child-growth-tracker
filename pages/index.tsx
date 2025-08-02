import React, { useState, useEffect } from 'react';
import ChildCard from '../components/ChildCard';
import Link from 'next/link';

interface Child {
  name: string;
  parentage: string;
  dob: string;
  gender: 'boy' | 'girl';
}

const Home: React.FC = () => {
  const [children, setChildren] = useState<Child[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingChild, setEditingChild] = useState<Child | null>(null);

  useEffect(() => {
    const storedChildren = localStorage.getItem('children');
    if (storedChildren) {
      setChildren(JSON.parse(storedChildren));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('children', JSON.stringify(children));
  }, [children]);

  const handleNext = () => {
    if (currentIndex < children.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const foundIndex = children.findIndex(child => child.name.toLowerCase().includes(query));
    if (foundIndex !== -1) {
      setCurrentIndex(foundIndex);
    }
  };

  const handleDelete = (index: number) => {
    const updatedChildren = children.filter((_, i) => i !== index);
    setChildren(updatedChildren);
    if (currentIndex >= updatedChildren.length) {
      setCurrentIndex(Math.max(0, updatedChildren.length - 1));
    }
  };

  const handleUpdate = (updatedChild: Child) => {
    const updatedChildren = children.map((child, i) =>
      i === currentIndex ? updatedChild : child
    );
    setChildren(updatedChildren);
    setEditingChild(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-4 sm:p-6 md:p-8 flex flex-col items-center">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-blue-800">Child Growth Tracker</h1>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchQuery}
        onChange={handleSearch}
        className="w-full max-w-md p-2 mb-6 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {children.length === 0 ? (
        <p className="text-gray-600 text-center">No children added yet. <Link href="/manage" className="text-blue-600 hover:underline">Go to Manage</Link> to add one.</p>
      ) : (
        <div className="w-full max-w-lg">
          <ChildCard
            child={children[currentIndex]}
            onDelete={() => handleDelete(currentIndex)}
            onEdit={() => setEditingChild(children[currentIndex])}
          />
          <div className="flex justify-between mt-4">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded font-medium disabled:opacity-50"
            >
              Previous
            </button>
            <span className="self-center text-gray-600">
              {currentIndex + 1} of {children.length}
            </span>
            <button
              onClick={handleNext}
              disabled={currentIndex === children.length - 1}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded font-medium disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
      <Link href="/manage" className="mt-8 bg-green-600 hover:bg-green-700 text-white p-2 rounded font-medium">
        Manage Children (Add/Upload/Download)
      </Link>

      {editingChild && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Update Child</h2>
            <ChildForm onAddChild={handleUpdate} initialChild={editingChild} />
            <button onClick={() => setEditingChild(null)} className="mt-4 bg-gray-500 hover:bg-gray-600 text-white p-2 rounded w-full font-medium">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
