const jwt = require('jsonwebtoken');
const config = require('../config/secret');

function verifikasi(){
    return function(req, rest, next){
        
        var role = req.body.role;

        //cek authorization header
        var tokenWithBearer = req.headers.authorization;
        
        //jika ada token yang berhasil di-generate dari Headers, maka token tsb akan di-split
        if(tokenWithBearer) {  
            var token = tokenWithBearer.split(' ')[1]; 
            
            //verifikasi dengan token di config\secret.js
            jwt.verify(token, config.secret, function(err, decoded){
                if(err){
                    return rest.status(401).send({auth:false, message:'Token tidak terdaftar!'}); // status 401 adalah jika tidak ada token 
                }else { 

                    // jika punya token dan punya roles sbg 2, maka lanjut

                    if(role == 2){
                        req.auth = decoded;
                        next(); 
                    }else {

                        // jika punya token tapi bukan sebagai roles 2, maka proses tidak dilanjutkan.
                        return rest.status(401).send({auth:false, message:'Gagal mengotorisasi role anda!'});
                    }
                }
            });
        }else {
            // jika mengakses tanpa Authentication/Authorization (no auth) atau tanpa login dengan nama yang sudah terdatar, maka menampilkan error:
            return rest.status(401).send({auth:false, message:'Token tidak tersedia!'});
        }
    }
}

module.exports = verifikasi; 