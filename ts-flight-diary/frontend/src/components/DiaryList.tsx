import { NonSensitiveDiaryEntry } from "../types";

interface DiaryListProps {
  diaries: NonSensitiveDiaryEntry[];
}

const DiaryList = (props: DiaryListProps) => {
  return (
    <div>
      <h2>Diary entries</h2>
      {props.diaries.map((diary) => (
        <div key={diary.id}>
          <h3>{diary.date}</h3>
          <div>visibility: {diary.visibility}</div>
          <div>weather: {diary.weather}</div>
        </div>
      ))}
    </div>
  );
};

export default DiaryList;
