const API_URL = 'http://localhost:3000/api';

document.addEventListener('DOMContentLoaded', () => {
console.log('API_URL is', API_URL);

const signupForm = document.getElementById('signupForm');
const loginForm = document.getElementById('loginForm');

if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const res = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    if (res.ok) {
        alert('Signup successful!');
        window.location.href = 'login.html';
    } else {
        alert(data.message);
    }
    });
}

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    if (res.ok) {
        setToken(data.token);
        window.location.href = 'tasks.html';
    } else {
        alert(data.message);
    }
    });
}
});

// Token utilities
function setToken(token) {
localStorage.setItem('token', token);
}

function getToken() {
return localStorage.getItem('token');
}

function clearToken() {
localStorage.removeItem('token');
}

function logout() {
clearToken();
window.location.href = 'login.html';
}
