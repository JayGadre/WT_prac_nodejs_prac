import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok) {
        // succesful login -> go to catalogue
        navigate('/catalogue');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error');
    }
  }

  return (
    <div style={{padding:20}}>
      <h2>Login</h2>
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
          <button type="submit">Login</button>
        </div>
        {error && <p style={{color:'red'}}>{error}</p>}
        <p style={{marginTop:8,fontSize:12}}>For this demo, registration enforces the password to match the username.</p>
      </form>
    </div>
  );
}
