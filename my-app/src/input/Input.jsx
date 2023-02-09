import "./input.css";
import React, {useState, useEffect} from "react";

function Input({ searchName, setSearchName }){
   
    return(
<div> <input
        type='text'
        value={searchName}
        onChange={(e) => {
          setSearchName(e.target.value);
        }}
        placeholder='Search by Name'
      />
</div>
    )
}

export default Input;