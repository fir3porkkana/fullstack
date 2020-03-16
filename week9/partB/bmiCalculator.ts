interface Values {
  height: number;
  weight: number;
}

interface BmiValues {
  height: number;
  weight: number;
}

const parseArgs = (args: Array<string>): BmiValues => {
  console.log("args:", args);
  if (args.length > 4) throw new Error("Too many arguments");

  if (
    !Number.isNaN(Number.parseInt(args[2])) &&
    !Number.isNaN(Number.parseInt(args[3]))
  ) {
    // console.log("lolasd")

    return {
      height: Number.parseInt(args[2]),
      weight: Number.parseInt(args[3])
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  if (height === 0) {
    return "Height provided was zero!";
  }

  const heightInMetres: number = height / 100;
  const heightInMetresSquared: number = heightInMetres * heightInMetres;

  const BMI: number = weight / heightInMetresSquared;

  if (BMI < 18.5) {
    return "Underweight (unhealthy weight)";
  } else if (BMI <= 25) {
    return "Normal (healthy weight)";
  } else if (BMI <= 30) {
    return "Overweight (unhealthy weight)";
  } else {
    return "Obese (unhealthy weight)";
  }
};

try {
  const { height, weight }: Values = parseArgs(process.argv);
  console.log(calculateBmi(height, weight));
} catch (e) {
  console.log(e);
}
