const getToken = (keyName) => localStorage.getItem(keyName);
const setToken = (keyName, token) => localStorage.setItem(keyName, token);

const getTokenFromChromeStorage = async () => {
    // eslint-disable-next-line
    const { sessionToken } = await chrome.storage.local.get(['sessionToken'])
    return decodeURIComponent(sessionToken);
};

export {
    getToken,
    setToken,
    getTokenFromChromeStorage,
};
