interface Arguments {
  height: number;
  weight: number;
}

const parseArgument = (args: string[]): Arguments => {
  if (args.length < 4) throw new Error("Too few arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  const height = Number(args[2]);
  const weight = Number(args[3]);

  if (isNaN(height) || isNaN(weight)) {
    throw new Error("Height and Weight must be numbers");
  }

  return {
    height,
    weight,
  };
};

export const calculateBmi = (heightInCm: number, weight: number): string => {
  const heightInMeters = heightInCm / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  if (bmi < 16) {
    return "Underweight (Severe thinness)";
  } else if (bmi < 16.9) {
    return "Underweight (Moderate thinness)";
  } else if (bmi < 18.4) {
    return "Underweight (Mild thinness)";
  } else if (bmi < 24.9) {
    return "Normal range";
  } else if (bmi < 29.9) {
    return "Overweight (Pre-obese)";
  } else if (bmi < 34.9) {
    return "Obese (Class I)";
  } else if (bmi < 39.9) {
    return "Obese (Class II)";
  } else {
    return "Obese (Class III)";
  }
};

if (require.main === module) {
  try {
    const { height, weight } = parseArgument(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}
