import React from 'react'
import '../css/profile.css'
import { AiFillCloseSquare } from "react-icons/ai";
import { Link } from 'react-router-dom';
const register = () => {
  const pgo=()=>{
    document.querySelector(".p").style.display="none";
  }
  return (
    <>
    <div className="p">
    <AiFillCloseSquare style={{
      fontSize:"2vmax",
      position:"relative",
    }} onClick={pgo}/>
      <div>email:</div>
      <div>

      <Link to="my-booking" onClick={pgo}>my-appointments</Link>
      </div>
      
    </div>
    </>
  )
}

export default register