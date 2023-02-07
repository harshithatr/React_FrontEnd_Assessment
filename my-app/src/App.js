import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from "react";
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [searchName, setSearchName] = useState('')


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

  return(
      <div className='studentcontainer'>
        <input type='text' value={searchName} onChange={e=> setSearchName(e.target.value)} placeholder='Search by Name'/>
        {data
        .filter(i=>(i.firstName+" "+i.lastName).toLowerCase().includes(searchName.toLowerCase()))
        .map(i=>{
           const average = i.grades.map(Number).reduce((acc, grade) => acc + grade, 0) / (i.grades.length)* 100 / 100;
           return (
       <div>
        <img className='img' src={i.pic}/>
        <div className='text-details'>
        <div className='name'>{i.firstName} {i. lastName}</div><br/>
       Email: {i.email}<br/>
       Company: {i.company}<br/>
       Skill: {i.skill}<br/>
       Average: {average}%
       </div>
       </div>
        )
        })}
        </div>
    )

}

export default App;
