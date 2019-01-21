import React from 'react';
import ReactDOM from 'react-dom';


const App = () => {

    const course = {
        name: "Half Stack -sovelluskehitys",
        parts: [
        {
        name: 'Reactin perusteet',
        exercises: 10
        },
        {
        name: "Tiedonvälitys propseilla",
        exercises: 7
        },
        {
        name: "Komponenttien tila",
        exercises: 14
        }
    ]
}
    
    
    return (
        <>
        <Header course={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts} />
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

const Content =({parts}) => {
    return (
        <> 
         <Part part={parts[0].name} exercises={parts[0].exercises}/>
         <Part part={parts[1].name} exercises={parts[1].exercises}/>
         <Part part={parts[2].name} exercises={parts[2].exercises}/>
        </>
    )
}

const Total = ({parts}) => {
    console.log(parts, parts[0].exercises)
    return (
        <>
          <p>yhteensä {parts[0].exercises + parts[1].exercises + parts[2].exercises} tehtävää </p>
        </>
    )
}

const Part = (props) => {
    return (
        <>
            <p>
                {props.part} {props.exercises}
            </p>
        </>
    )
}


ReactDOM.render(<App />, document.getElementById('root'));
