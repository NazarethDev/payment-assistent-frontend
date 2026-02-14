let currentToken = null;

export function setGlobalToken(token) {
    currentToken = token;
}

export function getToken() {
    return currentToken;
}
