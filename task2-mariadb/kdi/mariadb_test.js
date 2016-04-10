var mysql = require('mysql');
 
var connection = mysql.createConnection({
    host    :'localhost',
    port : 3306,
    user : 'root',
    password : 'test000',
    database:'test'
});
 
connection.connect();
 
connection.query('SELECT now()', 
    function(err, rows, fields) {
      if (err) throw err;
 
      console.log( rows );
    }
);