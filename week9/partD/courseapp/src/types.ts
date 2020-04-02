interface CoursePartBase {
  name: string;
  excerciseCount: number;
}

interface CoursePartBaseDescriptive extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartBaseDescriptive {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBaseDescriptive {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartForPaallikkos extends CoursePartBaseDescriptive {
  name: "Usage of Oden's in upperbelt";
  denscerCises: number;
}

export type CoursePart =
  | CoursePartOne
  | CoursePartTwo
  | CoursePartThree
  | CoursePartForPaallikkos;

export const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    excerciseCount: 10,
    description: "This is an awesome course part"
  },
  {
    name: "Using props to pass data",
    excerciseCount: 7,
    groupProjectCount: 3
  },
  {
    name: "Deeper type usage",
    excerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
  },
  {
    name: "Usage of Oden's in upperbelt",
    description: "This part introduces us to the world of upperbelt boosts",
    excerciseCount: 5,
    denscerCises: 7
  }
];

export interface Course {
  courseParts: CoursePart[];
}
