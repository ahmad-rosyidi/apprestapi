var connection = require('../koneksi');
var mysql = require('mysql');
var md5 = require('md5');
var response = require('../res');
var jwt = require('jsonwebtoken');
var config = require('../config/secret');
var ip = require('ip');


// controller untuk registrasi user
exports.registrasi = function (req, res) {
     var post = {
          username: req.body.username,
          email: req.body.email,
          password: md5(req.body.password),
          role: req.body.role,
          tanggal_daftar: new Date(),
     }
 
     
     var query = "SELECT email FROM ?? WHERE ??=?"; // ngecek email apakah sudah terdaftar atau belum pada saat registrasi
     var table = ["user", "email", post.email]; 
 
     query = mysql.format(query, table);
 
     connection.query(query, function (error, rows) {
          if (error) {
               console.log(error);
          } else {
               if (rows.length == 0) { // jika user dengan email yang akan didaftarkan belum ada di database
                    var query = "INSERT INTO ?? SET ?"; // maka akan dimasukkan ke dalam database
                    var table = ["user"]; // table user
                    query = mysql.format(query, table);
                    connection.query(query, post, function (error, rows) {
                         if (error) {
                              console.log(error);
                         } else {
                              response.ok("Berhasil menambahkan data user baru", res);
                              }
                    });
               } else {
                    // jika user dengan email yang akan didaftarkan sudah ada di database, maka aka me-response "Email anda telah terdaftar"
                    response.ok("Email anda telah terdaftar!", res); 
               }
          }
     })
 }

// Controller untuk login
exports.login = function(req, res){
    
     // login menggunakan email dan password
     var post = {
         password: req.body.password,
         email: req.body.email,
     }
 
     // jika user login, maka akan mengecek/auth berdasarkan keberadaan username dan password di table user
     var query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
     var table = ["user", "password", md5(post.password), "email", post.email];
 
     query = mysql.format(query,table);
 
     connection.query(query, function(error, rows){
         if(error){
             console.log(error);
         } else {
             
             // jika user login dan sudah terdaftar emailnya, maka akan membuat/generate token yang berlaku selama 1 jam atau 3600 detik.
             // in second =  1 jam (1 jam = 60 menit. 1 Menit = 60 Detik. 1 jam = 60 Menit x 60 Detik = 3600 detik)
             // in milisecond => 1 jam = 3600 detik x 1000 => 3600000 milisecond

             if(rows.length == 1){
                 var token = jwt.sign({rows}, config.secret, {
                     expiresIn: 3600000 // expires berlaku dalam milisecond
                 });
 
                 // id di table user berhubungan ke id_user di table akses_token dan disimpan juga di table akses_token
                 id_user = rows[0].id;
 
                 // setelah user berhasil login, maka id_user, access_token, ip_address akan disimpan ke dalam table akses_token 
                 var data = {
                     id_user: id_user,
                     access_token: token,
                     ip_address: ip.address()
                 }
 
                 var query = "INSERT INTO ?? SET ?";
                 var table = ["akses_token"];
 
                 query = mysql.format(query,table);
                 connection.query(query, data, function(error, rows){
                     if(error){
                         console.log(error);
                     } else {

                         // jika user login dengan token yang benar, maka akan meng-create/generate TOKEN JWT
                         // menampilkan respon json di console log browser
                         res.json({
                             success: true,
                             message: 'Token JWT tergenerate!',
                             token: token,
                             currUser: data.id_user,
                        });
                     }    
                 });
             
             } else {
 
                 // jika user login, maka akan mengecek/auth berdasarkan keberadaan username dan password di table user, jika tidak ada, maka akan menampilkan pesan error.
                 res.json({"Error" : true, "Message": "Email or password is invalid!"});
             }
         }   
     });
 }

 // ok
 exports.halamanrahasia = function (req, res) {
    response.ok("Halaman ini hanya untuk user dengan role = 2!", res);
}
