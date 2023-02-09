
import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from "react";
import axios from 'axios';
import Input from './input/Input';
import ShowGrades from './showGrades/ShowGrades';
import './index.css'

//open one card at a time
function App1(props) {
    const [data, setData] = useState([]);
    const [searchName, setSearchName] = useState('')
    const [showGrades, setShowGrades] = useState(false)
    const [clickedCardId, setclickedCardId] = useState('')
  
  
    useEffect(()=>{
    axios.get('https://api.hatchways.io/assessment/students')
    .then(function (response) {
      setData(response.data.students, 'Response from App')
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  },[])
    
    console.log(data, 'data');
  
    function toggleShowGrades(clickedId)
    {
      
      setclickedCardId(clickedId === clickedCardId ? null : clickedId)
    }
    function isButtonExpanded(clickedId)
    {
      // return '+'
      return clickedId === clickedCardId ? '-' : '+'
    }
  
    return(
        <div className='studentcontainer'>
          <Input setSearchName={setSearchName}
          searchName={searchName}/>
          {data
          .filter(i=>(i.firstName+" "+i.lastName).toLowerCase().includes(searchName.toLowerCase()))
          .map(i=>{
             const average = i.grades.map(Number).reduce((acc, grade) => acc + grade, 0) / (i.grades.length);
             //const toggleShowGrades = () => setShowGrades(!showGrades);  
            return (
         <div>
          <img className='img' src={i.pic}/>
          <div className='text-details'>
          <div className='name'>{i.firstName} {i. lastName}</div><br/>
         Email: {i.email}<br/>
         Company: {i.company}<br/>
         Skill: {i.skill}<br/>
         Average: {average}%<br/>
         {/* <button onClick={toggleShowGrades}>
     {showGrades ? "-" : "+"} 
  </button> */}
  <button onClick={()=>toggleShowGrades(i.id)}>{isButtonExpanded(i.id)}</button>
          {/* { showGrades ? <ShowGrades grades={i.grades} /> : null } */}
          {i.id === clickedCardId ? <ShowGrades grades={i.grades} /> : null}
         </div>
         </div>
          )
          })}
          <App1/>
          </div>
      )
  
  }
  export default App1;