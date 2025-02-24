import { CoursePart } from "../App";
import Part from "./Part";

interface contentsProps {
  parts: CoursePart[];
}

const Contents = (props: contentsProps) => {
  return (
    <div>
      {props.parts.map((part) => (
        <Part part={part}></Part>
      ))}
    </div>
  );
};

export default Contents;
