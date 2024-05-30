import React, { useEffect, useState } from 'react';
import CrudTable from '../components/crudTable/CrudTable';
import CrudForm from '../components/crudForm/CrudForm';
import {getAuthors, createAuthor, updateAuthor, deleteAuthor } from '../api'

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [editingAuthor, setEditingAuthor] = useState(null);

  
  useEffect(()=>{
    fetchAuthors();
  }, [])

  const fetchAuthors = async () => {
    try {
      const response = await getAuthors()
      setAuthors(response.data)
    } catch (error) {
      console.error('Erro ao buscar autores:',error)
    }
  }

  const handleEdit = (id) => {
    const author = authors.find((a) => a.id === id);
    setEditingAuthor(author);
  };

  const handleDelete = async (id) => {
    try {
      await deleteAuthor(id)
      setAuthors(authors.filter((a) => a.id !== id)); 
    } catch (error) {
      console.error('Erro ao deletar autor:', error)
    }
  };

  const handleSave = async (author) => {
    try {
      if (author.id) {
        await updateAuthor(author.id, author)
        setAuthors(authors.map((a) => (a.id === author.id ? author : a)));
      } else {
        const response = await createAuthor(author)
        setAuthors([...authors, response.data]);
      }
      setEditingAuthor(null);
    } catch (error) {
      console.error('Erro ao salvar autor:', error)
    }
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
