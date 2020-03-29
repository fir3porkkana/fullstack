import express from "express";
import patientService from "../services/patientService";
import { Patient, NewPatient } from "../types";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getPatientsNoSSN());
});

router.post("/", (_req, res) => {
  const { name, occupation, gender, dateOfBirth } = _req.body;
  const newPatient: Patient = patientService.addEntry({
    name,
    occupation,
    gender,
    dateOfBirth
  });
  res.send(newPatient);
});

export default router;
