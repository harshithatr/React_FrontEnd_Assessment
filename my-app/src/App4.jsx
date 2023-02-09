import './App.css';
import React, {useState, useEffect} from "react";
import axios from 'axios';
import Input from './input/Input';
import ShowGrades from './showGrades/ShowGrades';



//isexpanded: false mapped to each student
function App4() {
  const [data, setData] = useState([]);
  const [searchName, setSearchName] = useState('')
  //const [showGrades, setShowGrades] = useState(false)
  // const [clickedCardId, setclickedCardId] = useState('')
  //expandCards is created to store the id of all the cards
  // for which the ShowGrades component should be open
  // const[ expandCards, setExpandCards] = useState([])


  useEffect(()=>{
  axios.get('https://api.hatchways.io/assessment/students')
  .then(function (response) {
    // adding isExpanded property to each student
    const updatedData = response.data.students.map(student => ({
      ...student,
      isExpanded: false
    }));
    setData(updatedData);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
},[])
  
  console.log(data, 'data');

  function toggleShowGrades(clickedId)
  {
   setData(i => i.map(student=>{
    if(student.id === clickedId)
    {
      return{
        ...student,
        //with the isExpanded property toggled if it was false, it becomes true, and vice versa.
        isExpanded: !student.isExpanded 
      }
    }
    return student
   }))
 }
 
  function isButtonExpanded(clickedId)
  {//search array for the student with an id that matches the clickedId
    const student = data.find(student=> student.id === clickedId);
    console.log(student.isExpanded);
    return student.isExpanded ? '-' : '+';
    
  }

  return(
      <div className='studentcontainer'>
        <Input setSearchName={setSearchName}
        searchName={searchName}/>
        {data
        .filter(i=>(i.firstName+" "+i.lastName).toLowerCase().includes(searchName.toLowerCase()))
        .map(i=>{
           const average = i.grades.map(Number).reduce((acc, grade) => acc + grade, 0) / (i.grades.length);
         return (
       <div key={i.id}>
        <img className='img' src={i.pic}/>
        <div className='text-details'>
        <div className='name'>{i.firstName} {i. lastName}</div><br/>
       Email: {i.email}<br/>
       Company: {i.company}<br/>
       Skill: {i.skill}<br/>
       Average: {average}%<br/>
     
<button onClick={()=>toggleShowGrades(i.id)}>{isButtonExpanded(i.id)}</button>
       {i.isExpanded ? <ShowGrades grades={i.grades} /> : null}
       </div>
       </div>
        )
        })}
        </div>
    )

 }

 export default App4;