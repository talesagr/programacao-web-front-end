import React, { useState, useEffect } from 'react';
import { getAuthors } from '../../api';
import '../crudForm/CrudForm.css';

const BookForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({ ...initialData, authors: initialData.authors || [] });
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      const response = await getAuthors();
      setAuthors(response.data);
    };

    fetchAuthors();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAuthorChange = (authorId) => {
    setFormData((prevState) => {
      const newAuthors = [...prevState.authors];
      if (newAuthors.includes(authorId)) {
        return { ...prevState, authors: newAuthors.filter((id) => id !== authorId) };
      } else {
        newAuthors.push(authorId);
        return { ...prevState, authors: newAuthors };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const adjustedFormData = {
      ...formData,
      authors: formData.authors || [] // Garante que authors é uma lista
    };
    onSave(adjustedFormData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Título</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Descrição</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Ano de Publicação</label>
        <input
          type="number"
          name="publicationYear"
          value={formData.publicationYear}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Gênero</label>
        <input
          type="text"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Quantidade em Estoque</label>
        <input
          type="number"
          name="stockQuantity"
          value={formData.stockQuantity}
          onChange={handleChange}
        />
      </div>
      
      <div className="button-group">
        <button type="submit">Salvar</button>
        <button type="button" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
};

export default BookForm;
