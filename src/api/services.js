import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com/',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:8081' // Replace with your frontend origin
  }
});

// Getters
export const getProducts = () => api.get('/products');
export const getProduct = (id) => api.get(`/products/${id}`);
export const getCategories = () => api.get('products/categories');

// Carts
export const getCarts = () => api.get('carts');

// Setters
export const createProduct = (product) => api.post('/products', product);
export const updateProduct = (id, product) => api.put(`/products/${id}`, product);
export const deleteProduct = (id) => api.delete(`/products/${id}`);

// Users

// Login
export const login = (credentials) => api.post('/auth/login', credentials);