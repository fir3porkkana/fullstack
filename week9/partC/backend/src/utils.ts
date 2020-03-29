import { NewPatient, Gender } from "./types";

const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseString = (potentialString: any): string => {
  if (!potentialString || !isString(potentialString)) {
    throw new Error(`incorrect or missing name: ${potentialString}`);
  }

  return potentialString;
};

const isGender = (potentialGender: any): potentialGender is Gender => {
  return Object.values(Gender).includes(potentialGender);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`incorrect or missing gender: ${gender}`);
  }

  return gender;
};

const parseSSN = (string: any): string => {
  if (string && !isString(string)) {
    throw new Error(`incorrect ssn: ${string}`);
  }

  return string;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (date && (!isString(date) || !isDate(date))) {
    throw new Error(`incorrect or missing date: ${date}`);
  }
  return date;
};

const toNewPatient = (object: any): NewPatient => {
  const newPatient: NewPatient = {
    name: parseString(object.name),
    occupation: parseString(object.occupation),
    gender: parseGender(object.gender),
    ssn: parseSSN(object.ssn),
    dateOfBirth: parseDate(object.dateOfBirth)
  };
  return newPatient;
};

export default toNewPatient;
