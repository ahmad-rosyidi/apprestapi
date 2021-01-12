// use strict = mengecek apabila ada kode javascript yang salah/keliru dalam penulisan,
// maka akan menampilkan error.
'use strict';

module.exports = function(app){
    var json_ku = require('./controller');

    app.route('/')
        .get(json_ku.index);
}
