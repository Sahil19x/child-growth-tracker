export interface Child {
  id?: number;
  name: string;
  age: number;
  parentage: string;  // e.g., "biological" or "adopted"
  dob: string | Date;  // Date of birth
  gender: string;      // e.g., "male", "female", "non-binary"
}
