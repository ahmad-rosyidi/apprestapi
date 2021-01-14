// use strict = mengecek apabila ada kode javascript yang salah/keliru dalam penulisan,
// maka akan menampilkan error.
'use strict'; 

var response = require('./res');
var connection = require('./koneksi');

// merespon OK "REST API is Running" apabila app routes "/" dipanggil. Lihat file routes.js
exports.index = function(req, res){ 
    response.ok("REST API is running", res)
}

// menampilkan semua data mahasiswa
exports.tampilsemuamahasiswa = function(req, res){
    connection.query('SELECT * FROM mahasiswa', function(error, rows, fields){
        if(error){
            connection.log(error);
        }
        else 
        {
            response.ok(rows, res)
        }
    });
};

// menampilkan semua data mahasiswa berdasarkan ID
exports.tampilmahasiswaberdasarkanid = function(req, res){
    let id = req.params.id;
    connection.query('SELECT * FROM mahasiswa WHERE id_mahasiswa = ?', [id], function(error, rows, fields){
        if(error){
            connection.log(error);
        }
        else 
        {
            response.ok(rows, res)
        }
    });
};

// Tambah Data Mahasiswa
exports.tambahMahasiswa = function(req, res){
    var nim = req.body.nim;
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;

    connection.query('INSERT INTO mahasiswa (nim,nama,jurusan) VALUES(?,?,?)',
    [nim,nama,jurusan],
    function (error, rows, fields){
        if(error){
            console.log(error);
        }
        else 
        {
            response.ok("Data Success Inserted!", res)
        }
    });
};

// Ubah Data Mahasiswa Berdasarkan ID
exports.ubahMahasiswa = function(req, res){
    var id = req.body.id_mahasiswa;
    var nim = req.body.nim;
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;

    connection.query('UPDATE mahasiswa SET nim=?, nama=?, jurusan=? WHERE id_mahasiswa=?',[nim,nama,jurusan, id],
        function (error, rows, fields){
            if(error){
                console.log(error);
            }
            else 
            {
                response.ok("Data Success Updated!", res)
            }
        });
};

// Hapus Data Mahasiswa Berdasarkan ID
exports.hapusMahasiswa = function(req, res){
    var id = req.body.id_mahasiswa;
    connection.query('DELETE FROM mahasiswa WHERE id_mahasiswa=?',[id],
        function (error, rows, fields){
            if(error){
                console.log(error);
            }
            else 
            {
                response.ok("Data Success Deleted!", res)
            }
        });
};

// menampilkan mata kuliah group (Nested Json)
exports.tampilgroupmatakuliah = function (req, res){
    connection.query('SELECT mahasiswa.id_mahasiswa, mahasiswa.nim, mahasiswa.nama, mahasiswa.jurusan, matakuliah.matakuliah, matakuliah.sks FROM krs JOIN matakuliah JOIN mahasiswa WHERE krs.id_matakuliah = matakuliah.id_matakuliah AND krs.id_mahasiswa = mahasiswa.id_mahasiswa ORDER BY mahasiswa.id_mahasiswa',
        function(error, rows, fields){
            if(error){
                console.log(error);
            } else {
                response.oknested(rows, res);
            }
        }    
    )
};