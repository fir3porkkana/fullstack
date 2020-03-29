import patientData from "../../data/patients";
import { Patient, PatientNoSSN, NewPatient } from "../types";
import { v4 as uuidv4 } from "uuid";

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

const addEntry = (patient: NewPatient): Patient => {
  const patientWithUuid = { ...patient, id: uuidv4() };
  patientData.push(patientWithUuid);

  return patientWithUuid;
};

export default { getPatients, getPatientsNoSSN, addEntry };
