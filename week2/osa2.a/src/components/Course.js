import React from 'react';
import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = (props) => (
    <div>
        <div>
            <Header name={props.name}/>
        </div>
        <div>
            <Content parts={props.parts}/>
        </div>
        <div>
            <Total parts={props.parts}/>
        </div>
    </div>
)

  export default Course