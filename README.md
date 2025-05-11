# TODO API BE

Todo-API-BE adalah backend untuk aplikasi Todo, menyediakan API untuk mengelola tugas yang harus dilakukan (todo). API ini memungkinkan pembuatan, pembaruan, penghapusan, dan pembacaan data todo dengan menggunakan basis data PostgreSQL yang dikelola melalui Sequelize ORM. Selain itu, API ini juga terintegrasi dengan layanan eksternal untuk mengambil quotes dari [API Ninja](https://api.api-ninjas.com).

---

## ✨ Spesifikasi Teknologi

- **Node.js**: v18.0.0
- **Express.js**: v4.19.2
- **Database**: PostgreSQL
- **ORM**: Sequelize

---

## ✨ Detail Dependency

### `axios`: ^1.9.0

### `bcryptjs`: ^2.4.3

### `cors`: ^2.8.5

### `dotenv`: ^16.5.0

### `eslint`: ^9.26.0

### `express`: ^4.19.2

### `jsonwebtoken`: ^9.0.2

### `module-alias`: ^2.2.3

### `nodemon`: ^3.1.10

### `pg`: ^8.15.6

### `sequelize`: ^6.37.7

### `sequelize-cli`: ^6.6.3


---

## 📁 Struktur Modular

Project ini disusun secara modular di dalam folder `src/modules`, untuk menjaga keteraturan dan skalabilitas kode.

Contoh struktur:

```
src/
├── modules/
│   ├── cms/
│   │   ├── user/
│   │   │   ├── controllers/
│   │   │   ├── services/
│   │   │   └── ...
│   │   └── ...
├── config/
├── databases/
│   ├── migrations/
│   ├── models/
│   ├── seeders/
├── helpers/
├── middleware/
├── routers/
│   ├── cms/
└── app.js
```

Setiap subfolder mewakili fitur atau domain spesifik yang terpisah dan memiliki controller, service, dan route masing-masing.

---

## ⚙️ Cara Install & Menjalankan

1. **Clone repository**

   ```bash
   git clone https://github.com/Serova-Barber/rest-api.git
   cd rest-api
   ```

2. **Install dependency**

   ```bash
   npm install
   ```

3. **Salin file `.env.example` menjadi `.env` dan sesuaikan nilai variabel DB\_**\*

   ```bash
   cp .env.example .env
   ```

4. **Cek koneksi database (status Sequelize)**

   Jalankan perintah:

   ```bash
   npx sequelize-cli db:migrate:status
   ```

   Jika koneksi berhasil, akan muncul daftar migrasi dan tabel `SequelizeMeta` akan otomatis dibuat (jika belum ada).

5. **Menjalankan migrasi database**

   ```bash
   npx sequelize-cli db:migrate
   ```

6. **Menjalankan semua seeder**

   ```bash
   npx sequelize-cli db:seed:all
   ```

7. **Jalankan aplikasi dalam mode development**

   ```bash
   npm run start:dev
   ```

8. **Cek hasil di browser atau Postman**

   Cek List API di bawah ini
## List API

### [GET] /api/v1/cms/dashboard/get-quote
Mengambil quote untuk ditampilkan di aplikasi.

### [GET] /api/v1/cms/todo/
Mengambil daftar todo.

### [GET] /api/v1/cms/todo/:id
Mengambil data todo berdasarkan ID.

### [POST] /api/v1/cms/todo/
Menambahkan todo baru.

### [PUT] /api/v1/cms/todo/:id
Memperbarui data todo berdasarkan ID.

### [PUT] /api/v1/cms/todo/:id/status
Memperbarui status todo berdasarkan ID.

### [DELETE] /api/v1/cms/todo/:id
Menghapus todo berdasarkan ID.

### [POST] /api/v1/cms/auth/login
Melakukan login pengguna.

### [POST] /api/v1/cms/auth/register
Melakukan pendaftaran pengguna baru.

### [GET] /api/v1/cms/auth/logged
Memeriksa apakah pengguna sudah login.



---

## 📢 Kontak

Untuk kontribusi atau pertanyaan, silakan hubungi tim developer melalui GitHub atau email internal.
