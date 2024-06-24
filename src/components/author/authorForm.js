import React, { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';
import { getBooks } from '../../api';
import '../crudForm/CrudForm.css';

const AuthorForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState(initialData);
  const [books, setBooks] = useState([]);

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

  const handleBookChange = (e) => {
    const { options } = e.target;
    const selectedBooks = [];
    for (const option of options) {
      if (option.selected) {
        selectedBooks.push(option.value);
      }
    }
    setFormData({
      ...formData,
      books: selectedBooks,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
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
        <select multiple value={formData.books} onChange={handleBookChange}>
          {books.map((book) => (
            <option key={book.id} value={book.id}>
              {book.title}
            </option>
          ))}
        </select>
      </div>
      <div className="button-group">
        <button type="submit">Salvar</button>
        <button type="button" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
};

export default AuthorForm;
