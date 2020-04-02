import React from "react";
import ReactDOM from "react-dom";

import { CoursePart, courseParts } from "./types";

import Header from "./components/Header";
import Content from "./components/Content";
import Total from "./components/Total";

const App: React.FC = () => {
  const courseName = "Half Stack application development";

  const totalExcercises: number = courseParts.reduce(
    (carry, part) => carry + part.excerciseCount,
    0
  );

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total total={totalExcercises} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
