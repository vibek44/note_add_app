import React,{ useState, useEffect } from "react";
import Note from "./component/note";
import Form from "./component/form";
import axios from "axios";

function App() {
  const [notes,setNotes]=useState([]);
  const [newNote, setNewnote]=useState("");
  const [showAll, setshowAll]=useState(undefined);

  const notestoShow = showAll ? notes.filter(note=>note.important) : notes

  const handleShow=(e)=>setshowAll(!showAll)

  const handleChange=(e)=>{
    setNewnote(e.target.value);
  }

  const addNote=(e)=>{
    e.preventDefault();
    if(newNote){
      const note={ 
        content:newNote,
        date:new Date().toISOString(),
        important:Math.random()>0.50 
      }
      axios.post("http://localhost:3001/notes",note)
      .then((res)=>{
        setNotes([...notes,res.data]);  //notes.concat(note)
        setNewnote("")
      })
  
    }
  }

  useEffect(()=>{
    axios.get("http://localhost:3001/notes") 
      .then(res=>setNotes(res.data))
  },[]) 
   
  return (
   <div >
    <h1>Notes</h1>

    { notestoShow.map((note)=><Note key={note.id} note={note} />
     )}

    <button onClick = {handleShow}>show { (showAll ? "all" : "important") }</button>

    <Form  addNote={addNote} newNote={newNote} handleChange={handleChange}/>
   
    </div>
  );
}

export default App;
