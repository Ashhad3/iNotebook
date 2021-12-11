import React,{useEffect,useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import contextValue from '../context/notes/NoteContext'
import Addnote from './Addnote';
import Notes from './Notes';

export const Home = () => {
  const context = useContext(contextValue);
  const {Getnotes}= context;
  const navigate = useNavigate();
useEffect(() => {
  if(localStorage.getItem('token')){
    Getnotes();
  }
  else{
    navigate("/login");
  }
 // eslint-disable-next-line
}, [])
  return (
    <>
        <Addnote/>
       <Notes/>
        
        </>
  )
}

