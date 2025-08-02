import { useState, useEffect } from 'react';
import { Child } from '../types/Child';  // Import shared type

interface ChildFormProps {
  onAddChild: (child: Child) => void;
  initialChild?: Child;
}

const ChildForm: React.FC<ChildFormProps> = ({ onAddChild, initialChild }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [parentage, setParentage] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');

  useEffect(() => {
    if (initialChild) {
      setName(initialChild.name);
      setAge(initialChild.age);
      setParentage(initialChild.parentage);
      setDob(initialChild.dob instanceof Date ? initialChild.dob.toISOString().split('T')[0] : initialChild.dob);
      setGender(initialChild.gender);
    }
  }, [initialChild]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddChild({ id: initialChild?.id, name, age, parentage, dob, gender });
    if (!initialChild) {
      setName('');
      setAge(0);
      setParentage('');
      setDob('');
      setGender('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md w-full">
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border border-gray-300 rounded" required />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Age</label>
        <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} className="w-full p-2 border border-gray-300 rounded" required />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Parentage</label>
        <input type="text" value={parentage} onChange={(e) => setParentage(e.target.value)} className="w-full p-2 border border-gray-300 rounded" required />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Date of Birth</label>
        <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="w-full p-2 border border-gray-300 rounded" required />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Gender</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full p-2 border border-gray-300 rounded" required>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="non-binary">Non-binary</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded w-full font-medium">
        {initialChild ? 'Update' : 'Add'} Child
      </button>
    </form>
  );
};

export default ChildForm;
