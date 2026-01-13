'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AppHeader } from '@/components/AppHeader';
import { ScreenshotGallery } from '@/components/ScreenshotGallery';
import { VideoSection } from '@/components/VideoSection';
import { PricingSection } from '@/components/PricingSection';
import { ProductsSection } from '@/components/ProductsSection';
import type { App } from '@/types';

interface AppDetailClientProps {
  app: App;
}

function AppDetailContent({ app }: AppDetailClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePurchase = (type: 'license' | 'subscription', id: string) => {
    // Redirect to bagdja-checkout (placeholder)
    const lang = searchParams.get('lang') || 'id';
    const checkoutUrl = `https://checkout.bagdja.com?type=${type}&id=${id}&appId=${app.id}&lang=${lang}`;
    window.location.href = checkoutUrl;
  };

  const handleSearch = (query: string) => {
    // Only redirect if there's actually a search query
    if (query && query.trim()) {
      const lang = searchParams.get('lang') || 'id';
      router.push(`/?search=${encodeURIComponent(query.trim())}&lang=${lang}`);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)]">
      <Header onSearch={handleSearch} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AppHeader app={app} />

        {/* Screenshots */}
        {app.screenshots && app.screenshots.length > 0 && (
          <ScreenshotGallery screenshots={app.screenshots} appName={app.appName} />
        )}

        {/* Video */}
        {app.videoUrl && <VideoSection videoUrl={app.videoUrl} />}

        {/* Pricing Section */}
        <PricingSection app={app} onPurchase={handlePurchase} />

        {/* Products Section */}
        {app.products && app.products.length > 0 && (
          <ProductsSection products={app.products} />
        )}

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: app.appName,
              description: app.description || app.shortDescription,
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web',
              offers: [
                ...(app.licenses || []).map((license) => ({
                  '@type': 'Offer',
                  price: license.price,
                  priceCurrency: 'IDR',
                  availability: 'https://schema.org/InStock',
                  name: `${app.appName} - ${license.maxUsers} Users License`,
                })),
                ...(app.plans || []).map((plan) => ({
                  '@type': 'Offer',
                  price: plan.price,
                  priceCurrency: 'IDR',
                  availability: 'https://schema.org/InStock',
                  name: `${app.appName} - ${plan.name} Plan`,
                  billingIncrement: plan.duration === 'monthly' ? 'P1M' : plan.duration === 'yearly' ? 'P1Y' : undefined,
                })),
              ],
              aggregateRating: app.rating
                ? {
                    '@type': 'AggregateRating',
                    ratingValue: app.rating,
                    ratingCount: app.ratingCount || 0,
                  }
                : undefined,
              image: app.screenshots || app.logo,
            }),
          }}
        />
      </main>

      <Footer />
    </div>
  );
}

export function AppDetailClient({ app }: AppDetailClientProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--bg-main)] flex items-center justify-center">Loading...</div>}>
      <AppDetailContent app={app} />
    </Suspense>
  );
}