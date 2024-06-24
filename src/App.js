import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Books from './pages/Books'
import Authors from './pages/Authors'
import BookDetail from './components/book/bookDetail.js';
import AuthorDetail from './components/author/authorDetail';
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
          </ul>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path='/books/:id' Component={<BookDetail/>}/>
          <Route path="/authors/:id" element={<AuthorDetail />} />
          <Route path="/books" element={<Books />} />
          <Route path="/authors" element={<Authors />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
