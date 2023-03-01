import axios from 'axios';
import { API_HOST } from '../constants';

const getToken = (keyName) => localStorage.getItem(keyName);
const setToken = (keyName, token) => localStorage.setItem(keyName, token);

const login = async (magicToken) => {
    const config = {
        method: 'post',
        url: `${API_HOST}/auth/authenticate`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            magicToken: magicToken.split('magicToken=')[1],
        },
    };

    try {
        const response = await axios(config);
        setToken('sessionToken', response.data.data.sessionToken);
        return response;
    } catch (error) {
        return undefined;
    }
};

const getMagicLink = async (email) => {
    const config = {
        method: 'post',
        url: `${API_HOST}/auth/send-magic-link-extension`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            email,
        },
    };

    try {
        const response = await axios(config);
        await login(response.data.data.magicLinkURL);
        return response.data;
    } catch (error) {
        return undefined;
    }
};

export {
    login,
    getToken,
    setToken,
    getMagicLink,
};
