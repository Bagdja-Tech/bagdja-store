'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { setAccessToken, getRedirectUrl, isValidRedirectUrl, buildRedirectUrl } from '@/lib/auth';
import { getLanguageFromUrl, getTranslations } from '@/lib/translations';

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lang = getLanguageFromUrl(searchParams);
  const t = getTranslations(lang);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = searchParams.get('token');
    const redirectUrl = getRedirectUrl() || searchParams.get('redirect_url');

    if (token) {
      setAccessToken(token);

      if (redirectUrl) {
        if (isValidRedirectUrl(redirectUrl)) {
          const finalUrl = buildRedirectUrl(redirectUrl, token);
          window.location.href = finalUrl;
          return;
        }
        setError(t.callback.invalidRedirect);
        return;
      }

      router.replace('/');
    } else {
      setError(t.callback.noToken);
    }
  }, [searchParams, router, t]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-main)] px-4">
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-6 text-center space-y-4">
          <p className="text-sm text-[var(--text-secondary)]">{error}</p>
          <button
            onClick={() => router.push(`/login?lang=${lang}`)}
            className="w-full rounded-2xl bg-[var(--action-primary)] text-white py-2 font-semibold"
          >
            {t.callback.backToLogin}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-main)] px-4">
      <div className="text-center space-y-3">
        <p className="text-sm text-white/80">{t.callback.completingAuth}</p>
        <div className="inline-block h-10 w-10 border-4 border-[var(--action-primary)] border-r-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[var(--bg-main)]">
          <div className="text-center space-y-3">
            <p className="text-sm text-white/80">Loading...</p>
            <div className="inline-block h-10 w-10 border-4 border-[var(--action-primary)] border-r-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      }
    >
      <CallbackContent />
    </Suspense>
  );
}
