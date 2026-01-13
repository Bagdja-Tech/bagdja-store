'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { SearchBar } from './SearchBar';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { getLanguageFromUrl, getTranslations } from '@/lib/translations';
import { removeAccessToken, getAccessToken, removeClientToken } from '@/lib/auth';
import { getProfile } from '@/lib/api';
import { getBalance } from '@/lib/piece-api';
import type { User } from '@/types/user';

interface HeaderProps {
  onSearch: (query: string) => void;
}

export function Header({ onSearch }: HeaderProps) {
  const searchParams = useSearchParams();
  const lang = getLanguageFromUrl(searchParams);
  const t = getTranslations(lang);
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [globalBalance, setGlobalBalance] = useState<number | null>(null);
  const [balanceCurrency, setBalanceCurrency] = useState<string>('BP');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const refreshAuthState = async () => {
    const token = getAccessToken();
    if (!token) {
      setUser(null);
      setGlobalBalance(null);
      return;
    }

    try {
      const profile = await getProfile();
      setUser(profile);

      // Balance is optional (depends on piece service + client app credentials)
      try {
        const balance = await getBalance();
        setGlobalBalance(balance?.global?.balance ?? null);
        setBalanceCurrency(balance?.global?.currency || 'BP');
      } catch {
        setGlobalBalance(null);
        setBalanceCurrency('BP');
      }
    } catch {
      removeAccessToken();
      removeClientToken();
      setUser(null);
      setGlobalBalance(null);
    }
  };

  useEffect(() => {
    refreshAuthState();

    const handler = () => refreshAuthState();
    window.addEventListener('bagdja:auth-changed', handler);
    return () => window.removeEventListener('bagdja:auth-changed', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isMenuOpen]);

  const handleLogout = () => {
    removeAccessToken();
    removeClientToken();
    setUser(null);
    setGlobalBalance(null);
    setIsMenuOpen(false);
    window.dispatchEvent(new Event('bagdja:auth-changed'));
    router.push('/');
  };

  const displayName = user?.name || user?.username || user?.email || 'User';
  const avatarInitial = displayName.charAt(0).toUpperCase();
  const formattedBalance =
    typeof globalBalance === 'number'
      ? `${new Intl.NumberFormat(undefined).format(globalBalance)} ${balanceCurrency}`
      : `-- ${balanceCurrency}`;

  const handleLogin = () => {
    const baseLogin = process.env.NEXT_PUBLIC_LOGIN_URL || 'https://login.bagdja.com';
    const loginUrl = new URL(baseLogin);

    const returnUrl = new URL(window.location.href);
    returnUrl.searchParams.delete('token');
    returnUrl.searchParams.delete('redirect');

    loginUrl.searchParams.set('redirect_url', returnUrl.toString());
    loginUrl.searchParams.set('lang', lang);

    window.location.href = loginUrl.toString();
  };

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
            <div className="flex items-center gap-6">
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
            </div>
            <div className="flex items-center gap-3">
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                    className="flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-sm font-medium text-white hover:bg-white/20 transition-colors"
                  >
                    {user.profilePicture ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={user.profilePicture}
                        alt={displayName}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-[var(--action-primary)] flex items-center justify-center text-sm font-semibold text-white">
                        {avatarInitial}
                      </div>
                    )}
                    <span className="hidden sm:inline">{displayName}</span>
                    <span className="hidden lg:inline text-xs text-white/80 ml-1">
                      {formattedBalance}
                    </span>
                    <svg
                      className={`w-4 h-4 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white shadow-xl border border-white/60 text-left">
                      <div className="px-4 py-3 border-b border-white/30">
                        <p className="text-sm font-semibold text-gray-900 truncate">{displayName}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                      <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                        <span className="font-semibold">{t.header.balance ?? 'Balance'}:</span>{' '}
                        <span>{formattedBalance}</span>
                      </div>
                      <button
                        type="button"
                        className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={handleLogout}
                      >
                        {t.header.logout}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleLogin}
                  className="text-sm font-semibold text-white hover:text-[var(--action-primary)] transition-colors"
                >
                  {t.nav.login}
                </button>
              )}
              <LanguageSwitcher />
            </div>
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

