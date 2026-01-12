'use client';

import { ShoppingBag } from 'lucide-react';
import type { Product } from '@/types';

interface ProductsSectionProps {
  products: Product[];
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function ProductsSection({ products }: ProductsSectionProps) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
        <ShoppingBag className="h-6 w-6 text-[var(--action-primary)]" />
        Produk Digital
      </h2>
      <p className="text-sm text-[var(--text-secondary)] mb-6">
        Produk tambahan yang tersedia untuk aplikasi ini
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="border border-[var(--border-default)] rounded-lg p-5 bg-[var(--bg-surface)] hover:border-[var(--border-hover)] hover:shadow-md transition-all animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                  {product.name}
                </h3>
                {product.description && (
                  <p className="text-sm text-[var(--text-secondary)] mb-3">
                    {product.description}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-[var(--action-primary)]">
                {formatPrice(product.price)}
              </span>
              <button className="px-4 py-2 bg-[var(--action-primary)] text-white rounded-lg text-sm font-medium hover:bg-[var(--action-primary-hover)] transition-colors">
                Beli
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

