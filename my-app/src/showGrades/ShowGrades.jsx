import React from "react";
import './showgrades.css';


function ShowGrades(props){
const grades = props.grades;
    return(
        <div className="gradeslist" >
            {grades.map((grade, index)=>
            `Test ${index+1} : ${grade}%\n`)}
        </div>
    )
}

export default ShowGrades;