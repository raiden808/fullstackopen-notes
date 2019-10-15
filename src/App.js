import React, {useState} from "react";
import Note from "./components/Note";

const App = (props) => {

  const [notes,setNotes] = useState(props.notes)

  const addNote = (event) => {

  }

  const rows = () => notes.map(note => <Note key={note.id} note={note} />);

  return (
    <div>
      <h1>Notes</h1>
      <ul>{rows()}</ul>
      <form onSubmit={addNote}>
      	<input />
      	<button type="submit" >save</button>
      </form>
    </div>
  );
};

export default App;
