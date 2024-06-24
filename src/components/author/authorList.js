import React, { useEffect, useState } from 'react';
import { getAuthors, getBooksByAuthorId } from '../../api';
import { Link } from 'react-router-dom';

const AuthorList = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      const response = await getAuthors();
      const authorsWithBooks = await Promise.all(response.data.map(async (author) => {
        const booksResponse = await getBooksByAuthorId(author.id);
        return {
          ...author,
          books: booksResponse.data,
        };
      }));
      setAuthors(authorsWithBooks);
    };

    fetchAuthors();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Biografia</th>
          <th>Data de Nascimento</th>
          <th>Nacionalidade</th>
          <th>Livros</th>
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
                <Link key={book.id} to={`/books/${book.id}`}>
                  {book.title}
                </Link>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AuthorList;
