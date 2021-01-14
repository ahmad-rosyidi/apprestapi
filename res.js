// use strict = mengecek apabila ada kode javascript yang salah/keliru dalam penulisan,
// maka akan menampilkan error.
'use strict'; 


// memberikan respon OK (status 200) apabila transaksi CRUD berhasil. 
exports.ok = function(values, res){
    var data = {
        'status': 200,
        'values': values
    };

     console.log(values)
     res.json(data);
     res.end();

};

// Response untuk Nested Mata Kuliah
exports.oknested = function(values, res){
    // lakukan akumulasi
    const hasil = values.reduce((akumulasikan, item)=>{
        // tentukan key group
        if(akumulasikan[item.nama]){
            // buat variabel group nama mahasiswa
            const group = akumulasikan[item.nama];
            // cek jika isi array adalah mata kuliah
            if(Array.isArray(group.matakuliah)){
                // tambahkan value ke dalam group mata kuliah
                group.matakuliah.push(item.matakuliah);
            } else {
                group.matakuliah = [group.matakuliah, item.matakuliah];
            }
        } else {
            akumulasikan[item.nama] = item;
        }
        return akumulasikan;
        }, {});
        
    var data = {
        'status': 200,
        'values': hasil
    };
    
    res.json(data);
    res.end();
} 