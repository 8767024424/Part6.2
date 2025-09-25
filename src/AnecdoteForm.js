import { useState } from 'react';

const AnecdoteForm = ({ createAnecdote, setNotification }) => {
  const [newAnecdote, setNewAnecdote] = useState('');

  const handleCreate = async (event) => {
    event.preventDefault();
    if (newAnecdote.length < 5) {
      setNotification('too short anecdote, must have length 5 or more');
      setTimeout(() => setNotification(''), 5000);
      return;
    }
    
    createAnecdote(newAnecdote);
    setNewAnecdote('');
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={handleCreate}>
        <input 
          value={newAnecdote}
          onChange={(e) => setNewAnecdote(e.target.value)}
        />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;