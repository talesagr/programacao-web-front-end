import React, { useEffect, useState } from 'react';
import AuthorForm from '../components/author/authorForm';
import { getAuthors, createAuthor, updateAuthor, deleteAuthor, getBooksByAuthorId, addBooksToAuthor } from '../api';
import { Link } from 'react-router-dom';
import '../App.css';
import '../components/crudTable/CrudTable.css';
import '../components/crudForm/CrudForm.css';

const AuthorsPage = () => {
  const [authors, setAuthors] = useState([]);
  const [editingAuthor, setEditingAuthor] = useState(null);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await getAuthors();
      const authorsWithBooks = await Promise.all(response.data.map(async (author) => {
        const booksResponse = await getBooksByAuthorId(author.id);
        return {
          ...author,
          books: booksResponse.data || [],
        };
      }));
      setAuthors(authorsWithBooks);
    } catch (error) {
      console.error('Erro ao buscar autores:', error);
    }
  };

  const handleEdit = (id) => {
    const author = authors.find((a) => a.id === id);
    setEditingAuthor(author);
  };

  const handleDelete = async (id) => {
    try {
      await deleteAuthor(id);
      setAuthors(authors.filter((a) => a.id !== id));
    } catch (error) {
      console.error('Erro ao deletar autor:', error);
    }
  };

  const handleSave = async (author) => {
    try {
      let savedAuthor;
      if (author.id) {
        savedAuthor = await updateAuthor(author.id, author);
        setAuthors(authors.map((a) => (a.id === author.id ? savedAuthor.data : a)));
      } else {
        savedAuthor = await createAuthor(author);
        setAuthors([...authors, savedAuthor.data]);
      }
      if (author.books && author.books.length > 0) {
        await addBooksToAuthor(savedAuthor.data.id, author.books);
      }
      fetchAuthors(); 
      setEditingAuthor(null);
    } catch (error) {
      console.error('Erro ao salvar autor:', error);
    }
  };

  const handleCancel = () => {
    setEditingAuthor(null);
  };

  return (
    <div>
      <h1>Autores</h1>
      <table className="crud-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Biografia</th>
            <th>Data de Nascimento</th>
            <th>Nacionalidade</th>
            <th>Livros</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author) => (
            <tr key={author.id}>
              <td>{author.name}</td>
              <td>{author.bio}</td>
              <td>{author.birthDate}</td>
              <td>{author.nationality}</td>
              <td>
                {author.books.map((book) => (
                  <Link key={`${author.id}-${book.id}`} to={`/books/${book.id}`}>
                    {book.title}
                  </Link>
                ))}
              </td>
              <td>
                <button onClick={() => handleEdit(author.id)}>Editar</button>
                <button onClick={() => handleDelete(author.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>{editingAuthor ? 'Editar Autor' : 'Adicionar Autor'}</h2>
      <AuthorForm
        initialData={editingAuthor || { name: '', bio: '', birthDate: '', nationality: '', books: [] }}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default AuthorsPage;
