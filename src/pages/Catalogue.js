import React, { useEffect, useState } from 'react';

export default function Catalogue(){
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    async function load(){
      try{
        const res = await fetch('/api/books');
        const data = await res.json();
        if (res.ok) setBooks(data);
      }catch(e){
        console.error(e);
      }finally{setLoading(false)}
    }
    load();
  },[]);

  if (loading) return <div style={{padding:20}}>Loading...</div>;

  return (
    <div style={{padding:20}}>
      <h2>Catalogue</h2>
      {books.length===0 && <p>No books available.</p>}
      <ul>
        {books.map(b=> (
          <li key={b.id} style={{marginBottom:8}}>
            <strong>{b.title}</strong> — {b.author}
          </li>
        ))}
      </ul>
    </div>
  );
}
