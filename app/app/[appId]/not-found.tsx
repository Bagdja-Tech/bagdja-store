'use client';

import Link from 'next/link';
import { Package } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { getLanguageFromUrl, getTranslations } from '@/lib/translations';

export default function NotFound() {
  const searchParams = useSearchParams();
  const lang = getLanguageFromUrl(searchParams);
  const t = getTranslations(lang);

  return (
    <div className="min-h-screen bg-[var(--bg-main)] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <Package className="h-16 w-16 text-[var(--text-muted)] mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
          {t.app.notFound}
        </h1>
        <p className="text-[var(--text-secondary)] mb-6">
          {t.app.notFoundDesc}
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-[var(--action-primary)] text-white rounded-lg font-medium hover:bg-[var(--action-primary-hover)] transition-colors"
        >
          {t.app.back}
        </Link>
      </div>
    </div>
  );
}

