import { MetadataRoute } from 'next';
import { mockApps, mockCategories } from '@/lib/mockData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://store.bagdja.com';

  // Homepage
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ];

  // Category pages
  mockCategories.forEach((category) => {
    routes.push({
      url: `${baseUrl}/?category=${category.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  });

  // App detail pages
  mockApps
    .filter((app) => app.isPublished)
    .forEach((app) => {
      routes.push({
        url: `${baseUrl}/app/${app.appId}`,
        lastModified: app.updatedAt,
        changeFrequency: 'weekly',
        priority: 0.9,
      });
    });

  return routes;
}

