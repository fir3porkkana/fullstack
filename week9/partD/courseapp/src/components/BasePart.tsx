import React from "react";

const BasePart: React.FC<{ name: string; excerciseCount: number }> = ({
  name,
  excerciseCount
}) => {
  return (
    <div>
      <p>-----------------------</p>
      <p>
        {name}: {excerciseCount}
      </p>
    </div>
  );
};

export default BasePart;
