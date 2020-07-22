## LECTURE MVC Express PG


### SLIDE

- Storage persistent penyimpanan tetap permanen (misal harddisk) lawannya temporary (RAM)

- SQL banyak jenisnya. Postgres syntax query mirip dan fitur ke semua jenis database SQL

  - PostgreSQL itu open-source / community. MySQL closed source.
  - PostgreSQL bersifat extensible (shared library)

- Connection Pool (connection bisa di re-use untuk request mendatang) untuk performa

  - Pool membuat kolam yang berisi cached connection
  - Client masih pakai cara tradisional
  - Lebih efisien karena kalau client membentuk koneksi dari awal lagi ketika selesai query lalu end hilang dan bikin lagi (20 - 30 mili detik sedikit demi sedikit memperlambat aplikasi)
  - Ketika request yang sudah terpakai itu tersimpan untuk client tersebut (kalau tidak akan dijalankan secara simultan)

- Pool basic config ada bedanya max jumlah client dan idleTimeout (jika tidak terjadi koneksi maka end otomatis oleh pool)

- Pool berdasarkan config dan tambahi eventlistener connect untuk testing koneksi (gak perlu)

- Pool connect akan ada callback err, client, done

  - client dari callback bisa dipakai untuk query

  - done() mengembalikan client ke pool ketika client sudah selesai query

  - client akan dipakai oleh request yang lain

  - Jadi kita tidak pakai pool.connect tapi yang lebih mudah

    

### DEMO

- Siapkan json data
- Setup Npm & Package
  - npm init -y (nama folder harus URL friendly)
  - npm install express ejs pg nodemon
  - .gitignore berisi node_modules
- MVC + config buat foldernya
  - mkdir models views controllers routes config
- Siapkan koneksi ke PG
  - Di dalam config - touch connection.js
  - Membuat require pg, config dan instance dari class Pool PostgreSQL lalu exports 
  - (Dokumentasi pg.Pool) tambahkan config 3 properti baru (opsional) kalau tidak diisi akan ada default value
- Membuat tabel sesuai dari config (melalui GUI atau terminal)
  - touch setup.js (DDL table)
  - require pool
  - Buat table yang sesuai struktur json
    - Buat string berisi query DDL table
    - (Dokumentasi Pooling - Single query). Params (query, valuesOptional, callback)
    - Buat callback hell pool query untuk drop table dan create table
    - Jalankan setup lalu cek table di GUI
  - TIPS: Jika ragu SQL nya benar atau salah test dulu di GUI
- Seeding Data
  - touch seeding.js
  - require pool dan fs (baca file json)
  - fs.readFile untuk membaca json
    - Jangan lupa JSON.parse
  - (Dokumentasi insert) untuk query insert data
  - (Dokumentasi querying) Seeding data dengan parameterized query
- Setup Express
  - touch app.js
  - Buat setup express seperti biasa ditambah View Engine dan Body parser
  - Require routes (jika require folder otomatis dia akan akses index.js) dan app.use routernya
- Setup Routes
  - touch index.js
    - Require express router dan controller(s)
    - Require file router lain jika diperlukan lalu router.use
    - Jangan lupa exports
  - touch file route yang diperlukan
    - Code seperti dengan di index.js
    - Buat struktur route sesuai kebutuhan (add, show, edit, delete)
- Setup Controller
  - touch controllers/controller.js
  - Buat static method sesuai kebutuhan router (struktur dulu belum diisi tidak apa apa. Misal isi res.send() )
  - Untuk yang sudah diketahui mana yang butuh EJS langsung res.render()
  - Jangan lupa exports
- Setup EJS
  - touch showAll.ejs, addForm.ejs editForm.ejs
  - Template bisa pakai bootstrap introduction copy HTML basic
  - Cari button, tabel dan form untuk tampilan
  - showAll.ejs untuk tabel
    - Berisi juga link edit dan delete
  - addForm.ejs, editForm.ejs untuk form
- Setup Model
  - touch models/namamodel.js
  - Require pool connection
  - Buat class sesuai kebutuhan (bagian addform tidak perlu)
    - Jika hanya 1 jenis data (1 table) langsung bikin class sebagai class model dan buat constructornya
    - Jika lebih pisahkan masing masing model
    - Jika 1 jenis data ada banyak macam (misal kasus Employees) kalian bisa gunakan Factory
    - Tips: untuk id langsung type coercing ke number dengan `+`
  - Buat static method di model sesuai kebutuhan di controller (misal dikosongi dulu)
  - Buat query untuk masing masing static method (ditest di GUI) pakai backtick `
- Coding Model - Controller - Views
  - require Model di Controller
  - Kriteria Callback ada 3
    - Badan functionCallback menjadi isi argument dari invoke functionUtama
    - functionUtama menyediakan parameter sebagai jalan masuk functionCallback
    - functionCallback (nama sudah diwakili parameter) di invoke di dalam badan functionUtama 
    - Buatlah proses callback untuk Controller dan Model
  - Bisa ambil dari pool.query di setup.js ( tanpa pakai pool.end )
- ShowData (Select)
  - Tidak perlu returning
  - Jangan lupa datanya ada di properti rows
  - Buat map untuk instantiate class
  - Render di EJS dengan loop row table
  - Jangan lupa untuk link edit dan delete bisa gunakan id
- Add (Create)
  - Data diterima oleh req.body (sesuai name di form)
  - Buat dalam object literal lalu masukkan ke static add model
  - Pakai parameterized query
  - Jika success, tidak ada data yang diambil callback bisa diisi null
- Edit (Update)
  - Harus mendapatkan params id nya
  - Masukkan ke static edit model
  - Jangan lupa datanya ada di properti rows[0] (karena tunggal)
  - Jika success, tidak ada data yang diambil callback bisa diisi null
  - Data diterima oleh req.body (sesuai name di form) + terima params.id sebagai id
  - Pakai parameterized query
  - Jika success, tidak ada data yang diambil callback bisa diisi null
- Additional
  - Req.app.locals.message (jika perlu)
