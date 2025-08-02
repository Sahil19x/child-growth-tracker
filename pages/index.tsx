import { useState } from 'react';
import ChildForm from '../components/ChildForm';  // Import the missing component (adjust path if needed)

interface Child {
  id: number;
  name: string;
  age: number;
}

export default function Home() {
  const [children, setChildren] = useState<Child[]>([]);
  const [editingChild, setEditingChild] = useState<Child | null>(null);

  const handleAddChild = (newChild: Child) => {
    setChildren([...children, { ...newChild, id: children.length + 1 }]);
  };

  const handleUpdate = (updatedChild: Child) => {
    setChildren(children.map(child => child.id === updatedChild.id ? updatedChild : child));
    setEditingChild(null);
  };

  const startEditing = (child: Child) => {
    setEditingChild(child);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6">Child Management</h1>
        
        {/* List of children */}
        <ul className="mb-6">
          {children.map(child => (
            <li key={child.id} className="flex justify-between items-center mb-2">
              {child.name} (Age: {child.age})
              <button onClick={() => startEditing(child)} className="ml-4 bg-blue-500 hover:bg-blue-600 text-white p-1 rounded">
                Edit
              </button>
            </li>
          ))}
        </ul>
        
        {/* Add new child form */}
        <h2 className="text-xl font-bold mb-4">Add Child</h2>
        <ChildForm onAddChild={handleAddChild} />
        
        {/* Edit child form (conditional) */}
        {editingChild && (
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Update Child</h2>
            <ChildForm onAddChild={handleUpdate} initialChild={editingChild} />
            <button onClick={() => setEditingChild(null)} className="mt-4 bg-gray-500 hover:bg-gray-600 text-white p-2 rounded w-full font-medium">
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
