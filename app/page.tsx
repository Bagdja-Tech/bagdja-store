'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CategoryFilter } from '@/components/CategoryFilter';
import { AppCard } from '@/components/AppCard';
import { mockApps, mockCategories, getRecommendedApps, searchApps } from '@/lib/mockData';
import { getLanguageFromUrl, getTranslations } from '@/lib/translations';
import type { App } from '@/types';

function HomeContent() {
  const searchParams = useSearchParams();
  const lang = getLanguageFromUrl(searchParams);
  const t = getTranslations(lang);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>(undefined);

  // Get recommended apps
  const recommendedApps = useMemo(() => getRecommendedApps(6), []);

  // Filter apps based on search and category
  const filteredApps = useMemo(() => {
    let apps: App[] = mockApps.filter((app) => app.isPublished);

    // Apply category filter
    if (selectedCategoryId) {
      apps = apps.filter((app) => app.categoryId === selectedCategoryId);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      apps = searchApps(searchQuery, selectedCategoryId);
    }

    return apps;
  }, [searchQuery, selectedCategoryId]);

  // Determine which apps to show
  const displayApps = searchQuery.trim() || selectedCategoryId ? filteredApps : recommendedApps;
  const showRecommendations = !searchQuery.trim() && !selectedCategoryId;

  return (
    <div className="min-h-screen bg-[var(--bg-main)]">
      <Header onSearch={setSearchQuery} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12 animate-fade-in bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] rounded-2xl p-8 md:p-12 text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            {t.hero.title}
          </h1>
          <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto px-4">
            {t.hero.subtitle}
          </p>
        </section>

        {/* Category Filter Section */}
        <section id="categories" className="mb-8">
          <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">
            {t.category.title}
          </h2>
          <CategoryFilter
            categories={mockCategories}
            selectedCategoryId={selectedCategoryId}
            onSelectCategory={setSelectedCategoryId}
          />
        </section>

        {/* Apps Section */}
        <section className="mb-12">
          {showRecommendations ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
                  {t.app.recommended}
                </h2>
                <span className="text-sm text-[var(--text-secondary)]">
                  {recommendedApps.length} {t.app.count}
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
                  {searchQuery.trim() ? t.search.results : t.search.categoryResults}
                </h2>
                <span className="text-sm text-[var(--text-secondary)]">
                  {filteredApps.length} {t.app.found}
                </span>
              </div>
            </>
          )}

          {/* Apps Grid */}
          {displayApps.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayApps.map((app) => (
                <AppCard key={app.id} app={app} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-[var(--bg-section)] rounded-lg border border-[var(--border-default)]">
              <p className="text-lg text-[var(--text-secondary)] mb-2">
                {t.search.noResults}
              </p>
              <p className="text-sm text-[var(--text-muted)]">
                {t.search.noResultsDesc}
              </p>
            </div>
          )}
        </section>

        {/* All Apps Section (if showing recommendations) */}
        {showRecommendations && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
                {t.app.all}
              </h2>
              <span className="text-sm text-[var(--text-secondary)]">
                {mockApps.filter((app) => app.isPublished).length} {t.app.count}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockApps
                .filter((app) => app.isPublished)
                .map((app) => (
                  <AppCard key={app.id} app={app} />
                ))}
            </div>
          </section>
        )}

        {/* Structured Data for Homepage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Bagdja Store',
              description: 'Platform terpercaya untuk menemukan aplikasi berkualitas tinggi yang membantu meningkatkan produktivitas dan efisiensi bisnis Anda.',
              url: 'https://store.bagdja.com',
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://store.bagdja.com/?search={search_term_string}',
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </main>

      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--bg-main)] flex items-center justify-center">Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
