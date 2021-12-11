import React, { useContext,useRef,useState } from "react";
import Noteitem from "./Noteitem";
import contextValue from "../context/notes/NoteContext";
const Notes = (props) => {
  const context = useContext(contextValue);
  const [note, setnote] = useState({etitle:"",edescription:"",etag:"default",id:""})

  const { notes,editnote,showAlert,setFeature} = context;
const closeref = useRef(null)

  const onchange=(e)=>{
      setnote({...note,[e.target.name]:e.target.value})
    }
    const updateNote=(currentnote)=>{
        setnote({etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag,id:currentnote._id})
        closeref.current.click();
    }
      const handleclick=(e)=>{
        e.preventDefault();
        closeref.current.click();
        editnote(note.etitle,note.edescription,note.etag,note.id)
        setFeature({success:"Success",message:"Edit Successfully"})
        showAlert();
  }
  return (
    <>
      <button
        type="button"
        ref={closeref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Launch
      </button>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">

            <div className="container my-3">
          <form>
  <div className="form-group my-2">
    <label htmlFor="etitle">Title</label>
    <input type="text" onChange={onchange} minLength={5} required value={note.etitle} className="form-control my-2" id="etitle" name="etitle" aria-describedby="emailHelp" placeholder="Enter Your Title"/>
   
  </div>
  <div className="form-group my-2">
    <label htmlFor="edescription">Description</label>
    <input type="text" onChange={onchange} minLength={5} required value={note.edescription} className="form-control" id="edescription" name="edescription" placeholder="Enter Your Description"/>
  </div>
  <div className="form-group my-2">
    <label htmlFor="etag" >Tag</label>
    <input type="text" onChange={onchange}  value={note.etag} className="form-control" id="etag" name="etag" placeholder="Enter Your Tag"/>
  </div>
  
</form>
        </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
               
              >
                Close
              </button>
              <button type="button"className="btn btn-primary" disabled={note.etitle.length<5||note.edescription.length<5} onClick={handleclick}>
                Done!
              </button>
            </div>
          </div>
        </div>
      </div>







      <div className="container my-5">
        <div className="row">
          {notes.length===0 &&"No Notes to show"}
          {notes.map((note) => {
            return <Noteitem key={note._id} note={note} updateNote={updateNote}/>;
          })}
        </div>
      </div>
    </>
  );
};

export default Notes;
