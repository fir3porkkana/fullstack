import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
        <div>
            <Header text="Anna balautetta"/>
        </div>

        <div>
            <Button handleClick={handleGoodClick([good, setGood])} name="hyvä"/>
            <Button handleClick={handleNeutralClick([neutral, setNeutral])} name="neutraali"/>
            <Button handleClick={handleBadClick([bad, setBad])} name="huono"/>
        </div>

        <div>
            <Header text="Stättejä"/>
        </div>

        <div>
            <Statistics good={[good, setGood]} neutral={[neutral, setNeutral]} bad={[bad, setBad]}/>
        </div>
    </div>
    
  )
}

const Header = ({text}) => {
    console.log("otsikko: ", text)
    return (
        <>
            <h1>{text}</h1>
        </>
    )
}

const Yhteensa = (props) => {
    console.log("Statistic sanoo: ", props)
    let yht = props.good + props.neutral + props.bad
    return (
        <>
            <p>yhteensä {yht}</p>
        </>
    )
}

const Keskiarvo = (props) => {
    console.log("ka sanoo: ", props)
    let yht = props.good + props.neutral + props.bad
    return (
        <>
        <table>
            <tbody>
                <tr>
                <td>keskiarvo</td>
                <td>{(props.good - props.bad)/yht}</td>
                </tr>
            </tbody>
            
        </table>

        </>
    )
}

const Positiivisia = (props) => {
    console.log("yhteensa: ", props.good)
    let yht = props.good + props.neutral + props.bad
    return (
        <p>positiivisia {100*props.good/yht}%</p>
    )
}

const Statistics = (props) => {
    console.log("stattiemo: ", props)
    if ((props.good[0] + props.neutral[0] + props.bad[0]) === 0) {
        return (
            <>
            <div>
                <p>Ei yhtään palautetta annettu</p>
            </div>
            </>
        )
    } else {
        return (
            <>
            <div>
                <StatShower hook={props.good} naytettava="hyvä"/>
                <StatShower hook={props.neutral} naytettava="neutraali"/>
                <StatShower hook={props.bad} naytettava="huono"/>
            </div>
    
            <div>
                <BetterStats good={props.good} neutral={props.neutral} bad={props.bad}/>
            </div>
            </>
        )
    }
}

const BetterStats = (props) => {
    console.log("yksityiskohtaisemmat statit: ", props)
    return (
        <>
            <Yhteensa good={props.good[0]} neutral={props.neutral[0]} bad={props.bad[0]}/>
            <Keskiarvo good={props.good[0]} neutral={props.neutral[0]} bad={props.bad[0]}/>
            <Positiivisia good={props.good[0]} neutral={props.neutral[0]} bad={props.bad[0]}/>
        </>
    )
}

const StatShower = (props) => {
    console.log("paskemmat statit kertovat, että: ", props)
    return (
        <>
            <p>{props.naytettava} {props.hook[0]}</p>
        </>
    )
}

const Button = (props) => {
    console.log("napin propsit: ", props)
    return (
        <>
        <button onClick={props.handleClick}>{props.name}</button>
        </>
    )

}

const handleGoodClick = ([good, setGood]) => {
    console.log("hyvä klikkihändleri: ", good)
    return (
        () => setGood(good + 1)
    )
}

const handleNeutralClick = ([neutral, setNeutral]) => {
    console.log("neutraali klikkihändleri: ", neutral)
    return (
        () => setNeutral(neutral + 1)
    )
}

const handleBadClick = ([bad, setBad]) => {
    console.log("huono klikkihändleri: ", bad)
    return (
        () => setBad(bad + 1)
    )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)