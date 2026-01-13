/**
 * Authentication helpers for Bagdja Store
 * Aligns with the centralized Bagdja Login flow.
 */

const ACCESS_TOKEN_KEY = 'bagdja_access_token';
const COOKIE_NAME = 'bagdja_access_token';
const CLIENT_TOKEN_KEY = 'bagdja_client_token';
const CLIENT_TOKEN_EXPIRY_KEY = 'bagdja_client_token_expiry';

/**
 * Store access token in both sessionStorage and cookie.
 */
export function setAccessToken(token: string): void {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
    document.cookie = `${COOKIE_NAME}=${token}; path=/; SameSite=Lax; Secure=${window.location.protocol === 'https:'}`;
  }
}

/**
 * Retrieve stored token for API requests.
 */
export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem(ACCESS_TOKEN_KEY);
}

/**
 * Remove stored token (session + cookie).
 */
export function removeAccessToken(): void {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    document.cookie = `${COOKIE_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
}

/**
 * Check if we already have a token stored.
 */
export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(ACCESS_TOKEN_KEY) !== null;
}

/**
 * Get redirect_url from query params.
 */
export function getRedirectUrl(): string | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  return params.get('redirect_url');
}

/**
 * Ensure redirect URL is safe.
 */
export function isValidRedirectUrl(url: string | null): boolean {
  if (!url || typeof url !== 'string') return false;
  try {
    const urlObj = new URL(url);
    if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') return false;
    const hostname = urlObj.hostname.toLowerCase();
    const isBagdjaDomain = hostname.endsWith('.bagdja.com') || hostname === 'bagdja.com';
    const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
    return isBagdjaDomain || isLocalhost;
  } catch {
    return false;
  }
}

/**
 * Append token to redirect url.
 */
export function buildRedirectUrl(redirectUrl: string, token: string): string {
  try {
    const url = new URL(redirectUrl);
    url.searchParams.set('token', token);
    return url.toString();
  } catch {
    const separator = redirectUrl.includes('?') ? '&' : '?';
    return `${redirectUrl}${separator}token=${encodeURIComponent(token)}`;
  }
}

/**
 * Utilities for client token stored in sessionStorage (not used yet, reserved for later).
 */
export function setClientToken(token: string, expiresIn: number): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(CLIENT_TOKEN_KEY, token);
  const expiry = Date.now() + expiresIn * 1000;
  sessionStorage.setItem(CLIENT_TOKEN_EXPIRY_KEY, expiry.toString());
}

export function getClientToken(): string | null {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem(CLIENT_TOKEN_KEY);
}

export function isClientTokenExpired(): boolean {
  if (typeof window === 'undefined') return true;
  const expiry = sessionStorage.getItem(CLIENT_TOKEN_EXPIRY_KEY);
  if (!expiry) return true;
  const expiryMs = parseInt(expiry, 10);
  const bufferMs = 5 * 60 * 1000; // 5 minutes
  return Date.now() >= (expiryMs - bufferMs);
}

export function removeClientToken(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(CLIENT_TOKEN_KEY);
  sessionStorage.removeItem(CLIENT_TOKEN_EXPIRY_KEY);
}
