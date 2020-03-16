type Description =
  | "try harder m´brouski"
  | "not too bad but could be better"
  | "very nice my friend";

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: Description;
  target: number;
  average: number;
}

interface InputValues {
  daysArray: Array<number>;
  target: number;
}

const parseArguments = (args: Array<string>): InputValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  const daysArray: Array<number> = [];
  let target = 0;

  for (let index = 2; index < args.length; index++) {
    const number = Number.parseInt(args[index]);
    // console.log("i:s parka argsv:stä: ", typeof Number(args[index]));

    if (isNaN(number)) {
      throw new Error("Provided values were not numbers!");
    } else if (index === args.length - 1) {
      // console.log("vika", number)
      target = number;
    } else {
      daysArray.push(number);
      // console.log("määrä ", daysArray)
    }
  }
  return {
    daysArray,
    target
  };
};

export const calculateExcercises = (
  hours: Array<number>,
  target: number
): Result => {
  const periodLength: number = hours.length;
  let trainingDays = 0;
  let sum = 0;
  let success = true;
  let rating = 1;
  let ratingDescription: Description = "try harder m´brouski";
  let average = 0;

  hours.forEach((d: number | string) => {
    const dParsed: number = Number.parseFloat("" + d);
    if (dParsed !== 0) {
      trainingDays++;
      sum += dParsed;
    }
    success = target <= dParsed;
    return dParsed;
  });

  average = sum / periodLength;

  if (success) {
    ratingDescription = "very nice my friend";
    rating = 3;
  } else if (target / 2 <= average) {
    ratingDescription = "not too bad but could be better";
    rating = 2;
  }

  const result: Result = {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
  return result;
};

try {
  // console.log("ARGS BRO ASDASDASDAS ", process.argv)
  const { daysArray, target } = parseArguments(process.argv);
  console.log(calculateExcercises(daysArray, target));
} catch (e) {
  console.log(e);
}
