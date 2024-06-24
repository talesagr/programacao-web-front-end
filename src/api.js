import axios from "axios";

const api = axios.create({
    baseURL: 'http://127.0.0.1:8080/api',
    headers : {
        'Content-Type' : 'application/json'
    },
});

export const getUsers = () => api.get('/users');
export const createUser = (data) => api.post('/users', data);
export const updateUser = (id, data) => api.put(`/users/${id}`, data);
export const deleteUser = (id) => api.delete(`/users/${id}`);

export const getBooks = () => api.get('/books');
export const getBooksByAuthorId = (authorId) => api.get(`/authors/${authorId}/books`);
export const getBook = (id) => api.get(`/books/${id}`);
export const createBook = (data) => api.post('/books', data);
export const updateBook = (id, data) => api.put(`/books/${id}`, data);
export const deleteBook = (id) => api.delete(`/books/${id}`);

export const createAuthorBook = (authorBook) => api.post('/author-books', authorBook);
export const getAuthorBooks = () => api.get('/author-books');
export const deleteAuthorBook = (id) => api.delete(`/author-books/${id}`);

export const getAuthors = () => api.get('/authors');
export const getAuthorsByBookId = (bookId) => api.get(`/books/${bookId}/authors`);
export const getAuthor = (id) => api.get(`/authors/${id}`);
export const createAuthor = (data) => api.post('/authors', data);
export const updateAuthor = (id, data) => api.put(`/authors/${id}`, data);
export const addBooksToAuthor = (authorId, bookIds) => api.put(`/authors/${authorId}/books`, bookIds);
export const deleteAuthor = (id) => api.delete(`/authors/${id}`);

export default api;
