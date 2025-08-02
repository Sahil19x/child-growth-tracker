import React, { useState, useEffect } from 'react';

interface ChildFormProps {
  onAddChild: (child: { name: string; parentage: string; dob: string; gender: 'boy' | 'girl' }) => void;
  initialChild?: { name: string; parentage: string; dob: string; gender: 'boy' | 'girl' };
}

const ChildForm: React.FC<ChildFormProps> = ({ onAddChild, initialChild }) => {
  const [name, setName] = useState(initialChild?.name || '');
  const [parentage, setParentage] = useState(initialChild?.parentage || '');
  const [dob, setDob] = useState(initialChild?.dob || '');
  const [gender, setGender] = useState<'boy' | 'girl'>(initialChild?.gender || 'boy');

  useEffect(() => {
    if (initialChild) {
      setName(initialChild.name);
      setParentage(initialChild.parentage);
      setDob(initialChild.dob);
      setGender(initialChild.gender);
    }
  }, [initialChild]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddChild({ name, parentage, dob, gender });
    if (!initialChild) { // Reset only for add, not update
      setName('');
      setParentage('');
      setDob('');
      setGender('boy');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 sm:p-6 rounded-lg shadow-md max-w-md mx-auto border border-blue-200">
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Parentage</label>
        <input
          type="text"
          value={parentage}
          onChange={(e) => setParentage(e.target.value)}
          className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Date of Birth</label>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Gender</label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value as 'boy' | 'girl')}
          className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="boy">Boy</option>
          <option value="girl">Girl</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded w-full font-medium">
        {initialChild ? 'Update Child' : 'Add Child'}
      </button>
    </form>
  );
};

export default ChildForm;
