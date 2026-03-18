const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
const AUTH_EXPIRED_EVENT = 'dribrahim:auth-expired';

export class ApiError extends Error {
  status: number;
  body?: unknown;

  constructor(message: string, status: number, body?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.body = body;
  }
}

const buildHeaders = (headers?: HeadersInit) => {
  const nextHeaders = new Headers(headers);
  const token = localStorage.getItem('admin_token');

  if (!nextHeaders.has('Content-Type')) {
    nextHeaders.set('Content-Type', 'application/json');
  }

  if (token && !nextHeaders.has('Authorization')) {
    nextHeaders.set('Authorization', `Bearer ${token}`);
  }

  return nextHeaders;
};

const parseResponseBody = async (response: Response) => {
  if (response.status === 204) {
    return undefined;
  }

  const contentType = response.headers.get('content-type') ?? '';

  if (contentType.includes('application/json')) {
    return response.json();
  }

  const text = await response.text();
  return text || undefined;
};

const extractMessage = (body: unknown, status: number) => {
  if (body && typeof body === 'object') {
    const candidate = body as Record<string, unknown>;

    if (typeof candidate.message === 'string') {
      return candidate.message;
    }

    if (typeof candidate.error === 'string') {
      return candidate.error;
    }
  }

  if (typeof body === 'string' && body.trim().length > 0) {
    return body;
  }

  return `Request failed with status ${status}`;
};

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: buildHeaders(init.headers),
  });

  const body = await parseResponseBody(response);

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('admin_user');
      localStorage.removeItem('admin_token');
      window.dispatchEvent(new Event(AUTH_EXPIRED_EVENT));
    }

    throw new ApiError(extractMessage(body, response.status), response.status, body);
  }

  return body as T;
}

export const apiClient = {
  get: <T>(path: string) => request<T>(path),
  post: <T, B>(path: string, body: B) =>
    request<T>(path, {
      method: 'POST',
      body: JSON.stringify(body),
    }),
  put: <T, B>(path: string, body: B) =>
    request<T>(path, {
      method: 'PUT',
      body: JSON.stringify(body),
    }),
  delete: (path: string) =>
    request<void>(path, {
      method: 'DELETE',
    }),
};

export const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : 'Unexpected error';

export const authEvents = {
  expired: AUTH_EXPIRED_EVENT,
};
