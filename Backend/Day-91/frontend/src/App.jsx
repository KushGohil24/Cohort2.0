import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react';
const App = () => {
  const [notes, setnotes] = useState([
    {
      title: "test title 1",
      description: "test description 1"
    },
    {
      title: "test title 2",
      description: "test description 2"
    },
    {
      title: "test title 3",
      description: "test description 3"
    },
  ]);
  useEffect(()=>{
    axios.get("http://localhost:3000/api/notes")
    .then((res)=>{
      setnotes(res.data.notes)
    })
  }, [])
  return (
    <div className='notes'>
      {
        notes.map(note => {
          return <div className='note'>
            <h1>{note.title}</h1>
            <p>{note.description}</p>
          </div>
        })
      }
    </div>
  )
}

export default App
