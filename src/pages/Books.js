import React, { useEffect, useState } from 'react';
import CrudTable from '../components/crudTable/CrudTable';
import CrudForm from '../components/crudForm/CrudForm';
import { getBooks, createBook, updateBook, deleteBook} from '../api'

const Books = () => {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);


  useEffect(()=>{
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    try {
      const response = await getBooks();
      setBooks(response.data)
    } catch (error) {
      console.error('Erro ao buscar livros:', error)
    }
  }

  const handleEdit = (id) => {
    const book = books.find((b) => b.id === id);
    setEditingBook(book);
  };

  const handleDelete = async (id) => {
    try {
      await deleteBook(id)
      setBooks(books.filter((b)=> b.id !== id))
    } catch (error) {
        console.error('Erro ao deletar livro', error)
    }
  };

  const handleSave = async (book) => {
    try {
      if (book.id) {
        await updateBook(book.id, book);
        setBooks(books.map((b) => (b.id === book.id ? book : b)));
      } else {
        const response = await createBook(book);
        setBooks([...books, response.data]);
      }
      setEditingBook(null);  
    } catch (error) {
      console.error('Erro ao salvar livro:', error)
    }
    
  };

  const handleCancel = () => {
    setEditingBook(null);
  };

  return (
    <div>
      <h1>Livros</h1>
      <CrudTable
        data={books}
        columns={['titulo', 'descricao', 'ano-de-publicacao', 'genero', 'quantidade-em-estoque']}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <h2>{editingBook ? 'Editar Livro' : 'Adicionar Livro'}</h2>
      <CrudForm
        initialData={editingBook || { titulo: '', descricao: '', 'ano-de-publicacao': '', genero: '', 'quantidade-em-estoque': '' }}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default Books;
