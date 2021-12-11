import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const [notes, setNotes] = useState([]);

  async function Getnotes() {
    let url = `${host}/api/notes/fetchallnotes`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
    });
    const json = await response.json();
    setNotes(json);
  }



  const addnote = async (title, description, tag,id) => {
    
    let url = `${host}/api/notes/addnote`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag}),
    });
    const json = await response.json();
    console.log(json);
      // setNotes({...notes,json})

    setNotes(notes.concat(json));
  };



  //To delete note on data base + client site

  const deletenote = async (id) => {
    let url = `${host}/api/notes/deletenote/${id}`;

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
    });
    const json = await response.json();
    console.log(json);
    //   setNotes(json)

    const deleted = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(deleted);
  };




  //To update note on data base + client site
  const editnote = async (title, description, tag, id) => {
    let url = `${host}/api/notes/updatenote/${id}`;
console.log(id)
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json)

    let NewNotes = JSON.parse(JSON.stringify(notes))
    //logic to edit in client 
    for(let index=0;index<NewNotes.length;index++){
      const element =NewNotes[index];
      if(element._id===id){
        NewNotes[index].title=title;
        NewNotes[index].description=description;
        NewNotes[index].tag=tag;

        break;
      }
    }
    setNotes(NewNotes);
  };



  const [feature, setFeature] = useState({success:"",message:""});
  const showAlert = () => {
    
    let alert = document.getElementById("alert");

    alert.style.visibility = "visible";
    setTimeout(() => {
      alert.style.visibility = "hidden";
    }, 1500);
  
  };

  
  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addnote, deletenote, editnote, Getnotes, showAlert,feature,setFeature }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
