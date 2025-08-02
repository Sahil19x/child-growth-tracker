import { useState, useEffect } from 'react';

interface ChildFormProps {
  onAddChild: (child: { name: string; age: number; id?: number }) => void;
  initialChild?: { id: number; name: string; age: number };
}

const ChildForm: React.FC<ChildFormProps> = ({ onAddChild, initialChild }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);

  useEffect(() => {
    if (initialChild) {
      setName(initialChild.name);
      setAge(initialChild.age);
    }
  }, [initialChild]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddChild({ id: initialChild?.id, name, age });
    setName('');
    setAge(0);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Age</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded w-full font-medium">
        {initialChild ? 'Update' : 'Add'} Child
      </button>
    </form>
  );
};

export default ChildForm;
