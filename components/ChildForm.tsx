// File: components/ChildForm.tsx
import React, { useState } from 'react';

interface ChildFormProps {
  onAddChild: (child: { name: string; parentage: string; dob: string; gender: 'boy' | 'girl' }) => void;
}

const ChildForm: React.FC<ChildFormProps> = ({ onAddChild }) => {
  const [name, setName] = useState('');
  const [parentage, setParentage] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState<'boy' | 'girl'>('boy');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddChild({ name, parentage, dob, gender });
    setName('');
    setParentage('');
    setDob('');
    setGender('boy');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Parentage</label>
        <input
          type="text"
          value={parentage}
          onChange={(e) => setParentage(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Date of Birth</label>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Gender</label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value as 'boy' | 'girl')}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="boy">Boy</option>
          <option value="girl">Girl</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
        Add Child
      </button>
    </form>
  );
};

export default ChildForm;
