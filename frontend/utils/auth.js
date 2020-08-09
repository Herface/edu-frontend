import Cookie from 'js-cookie';

const TOKEN_KEY = "token";

export function setToken(token) {
    Cookie.set(TOKEN_KEY,token);
}

export function getToken() {
   return Cookie.get(TOKEN_KEY);
}

export function removeToken() {
    Cookie.remove(TOKEN_KEY);
}
