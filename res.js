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

