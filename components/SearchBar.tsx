'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { getLanguageFromUrl, getTranslations } from '@/lib/translations';
import { trackEvent } from './GoogleAnalytics';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({ onSearch, placeholder, className = '' }: SearchBarProps) {
  const searchParams = useSearchParams();
  const lang = getLanguageFromUrl(searchParams);
  const t = getTranslations(lang);
  const defaultPlaceholder = placeholder || t.search.placeholder;
  
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Debounce search - only call if query is not empty
    if (query.trim() === '') {
      onSearch('');
      return;
    }

    const timer = setTimeout(() => {
      onSearch(query);
      // Track search event
      trackEvent('search', 'engagement', query.trim());
    }, 300);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  const handleClear = () => {
    setQuery('');
    onSearch('');
    inputRef.current?.focus();
  };

  return (
    <div className={`relative ${className}`}>
      <div
          className={`
          flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border transition-all duration-200
          ${isFocused 
            ? 'border-[var(--action-primary)] shadow-md shadow-[var(--action-primary)]/20 scale-[1.02] bg-white' 
            : 'border-white/20 hover:border-white/30 bg-white/95'
          }
        `}
      >
        <Search className={`h-5 w-5 flex-shrink-0 ${isFocused ? 'text-[var(--text-secondary)]' : 'text-white/70'}`} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={defaultPlaceholder}
          className={`flex-1 bg-transparent outline-none ${isFocused ? 'text-[var(--text-primary)] placeholder:text-[var(--text-muted)]' : 'text-white placeholder:text-white/60'}`}
        />
        {query && (
          <button
            onClick={handleClear}
            className="p-1 hover:bg-[var(--bg-hover)] rounded transition-colors"
            aria-label="Clear search"
          >
            <X className="h-4 w-4 text-[var(--text-secondary)]" />
          </button>
        )}
      </div>
    </div>
  );
}

