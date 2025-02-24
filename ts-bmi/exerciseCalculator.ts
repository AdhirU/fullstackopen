import { isNotNumber } from "./utils";

interface ExerciseSummary {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseValues {
  target: number;
  exerciseHours: number[];
}

const parseArgument = (args: string[]): ExerciseValues => {
  if (args.length < 4) {
    throw new Error("Must pass target and at least one exercise day");
  }

  const target = Number(args[2]);
  if (isNaN(target)) {
    throw new Error("First argument `target` must be a number");
  }

  const exerciseHours: number[] = [];
  for (let i = 3; i < args.length; i++) {
    if (isNotNumber(args[i])) {
      throw new Error("All exercise hour values must be numbers");
    }
    exerciseHours.push(Number(args[i]));
  }

  return {
    target,
    exerciseHours,
  };
};

export const calculateExercise = (
  dailyExerciseHours: number[],
  target: number
): ExerciseSummary => {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.reduce(
    (acc, cur) => (cur > 0 ? acc + 1 : acc),
    0
  );
  const average =
    dailyExerciseHours.reduce((acc, cur) => acc + cur, 0) / periodLength;
  const success = average >= target;
  let rating, ratingDescription;
  if (average >= target) {
    rating = 3;
    ratingDescription = "Met the target; well done!";
  } else if (average >= target / 2) {
    rating = 2;
    ratingDescription = "At least you're half way there, keep it up.";
  } else {
    rating = 1;
    ratingDescription = "You're not even close, time to stop slacking!";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

if (require.main === module) {
  try {
    const { target, exerciseHours } = parseArgument(process.argv);
    console.log(calculateExercise(exerciseHours, target));
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}
