import React, { useState } from "react";
import { NewDiaryEntry, Visibility, Weather } from "../types";

interface DiaryFormProps {
  addEntry: (newDiary: NewDiaryEntry) => void;
  errorMessage: string;
}

const DiaryForm = (props: DiaryFormProps) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState(Visibility.Great);
  const [weather, setWeather] = useState(Weather.Sunny);
  const [comment, setComment] = useState("");

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log(Object.values(Visibility));
    props.addEntry({
      date,
      visibility,
      weather,
      comment,
    });
  };

  return (
    <>
      <h2>Add new entry</h2>
      <p style={{ color: "red" }}>{props.errorMessage}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="date">date</label>
          <input
            type="text"
            id="date"
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
          <span style={{ marginRight: 20 }}>visibility</span>
          {Object.values(Visibility).map((v) => (
            <span key={v}>
              <label htmlFor={v}>{v}</label>
              <input
                type="radio"
                name="visibility"
                id={v}
                checked={visibility === v}
                onChange={() => setVisibility(v)}
              />
            </span>
          ))}
        </div>
        <div>
          <span style={{ marginRight: 20 }}>weather</span>
          {Object.values(Weather).map((v) => (
            <span key={v}>
              <label htmlFor={v}>{v}</label>
              <input
                type="radio"
                name="weather"
                id={v}
                checked={weather === v}
                onChange={() => setWeather(v)}
              />
            </span>
          ))}
        </div>
        <div>
          <label htmlFor="comment">comment</label>
          <input
            type="text"
            id="comment"
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </>
  );
};

export default DiaryForm;
