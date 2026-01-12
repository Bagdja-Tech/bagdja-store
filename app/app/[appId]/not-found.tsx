import Link from 'next/link';
import { Package } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--bg-main)] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <Package className="h-16 w-16 text-[var(--text-muted)] mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
          Aplikasi Tidak Ditemukan
        </h1>
        <p className="text-[var(--text-secondary)] mb-6">
          Aplikasi yang Anda cari tidak tersedia atau telah dihapus.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-[var(--action-primary)] text-white rounded-lg font-medium hover:bg-[var(--action-primary-hover)] transition-colors"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}

