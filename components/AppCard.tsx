'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Star, Users } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { getLanguageFromUrl, getTranslations } from '@/lib/translations';
import { trackEvent } from './GoogleAnalytics';
import type { App } from '@/types';

interface AppCardProps {
  app: App;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

function formatPriceType(priceType?: string): string {
  switch (priceType) {
    case 'license':
      return 'Lisensi';
    case 'subscription':
      return 'Berlangganan';
    case 'both':
      return 'Mulai dari';
    default:
      return 'Mulai dari';
  }
}

export function AppCard({ app }: AppCardProps) {
  const searchParams = useSearchParams();
  const lang = getLanguageFromUrl(searchParams);
  const t = getTranslations(lang);

  const priceLabel = app.startingPrice
    ? `${formatPriceType(app.priceType)} ${formatPrice(app.startingPrice)}`
    : t.footer.contact;

  const handleClick = (e: React.MouseEvent) => {
    // Prevent any event bubbling that might trigger search
    e.stopPropagation();
    // Track app click event
    trackEvent('click', 'app_card', app.appName);
  };

  return (
    <Link
      href={`/app/${app.appId}`}
      onClick={handleClick}
      className="group block bg-[var(--bg-surface)] rounded-lg border border-[var(--border-default)] overflow-hidden hover:border-[var(--border-hover)] hover:shadow-lg transition-all duration-300 animate-fade-in"
    >
      {/* App Image/Logo */}
      <div className="relative w-full h-48 bg-[var(--bg-section)] overflow-hidden">
        {app.logo ? (
          <Image
            src={app.logo}
            alt={`${app.appName} - ${app.shortDescription || 'Aplikasi bisnis'}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--action-primary)] to-[var(--primary)]">
            <span className="text-white text-4xl font-bold">
              {app.appName.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        
        {/* Price Badge */}
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-[var(--action-primary)] text-white shadow-md">
            {priceLabel}
          </span>
        </div>
      </div>

      {/* App Info */}
      <div className="p-4">
        {/* Category Badge */}
        {app.category && (
          <span className="inline-block px-2 py-1 mb-2 text-xs font-medium text-[var(--text-secondary)] bg-[var(--bg-hover)] rounded">
            {app.category.name}
          </span>
        )}

        {/* App Name */}
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2 line-clamp-1 group-hover:text-[var(--action-primary)] transition-colors">
          {app.appName}
        </h3>

        {/* Short Description */}
        {app.shortDescription && (
          <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-2">
            {app.shortDescription}
          </p>
        )}

        {/* Rating & Users */}
        <div className="flex items-center justify-between gap-4">
          {/* Rating */}
          {app.rating !== undefined && (
            <div className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-[var(--brand-warning)] text-[var(--brand-warning)]" />
              <span className="text-sm font-medium text-[var(--text-primary)]">
                {app.rating.toFixed(1)}
              </span>
              {app.ratingCount && (
                <span className="text-xs text-[var(--text-muted)]">
                  ({app.ratingCount})
                </span>
              )}
            </div>
          )}

          {/* User Count */}
          {app.userCount !== undefined && (
            <div className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-[var(--text-secondary)]" />
              <span className="text-xs text-[var(--text-secondary)]">
                {app.userCount >= 1000
                  ? `${(app.userCount / 1000).toFixed(1)}k`
                  : app.userCount}{' '}
                {t.app.users}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

