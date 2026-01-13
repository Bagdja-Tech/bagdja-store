'use client';

import { useSearchParams } from 'next/navigation';
import { getLanguageFromUrl, getTranslations } from '@/lib/translations';

interface VideoSectionProps {
  videoUrl?: string;
}

export function VideoSection({ videoUrl }: VideoSectionProps) {
  const searchParams = useSearchParams();
  const lang = getLanguageFromUrl(searchParams);
  const t = getTranslations(lang);

  if (!videoUrl) {
    return null;
  }

  // Extract YouTube video ID if it's a YouTube URL
  const getYouTubeEmbedUrl = (url: string): string => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = match && match[2].length === 11 ? match[2] : null;

    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }

    // If it's already an embed URL, return as is
    if (url.includes('youtube.com/embed') || url.includes('youtu.be')) {
      return url;
    }

    return url;
  };

  const embedUrl = getYouTubeEmbedUrl(videoUrl);

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">
        {t.app.video}
      </h2>
      <div className="relative aspect-video rounded-lg overflow-hidden border border-[var(--border-default)] bg-[var(--bg-section)]">
        <iframe
          src={embedUrl}
          title="App Demo Video"
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}

