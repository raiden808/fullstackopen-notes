import React, {useState} from "react";
import Note from "./components/Note";

const App = (props) => {

  const [notes,setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState(
    'a new note...'
  )

  const addNote = (event) => {
    event.preventDefault()

    console.log('button clicked', event.target)
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const rows = () => notes.map(note => <Note key={note.id} note={note} />);

  return (
    <div>
      <h1>Notes</h1>
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
