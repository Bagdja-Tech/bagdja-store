// Mockup Data untuk Development Bagdja Store

import type { App, Category, License, Plan, Product } from '@/types';

// Categories
export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Business Management',
    slug: 'business-management',
    description: 'Aplikasi untuk mengelola bisnis Anda',
  },
  {
    id: '2',
    name: 'Productivity',
    slug: 'productivity',
    description: 'Tingkatkan produktivitas dengan aplikasi ini',
  },
  {
    id: '3',
    name: 'E-Commerce',
    slug: 'e-commerce',
    description: 'Solusi untuk toko online Anda',
  },
  {
    id: '4',
    name: 'Finance',
    slug: 'finance',
    description: 'Kelola keuangan dengan mudah',
  },
  {
    id: '5',
    name: 'Education',
    slug: 'education',
    description: 'Aplikasi pembelajaran dan edukasi',
  },
  {
    id: '6',
    name: 'Healthcare',
    slug: 'healthcare',
    description: 'Solusi kesehatan dan medis',
  },
];

// Mock Apps
export const mockApps: App[] = [
  {
    id: '1',
    appId: 'inventory-pro',
    appName: 'Inventory Pro',
    shortDescription: 'Sistem manajemen inventori lengkap untuk bisnis Anda',
    description: 'Inventory Pro adalah aplikasi manajemen inventori yang powerful dan mudah digunakan. Kelola stok, penjualan, pembelian, dan laporan dengan satu aplikasi. Cocok untuk toko retail, grosir, dan warehouse.',
    logo: 'https://picsum.photos/200/200?random=1',
    categoryId: '1',
    category: mockCategories[0],
    rating: 4.5,
    ratingCount: 128,
    userCount: 1250,
    screenshots: [
      'https://picsum.photos/800/600?random=11',
      'https://picsum.photos/800/600?random=12',
      'https://picsum.photos/800/600?random=13',
      'https://picsum.photos/800/600?random=14',
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    startingPrice: 500000,
    priceType: 'license',
    isActive: true,
    isPublished: true,
    contactEmail: 'support@inventorypro.com',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-12-01'),
    licenses: [
      {
        id: 'l1',
        appId: '1',
        type: 'license',
        maxUsers: 5,
        expTime: null,
        price: 500000,
        status: 'available',
      },
      {
        id: 'l2',
        appId: '1',
        type: 'license',
        maxUsers: 10,
        expTime: null,
        price: 800000,
        status: 'available',
      },
      {
        id: 'l3',
        appId: '1',
        type: 'license',
        maxUsers: 25,
        expTime: null,
        price: 1500000,
        status: 'available',
      },
    ],
    products: [
      {
        id: 'p1',
        appId: '1',
        name: 'Add-on: Multi Warehouse',
        description: 'Fitur tambahan untuk mengelola multiple warehouse',
        price: 200000,
        type: 'addon',
        status: 'active',
        isActive: true,
      },
      {
        id: 'p2',
        appId: '1',
        name: 'Add-on: Barcode Scanner',
        description: 'Integrasi dengan barcode scanner',
        price: 150000,
        type: 'addon',
        status: 'active',
        isActive: true,
      },
    ],
  },
  {
    id: '2',
    appId: 'task-master',
    appName: 'Task Master',
    shortDescription: 'Aplikasi manajemen tugas dan proyek yang efisien',
    description: 'Task Master membantu tim Anda mengelola tugas dan proyek dengan lebih efisien. Fitur kolaborasi real-time, timeline, dan reporting yang lengkap. Perfect untuk tim remote dan hybrid.',
    logo: 'https://picsum.photos/200/200?random=2',
    categoryId: '2',
    category: mockCategories[1],
    rating: 4.8,
    ratingCount: 256,
    userCount: 3200,
    screenshots: [
      'https://picsum.photos/800/600?random=21',
      'https://picsum.photos/800/600?random=22',
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    startingPrice: 150000,
    priceType: 'subscription',
    isActive: true,
    isPublished: true,
    contactEmail: 'hello@taskmaster.com',
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-11-15'),
    plans: [
      {
        id: 'pl1',
        appId: '2',
        name: 'Starter',
        description: 'Cocok untuk tim kecil',
        price: 150000,
        duration: 'monthly',
        durationValue: 1,
        features: ['Up to 5 users', '10 projects', 'Basic reporting'],
        status: 'active',
        isActive: true,
      },
      {
        id: 'pl2',
        appId: '2',
        name: 'Professional',
        description: 'Untuk tim yang berkembang',
        price: 300000,
        duration: 'monthly',
        durationValue: 1,
        features: ['Up to 25 users', 'Unlimited projects', 'Advanced reporting', 'API access'],
        status: 'active',
        isActive: true,
      },
      {
        id: 'pl3',
        appId: '2',
        name: 'Enterprise',
        description: 'Solusi lengkap untuk perusahaan',
        price: 600000,
        duration: 'monthly',
        durationValue: 1,
        features: ['Unlimited users', 'Unlimited projects', 'Custom reporting', 'API access', 'Priority support'],
        status: 'active',
        isActive: true,
      },
    ],
  },
  {
    id: '3',
    appId: 'shop-easy',
    appName: 'Shop Easy',
    shortDescription: 'Platform e-commerce lengkap dengan payment gateway',
    description: 'Shop Easy adalah platform e-commerce yang lengkap dengan fitur payment gateway, inventory management, order tracking, dan customer management. Mudah digunakan dan siap untuk scale up.',
    logo: 'https://picsum.photos/200/200?random=3',
    categoryId: '3',
    category: mockCategories[2],
    rating: 4.3,
    ratingCount: 89,
    userCount: 890,
    screenshots: [
      'https://picsum.photos/800/600?random=31',
      'https://picsum.photos/800/600?random=32',
      'https://picsum.photos/800/600?random=33',
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    startingPrice: 750000,
    priceType: 'both',
    isActive: true,
    isPublished: true,
    contactEmail: 'info@shopeasy.com',
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-12-05'),
    licenses: [
      {
        id: 'l4',
        appId: '3',
        type: 'license',
        maxUsers: 10,
        expTime: null,
        price: 750000,
        status: 'available',
      },
    ],
    plans: [
      {
        id: 'pl4',
        appId: '3',
        name: 'Monthly Subscription',
        description: 'Bayar per bulan',
        price: 200000,
        duration: 'monthly',
        durationValue: 1,
        features: ['All features', 'Email support'],
        status: 'active',
        isActive: true,
      },
    ],
    products: [
      {
        id: 'p3',
        appId: '3',
        name: 'Payment Gateway Integration',
        description: 'Integrasi dengan payment gateway populer',
        price: 500000,
        type: 'integration',
        status: 'active',
        isActive: true,
      },
    ],
  },
  {
    id: '4',
    appId: 'finance-tracker',
    appName: 'Finance Tracker',
    shortDescription: 'Kelola keuangan pribadi dan bisnis dengan mudah',
    description: 'Finance Tracker membantu Anda mengelola keuangan pribadi dan bisnis. Fitur budgeting, expense tracking, financial reports, dan multi-currency support.',
    logo: 'https://picsum.photos/200/200?random=4',
    categoryId: '4',
    category: mockCategories[3],
    rating: 4.6,
    ratingCount: 167,
    userCount: 2100,
    screenshots: [
      'https://picsum.photos/800/600?random=41',
      'https://picsum.photos/800/600?random=42',
      'https://picsum.photos/800/600?random=43',
      'https://picsum.photos/800/600?random=44',
      'https://picsum.photos/800/600?random=45',
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    startingPrice: 300000,
    priceType: 'subscription',
    isActive: true,
    isPublished: true,
    contactEmail: 'support@financetracker.com',
    createdAt: new Date('2024-04-05'),
    updatedAt: new Date('2024-11-20'),
    plans: [
      {
        id: 'pl5',
        appId: '4',
        name: 'Personal',
        description: 'Untuk penggunaan pribadi',
        price: 300000,
        duration: 'yearly',
        durationValue: 365,
        features: ['Personal accounts', 'Basic reports', 'Mobile app'],
        status: 'active',
        isActive: true,
      },
      {
        id: 'pl6',
        appId: '4',
        name: 'Business',
        description: 'Untuk bisnis kecil dan menengah',
        price: 500000,
        duration: 'yearly',
        durationValue: 365,
        features: ['Multi-accounts', 'Advanced reports', 'Team collaboration', 'Mobile app'],
        status: 'active',
        isActive: true,
      },
    ],
  },
  {
    id: '5',
    appId: 'learn-hub',
    appName: 'Learn Hub',
    shortDescription: 'Platform pembelajaran online dengan fitur lengkap',
    description: 'Learn Hub adalah platform pembelajaran online yang menyediakan fitur course management, video streaming, quiz, assignment, dan certificate generation. Perfect untuk institusi pendidikan dan corporate training.',
    logo: 'https://picsum.photos/200/200?random=5',
    categoryId: '5',
    category: mockCategories[4],
    rating: 4.7,
    ratingCount: 312,
    userCount: 4500,
    screenshots: [
      'https://picsum.photos/800/600?random=51',
      'https://picsum.photos/800/600?random=52',
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    startingPrice: 1000000,
    priceType: 'license',
    isActive: true,
    isPublished: true,
    contactEmail: 'contact@learnhub.com',
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-12-10'),
    licenses: [
      {
        id: 'l5',
        appId: '5',
        type: 'license',
        maxUsers: 50,
        expTime: null,
        price: 1000000,
        status: 'available',
      },
      {
        id: 'l6',
        appId: '5',
        type: 'license',
        maxUsers: 100,
        expTime: null,
        price: 1800000,
        status: 'available',
      },
      {
        id: 'l7',
        appId: '5',
        type: 'license',
        maxUsers: 500,
        expTime: null,
        price: 5000000,
        status: 'available',
      },
    ],
    products: [
      {
        id: 'p4',
        appId: '5',
        name: 'Certificate Template Pack',
        description: 'Koleksi template sertifikat profesional',
        price: 250000,
        type: 'template',
        status: 'active',
        isActive: true,
      },
    ],
  },
  {
    id: '6',
    appId: 'health-care',
    appName: 'Health Care Pro',
    shortDescription: 'Sistem manajemen klinik dan rumah sakit',
    description: 'Health Care Pro adalah sistem manajemen lengkap untuk klinik dan rumah sakit. Fitur appointment scheduling, patient records, billing, pharmacy management, dan lab integration.',
    logo: 'https://picsum.photos/200/200?random=6',
    categoryId: '6',
    category: mockCategories[5],
    rating: 4.4,
    ratingCount: 76,
    userCount: 650,
    screenshots: [
      'https://picsum.photos/800/600?random=61',
      'https://picsum.photos/800/600?random=62',
      'https://picsum.photos/800/600?random=63',
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    startingPrice: 2000000,
    priceType: 'subscription',
    isActive: true,
    isPublished: true,
    contactEmail: 'sales@healthcarepro.com',
    createdAt: new Date('2024-05-15'),
    updatedAt: new Date('2024-11-25'),
    plans: [
      {
        id: 'pl7',
        appId: '6',
        name: 'Clinic',
        description: 'Untuk klinik kecil',
        price: 2000000,
        duration: 'monthly',
        durationValue: 1,
        features: ['Up to 10 staff', 'Patient management', 'Appointment scheduling'],
        status: 'active',
        isActive: true,
      },
      {
        id: 'pl8',
        appId: '6',
        name: 'Hospital',
        description: 'Untuk rumah sakit',
        price: 5000000,
        duration: 'monthly',
        durationValue: 1,
        features: ['Unlimited staff', 'All features', 'Priority support', 'Custom integration'],
        status: 'active',
        isActive: true,
      },
    ],
  },
];

// Helper functions
export function getAppById(id: string): App | undefined {
  if (!id) return undefined;
  // Try to find by appId first (most common case)
  let app = mockApps.find((app) => app.appId === id);
  // If not found, try to find by id
  if (!app) {
    app = mockApps.find((app) => app.id === id);
  }
  return app;
}

export function getAppsByCategory(categoryId: string): App[] {
  return mockApps.filter((app) => app.categoryId === categoryId && app.isPublished);
}

export function getRecommendedApps(limit: number = 6): App[] {
  // Sort by rating and user count, then take top N
  return [...mockApps]
    .filter((app) => app.isPublished)
    .sort((a, b) => {
      const scoreA = (a.rating || 0) * 0.6 + (a.userCount || 0) * 0.0001;
      const scoreB = (b.rating || 0) * 0.6 + (b.userCount || 0) * 0.0001;
      return scoreB - scoreA;
    })
    .slice(0, limit);
}

export function searchApps(query: string, categoryId?: string): App[] {
  const lowerQuery = query.toLowerCase();
  return mockApps.filter((app) => {
    if (!app.isPublished) return false;
    if (categoryId && app.categoryId !== categoryId) return false;
    
    const matchesQuery =
      app.appName.toLowerCase().includes(lowerQuery) ||
      app.shortDescription?.toLowerCase().includes(lowerQuery) ||
      app.description?.toLowerCase().includes(lowerQuery) ||
      app.appId.toLowerCase().includes(lowerQuery);
    
    return matchesQuery;
  });
}

