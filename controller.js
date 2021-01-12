// use strict = mengecek apabila ada kode javascript yang salah/keliru dalam penulisan,
// maka akan menampilkan error.
'use strict'; 

var response = require('./res');
var connection = require('./koneksi');

exports.index = function(req, res){
    response.ok("REST API is running", res)
}
