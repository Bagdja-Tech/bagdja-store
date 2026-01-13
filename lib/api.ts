import { getAccessToken, removeAccessToken } from './auth';
import { ensureClientToken } from './piece-api';
import type { User } from '@/types/user';

const AUTH_API_BASE = process.env.NEXT_PUBLIC_AUTH_API || 'https://auth.bagdja.com';

export interface ApiError {
  message: string;
  statusCode?: number;
}

/**
 * Make authenticated API request
 * Automatically includes x-api-token header for client app authentication
 */
async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  // Ensure we have a valid client token (x-api-token)
  const clientToken = await ensureClientToken();
  
  // Get user access token (if authenticated)
  const userToken = getAccessToken();
  
  const url = `${AUTH_API_BASE}${endpoint}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'x-api-token': clientToken, // Always include client app token
    ...(options.headers as Record<string, string>),
  };

  // Add user token if available (for authenticated endpoints)
  if (userToken) {
    headers['Authorization'] = `Bearer ${userToken}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error: ApiError = {
      message: 'An error occurred',
      statusCode: response.status,
    };

    try {
      const data = await response.json();
      error.message = data.message || data.error || error.message;
    } catch {
      error.message = response.statusText || error.message;
    }

    // Clear user token on 401
    if (response.status === 401) {
      removeAccessToken();
      // Also clear cookie
      if (typeof window !== 'undefined') {
        document.cookie = 'bagdja_access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      }
    }

    throw error;
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
