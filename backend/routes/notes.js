const express = require('express')
const Note = require('../models/Note')
const router = express.Router()
const { body, validationResult } = require('express-validator');

var fetchuser= require('../middleware/fetchuser')

//Route:1 GET all notes using: localhost:5000//api/notes/fetchallnotes   login required
router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    try {
    const notes = await Note.find({user:req.user.id})
    res.json(notes);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Some internal error form server");
      }
})



//Route 2: POST add notes using: localhost:5000/api/notes/addnote  login required

router.post('/addnote',[
    // username must be an email
 body('title','Title must of 3 character').isLength({min:3}),
 body('description','description must of atleast 5 character').isLength({min:5})
],fetchuser,async(req,res)=>{
    try {
    
        const {title ,description,tag}=req.body;
        const errors = validationResult(req);
          //If there is error return bad request
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id 
        })
        const savedNote= await note.save();
        res.json(savedNote)
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Some internal error form server");
      }
})


//Route 2: PUT update notes using: localhost:5000/api/notes/updatenote/:id  login required
router.put('/updatenote/:id',fetchuser,async (req,res)=>{
  const {title ,description,tag}=req.body;
  try {
    
//Create a new note object
  const newNote={};
  if (title) {
    newNote.title=title;
  }
  if (description) {
    newNote.description=description;
  }
  if (tag) {
    newNote.tag=tag;
  }

  //Find new notes to update it
  let note = await Note.findById(req.params.id);
  if (!note) {
    return res.status(404).send("Not Found");
  }
  //Allow updation only if user own this note
  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not Allowed");
  }

  note = await Note.findByIdAndUpdate(req.params.id, {$set:newNote},{new:true})
  res.json({note});

}
catch (error) {
  console.log(error);
  res.status(500).send("Some internal error form server");
}
})



//Route 4: DELETE delete notes using: localhost:5000/api/notes/deletenote/:id  login required
router.delete('/deletenote/:id',fetchuser,async (req,res)=>{

  try {
    //Find new notes to update it
  let note = await Note.findById(req.params.id);
  if (!note) {
    return res.status(404).send("Not Found");
  }
  //Allow updation only if user own this note
  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not Allowed");
  }

  note = await Note.findByIdAndDelete(req.params.id)
  res.json({"Success":"Note has been deleted Successfully",note:note});
  } 
  
  catch (error) {
    console.log(error);
    res.status(500).send("Some internal error form server");
  }
  
})
module.exports = router