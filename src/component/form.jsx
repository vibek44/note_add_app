const Form=({addNote,newNote,handleChange})=> <form onSubmit={addNote}>
  <input type="text"  value={newNote} onChange={handleChange}/>
  <button type="submit">save</button>
</form>

export default Form;