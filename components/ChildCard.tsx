// File: components/ChildCard.tsx
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
}

const ChildCard: React.FC<ChildCardProps> = ({ child }) => {
  const currentDate = new Date();
  const ageInMonths = calculateAgeInMonths(new Date(child.dob), currentDate);

  const genderData = whoData[child.gender];

  const estimatedHeight = interpolateValue(ageInMonths, genderData.height);
  const estimatedWeight = interpolateValue(ageInMonths, genderData.weight);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold">{child.name}</h2>
      <p>Parentage: {child.parentage}</p>
      <p>DOB: {child.dob}</p>
      <p>Current Date: {currentDate.toDateString()}</p>
      <p>Age: {ageInMonths} months</p>
      <p>Estimated Height: {estimatedHeight.toFixed(2)} cm</p>
      <p>Estimated Weight: {estimatedWeight.toFixed(2)} kg</p>
    </div>
  );
};

export default ChildCard;
