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
      setAuthors(response.data.map(author => ({
        ...author,
        birthDate: formatDateToDisplay(author.birthDate)
      })))
    } catch (error) {
      console.error('Erro ao buscar autores:',error)
    }
  }

  const formatDateToDisplay = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`
  }

  const formatDateToSave = (dateString) => {
    const [day, month, year] = dateString.match(/(\d{2})-(\d{2})-(\d{4})/).slice(1);
    return `${year}-${month}-${day}`;
  };

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
        author.birthDate = formatDateToSave(author.birthDate)

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
        columns={['name', 'bio', 'birthDate', 'nationality']}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <h2>{editingAuthor ? 'Editar Autor' : 'Adicionar Autor'}</h2>
      <CrudForm
        initialData={editingAuthor || { name: '', bio: '', birthDate: '', nationality: '' }}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default Authors;
