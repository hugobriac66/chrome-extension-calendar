const getToken = (keyName) => localStorage.getItem(keyName);
const setToken = (keyName, token) => localStorage.setItem(keyName, token);

const getTokenFromChromeStorage = () => {
    // eslint-disable-next-line
    chrome.storage.local.get('sessionToken', function (result) {
        if (result && result.sessionToken) {
            const decodedToken = decodeURIComponent(result.sessionToken);
            return decodedToken;
        }
        return undefined;
    });
};

export {
    getToken,
    setToken,
    getTokenFromChromeStorage,
};
