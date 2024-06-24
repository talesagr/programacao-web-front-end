import React, { useEffect, useState } from 'react';
import BookForm from '../components/book/bookForm';
import { getBooks, createBook, updateBook, deleteBook, getAuthorsByBookId } from '../api';
import { Link } from 'react-router-dom';
import '../App.css';
import '../components/crudTable/CrudTable.css';
import '../components/crudForm/CrudForm.css';

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await getBooks();
      const booksWithAuthors = await Promise.all(response.data.map(async (book) => {
        const authorsResponse = await getAuthorsByBookId(book.id);
        return {
          ...book,
          authors: authorsResponse.data || [],
        };
      }));
      setBooks(booksWithAuthors);
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
    }
  };

  const handleEdit = (id) => {
    const book = books.find((b) => b.id === id);
    setEditingBook(book);
  };

  const handleDelete = async (id) => {
    try {
      await deleteBook(id);
      setBooks(books.filter((b) => b.id !== id));
    } catch (error) {
      console.error('Erro ao deletar livro:', error);
    }
  };

  const handleSave = async (book) => {
    try {
      if (book.id) {
        await updateBook(book.id, book);
        setBooks(books.map((b) => (b.id === book.id ? book : b)));
      } else {
        const response = await createBook(book);
        setBooks([...books, { ...response.data, authors: [] }]);
      }
      setEditingBook(null);
    } catch (error) {
      console.error('Erro ao salvar livro:', error);
    }
  };

  const handleCancel = () => {
    setEditingBook(null);
  };

  return (
    <div>
      <h1>Livros</h1>
      <table className="crud-table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Descrição</th>
            <th>Ano de Publicação</th>
            <th>Gênero</th>
            <th>Quantidade em Estoque</th>
            <th>Autores</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.description}</td>
              <td>{book.publicationYear}</td>
              <td>{book.genre}</td>
              <td>{book.stockQuantity}</td>
              <td>
                {book.authors.map((author) => (
                  <Link key={author.id} to={`/authors/${author.id}`}>
                    {author.name}
                  </Link>
                ))}
              </td>
              <td>
                <button onClick={() => handleEdit(book.id)}>Editar</button>
                <button onClick={() => handleDelete(book.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>{editingBook ? 'Editar Livro' : 'Adicionar Livro'}</h2>
      <BookForm
        initialData={editingBook || { title: '', description: '', publicationYear: '', genre: '', stockQuantity: '', authors: [] }}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default BooksPage;
