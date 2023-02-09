import './App.css';
import React, {useState, useEffect} from "react";
import axios from 'axios';
import Input from './input/Input';
import ShowGrades from './showGrades/ShowGrades';





//Multiplecards open with no restriction
function App2() {
  const [data, setData] = useState([]);
  const [searchName, setSearchName] = useState('')
  // const [clickedCardId, setclickedCardId] = useState('')
  //expandCards is created to store the id of all the cards
  // for which the ShowGrades component should be open
  const[ expandCards, setExpandCards] = useState([])


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
    //checking if the id is already in the array
    if (expandCards.includes(clickedId)) {
   //it removes it from the array, otherwise, it adds it to the array.
      setExpandCards(expandCards.filter(i => i !== clickedId));
    } else {
      setExpandCards([...expandCards, clickedId]);
    }
 }
 console.log(expandCards,'expandcards')
  function isButtonExpanded(clickedId)
  {
    return expandCards.includes(clickedId)?'-' : '+';
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
       {expandCards.includes(i.id) ? <ShowGrades grades={i.grades} /> : null}
       </div>
       </div>
        )
        })}
        </div>
    )

 }
 export default App2;