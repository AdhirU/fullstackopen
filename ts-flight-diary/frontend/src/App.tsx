import { useEffect, useState } from "react";
import { getAllEntries, createEntry } from "./services/diaryService";
import { DiaryEntry, NewDiaryEntry } from "./types";
import DiaryList from "./components/DiaryList";
import DiaryForm from "./components/DiaryForm";
import axios from "axios";

interface Error {
  message: string;
}

interface ValidationError {
  error: Error[];
}

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getAllEntries().then((res) => setEntries(res));
  }, []);

  const addEntry = async (newDiary: NewDiaryEntry) => {
    try {
      const res = await createEntry(newDiary);
      setEntries(entries.concat(res));
    } catch (error: unknown) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        let res = "Error: ";
        res += error.response?.data.error.map((e) => e.message).join(". ");
        setErrorMessage(res);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <>
      <DiaryForm addEntry={addEntry} errorMessage={errorMessage} />
      <DiaryList diaries={entries} />
    </>
  );
}

export default App;
