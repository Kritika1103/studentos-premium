function NotesPanel({ notes, noteInput, setNoteInput, addNote, deleteNote }) {
  return (
    <section className="panel-card">
      <div className="panel-head">
        <h3>Quick Notes 📝</h3>
      </div>

      <div className="input-row">
        <input
          type="text"
          className="panel-input"
          placeholder="Write a quick note..."
          value={noteInput}
          onChange={(e) => setNoteInput(e.target.value)}
        />
        <button className="panel-btn" onClick={addNote}>
          Add
        </button>
      </div>

      <div className="list-wrap">
        {notes.map((note) => (
          <div className="list-item" key={note.id}>
            <span>{note.text}</span>
            <button className="delete-btn" onClick={() => deleteNote(note.id)}>
              ×
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default NotesPanel;
