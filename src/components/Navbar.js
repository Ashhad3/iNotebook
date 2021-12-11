import React, {useContext} from 'react'
import contextValue from '../context/notes/NoteContext'
import {Link, useLocation} from "react-router-dom";

export default function Navbar() {
const location = useLocation();
const context = useContext(contextValue);
  const {setFeature,showAlert}= context;
const alert = ()=>{
  setFeature({success:"Success",message:"Loged Out Successfully"})
  showAlert();
  localStorage.removeItem('token')
}
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link to={`${localStorage.getItem('token')?"/":"/login"}`} className="navbar-brand">iNotebook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link to={`${localStorage.getItem('token')?"/":"/login"}`} className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" >Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
        </li>
       
      </ul>

      <div className="d-flex">
        {localStorage.getItem('token')&&<Link to="/login" onClick={alert} className="btn btn-primary mx-1" role="button" >Logout</Link>}
        <Link to="/login" className={`btn btn-primary mx-1 ${localStorage.getItem('token')?"d-none":""}`} role="button" >Log In</Link>
        <Link to="/signup" className={`btn btn-primary mx-1 ${localStorage.getItem('token')?"d-none":""}`} role="button">Sign Up</Link>
      </div>
    </div>
  </div>
</nav>
    )
}
