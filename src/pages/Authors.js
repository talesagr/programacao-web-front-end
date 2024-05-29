import React, { useState } from 'react';
import CrudTable from '../components/crudTable/CrudTable';
import CrudForm from '../components/crudForm/CrudForm';

const initialAuthors = [
  { id: 1, nome: 'Autor A', biografia: 'Bio A', 'data-nascimento': '2000-01-01', nacionalidade: 'Brasileiro' },
  { id: 2, nome: 'Autor B', biografia: 'Bio B', 'data-nascimento': '1980-05-15', nacionalidade: 'Americano' },
];

const Authors = () => {
  const [authors, setAuthors] = useState(initialAuthors);
  const [editingAuthor, setEditingAuthor] = useState(null);

  const handleEdit = (id) => {
    const author = authors.find((a) => a.id === id);
    setEditingAuthor(author);
  };

  const handleDelete = (id) => {
    setAuthors(authors.filter((a) => a.id !== id));
  };

  const handleSave = (author) => {
    if (author.id) {
      setAuthors(authors.map((a) => (a.id === author.id ? author : a)));
    } else {
      author.id = authors.length + 1;
      setAuthors([...authors, author]);
    }
    setEditingAuthor(null);
  };

  const handleCancel = () => {
    setEditingAuthor(null);
  };

  return (
    <div>
      <h1>Autores</h1>
      <CrudTable
        data={authors}
        columns={['nome', 'biografia', 'data-nascimento', 'nacionalidade']}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <h2>{editingAuthor ? 'Editar Autor' : 'Adicionar Autor'}</h2>
      <CrudForm
        initialData={editingAuthor || { nome: '', biografia: '', 'data-nascimento': '', nacionalidade: '' }}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default Authors;
