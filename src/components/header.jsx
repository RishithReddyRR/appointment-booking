import React from "react";
import "../css/header.css";
import { PiListBold } from "react-icons/pi";
import { AiFillCloseSquare } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../reducers/userReducer";
import { useNavigate } from "react-router-dom";

const drag = () => {
  document.getElementById("h1").style.display = "flex";
  document.querySelector(".head").style.top = 0;
  document.querySelector(".head").style.transition = "all .4s linear";
  document.querySelector(".close").style.display = "block";
  document.getElementById("h2").style.display = "none";
};
const collapse = () => {
  document.querySelector(".head").style.top = "-100vh";
  document.querySelector(".close").style.display = "none";
  document.getElementById("h2").style.display = "flex";
};
const pp = () => {
  document.querySelector(".p").style.display = "flex";
};

const Header = () => {
  let { users, isSuccess, isPending, isError, errorMessage } = useSelector(
    (state) => state.users
  );
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const logoutCall = () => {
    const action = logout();
    dispatch(action);
    localStorage.clear()
    navigate('/')
  };
 const cboth=()=>{
  logoutCall()
  collapse()
 }
  return (
    <>
      <div class="head" id="h1" style={{
        zIndex:'5'
      }}>
        <AiFillCloseSquare className="close" onClick={collapse} />
        <Link to="" onClick={collapse}>
          Home
        </Link>
        {isSuccess && <Link to="book-appointment" onClick={collapse}>
          Book Appointment
        </Link>}
        <div class="lr">
        {isSuccess && <Link to="myBooking" id="r" onClick={collapse}>
            my-appointments
          </Link>}
          {isSuccess == false ?<Link to="login" id="l" onClick={collapse}>
            Login
          </Link>:(
            <div className="logout">
              <button onClick={cboth} >Logout</button>
            </div>
          )}
        </div>
      </div>
      <PiListBold className="dd" onClick={drag} />
      <div class="head" id="h2">
        <Link to="">Home</Link>
        {isSuccess && <Link to="book-appointment">Book Appointment</Link>}
        <div class="lr">
          {isSuccess && (
            <Link to="myBooking" id="r">
              my-appointments
            </Link>
          )}
          {isSuccess == false ? (
            <Link to="login" id="l">
              Login
            </Link>
          ) : (
            <div className="logout">
              <button onClick={logoutCall}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
