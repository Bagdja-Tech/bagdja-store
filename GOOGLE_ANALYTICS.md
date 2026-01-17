# Google Analytics Setup untuk Bagdja Store

Dokumentasi ini menjelaskan cara setup dan menggunakan Google Analytics di aplikasi Bagdja Store.

## Setup Awal

### 1. Buat Google Analytics Account

1. Kunjungi [Google Analytics](https://analytics.google.com/)
2. Buat property baru untuk website Anda
3. Pilih "Web" sebagai platform
4. Dapatkan **Measurement ID** (format: `G-XXXXXXXXXX`)

### 2. Konfigurasi Environment Variable

Tambahkan Measurement ID ke file `.env.local`:

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Catatan:** Jangan commit file `.env.local` ke repository. File `env.example` sudah diupdate dengan placeholder untuk GA.

### 3. Verifikasi Instalasi

Setelah menambahkan Measurement ID, Google Analytics akan otomatis:
- ✅ Track page views (otomatis saat navigasi)
- ✅ Track search queries
- ✅ Track app card clicks

## Fitur yang Sudah Diimplementasi

### 1. Automatic Page View Tracking

Setiap kali user navigasi ke halaman baru, page view akan otomatis di-track.

### 2. Search Tracking

Ketika user melakukan pencarian, event akan di-track dengan:
- **Category:** `engagement`
- **Action:** `search`
- **Label:** Query yang dicari

### 3. App Card Click Tracking

Ketika user mengklik aplikasi card, event akan di-track dengan:
- **Category:** `app_card`
- **Action:** `click`
- **Label:** Nama aplikasi yang diklik

## Custom Event Tracking

Anda bisa menambahkan custom event tracking di komponen manapun dengan menggunakan helper function:

```typescript
import { trackEvent } from '@/components/GoogleAnalytics';

// Contoh: Track button click
const handleButtonClick = () => {
  trackEvent('click', 'button', 'cta_button');
};

// Contoh: Track form submission
const handleSubmit = () => {
  trackEvent('submit', 'form', 'contact_form');
};

// Contoh: Track dengan value
const handlePurchase = (amount: number) => {
  trackEvent('purchase', 'ecommerce', 'product_name', amount);
};
```

### Parameter trackEvent:

```typescript
trackEvent(
  action: string,      // Nama action (contoh: 'click', 'submit', 'view')
  category: string,    // Kategori event (contoh: 'engagement', 'ecommerce')
  label?: string,      // Label opsional (contoh: nama item yang diklik)
  value?: number        // Nilai numerik opsional (contoh: harga, jumlah)
);
```

## Event yang Direkomendasikan untuk Ditrack

### Engagement Events
- Search queries
- Filter usage
- Category selection
- Language switching

### Conversion Events
- App detail page views
- Contact form submissions
- Download clicks
- Pricing plan views

### User Behavior
- Scroll depth
- Time on page
- Video plays
- Screenshot views

## Testing

### Development Mode

Google Analytics hanya akan aktif jika `NEXT_PUBLIC_GA_MEASUREMENT_ID` sudah di-set. Jika tidak di-set, aplikasi tetap berjalan normal tanpa tracking.

### Verifikasi di Google Analytics

1. Buka [Google Analytics Real-Time](https://analytics.google.com/)
2. Pilih property Anda
3. Buka "Realtime" > "Overview"
4. Lakukan beberapa action di website (search, klik app card, dll)
5. Event akan muncul dalam beberapa detik

## Troubleshooting

### GA tidak tracking

1. Pastikan `NEXT_PUBLIC_GA_MEASUREMENT_ID` sudah di-set di `.env.local`
2. Restart development server setelah menambahkan env variable
3. Cek browser console untuk error
4. Pastikan tidak ada ad blocker yang memblokir Google Analytics

### Event tidak muncul di GA

1. Tunggu beberapa detik (real-time data bisa delay)
2. Cek di "Events" section di Google Analytics
3. Pastikan format Measurement ID benar (dimulai dengan `G-`)

## Privacy & GDPR Compliance

Untuk compliance dengan GDPR dan privacy regulations:

1. **Cookie Consent:** Pertimbangkan untuk menambahkan cookie consent banner
2. **IP Anonymization:** Sudah diaktifkan secara default di GA4
3. **Data Retention:** Konfigurasi di Google Analytics settings

## Referensi

- [Google Analytics 4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [Next.js Script Component](https://nextjs.org/docs/app/api-reference/components/script)
- [GA4 Event Tracking](https://developers.google.com/analytics/devguides/collection/ga4/events)
