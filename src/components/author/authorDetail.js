import React, { useEffect, useState } from 'react';
import { getAuthors, getBooksByAuthorId } from '../../api';
import { useParams } from 'react-router-dom';

const AuthorDetail = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const authorResponse = await getAuthors(id);
      setAuthor(authorResponse.data);
      const booksResponse = await getBooksByAuthorId(id);
      setBooks(booksResponse.data);
    };

    fetchData();
  }, [id]);

  if (!author) return <div>Loading...</div>;

  return (
    <div>
      <h1>{author.name}</h1>
      <p>{author.bio}</p>
      <p>{author.birthDate}</p>
      <p>{author.nationality}</p>
      <h2>Livros</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default AuthorDetail;
