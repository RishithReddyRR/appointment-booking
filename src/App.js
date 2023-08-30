import React from 'react'
import ReactDOM from 'react-dom'
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/home';
import Login from './components/login';
import Profile from './components/profile';
import Appointment from './components/Appointment.jsx'
import Header from './components/header';
// import MyBooking from './components/MyBooking.jsx';
import MyBooking from './components/MyBooking';

function App() {
  return (
    <Router>
       <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login />}/>
        {/* <Route path='/profile' element={<Profile/>}/> */}
        <Route path='/book-appointment' element={<Appointment/>}/>
        <Route path='/myBooking' element={<MyBooking/>}/>
      </Routes>
    </Router>
  );
}

export default App;
