import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Books from './pages/Books';
import Authors from './pages/Authors';
import Users from './pages/Users';
import './App.css';

const App = () => {
  return (
    <div>
      <header>
        <h1>Biblioteca</h1>
        <nav>
          <ul>
            <li><Link to="/books">Livros</Link></li>
            <li><Link to="/authors">Autores</Link></li>
            <li><Link to="/users">Usuários</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/books" element={<Books />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
