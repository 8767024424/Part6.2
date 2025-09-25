import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Notification from './Notification';
import AnecdoteForm from './AnecdoteForm';

const App = () => {
  const [anecdotes, setAnecdotes] = useState([]);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/anecdotes')
      .then(response => {
        setAnecdotes(response.data);
      })
      .catch(error => {
        setNotification('Failed to fetch anecdotes from the server.');
        setTimeout(() => setNotification(''), 5000);
      });
  }, []);

  const createAnecdote = async (content) => {
    try {
      const newObject = { content, votes: 0 };
      const response = await axios.post('http://localhost:3001/anecdotes', newObject);
      setAnecdotes(anecdotes.concat(response.data));
      setNotification(`Anecdote '${content}' added successfully.`);
      setTimeout(() => setNotification(''), 5000);
    } catch (error) {
      setNotification('Error creating anecdote.');
      setTimeout(() => setNotification(''), 5000);
    }
  };

  const vote = async (id) => {
    const anecdote = anecdotes.find(a => a.id === id);
    if (!anecdote) return;
    
    try {
      const updatedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1
      };
      const response = await axios.put(`http://localhost:3001/anecdotes/${id}`, updatedAnecdote);
      setAnecdotes(anecdotes.map(a => a.id !== id ? a : response.data));
    } catch (error) {
      setNotification('Error voting for anecdote.');
      setTimeout(() => setNotification(''), 5000);
    }
  };

  return (
    <div>
      <h1>Anecdote app</h1>
      <Notification message={notification} />
      <AnecdoteForm 
        createAnecdote={createAnecdote} 
        setNotification={setNotification} 
      />
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;