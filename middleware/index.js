var express = require('express');
var auth = require('./auth');
var router = express.Router();

var verifikasi = require('./verifikasi');

//daftarkan menu registrasi
router.post('/api/v1/register', auth.registrasi);
router.post('/api/v1/login', auth.login);

// alamat route yang perlu otorisasi
// halaman menampilkan data tabel oleh administrator
// jika mempunyai roles yang sesuai, maka bisa mengakses route/halaman ini (Halaman Rahasia ini memanggil proses verifikasi.js dengan auth "halamanrahasia")
router.get('/api/v1/rahasia', verifikasi(), auth.halamanrahasia);

module.exports = router;