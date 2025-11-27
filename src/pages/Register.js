import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Registration successful — redirecting to login...');
        setTimeout(()=>navigate('/login'),1000);
      } else {
        setMessage(data.message || 'Registration failed');
      }
    } catch (err) {
      setMessage('Network error');
    }
  }

  return (
    <div style={{padding:20}}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} style={{maxWidth:400}}>
        <div>
          <label>Username</label>
          <input value={username} onChange={e=>setUsername(e.target.value)} required />
        </div>
        <div style={{marginTop:8}}>
          <label>Password</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        </div>
        <div style={{marginTop:12}}>
          <button type="submit">Create account</button>
        </div>
        {message && <p style={{marginTop:8}}>{message}</p>}
        <p style={{marginTop:8,fontSize:12}}>Demo rule: password must exactly match username to register.</p>
      </form>
    </div>
  );
}
