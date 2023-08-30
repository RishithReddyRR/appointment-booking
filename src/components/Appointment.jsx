import React, { useState, useEffect } from "react";
import {SyncLoader} from 'react-spinners'

import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import "../css/appointment.css";
import Slot from "./Slot";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../const.js';
const Appointment = () => {
  let { users } = useSelector((state) => state.users);
  const [startDate, setStartDate] = useState(new Date());
  let yyyy = startDate.getFullYear();
  let mm = startDate.getMonth() + 1; // Months start at 0!
  let dd = startDate.getDate();
  const minDate = new Date();
  const [slots, setSlots] = useState(["h", "h", "h", "h", "h", "h"]);
  const [dfs, setDfs] = useState(
    minDate.getDate() +
      "-" +
      (minDate.getMonth() + 1) +
      "-" +
      minDate.getFullYear()
  );
  const [selected, setSelected] = useState(null);
  const timeSlots = new Map([
    [0, "10-11"],
    [1, "11-12"],
    [2, "12-13"],
    [3, "14-15"],
    [4, "15-16"],
    [5, "16-17"],
  ]);
  useEffect(() => {
    setslots();
  }, []);
  const setslots = async () => {
    const { data } = await axios.get(
      `${global.url}booking/get-empty-slots?date=${dd}-${mm}-${yyyy}`
    );
    if (data.message != "No Slot Available") {
      setSlots(data.payload);
    } else {
    }
  };

  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0;
  };

  const fetSlots = async (date) => {
    setStartDate(date);

    yyyy = date.getFullYear();
    mm = date.getMonth() + 1; // Months start at 0!
    dd = date.getDate();

    const formattedDate = dd + "-" + mm + "-" + yyyy;
    setDfs(formattedDate);
    console.log(formattedDate);
    const { data } = await axios.get(
      `${global.url}booking/get-empty-slots?date=${formattedDate}`
    );
    if (data.message == "No Slot Available") {
      console.log(data.message);
      console.log(date.getDay);
      alert(data.message);
      setSlots(["h", "h", "h", "h", "h", "h"]);
    } else {
      setSlots(data.payload);
      // console.log(data.payload)
    }
  };
  let [l,setL]=useState(false)
  const bookSlots = async () => {
    setL(true)
    let res = await axios.post(`${global.url}booking/book-slot`, {
      date: dfs,
      slotIdx: selected,
      email: users.isNewuser.email,
    });
    setL(false)
    res = res.data;
    if (res.message == "booking confirm") {
      slots[selected] = 3;
      setSlots(slots);
      // alert("booking confirm");
      toast.success("booking confirmed",{
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        })
      setSelected(null);
    } else {
      // alert("booking unsuccessful");
      toast.error("booking unsuccessfull", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        })
      document.getElementById(selected).style.backgroundColor = "green";
    }
  };
  const ss = () => {
    alert("select slot first");
  };
  console.log(slots);

  console.log(startDate.getDate());
  console.log(startDate.getFullYear());
  console.log(startDate.getMonth());

  return (
    <div className="appoint">
      <div className="cal">
        <div className="dpick">
          <p>
            select date for appointment<b style={{ color: "red" }}>*</b>
          </p>
          <DatePicker
            selected={startDate}
            onChange={fetSlots}
            filterDate={isWeekday}
            minDate={minDate}
            showIcon
            className="dp"
          />
        </div>
        <div className="sbook">
          <p class="f-i">
            select a slot with green color <b style={{ color: "red" }}>*</b>
          </p>
          <p class="f-i">
            (must select a slot to enable appointment booking button and below
            slots are in 24hrs format)
          </p>
          <div className="slot-disp">
            <div className="slots">
              {slots &&
                slots.length == 6 &&
                slots.map((ele, idx) => {
                  return (
                    <div key={idx}>
                      <Slot
                        slot={timeSlots.get(idx)}
                        booked={ele}
                        idx={idx}
                        selected={selected}
                        setSelected={setSelected}
                      />
                    </div>
                  );
                })}
            </div>
            <div className="indicator">
              <div className="red">booked</div>
              <div className="green">Available</div>
              <div className="pink">selected</div>
            </div>
          </div>
        </div>
        <div className="bapp">
         {l?<SyncLoader cssOverride={{marginLeft:"7vmax"}} color={"red"} style={{marginBottom:"50vh"}} size={"1vmax"}   />:(selected == null ? (
            <button onClick={ss}>Book Appointment</button>
          ) : (
            <button onClick={bookSlots}>Book Appointment</button>
          ))}
          {/* {selected == null ? (
            <button onClick={ss}>Book Appointment</button>
          ) : (
            <button onClick={bookSlots}>Book Appointment</button>
          )} */}
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Appointment;
