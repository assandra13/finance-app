# 💸 Finance App

Finance App adalah sistem informasi berbasis web untuk **mencatat, mengelola, dan menganalisis keuangan pribadi maupun bisnis kecil**.  
Dibangun menggunakan **Next.js 14 + Supabase + Tailwind CSS**, aplikasi ini menyediakan fitur manajemen keuangan yang modern, realtime, dan aman.

---

## 🚀 Fitur Utama

### 🔐 Sistem Autentikasi

- Login & logout dengan **Supabase Auth**
- Proteksi route dengan middleware
- Session-based authentication

### 💰 Manajemen Transaksi

- Tambah, edit, dan hapus transaksi (CRUD)
- Kategori pemasukan & pengeluaran
- Filter transaksi berdasarkan tanggal & kategori
- Upload bukti transaksi (opsional)

### 📊 Dashboard & Analitik

- Ringkasan saldo realtime
- Grafik pemasukan vs pengeluaran
- Analisis tren bulanan
- Daftar transaksi terbaru

### 📂 Manajemen Kategori

- Buat kategori custom untuk transaksi
- Warna/icon kategori biar lebih mudah dibedakan

### 📑 Laporan Keuangan

- Laporan harian, mingguan, bulanan
- Export laporan ke CSV / Excel
- Cetak laporan langsung dari aplikasi

### 🚨 Sistem Notifikasi

- Reminder tagihan (upcoming expenses)
- Notifikasi transaksi baru
- Alert jika saldo menipis

---

## 🛠️ Teknologi yang Digunakan

- **Frontend**: Next.js 14, React, TypeScript
- **UI Components**: Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, Supabase Functions
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Deployment**: Vercel

---

## 📋 Persyaratan Sistem

- Node.js 18+
- npm atau yarn
- Akun Supabase
- Browser modern (Chrome, Firefox, Edge, Safari)

---

## 🚀 Instalasi & Setup

1. **Clone Repository**

```bash
git clone <repository-url>
cd finance-app
```

2. **Install Dependencies**

```bash
npm install
# atau
yarn install
```

3. **Setup Environment Variables**  
   Buat file `.env.local` di root project dan tambahkan:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

4. **Setup Database**  
   Masuk ke **Supabase Dashboard**, lalu buat tabel berikut:

- **users** → data pengguna
- **transactions** → data transaksi (id, user_id, kategori, nominal, tanggal, deskripsi)
- **categories** → daftar kategori pemasukan/pengeluaran

Tambahkan juga **RLS (Row Level Security)** agar data setiap user terisolasi.

5. **Jalankan Development Server**

```bash
npm run dev
# atau
yarn dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

---

## 👥 User Roles

- **Admin**

  - Akses penuh semua fitur
  - CRUD kategori & transaksi
  - Lihat semua laporan

- **User**
  - CRUD transaksi pribadi
  - Melihat laporan pribadi
  - Tidak bisa mengakses data user lain

---

## 📱 Cara Penggunaan

1. **Login / Registrasi**

   - Masuk ke halaman login
   - Buat akun baru atau gunakan akun yang sudah ada

2. **Tambah Transaksi**

   - Klik tombol "Tambah Transaksi"
   - Isi kategori, nominal, deskripsi, dan tanggal
   - Simpan

3. **Melihat Laporan**

   - Masuk ke menu "Laporan"
   - Pilih rentang tanggal
   - Export ke CSV bila diperlukan

4. **Dashboard**
   - Menampilkan saldo terkini
   - Grafik pemasukan & pengeluaran
   - Transaksi terbaru

---

## 🗂️ Struktur Project

```
finance-app/
├── app/                  # Next.js App Router
│   ├── auth/             # Authentication pages
│   ├── dashboard/        # Dashboard utama
│   ├── transactions/     # Halaman transaksi
│   ├── reports/          # Laporan keuangan
│   └── layout.tsx        # Root layout
├── components/           # Reusable components
│   ├── charts/           # Grafik & chart
│   ├── forms/            # Form transaksi
│   ├── layout/           # Header, Sidebar
│   └── ui/               # UI components (shadcn/ui)
├── lib/
│   ├── supabase/         # Supabase client config
│   └── utils.ts          # Helper functions
├── public/               # Assets (icons, images)
├── scripts/              # SQL scripts (opsional)
└── README.md
```

---

## 🔒 Keamanan

- Row Level Security (RLS) aktif di semua tabel
- Role-based access control
- Input validation & sanitization
- Password encryption by Supabase Auth

---

## 🚀 Deployment

1. Push repository ke GitHub
2. Hubungkan ke **Vercel**
3. Set environment variables di dashboard Vercel
4. Deploy otomatis 🎉

---

## 🐛 Troubleshooting

**Error: Supabase URL and Key are required**  
👉 Pastikan `.env.local` sudah dibuat dan terisi dengan benar

**Database tidak sinkron**  
👉 Cek Supabase SQL Editor, jalankan ulang migrasi

**Auth bermasalah (tidak bisa login)**  
👉 Hapus cache browser & cek email konfirmasi

---

## 🤝 Contributing

1. Fork repository
2. Buat branch baru: `git checkout -b feature/fitur-baru`
3. Commit perubahan: `git commit -m "Add fitur baru"`
4. Push branch: `git push origin feature/fitur-baru`
5. Open Pull Request

---

## 📄 License

Project ini menggunakan lisensi **MIT**.

---

⚡ Finance App – Kelola keuangan lebih mudah, realtime, dan modern.
