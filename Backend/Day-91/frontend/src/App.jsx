import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import {CirclePlus, CircleX, Pencil} from "lucide-react";

const App = () => {
  const [notes, setnotes] = useState([]);
  function fetchNotes(){
    axios.get("http://localhost:3000/api/notes").then((res) => {
      setnotes(res.data.notes);
    });
  }
  useEffect(() => {
    fetchNotes();
  }, []);
  function handleSubmit(e){
    e.preventDefault();
    const {title, description} = e.target;
    if(title.value === '' || description.value === ''){
      return alert('Title or Description is empty.');
    }
    axios.post("http://localhost:3000/api/notes",{
      title: title.value,
      description: description.value
    })
    .then((res)=>{
      // console.log(res);
      fetchNotes();
    })
    title.value = '';
    description.value = '';
  }
  function handleDelete(noteId){
    const wantTo = confirm("Are you want to delete this note");
    if(wantTo){
      axios.delete(`http://localhost:3000/api/notes/${noteId}`)
      .then((res)=>{
        fetchNotes();
      })
    }else{
      return ;
    }
  }
  function handleEdit(noteId){
    const newDesc = prompt("Enter new description : ");
    console.log(newDesc, noteId);
    if(newDesc  || newDesc.trim() !== ''){
      axios.patch(`http://localhost:3000/api/notes/${noteId}`, {
        description: newDesc
      })
      .then((res)=>{
        console.log(res.data);
        fetchNotes();
      })
    }else{
      return ;
    }
  }
  return (
    <>
      <form className="note-form" onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Enter note title"/>
        <input type="text" name="description" placeholder="Enter note description"/>
        <button>Create note <CirclePlus/></button>
      </form>
      <div className="notes">
        {notes.map((note, idx) => {
          return (
            <div className="note" id={idx}>
              <div className="inner">
                <h1>{note.title}</h1>
                <p>{note.description}</p>
              </div>
              <div className="btns">
                <button className="delete-btn" onClick={()=>handleDelete(note._id)}><CircleX/></button>
                <button className="edit-btn" onClick={()=>handleEdit(note._id)}><Pencil/></button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;
