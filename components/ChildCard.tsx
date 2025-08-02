import React from 'react';
import { calculateAgeInMonths, interpolateValue } from '../utils/utils';
import whoData from '../data/whoData';

interface Child {
  name: string;
  parentage: string;
  dob: string;
  gender: 'boy' | 'girl';
}

interface ChildCardProps {
  child: Child;
  onDelete: () => void;
  onEdit: () => void;
}

const ChildCard: React.FC<ChildCardProps> = ({ child, onDelete, onEdit }) => {
  const currentDate = new Date();
  const ageInMonths = calculateAgeInMonths(new Date(child.dob), currentDate);

  const genderData = whoData[child.gender];

  const estimatedHeight = interpolateValue(ageInMonths, genderData.height);
  const estimatedWeight = interpolateValue(ageInMonths, genderData.weight);

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border-l-4 border-blue-500">
      <h2 className="text-xl sm:text-2xl font-bold text-blue-800">{child.name}</h2>
      <p className="text-gray-600">Parentage: <span className="font-medium">{child.parentage}</span></p>
      <p className="text-gray-600">DOB: <span className="font-medium">{child.dob}</span></p>
      <p className="text-gray-600">Current Date: <span className="font-medium">{currentDate.toDateString()}</span></p>
      <p className="text-gray-600">Age: <span className="font-bold text-green-600">{ageInMonths} months</span></p>
      <p className="text-gray-600">Estimated Height: <span className="font-bold text-green-600">{estimatedHeight.toFixed(2)} cm</span></p>
      <p className="text-gray-600">Estimated Weight: <span className="font-bold text-green-600">{estimatedWeight.toFixed(2)} kg</span></p>
      <div className="flex justify-between mt-4">
        <button onClick={onEdit} className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded font-medium">
          Update
        </button>
        <button onClick={onDelete} className="bg-red-500 hover:bg-red-600 text-white p-2 rounded font-medium">
          Delete
        </button>
      </div>
    </div>
  );
};

export default ChildCard;
