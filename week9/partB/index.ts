import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExcercises } from "./excerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req: express.Request, res: express.Response) => {
  res.send("hello full stack :DD");
});

app.get("/bmi", (req: express.Request, res: express.Response) => {
  const height: number = Number.parseInt(req.query.height);
  const weight: number = Number.parseInt(req.query.weight);

  if (Number.isNaN(height) || Number.isNaN(weight)) {
    res.status(500).json({ error: "malformatted parameters" });
  } else {
    res.json({ weight, height, bmi: calculateBmi(height, weight) });
  }
});

app.post("/exercises", (req: express.Request, res: express.Response) => {
  const exercises: Array<number> = req.body.daily_exercises;
  const target: number = Number.parseInt(req.body.target);

  if (!exercises || !target) {
    res.status(500).json({ error: "parameters missing" });
    res.send();
  }

  let isnan: boolean = isNaN(target);
  if (!isnan) {
    req.body.daily_exercises.forEach((e: number) => {
      if (isNaN(e)) {
        isnan = true;
      }
    });
  }

  if (isnan) {
    res.status(500).json({ error: "malformatted parameters" });
  } else {
    res.json(calculateExcercises(exercises, target));
  }
});

const PORT = 3003;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
