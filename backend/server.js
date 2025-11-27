require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

async function getConnection(){
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "d4bfe67c",
    database: "bookstore" 
  });
  return conn;
}

app.post('/api/register', async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ message: 'username and password required' });
  if (username !== password) return res.status(400).json({ message: 'For this demo, password must exactly match username' });

  try{
    const conn = await getConnection();
    const [rows] = await conn.execute('SELECT id FROM users WHERE username = ?', [username]);
    if (rows.length > 0) {
      await conn.end();
      return res.status(400).json({ message: 'User already exists' });
    }
    await conn.execute('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
    await conn.end();
    return res.json({ message: 'registered' });
  }catch(err){
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ message: 'username and password required' });

  try{
    const conn = await getConnection();
    const [rows] = await conn.execute('SELECT id FROM users WHERE username = ? AND password = ?', [username, password]);
    await conn.end();
    if (rows.length === 0) return res.status(401).json({ message: 'Invalid credentials' });
    return res.json({ message: 'ok' });
  }catch(err){
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/books', async (req, res) => {
  try{
    const conn = await getConnection();
    const [rows] = await conn.execute('SELECT id, title, author FROM books ORDER BY id');
    await conn.end();
    return res.json(rows);
  }catch(err){
    console.error(err);
    return res.status(500).json([]);
  }
});

app.post('/api/books', async (req, res) => {
  const { title, author } = req.body || {};
  if (!title || !author) return res.status(400).json({ message: 'title and author required' });
  try{
    const conn = await getConnection();
    const [result] = await conn.execute('INSERT INTO books (title, author) VALUES (?, ?)', [title, author]);
    const insertId = result.insertId;
    const [rows] = await conn.execute('SELECT id, title, author FROM books WHERE id = ?', [insertId]);
    await conn.end();
    return res.status(201).json(rows[0]);
  }catch(err){
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

app.listen(PORT, ()=>{
  console.log('Backend listening on', PORT);
});
