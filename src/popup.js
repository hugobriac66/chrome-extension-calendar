import { getTokenFromChromeStorage } from './services/authService';
import { CLIENT_HOST } from './constants';

const loginLink = document.getElementById('login');
const logo = document.getElementById('logo');
const isLogedIn = document.getElementById('is-loged-in');
loginLink.href = `${CLIENT_HOST}/login`;
logo.href = `${CLIENT_HOST}`;

async function isToken() {
    const token = await getTokenFromChromeStorage();
    if (token) {
        loginLink.style.display = 'none';
        isLogedIn.style.display = 'block';
    } else {
        isLogedIn.style.display = 'none';
        loginLink.style.display = 'block';
    }
}
isToken();
