import React from "react";

const Total: React.FC<{ total: number }> = ({ total }) => {
  return <p>Total number of excercises: {total}</p>;
};

export default Total;
