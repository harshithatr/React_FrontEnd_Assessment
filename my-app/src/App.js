import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from "react";
import axios from 'axios';
import Input from './input/Input';
import ShowGrades from './showGrades/ShowGrades';
import App2 from './App2';
import App3 from './App3';
import App4 from './App4';

//open one card at a time
function App() {
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
    if (clickedId === clickedCardId) {
      setclickedCardId(null);
    } else {
      setclickedCardId(clickedId);
    }
  }
  function isButtonExpanded(clickedId)
  {
   
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
       <div key={i.id} >
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
      <App2 />
        </div>
//Multiplecards open with no restriction
// <div><App2 /></div> 

//Open with max 3 restriction
//<div><App3 /></div>

//isexpanded: false mapped to each student
//<div><App4 /></div>
    )

}



// function App() {
//   const [data, setData] = useState([]);
//   const [searchName, setSearchName] = useState('')
//   const [showGrades, setShowGrades] = useState(false)
//   // const [clickedCardId, setclickedCardId] = useState('')
//   //expandCards is created to store the id of all the cards
//   // for which the ShowGrades component should be open
//   const[ expandCards, setExpandCards] = useState([])


//   useEffect(()=>{
//   axios.get('https://api.hatchways.io/assessment/students')
//   .then(function (response) {
//     setData(response.data.students, 'Response from App')
//     console.log(response);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
// },[])
  
//   console.log(data, 'data');

//   function toggleShowGrades(clickedId)
//   {
//     //checking if the id is already in the array
//     if (expandCards.includes(clickedId)) {
//    //it removes it from the array, otherwise, it adds it to the array.
//       setExpandCards(expandCards.filter(i => i !== clickedId));
//     } else {
//       setExpandCards([...expandCards, clickedId]);
//     }
//  }
//  console.log(expandCards,'expandcards')
//   function isButtonExpanded(clickedId)
//   {
//     return expandCards.includes(clickedId)?'-' : '+';
//   }

//   return(
//       <div className='studentcontainer'>
//         <Input setSearchName={setSearchName}
//         searchName={searchName}/>
//         {data
//         .filter(i=>(i.firstName+" "+i.lastName).toLowerCase().includes(searchName.toLowerCase()))
//         .map(i=>{
//            const average = i.grades.map(Number).reduce((acc, grade) => acc + grade, 0) / (i.grades.length);
//          return (
//        <div>
//         <img className='img' src={i.pic}/>
//         <div className='text-details'>
//         <div className='name'>{i.firstName} {i. lastName}</div><br/>
//        Email: {i.email}<br/>
//        Company: {i.company}<br/>
//        Skill: {i.skill}<br/>
//        Average: {average}%<br/>
     
// <button onClick={()=>toggleShowGrades(i.id)}>{isButtonExpanded(i.id)}</button>
//        {expandCards.includes(i.id) ? <ShowGrades grades={i.grades} /> : null}
//        </div>
//        </div>
//         )
//         })}
//         </div>
//     )

//  }

//Open with max 3 restriction
// function App() {
//   const [data, setData] = useState([]);
//   const [searchName, setSearchName] = useState('')
//   const [showGrades, setShowGrades] = useState(false)
//   // const [clickedCardId, setclickedCardId] = useState('')
//   //expandCards is created to store the id of all the cards
//   // for which the ShowGrades component should be open
//   const[ expandCards, setExpandCards] = useState([])


//   useEffect(()=>{
//   axios.get('https://api.hatchways.io/assessment/students')
//   .then(function (response) {
//     setData(response.data.students, 'Response from App')
//     console.log(response);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
// },[])
  
//   console.log(data, 'data');

//   function toggleShowGrades(clickedId)
//   {
//    // all items should be removed and only the new item
//    // should be added
//     if(expandCards.length >=3)
//     {
//       setExpandCards([clickedId]);

