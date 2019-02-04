import React from 'react';

const Total = ({parts}) => {
    console.log(parts)

    return (
        <>
          <p>yhteensä {
              parts.map(part => part.exercises)
             .reduce((total, part) => total + part)} tehtävää </p>
        </>
    )
}

export default Total