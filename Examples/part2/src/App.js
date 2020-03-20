import React, { useState } from 'react'
import Note from './components/Note'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNEwNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)

  const notesToSow = showAll ? notes : notes.filter(note => note.important)

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNEwNote(event.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      import: Math.random() > 0.5,
      id: notes.length + 1
    }

    setNotes(notes.concat(noteObject))
    setNEwNote('')
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToSow.map((note, i) =>
          <Note key={i} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type='submit'>Save</button>
      </form>
    </div>
  )
}

export default App
