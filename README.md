# Wedding Invitation — Mishbahul Munir & Kuni Sa'adati

Undangan pernikahan online dibangun dengan Next.js 14, TypeScript, dan TailwindCSS. Mengikuti struktur, gaya kode, dan tooling dari pola `blog-app-jcwd0510-fe-main`.

## 🚀 Cara Menjalankan

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build production
npm run build
npm run start
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## 📂 Struktur Project

```
wedding-invitation/
├── public/
│   ├── images/          # Foto-foto (groom.jpg, bride.jpg, gallery-N.jpg)
│   └── music/           # Background music (background.mp3)
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx   # Root layout + fonts + providers
│   │   └── page.tsx     # Tipis: render <HomePage />
│   ├── components/
│   │   ├── FloralDivider.tsx  # Ornament pemisah section
│   │   └── MusicPlayer.tsx    # Floating music button
│   ├── features/home/
│   │   ├── index.tsx           # HomePage shell + scroll observer
│   │   ├── constants.ts        # ⭐ SEMUA DATA UNDANGAN DI SINI
│   │   ├── schema.ts           # Yup schemas (RSVP, Wish)
│   │   └── components/
│   │       ├── EnvelopeOpener.tsx
│   │       ├── HeroSection.tsx
│   │       ├── CoupleSection.tsx
│   │       ├── CountdownSection.tsx
│   │       ├── EventSection.tsx
│   │       ├── GallerySection.tsx
│   │       ├── RSVPSection.tsx
│   │       ├── GiftSection.tsx
│   │       └── WishesSection.tsx
│   ├── hooks/api/              # Pattern useQuery/useMutation
│   │   ├── rsvp/useCreateRsvp.ts
│   │   └── wish/
│   │       ├── useCreateWish.ts
│   │       └── useGetWishes.ts
│   ├── lib/
│   │   ├── axios.ts            # Instance axios (untuk API)
│   │   └── utils.ts            # cn() helper untuk shadcn
│   ├── providers/
│   │   ├── NuqsProvider.tsx
│   │   └── ReactQueryProvider.tsx
│   └── types/
│       ├── rsvp.ts
│       ├── wedding.ts
│       └── wish.ts
├── tailwind.config.ts          # Theme: navy/charcoal/gold + animasi
├── components.json             # shadcn config
└── package.json
```

## ⚙️ Cara Edit Data Undangan

**Semua data undangan ada di satu file:** `src/features/home/constants.ts`

Edit field berikut sesuai kebutuhan:

- `weddingData.groom` — data mempelai pria
- `weddingData.bride` — data mempelai putri
- `weddingData.events` — daftar acara (akad, resepsi)
- `WEDDING_DATE_ISO` — tanggal pernikahan (untuk countdown)
- `bankAccounts` — rekening untuk amplop digital
- `galleryImages` — daftar path foto galeri

## 🖼️ Menambahkan Foto

Letakkan file di `public/images/` dengan nama:

- `groom.jpg` — mempelai pria
- `bride.jpg` — mempelai putri
- `gallery-1.jpg` ... `gallery-N.jpg` — galeri

Path otomatis tersedia di kode sebagai `/images/...`

## 🎵 Menambahkan Musik

Letakkan file MP3 di `public/music/background.mp3`. Volume sudah di-set 40%, auto-loop.

## 🔌 Menghubungkan ke Backend (Opsional)

Saat ini RSVP dan Wishes disimpan di `localStorage`. Untuk menghubungkan ke backend:

1. Set `NEXT_PUBLIC_BASE_URL_API` di `.env`
2. Edit `src/hooks/api/rsvp/useCreateRsvp.ts` — ganti isi `mutationFn` dengan:
   ```ts
   const { data } = await axiosInstance.post<Rsvp>("/rsvp", payload);
   return data;
   ```
3. Edit `src/hooks/api/wish/*.ts` dengan pola yang sama.

## 🎨 Tema Visual

- **Warna:** navy + charcoal + gold (lihat `tailwind.config.ts`)
- **Font:** Cormorant Garamond (display), Jost (body), Dancing Script (script)
- **Animasi:** shimmer (gold text), fade-up (section reveal), float (ornament)

## 📦 Dependencies Utama

| Package | Kegunaan |
|---------|----------|
| `next` 14.2.16 | Framework |
| `formik` + `yup` | Form & validasi |
| `@tanstack/react-query` | Server state |
| `react-toastify` | Notifikasi |
| `nuqs` | URL state |
| `lucide-react` | Icon |
| `date-fns` | Format tanggal |
| `axios` | HTTP client |
| `tailwind-merge` + `clsx` | Class merger (shadcn) |
