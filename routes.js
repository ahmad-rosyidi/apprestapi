// use strict = mengecek apabila ada kode javascript yang salah/keliru dalam penulisan,
// maka akan menampilkan error.
'use strict';

module.exports = function(app){
    var json_ku = require('./controller');

    app.route('/')
    .get(json_ku.index);
    
    app.route('/tampil')
    .get(json_ku.tampilsemuamahasiswa);
        
    app.route('/tampil/:id')
    .get(json_ku.tampilmahasiswaberdasarkanid);
    
    app.route('/tambah')
    .post(json_ku.tambahMahasiswa);

    app.route('/ubah')
    .put(json_ku.ubahMahasiswa);

    app.route('/hapus')
    .delete(json_ku.hapusMahasiswa);

    app.route('/tampilmatakuliah')
    .get(json_ku.tampilgroupmatakuliah);
    
}
