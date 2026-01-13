'use client';

import { useState } from 'react';
import { Check, Key, CreditCard } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { getLanguageFromUrl, getTranslations } from '@/lib/translations';
import type { App, License, Plan } from '@/types';

interface PricingSectionProps {
  app: App;
  onPurchase: (type: 'license' | 'subscription', id: string) => void;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function PricingSection({ app, onPurchase }: PricingSectionProps) {
  const searchParams = useSearchParams();
  const lang = getLanguageFromUrl(searchParams);
  const t = getTranslations(lang);
  
  const [selectedType, setSelectedType] = useState<'license' | 'subscription'>(
    app.licenses && app.licenses.length > 0 ? 'license' : 'subscription'
  );

  const hasLicenses = app.licenses && app.licenses.length > 0;
  const hasPlans = app.plans && app.plans.length > 0;

  if (!hasLicenses && !hasPlans) {
    return null;
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-6">
        {t.app.pricing}
      </h2>

      {/* Type Selector */}
      {hasLicenses && hasPlans && (
        <div className="flex gap-2 mb-6 p-1 bg-[var(--bg-hover)] rounded-lg w-fit">
          <button
            onClick={() => setSelectedType('license')}
            className={`
              px-4 py-2 rounded-md text-sm font-medium transition-all
              ${
                selectedType === 'license'
                  ? 'bg-[var(--action-primary)] text-white shadow-md'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }
            `}
          >
            <Key className="h-4 w-4 inline-block mr-2" />
            {t.app.license}
          </button>
          <button
            onClick={() => setSelectedType('subscription')}
            className={`
              px-4 py-2 rounded-md text-sm font-medium transition-all
              ${
                selectedType === 'subscription'
                  ? 'bg-[var(--action-primary)] text-white shadow-md'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }
            `}
          >
            <CreditCard className="h-4 w-4 inline-block mr-2" />
            {t.app.subscription}
          </button>
        </div>
      )}

      {/* Licenses */}
      {selectedType === 'license' && hasLicenses && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {app.licenses!.map((license, index) => (
            <div
              key={license.id}
              className="border border-[var(--border-default)] rounded-lg p-6 bg-[var(--bg-surface)] hover:border-[var(--border-hover)] hover:shadow-lg transition-all animate-scale-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                  {license.maxUsers} {t.app.users}
                </h3>
                {license.expTime && (
                  <p className="text-sm text-[var(--text-secondary)]">
                    Berlaku {license.expTime} hari
                  </p>
                )}
                {!license.expTime && (
                  <p className="text-sm text-[var(--text-secondary)]">
                    {t.app.lifetime}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold text-[var(--text-primary)]">
                  {formatPrice(license.price)}
                </span>
              </div>
              <button
                onClick={() => onPurchase('license', license.id)}
                className="w-full py-2.5 px-4 bg-[var(--action-primary)] text-white rounded-lg font-medium hover:bg-[var(--action-primary-hover)] transition-colors"
              >
                {t.app.buyNow}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Plans */}
      {selectedType === 'subscription' && hasPlans && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {app.plans!.map((plan, index) => (
            <div
              key={plan.id}
              className="border border-[var(--border-default)] rounded-lg p-6 bg-[var(--bg-surface)] hover:border-[var(--border-hover)] hover:shadow-lg transition-all animate-scale-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                  {plan.name}
                </h3>
                {plan.description && (
                  <p className="text-sm text-[var(--text-secondary)] mb-3">
                    {plan.description}
                  </p>
                )}
                <div className="text-sm text-[var(--text-secondary)]">
                  {plan.duration === 'monthly' && t.app.perMonth}
                  {plan.duration === 'yearly' && t.app.perYear}
                  {plan.duration === 'lifetime' && t.app.once}
                </div>
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold text-[var(--text-primary)]">
                  {formatPrice(plan.price)}
                </span>
              </div>
              {plan.features && plan.features.length > 0 && (
                <ul className="mb-4 space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <Check className="h-4 w-4 text-[var(--brand-success)] flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}
              <button
                onClick={() => onPurchase('subscription', plan.id)}
                className="w-full py-2.5 px-4 bg-[var(--action-primary)] text-white rounded-lg font-medium hover:bg-[var(--action-primary-hover)] transition-colors"
              >
                {t.app.subscribe}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

