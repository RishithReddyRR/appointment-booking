import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Booking from './Booking'
import '../css/MyBooking.css'
import '../const.js';
const MyBooking = () => {
    const {users}=useSelector(state=>state.users)
    let [app,setApp]=useState([12,23])
    const showApp=async()=>{
        const {data}=await axios.post(`${global.url}booking/my-bookings`,{
            email:users.isNewuser.email
        })
        setApp(data.booking)
        document.querySelector('.app-disp').style.display="flex"
    }
    const timeSlots = new Map([
        [0, "10-11"],
        [1, "11-12"],
        [2, "12-13"],
        [3, "14-15"],
        [4, "15-16"],
        [5, "16-17"]
      ]);
  return (
    <>
    <div className="app">
    <div className="mail">
    <p>email:{users.isNewuser.email}</p>
    </div>
    <div className="my-appointments">
        <button onClick={showApp}>show my appointments</button>
    </div>
    <div className="app-disp">
        {
            app.map(booking=>{
                return <Booking timeSlots={timeSlots} id={booking[1]} date={booking[0]} email={users.isNewuser.email} setApp={setApp} app={app}/>
            })
        }
    </div>
    </div>
   
    </>
  )
}

export default MyBooking