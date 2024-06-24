import React, { useEffect, useState } from 'react';
import { getBooks, getAuthorsByBookId } from '../../api';
import { useParams } from 'react-router-dom';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const bookResponse = await getBooks(id);
      setBook(bookResponse.data);
      const authorsResponse = await getAuthorsByBookId(id);
      setAuthors(authorsResponse.data);
    };

    fetchData();
  }, [id]);

  if (!book) return <div>Loading...</div>;

  return (
    <div>
      <h1>{book.title}</h1>
      <p>{book.description}</p>
      <p>{book.publicationYear}</p>
      <p>{book.genre}</p>
      <p>{book.stockQuantity}</p>
      <h2>Autores</h2>
      <ul>
        {authors.map((author) => (
          <li key={author.id}>{author.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default BookDetail;
