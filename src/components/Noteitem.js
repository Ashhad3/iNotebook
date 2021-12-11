import React, { useContext } from "react";
import contextValue from "../context/notes/NoteContext";

function Noteitem(props) {
  const context = useContext(contextValue);
  const { deletenote,setFeature,showAlert} = context;
  const { note,updateNote } = props;
const alert = ()=>{
  setFeature({success:"Success",message:"Note Deleted Successfully"})
  showAlert();
}
  return (
    <>
     

      <div className="card col-md-3">
        <div className="card-body">
          <div className="d-flex ">
            <h5 className="card-title">{note.title}</h5>
            <div className="container d-flex justify-content-end">
            <i
              style={{ cursor: "pointer" }}
              className="fas fa-trash-alt mx-2 pt-1"
              onClick={() => {
                deletenote(note._id);alert()
              }}
            ></i>
            <i style={{ cursor: "pointer"}} onClick={()=>{updateNote(note)}} className="fas fa-edit pt-1"></i>
            </div>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </>
  );
}

export default Noteitem;
