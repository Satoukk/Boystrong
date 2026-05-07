const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? (import.meta.env.DEV ? 'http://localhost:8080' : '');

export function apiUrl(path) {
	if (!API_BASE_URL) {
		throw new Error('VITE_API_BASE_URL is not set');
	}
	return `${API_BASE_URL}${path}`;
}
