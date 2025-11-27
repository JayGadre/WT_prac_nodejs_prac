import React from 'react';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Catalogue from './pages/Catalogue';
import AddBook from './pages/AddBook';

function App() {
  return (
    <div className="App">
      <nav className="navbar">
        <div className="nav-left">
          <Link to="/" className="brand">Simple Bookstore</Link>
        </div>
        <div className="nav-right">
          <Link to="/catalogue">Catalogue</Link>
          <Link to="/add-book">Add Book</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Sign Up</Link>
        </div>
      </nav>

      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/add-book" element={<AddBook />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
