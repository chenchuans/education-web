export const getUid = () => window.localStorage.webUid;
export const setUid = (uid: string | number) => {
    window.localStorage.webUid = uid;
};
export const removeUid = () => window.localStorage.removeItem('webUid');

export const getToken = () => window.localStorage.webToken;
export const setToken = (token: string) => {
    window.localStorage.webToken = token;
};
export const removeToken = () => window.localStorage.removeItem('webToken');

export const getUsername = () => window.localStorage.webUserName;
export const setUsername = (userName: string) => {
    window.localStorage.webUserName = userName;
};
export const removeUsername = () => window.localStorage.removeItem('webUserName');
