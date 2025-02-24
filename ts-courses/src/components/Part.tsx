import { CoursePart } from "../App";

interface PartProps {
  part: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = (props: PartProps) => {
  const part = props.part;
  let res;
  switch (part.kind) {
    case "basic":
      res = (
        <div>
          <em>{part.description}</em>
        </div>
      );
      break;
    case "group":
      res = <div>project exercises {part.groupProjectCount}</div>;
      break;
    case "background":
      res = (
        <>
          <div>
            <em>{part.description}</em>
          </div>
          <div>submit to {part.backgroundMaterial}</div>
        </>
      );
      break;
    case "special":
      res = (
        <>
          <div>{part.description}</div>
          <div>required skills: {part.requirements.join(", ")}</div>
        </>
      );
      break;
    default:
      return assertNever(part);
  }

  return (
    <div style={{ marginTop: 15 }}>
      <div>
        <strong>
          {part.name} {part.exerciseCount}
        </strong>
      </div>
      {res}
    </div>
  );
};

export default Part;