//     }
//     //checking if the id is already in the array
//    else if (expandCards.includes(clickedId)) {
//    //it removes it from the array, otherwise, it adds it to the array.
//       setExpandCards(expandCards.filter(i => i !== clickedId));
//     } else {
//       setExpandCards([...expandCards, clickedId]);
//     }
//  }
//  console.log(expandCards,'expandcards')
//   function isButtonExpanded(clickedId)
//   {
//     return expandCards.includes(clickedId)?'-' : '+';
//   }

//   return(
//       <div className='studentcontainer'>
//         <Input setSearchName={setSearchName}
//         searchName={searchName}/>
//         {data
//         .filter(i=>(i.firstName+" "+i.lastName).toLowerCase().includes(searchName.toLowerCase()))
//         .map(i=>{
//            const average = i.grades.map(Number).reduce((acc, grade) => acc + grade, 0) / (i.grades.length);
//          return (
//        <div>
//         <img className='img' src={i.pic}/>
//         <div className='text-details'>
//         <div className='name'>{i.firstName} {i. lastName}</div><br/>
//        Email: {i.email}<br/>
//        Company: {i.company}<br/>
//        Skill: {i.skill}<br/>
//        Average: {average}%<br/>
     
// <button onClick={()=>toggleShowGrades(i.id)}>{isButtonExpanded(i.id)}</button>
//        {expandCards.includes(i.id) ? <ShowGrades grades={i.grades} /> : null}
//        </div>
//        </div>
//         )
//         })}
//         </div>
//     )

//  }


//isexpanded: false mapped to each student
// function App() {
//   const [data, setData] = useState([]);
//   const [searchName, setSearchName] = useState('')
//   //const [showGrades, setShowGrades] = useState(false)
//   // const [clickedCardId, setclickedCardId] = useState('')
//   //expandCards is created to store the id of all the cards
//   // for which the ShowGrades component should be open
//   // const[ expandCards, setExpandCards] = useState([])


//   useEffect(()=>{
//   axios.get('https://api.hatchways.io/assessment/students')
//   .then(function (response) {
//     // adding isExpanded property to each student
//     const updatedData = response.data.students.map(student => ({
//       ...student,
//       isExpanded: false
//     }));
//     setData(updatedData);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
// },[])
  
//   console.log(data, 'data');

//   function toggleShowGrades(clickedId)
//   {
//    setData(i => i.map(student=>{
//     if(student.id === clickedId)
//     {
//       return{
//         ...student,
//         //with the isExpanded property toggled if it was false, it becomes true, and vice versa.
//         isExpanded: student.isExpanded ? false : true
//       }
//     }
//     return student
//    }))
//  }
 
//   function isButtonExpanded(clickedId)
//   {//search array for the student with an id that matches the clickedId
//     const student = data.find(student=> student.id === clickedId);
//     console.log(student.isExpanded);
//     return student.isExpanded ? '-' : '+';
    
//   }

//   return(
//       <div className='studentcontainer'>
//         <Input setSearchName={setSearchName}
//         searchName={searchName}/>
//         {data
//         .filter(i=>(i.firstName+" "+i.lastName).toLowerCase().includes(searchName.toLowerCase()))
//         .map(i=>{
//            const average = i.grades.map(Number).reduce((acc, grade) => acc + grade, 0) / (i.grades.length);
//          return (
//        <div>
//         <img className='img' src={i.pic}/>
//         <div className='text-details'>
//         <div className='name'>{i.firstName} {i. lastName}</div><br/>
//        Email: {i.email}<br/>
//        Company: {i.company}<br/>
//        Skill: {i.skill}<br/>
//        Average: {average}%<br/>
     
// <button onClick={()=>toggleShowGrades(i.id)}>{isButtonExpanded(i.id)}</button>
//        {i.isExpanded ? <ShowGrades grades={i.grades} /> : null}
//        </div>
//        </div>
//         )
//         })}
//         </div>
//     )

//  }


export default App;
