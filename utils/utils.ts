// File: utils/utils.ts
export const calculateAgeInMonths = (dob: Date, currentDate: Date): number => {
  const years = currentDate.getFullYear() - dob.getFullYear();
  const months = currentDate.getMonth() - dob.getMonth();
  const days = currentDate.getDate() - dob.getDate();
  let ageInMonths = years * 12 + months;
  if (days < 0) ageInMonths--;
  return ageInMonths;
};

export const interpolateValue = (age: number, data: { month: number; value: number }[]): number => {
  if (age <= data[0].month) return data[0].value;
  if (age >= data[data.length - 1].month) return data[data.length - 1].value;

  for (let i = 0; i < data.length - 1; i++) {
    if (age >= data[i].month && age <= data[i + 1].month) {
      const fraction = (age - data[i].month) / (data[i + 1].month - data[i].month);
      return data[i].value + fraction * (data[i + 1].value - data[i].value);
    }
  }
  return 0; // Fallback
};
