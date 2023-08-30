import React from 'react'
import '../css/slot.css'
import axios from 'axios'
const Slot = ({slot,booked,idx,selected,setSelected}) => {
 const select=()=>{
  let color=document.getElementById(idx).style.backgroundColor;
  if(color=="red"){
    alert("This slot is already booked")
  }
  else{
    if (selected==idx){
      setSelected(null)
    }
    else{
    setSelected(idx)
    }

      
    // document.getElementById(idx).style.backgroundColor="yellow"
  }
 }
 
  return (
    <>
     <div className='slot'style={{
      border: "1px solid black",
      padding:"1vmax",
      width: "3vmax",
      textAlign: "center",
      borderRadius: "1vmax",
      backgroundColor:selected==idx?"yellow": booked==null?"green":"red",
      color:selected==idx?"red":"white"
     }} 
     id={idx}
     onClick={select}> {`${slot}`}</div>
    </>
  )
}

export default Slot