export const runtime = 'edge';

import { redirect } from 'next/navigation';

const LOGIN_URL = process.env.NEXT_PUBLIC_LOGIN_URL || 'https://login.bagdja.com';
const STORE_BASE = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3002';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> | { [key: string]: string | string[] | undefined };
}) {
  // Resolve searchParams if it's a Promise
  const resolvedParams = searchParams instanceof Promise ? await searchParams : searchParams;
  
  // Convert to URLSearchParams for easier manipulation
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(resolvedParams)) {
    if (value) {
      const val = Array.isArray(value) ? value[0] : value;
      if (val) params.set(key, val);
    }
  }

  const loginUrl = new URL(LOGIN_URL);
  const returnUrl = new URL(STORE_BASE);

  const redirectParam = params.get('redirect') || params.get('redirect_url');

  // If we have an internal redirect path, append it to the store base (so bagdja-login returns directly to that page)
  if (redirectParam && redirectParam.startsWith('/')) {
    returnUrl.pathname = redirectParam;
  }

  const langParam = params.get('lang');
  if (langParam) {
    loginUrl.searchParams.set('lang', langParam);
  }

  loginUrl.searchParams.set('redirect_url', returnUrl.toString());

  params.forEach((value, key) => {
    if (['redirect', 'redirect_url', 'lang'].includes(key)) return;
    loginUrl.searchParams.append(key, value);
  });

  redirect(loginUrl.toString());
}
