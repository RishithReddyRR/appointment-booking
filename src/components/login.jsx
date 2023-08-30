import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css";
import axios from "axios";
import { fetchUsers } from "../reducers/userReducer";
import { useSelector,useDispatch } from "react-redux";
import {HashLoader} from 'react-spinners'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../const.js';
const Login = () => {
  const [email, setEmail] = useState(null);
  const [otp, setOtp] = useState(null);
  const [status, setStatus] = useState("Failure");
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const dispatch=useDispatch()
  let{users,isSuccess,isPending,isError,errorMessage}=useSelector(state=>state.users)
  const getCreds = async () => {
    setLoad(true)
    const { data } = await axios.post(`${global.url}auth/login`, {
      email: email,
    });
    setLoad(false)
    setStatus(data.message);
    if(data.message=="Success"){
      toast.success("otp sent",{
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        })
    }
    else{
      toast.error("otp not sent", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        })
    }
    console.log(data);
  };
  const verifyOtp = async () => {
   let action=fetchUsers({
    url:`${global.url}auth/verify-otp`,
    payload:{
      email,otp
    }
   })
   dispatch(action)
   
  };
  if(isSuccess )
   navigate('/book-appointment')
  return (
    <>
      <div className="login">
        <div class="form">
          <div className="email">
            <input
              type="email"
              placeholder="email"
              onChange={(email) => {
                console.log(email.target.value);
                setEmail(email.target.value);
              }}
            />
          <div className="gotp">
           { load?<HashLoader cssOverride={{marginLeft:"9vmax"}} color={"red"}/>:<button onClick={getCreds}>get otp</button>}
          </div>
          </div>
          <div className="password">
            {status == "Success" ? (
              <input
                type="number"
                placeholder="otp"
                onChange={(e) => {
                  setOtp(e.target.value);
                }}
              />
            ) : (
              <input type="number" placeholder="otp" disabled />
            )}
          <div className="blogin">
            {status == "Success" ? (
              <button type="submit" onClick={verifyOtp}>
                login
              </button>
            ) : (
              <button type="submit" disabled>
                login
              </button>
            )}
          </div>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </>
  );
};

export default Login;
