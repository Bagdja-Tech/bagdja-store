'use client';

import { Category } from '@/types';
import { useSearchParams } from 'next/navigation';
import { getLanguageFromUrl, getTranslations } from '@/lib/translations';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategoryId?: string;
  onSelectCategory: (categoryId: string | undefined) => void;
  className?: string;
}

export function CategoryFilter({
  categories,
  selectedCategoryId,
  onSelectCategory,
  className = '',
}: CategoryFilterProps) {
  const searchParams = useSearchParams();
  const lang = getLanguageFromUrl(searchParams);
  const t = getTranslations(lang);

  return (
    <div className={`flex flex-wrap gap-2 ${className} animate-fade-in`}>
      <button
        onClick={() => onSelectCategory(undefined)}
        className={`
          px-4 py-2 rounded-lg text-sm font-medium transition-all
          ${
            !selectedCategoryId
              ? 'bg-[var(--action-primary)] text-white shadow-md'
              : 'bg-[var(--bg-hover)] text-[var(--text-primary)] hover:bg-[var(--border-default)]'
          }
        `}
      >
        {t.category.all}
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          className={`
            px-4 py-2 rounded-lg text-sm font-medium transition-all
            ${
              selectedCategoryId === category.id
                ? 'bg-[var(--primary)] text-white shadow-md'
                : 'bg-[var(--bg-hover)] text-[var(--text-primary)] hover:bg-[var(--border-default)]'
            }
          `}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}

