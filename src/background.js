import { DOMAIN, INIT_TIMEOUT } from './constants';

function saveCookies(cookies) {
    if (cookies.length) {
        const authCookie = cookies.find((item) => item.name === 'reelay-auth-token');
        const organizationCookie = cookies.find((item) => item.name === 'reelay-organization-id');

        if (authCookie) {
            // eslint-disable-next-line
            chrome.storage.local.set({ sessionToken: decodeURIComponent(authCookie.value) });
        } else {
            // eslint-disable-next-line
            chrome.storage.local.remove('sessionToken');
        }

        if (organizationCookie) {
            // eslint-disable-next-line
            chrome.storage.local.set({ organizationID: organizationCookie.value });
        } else {
            // eslint-disable-next-line
            chrome.storage.local.remove('organizationID');
        }
    }
}

setInterval(() => {
    // eslint-disable-next-line
    chrome.cookies
        .getAll({
            domain: `.${DOMAIN}`,
        })
        .then(saveCookies)
        .catch((error) => {
            console.log('Error parse cookie', error);
        });
}, INIT_TIMEOUT);
