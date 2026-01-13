/**
 * Piece Service API Client (Bagdja Store)
 * Used for fetching global balance.
 */

import { getAccessToken, getClientToken, isClientTokenExpired, setClientToken } from './auth';

const PIECE_API_BASE =
  process.env.NEXT_PUBLIC_PIECE_API ||
  process.env.NEXT_PUBLIC_AUTH_API ||
  'http://localhost:3003';

const AUTH_API_BASE = process.env.NEXT_PUBLIC_AUTH_API || 'https://auth.bagdja.com';
const CLIENT_APP_ID = process.env.NEXT_PUBLIC_CLIENT_APP_ID || 'bagdja-store';
const CLIENT_APP_SECRET = process.env.NEXT_PUBLIC_CLIENT_APP_SECRET || '';

export interface BalanceItem {
  id: string;
  level: string;
  balance: number;
  currency: string;
  updatedAt: string;
}

export interface BalanceResponse {
  global: BalanceItem;
  organizations: BalanceItem[];
  apps: BalanceItem[];
}

export async function ensureClientToken(): Promise<string> {
  const existing = getClientToken();
  if (existing && !isClientTokenExpired()) return existing;

  if (!CLIENT_APP_SECRET) {
    throw new Error('Client app secret not configured (NEXT_PUBLIC_CLIENT_APP_SECRET)');
  }

  const response = await fetch(`${AUTH_API_BASE}/auth/client`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      app_id: CLIENT_APP_ID,
      app_secret: CLIENT_APP_SECRET,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to get client token');
  }

  const data = await response.json();
  const token = data['x-api-token'] as string;
  const expiresIn = data.expires_in as number;

  if (!token || !expiresIn) {
    throw new Error('Invalid client token response');
  }

  setClientToken(token, expiresIn);
  return token;
}

async function pieceApiRequest<T>(endpoint: string): Promise<T> {
  const userToken = getAccessToken();
  if (!userToken) {
    throw new Error('No access token found');
  }

  const clientToken = await ensureClientToken();

  const response = await fetch(`${PIECE_API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      'x-api-token': clientToken,
      Authorization: `Bearer ${userToken}`,
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Piece API error: ${response.status} ${text}`);
  }

  return response.json();
}

export async function getBalance(): Promise<BalanceResponse> {
  return pieceApiRequest<BalanceResponse>('/pieces/balance');
}

