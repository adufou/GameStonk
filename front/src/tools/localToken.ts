export function clearLocalToken(): void {
    localStorage.removeItem('token');
}

export function getLocalToken(): string | null {
    return localStorage.getItem('token');
}

export function setLocalToken(token: string): void {
    localStorage.setItem('token', token);
}
