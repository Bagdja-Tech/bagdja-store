'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Star, Users, Mail } from 'lucide-react';
import type { App } from '@/types';

interface AppHeaderProps {
  app: App;
}

export function AppHeader({ app }: AppHeaderProps) {
  return (
    <div className="mb-8">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali ke Beranda
      </Link>

      {/* App Info */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Logo */}
        <div className="flex-shrink-0">
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden bg-[var(--bg-section)] border border-[var(--border-default)]">
            {app.logo ? (
              <Image
                src={app.logo}
                alt={`${app.appName} logo`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 128px, 160px"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--action-primary)] to-[var(--primary)]">
                <span className="text-white text-5xl font-bold">
                  {app.appName.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* App Details */}
        <div className="flex-1">
          {/* Category */}
          {app.category && (
            <span className="inline-block px-3 py-1 mb-3 text-sm font-medium text-[var(--text-secondary)] bg-[var(--bg-hover)] rounded-lg">
              {app.category.name}
            </span>
          )}

          {/* App Name */}
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
            {app.appName}
          </h1>

          {/* Rating & Users */}
          <div className="flex flex-wrap items-center gap-6 mb-4">
            {app.rating !== undefined && (
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-[var(--brand-warning)] text-[var(--brand-warning)]" />
                <span className="text-lg font-semibold text-[var(--text-primary)]">
                  {app.rating.toFixed(1)}
                </span>
                {app.ratingCount && (
                  <span className="text-sm text-[var(--text-secondary)]">
                    ({app.ratingCount} ulasan)
                  </span>
                )}
              </div>
            )}

            {app.userCount !== undefined && (
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-[var(--text-secondary)]" />
                <span className="text-sm text-[var(--text-secondary)]">
                  {app.userCount >= 1000
                    ? `${(app.userCount / 1000).toFixed(1)}k`
                    : app.userCount}{' '}
                  pengguna
                </span>
              </div>
            )}

            {app.contactEmail && (
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-[var(--text-secondary)]" />
                <a
                  href={`mailto:${app.contactEmail}`}
                  className="text-sm text-[var(--action-primary)] hover:underline"
                >
                  {app.contactEmail}
                </a>
              </div>
            )}
          </div>

          {/* Description */}
          {app.description && (
            <p className="text-base text-[var(--text-secondary)] leading-relaxed max-w-3xl">
              {app.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

