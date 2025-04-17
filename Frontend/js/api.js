const API_URL = 'http://localhost:3000/api';

function getToken() {
return localStorage.getItem('token');
}

function setToken(token) {
localStorage.setItem('token', token);
}

function clearToken() {
localStorage.removeItem('token');
}
