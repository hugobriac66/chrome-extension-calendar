function saveCookies(cookies) {
    if (cookies.length) {
        // eslint-disable-next-line
        chrome.storage.local.set({'sessionToken': cookies[0].value});
    }
}
// eslint-disable-next-line
chrome.cookies
    .getAll({
        name: 'reelay-auth-token',
    })
    .then(saveCookies);
