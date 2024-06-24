import React, { useEffect, useState } from "react";
import { getBooks, getAuthorsByBookId } from '../../api'
import { Link } from "react-router-dom";

const BookList = () => {
    const [books, setBooks ] = useState([])

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await getBooks();
            const booksWithAuthors = await Promise.all(response.data.map(async (book) => {
                const authorResponse = await getAuthorsByBookId(book.id);
                return {
                    ...book,
                    authors: authorResponse.data,
                };
            }));
            setBooks(booksWithAuthors);
        };
        fetchBooks();
    }, []);

    return (
    <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Descrição</th>
            <th>Ano de Publicação</th>
            <th>Gênero</th>
            <th>Quantidade em Estoque</th>
            <th>Autores</th>
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
            </tr>
          ))}
        </tbody>
    </table>  
    )
};

export default BookList