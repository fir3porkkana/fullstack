import React from 'react';
import Part from './Part';

const Content =({parts}) => (
        <ul>
         {parts.map(part => 
         
         <li key={part.id}>
             <Part part={part.name} 
             exercises={part.exercises}/>
        </li>)}
        </ul>
        
    )


export default Content