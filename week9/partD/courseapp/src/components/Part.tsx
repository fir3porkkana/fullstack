import React from "react";
import { CoursePart } from "../types";
import BasePart from "./BasePart";
import { assertNever } from "../utils";

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  switch (part.name) {
    case "Fundamentals":
      return (
        <div>
          <BasePart name={part.name} excerciseCount={part.excerciseCount} />
          <p>description: {part.description}</p>
        </div>
      );
    case "Deeper type usage":
      return (
        <div>
          <BasePart name={part.name} excerciseCount={part.excerciseCount} />
          <p>description: {part.description}</p>
          <a href={part.exerciseSubmissionLink}>link to submission</a>
        </div>
      );
    case "Using props to pass data":
      return (
        <div>
          <BasePart name={part.name} excerciseCount={part.excerciseCount} />
          <p>group projects: {part.groupProjectCount}</p>
        </div>
      );
    case "Usage of Oden's in upperbelt":
      return (
        <div>
          <BasePart name={part.name} excerciseCount={part.excerciseCount} />
          <p>description: {part.description}</p>
          <p>number of denscerCises: {part.denscerCises}</p>
        </div>
      );
    default:
      assertNever(part);
      return null;
  }
};

export default Part;
