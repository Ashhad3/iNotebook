import React ,{ useContext,useState}from 'react'
import contextValue from '../context/notes/NoteContext'

const Addnote = () => {
    const context = useContext(contextValue);
  const {addnote,showAlert,setFeature}= context;
  const [note, setnote] = useState({title:"",description:"",tag:"default"})
  const onchange=(e)=>{
    setnote({...note,[e.target.name]:e.target.value})
  }
  const handleclick=(e)=>{
    e.preventDefault();
    addnote(note.title,note.description,note.tag);
    setnote({title:"",description:"",tag:""})
    setFeature({success:"Success",message:"Note Added Successfully"})
            showAlert();
  }
    return (
        <div className="container my-3">
          <form>
  <div className="form-group my-2">
    <label htmlFor="title">Title</label>
    <input type="text" onChange={onchange} minLength={5} value={note.title} required className="form-control my-2" id="title" name="title" aria-describedby="emailHelp" placeholder="Enter Your Title"/>
   
  </div>
  <div className="form-group my-2">
    <label htmlFor="description">Description</label>
    <input type="text" onChange={onchange} minLength={5} value={note.description} required className="form-control" id="description" name="description" placeholder="Enter Your Description"/>
  </div>
  <div className="form-group my-2">
    <label htmlFor="tag">Tag</label>
    <input type="text" onChange={onchange} className="form-control" value={note.tag} id="description" name="tag" placeholder="Enter Your Tag"/>
  </div>
  <button disabled={note.title.length<5||note.description.length<5} type="submit" onClick={handleclick} className="btn btn-primary my-2">Add Note</button>
</form>
        </div>
    )
}

export default Addnote
