//memanggil library mysql
var mysql = require('mysql');

//buat koneksi database
const conn = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: '',
    database: 'dbrestapi',
    port: '3306'
});

conn.connect((err)=>{

    // jika tidak terkoneksi, maka tampilkan error
    if(err) throw err; 

    // jika terkoneksi, maka tampilkan koneksi di console log
    console.log('MySQL Connected!');
});

module.exports = conn;