import { DOMAIN } from './constants';

function saveCookies(cookies) {
    if (cookies.length) {
        const authCookie = cookies.find((item) => item.domain === `.${DOMAIN}`);
        // eslint-disable-next-line
        chrome.storage.local.set({'sessionToken': authCookie.value});
    }
}
// eslint-disable-next-line
chrome.cookies
    .getAll({
        name: 'reelay-auth-token',
    })
    .then(saveCookies)
    .catch((error) => {
        console.log('Error parse cookie', error);
    });
