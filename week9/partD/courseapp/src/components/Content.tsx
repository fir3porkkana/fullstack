import React from "react";
import { CoursePart } from "../types";
import Part from "./Part";

const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
  return (
    <div>
      {courseParts.map((p: CoursePart) => (
        <Part part={p} />
      ))}
    </div>
  );
};

export default Content;
