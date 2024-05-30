import axios from "axios";

const api = axios.create({
    baseURL: 'localhost:8080/api',
});

export const getUsers = () => api.get('/users');
export const createUser = (data) => api.post('/users', data);
export const updateUser = (id, data) => api.put(`/users/${id}`, data);
export const deleteUser = (id) => api.delete(`/users/${id}`);

export const getBooks = () => api.get('/books');
export const createBook = (data) => api.post('/books', data);
export const updateBook = (id, data) => api.get(`/books/${id}`, data);
export const deleteBook = (id) => api.delete(`/books/${id}`);

export const getAuthors = () => api.get('/authors');
export const createAuthor = (data) => api.post('/authors', data);
export const updateAuthor = (id, data) => api.put(`/authors/${id}`, data);
export const deleteAuthor = (id) => api.delete(`/authors/${id}`);

export default api;