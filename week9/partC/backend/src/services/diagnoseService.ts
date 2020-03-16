import diagnoseData from "../../data/diagnoses";
import { Diagnosis } from "../types";

const getDiagnoses = (): Array<Diagnosis> => {
  return diagnoseData;
};

const addEntry = () => {
  return null;
};

export default {
  getDiagnoses,
  addEntry
};
