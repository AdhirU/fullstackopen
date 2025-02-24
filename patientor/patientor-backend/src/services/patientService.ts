import patients from "../../data/patients";
import { NewEntry, NewPatient, NonSensitivePatient, Patient } from "../types";
import { v1 as uuid } from "uuid";

const getAllData = (): Patient[] => {
  return patients;
};

const getNonsensitiveData = (): NonSensitivePatient[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  return patient;
};

const addPatient = (entry: NewPatient): Patient => {
  const addedPatient = {
    id: uuid(),
    ...entry,
  };

  patients.push(addedPatient);

  return addedPatient;
};

const addEntry = (patientId: string, entry: NewEntry): Patient | null => {
  const patient = findById(patientId);

  if (!patient) {
    return null;
  }

  const addedEntry = {
    id: uuid(),
    ...entry,
  };
  patient.entries.push(addedEntry);
  return patient;
};

export default {
  getAllData,
  getNonsensitiveData,
  findById,
  addPatient,
  addEntry,
};
