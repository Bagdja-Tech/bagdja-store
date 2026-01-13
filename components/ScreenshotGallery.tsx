'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { getLanguageFromUrl, getTranslations } from '@/lib/translations';

interface ScreenshotGalleryProps {
  screenshots: string[];
  appName: string;
}

export function ScreenshotGallery({ screenshots, appName }: ScreenshotGalleryProps) {
  const searchParams = useSearchParams();
  const lang = getLanguageFromUrl(searchParams);
  const t = getTranslations(lang);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (!screenshots || screenshots.length === 0) {
    return null;
  }

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const nextImage = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % screenshots.length);
    }
  };

  const prevImage = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + screenshots.length) % screenshots.length);
    }
  };

  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">
          {t.app.screenshots}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {screenshots.map((screenshot, index) => (
            <button
              key={index}
              onClick={() => openLightbox(index)}
              className="relative aspect-video rounded-lg overflow-hidden border border-[var(--border-default)] hover:border-[var(--border-hover)] transition-all hover:shadow-lg group animate-fade-in"
            >
              <Image
                src={screenshot}
                alt={`${appName} screenshot ${index + 1}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          <div
            className="relative max-w-7xl w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={screenshots[selectedIndex]}
              alt={`${appName} screenshot ${selectedIndex + 1}`}
              width={1200}
              height={800}
              className="max-w-full max-h-full object-contain rounded-lg"
              priority
            />
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="h-8 w-8" />
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
            {selectedIndex + 1} / {screenshots.length}
          </div>
        </div>
      )}
    </>
  );
}

