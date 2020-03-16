import patientData from "../../data/patients";
import { Patient, PatientNoSSN } from "../types";

const getPatients = (): Array<Patient> => {
  return patientData;
};

const getPatientsNoSSN = (): Array<PatientNoSSN> => {
  return patientData.map(({ id, name, occupation, gender, dateOfBirth }) => ({
    id,
    name,
    occupation,
    gender,
    dateOfBirth
  }));
};

const addEntry = () => {
  return null;
};

export default { getPatients, getPatientsNoSSN, addEntry };
