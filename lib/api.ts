import { getAccessToken } from './auth';
import type { User } from '@/types/user';

const AUTH_API_BASE = process.env.NEXT_PUBLIC_AUTH_API || 'https://auth.bagdja.com';

async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  const token = getAccessToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${AUTH_API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`API request failed: ${response.status} ${response.statusText} ${text}`);
  }

  return response.json();
}

export async function getProfile(): Promise<User> {
  const payload = await apiRequest<{ user?: User }>('/auth/me');
  if (payload.user) {
    return payload.user;
  }
  return payload as unknown as User;
}
