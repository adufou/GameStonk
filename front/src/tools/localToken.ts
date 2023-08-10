export function clearLocalToken() {
    localStorage.removeItem('token');
}

export function getLocalToken(): string | null {
    return localStorage.getItem('token');
}

export function setLocalToken(token: string) {
    localStorage.setItem('token', token);
}
