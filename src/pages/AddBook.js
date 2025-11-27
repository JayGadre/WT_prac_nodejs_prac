import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddBook(){
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e){
    e.preventDefault();
    setMessage('');
    try{
      const res = await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, author })
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Book added. Redirecting to catalogue...');
        setTimeout(()=>navigate('/catalogue'),800);
      } else {
        setMessage(data.message || 'Failed to add book');
      }
    }catch(err){
      setMessage('Network error');
    }
  }

  return (
    <div style={{padding:20}}>
      <h2>Add a Book</h2>
      <form onSubmit={handleSubmit} style={{maxWidth:480}}>
        <div>
          <label>Title</label>
          <input value={title} onChange={e=>setTitle(e.target.value)} required />
        </div>
        <div style={{marginTop:8}}>
          <label>Author</label>
          <input value={author} onChange={e=>setAuthor(e.target.value)} required />
        </div>
        <div style={{marginTop:12}}>
          <button type="submit">Add Book</button>
        </div>
        {message && <p style={{marginTop:8}}>{message}</p>}
      </form>
    </div>
  );
}
