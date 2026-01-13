'use client';

import Link from 'next/link';
import { SearchBar } from './SearchBar';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useSearchParams } from 'next/navigation';
import { getLanguageFromUrl, getTranslations } from '@/lib/translations';

interface HeaderProps {
  onSearch: (query: string) => void;
}

export function Header({ onSearch }: HeaderProps) {
  const searchParams = useSearchParams();
  const lang = getLanguageFromUrl(searchParams);
  const t = getTranslations(lang);

  return (
    <header className="sticky top-0 z-50 bg-[var(--primary)] border-b border-[var(--primary-light)] backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="h-10 w-10 rounded-lg bg-[var(--action-primary)] flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <span className="text-xl font-bold text-white hidden sm:inline">
              Bagdja Store
            </span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <SearchBar onSearch={onSearch} />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6 flex-shrink-0">
            <Link
              href="/"
              className="text-sm font-medium text-white/90 hover:text-white transition-colors"
            >
              {t.nav.home}
            </Link>
            <Link
              href="#categories"
              className="text-sm font-medium text-white/90 hover:text-white transition-colors"
            >
              {t.nav.categories}
            </Link>
            <Link
              href="#about"
              className="text-sm font-medium text-white/90 hover:text-white transition-colors"
            >
              {t.nav.about}
            </Link>
            <LanguageSwitcher />
          </nav>

          {/* Mobile Menu Button (optional for future) */}
          <button
            className="md:hidden p-2 text-white/90 hover:text-white transition-colors rounded-lg hover:bg-white/10"
            aria-label="Menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

