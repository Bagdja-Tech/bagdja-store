import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { AppDetailClient } from './AppDetailClient';
import { getAppById } from '@/lib/mockData';

interface PageProps {
  params: Promise<{ appId: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { appId } = await params;
  const app = getAppById(appId);

  if (!app || !app.isPublished) {
    return {
      title: 'Aplikasi Tidak Ditemukan | Bagdja Store',
    };
  }

  const title = `${app.appName} | Bagdja Store`;
  const description = app.description || app.shortDescription || `Temukan ${app.appName} di Bagdja Store`;
  const image = app.logo || app.screenshots?.[0] || '/icon-logo.png';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [image],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export default async function AppDetailPage({ params }: PageProps) {
  const { appId } = await params;
  
  if (!appId) {
    notFound();
  }

  const app = getAppById(appId);

  if (!app || !app.isPublished) {
    notFound();
  }

  return <AppDetailClient app={app} />;
}
