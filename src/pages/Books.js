import React, { useState } from 'react';
import CrudTable from '../components/crudTable/CrudTable';
import CrudForm from '../components/crudForm/CrudForm';

const initialBooks = [
  { id: 1, titulo: 'Livro A', descricao: 'Descrição A', 'ano-de-publicacao': '2000', genero: 'Ficção', 'quantidade-em-estoque': 10 },
  { id: 2, titulo: 'Livro B', descricao: 'Descrição B', 'ano-de-publicacao': '2010', genero: 'Drama', 'quantidade-em-estoque': 5 },
];

const Books = () => {
  const [books, setBooks] = useState(initialBooks);
  const [editingBook, setEditingBook] = useState(null);

  const handleEdit = (id) => {
    const book = books.find((b) => b.id === id);
    setEditingBook(book);
  };

  const handleDelete = (id) => {
    setBooks(books.filter((b) => b.id !== id));
  };

  const handleSave = (book) => {
    if (book.id) {
      setBooks(books.map((b) => (b.id === book.id ? book : b)));
    } else {
      book.id = books.length + 1;
      setBooks([...books, book]);
    }
    setEditingBook(null);
  };

  const handleCancel = () => {
    setEditingBook(null);
  };

  return (
    <div>
      <h1>Livros</h1>
      <CrudTable
        data={books}
        columns={['titulo', 'descricao', 'ano-de-publicacao', 'genero', 'quantidade-em-estoque']}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <h2>{editingBook ? 'Editar Livro' : 'Adicionar Livro'}</h2>
      <CrudForm
        initialData={editingBook || { titulo: '', descricao: '', 'ano-de-publicacao': '', genero: '', 'quantidade-em-estoque': '' }}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default Books;
