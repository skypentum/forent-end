var express = require('express');
var router = express.Router();
//require mariadb(���� mysql install �ʼ� - npm i mysql)
var mysql = require('mysql');

//db connection 
var pool = mysql.createPool({
    connectionLimit: 3,
    host: 'localhost',
    user: 'root',
    database: 'test',
    password: 'test000'
});


/* GET home page. */
router.get('/', function (req, res, next) {

    pool.getConnection(function (err, connection) {
        // Use the connection
        connection.query('SELECT * FROM tb_test limit 10', function (err, rows) {
            if (err) console.error("err : " + err);
            console.log("rows : " + JSON.stringify(rows));
			//res�� ������ rendering - jade�� Ȱ���� ������ ó��
            res.render('mariadb_html', {title: 'test', rows: rows});
            connection.release();

            // Don't use the connection here, it has been returned to the pool.
        });
    });
});

module.exports = router;