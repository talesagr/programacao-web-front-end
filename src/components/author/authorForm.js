import React, { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';
import { getBooks } from '../../api';
import '../crudForm/CrudForm.css';

const AuthorForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({ ...initialData, books: initialData.books || [] });
  const [books, setBooks] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData({ ...initialData, books: initialData.books || [] });
  }, [initialData]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await getBooks();
      setBooks(response.data);
    };

    fetchBooks();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBookChange = (bookId) => {
    setFormData((prevState) => {
      const newBooks = [...prevState.books];
      if (newBooks.includes(bookId)) {
        return { ...prevState, books: newBooks.filter((id) => id !== bookId) };
      } else {
        newBooks.push(bookId);
        return { ...prevState, books: newBooks };
      }
    });
  };

  const validateDate = (date) => {
    const [year, month, day] = date.split('-').map(Number);
    const isValidDate = !isNaN(new Date(year, month - 1, day).getTime());
    return isValidDate && day > 0 && day <= new Date(year, month, 0).getDate();
  };

  const prepareDataForSave = (data) => {
    return {
      ...data,
      books: data.books.map((book) => book.id || book),
      birthDate: data.birthDate.split('-').reverse().join('-')
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const adjustedFormData = prepareDataForSave(formData);

    if (!validateDate(adjustedFormData.birthDate)) {
      setErrors({ birthDate: 'Data inválida' });
      return;
    }

    onSave(adjustedFormData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nome</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Bio</label>
        <input
          type="text"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Data de Nascimento</label>
        <InputMask
          mask="99-99-9999"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
        >
          {(inputProps) => <input {...inputProps} type="text" />}
        </InputMask>
        {errors.birthDate && <span className="error">{errors.birthDate}</span>}
      </div>
      <div>
        <label>Nacionalidade</label>
        <input
          type="text"
          name="nationality"
          value={formData.nationality}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Livros</label>
        <div className="books-list">
          {books.map((book) => (
            <div key={book.id} className="book-item">
              <label>
                <input
                  type="checkbox"
                  value={book.id}
                  checked={formData.books.includes(book.id)}
                  onChange={() => handleBookChange(book.id)}
                />
                {book.title}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="button-group">
        <button type="submit">Salvar</button>
        <button type="button" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
};

export default AuthorForm;
