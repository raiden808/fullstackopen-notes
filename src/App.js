import React, {useState, useEffect} from "react";
import axios from 'axios'
import Note from "./components/Note";

const App = (props) => {
  const [notes,setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll,setShowAll] = useState(true)

  useEffect(()=>{
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        setNotes(response.data)
      })
  }, [])

  const toggleImportance = id =>{
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    axios.put(url, changedNote).then(response => {
      setNotes(notes.map(note => note.id !== id ? note : response.data))
    })

    console.log(
      `importance of ${id} needs to be toggled`
    )
  }

  const addNote = (event) => {
    event.preventDefault()

    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5
    }

    axios
      .post('http://localhost:3001/notes', noteObject)
      .then(response => {
        setNotes(notes.concat(response.data))
        setNewNote('')
      })

  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  const rows = () => notesToShow.map(note => 
    <Note 
      key={note.id} 
      note={note} 
      toggleImportance={()=>toggleImportance(note.id)}
    />
  );

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>{rows()}</ul>
      <form onSubmit={addNote}>
      	<input 
          value={newNote} 
          onChange={handleNoteChange}
        />
      	<button type="submit" >save</button>
      </form>
    </div>
  );
};

export default App;
