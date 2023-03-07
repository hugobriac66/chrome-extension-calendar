import { DOMAIN, INIT_TIMEOUT } from './constants';

function saveCookies(cookies) {
    if (cookies.length) {
        const authCookie = cookies.find((item) => item.domain === `.${DOMAIN}`);
        if (authCookie) {
            // eslint-disable-next-line
            chrome.storage.local.set({ sessionToken: decodeURIComponent(authCookie.value) });
        } else {
            // eslint-disable-next-line
            chrome.storage.local.remove('sessionToken');
        }
    }
}

setInterval(() => {
    // eslint-disable-next-line
    chrome.cookies
        .getAll({
            name: 'reelay-auth-token',
        })
        .then(saveCookies)
        .catch((error) => {
            console.log('Error parse cookie', error);
        });
}, INIT_TIMEOUT);
