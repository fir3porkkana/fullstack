import React from 'react';
import ReactDOM from 'react-dom';


const App = () => {

    const course = "Half Stack -sovelluskehitys"
    const part1 = "Reactin perusteet"
    const excercises1 = 10
    const part2 = "Tiedonvälitys propseilla"
    const excercises2 = 7
    const part3 = "Komponenttien tila"
    const excercises3 = 14
    
    return (
        <>
        <Header course={course}/>
        <Content part1={part1} excercises1={excercises1} part2={part2} excercises2={excercises2} part3={part3} excercises3={excercises3}/>
        <Total excercises1={excercises1} excercises2={excercises2} excercises3={excercises3} />
        </>
    )

}

const Header = ({course}) => {
    return (
        <>
        <h1> {course} </h1>
        </>
    )
}

const Content =({part1, excercises1, part2, excercises2, part3, excercises3}) => {
    return (
        <> 
         <Part part={part1} excercises={excercises1}/>
         <Part part={part2} excercises={excercises2}/>
         <Part part={part3} excercises={excercises3}/>
        </>
    )
}

const Total = ({excercises1, excercises2, excercises3}) => {
    return (
        <>
          <p>yhteensä {excercises1 + excercises2 + excercises3} tehtävää </p>
        </>
    )
}

const Part = (props) => {
    return (
        <>
            <p>
                {props.part} {props.excercises}
            </p>
        </>
    )
}


ReactDOM.render(<App />, document.getElementById('root'));

