import axios from "axios";
import { Diagnosis } from "../types";

const baseUrl = "http://localhost:3000/api/diagnoses";

const getAll = async () => {
  const res = await axios.get<Diagnosis[]>(baseUrl);
  return res.data;
};

export default { getAll };
