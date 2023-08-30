import axios from 'axios'
import React, { useState } from 'react'
import {SyncLoader} from 'react-spinners'

import '../css/booking.css'
import '../const.js';
const Booking = ({timeSlots,id,date,email,setApp,app}) => {
    let [l,setL]=useState(false)
    const cancel=async()=>{
        if(!window.confirm("are you sure of deleting slot?"))
        return ;
        setL(true)
        const {data}=await axios.post(`${global.url}booking/cancel-booking`,{
            date:date,
            slotIdx:id,
            email:email
        })
        setL(false)
        if(data.message=="booking cancelled"){
            const newApp=app.filter(booking=>{return (booking[1]!=id)&&(booking[0]!=date)})
            setApp(newApp)
            alert(`your appoint on ${date} is cancelled`)
            document.querySelector('.app-disp').style.display="none"
        }
        else{
            alert("unable to cancel")
        }
    }
  return (
    
    <div className='book-sc'>
        <div className="booking">
            <p>appointment-date:{date}</p>
            <p>appointment-time:{timeSlots.get(id)}</p>
        </div>
        <div className="cancel-appointment">
            {l?<SyncLoader cssOverride={{marginLeft:"7vmax"}} color={"red"} style={{marginBottom:"50vh"}} size={"1vmax"}   />:(<button onClick={cancel}>
                cancel appointment
            </button>)}
            
        </div>
    </div>
  )
}

export default Booking