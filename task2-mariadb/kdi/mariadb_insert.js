var mysql = require('mysql');
 
var connection = mysql.createConnection({
    host    :'localhost',
    port : 3306,
    user : 'root',
    password : 'test000',
    database:'test'
});
 
connection.connect();

var id_num = 0;
var checkpoint = 0;
var stoppoint = 1;
  
var InsertFunction = function(){
    id_num++;
    connection.query('insert into tb_test ( name , content ) values ( ? , sha( ? ) )',[ 'id_' + id_num , 'asdf' + id_num ], 
        function(err, rows, fields) {
            if (err) throw err;
 
            if( stoppoint ){
                InsertFunction();
            }
        }
    );
};
 
var k = 5;
setInterval(function(){
    console.log( "Count: "+(( id_num - checkpoint )/k ) +" per second" );
    checkpoint = id_num;
},1000*k);
 
setTimeout(function(){
    stoppoint = 0;
},1000 * 40 );
 
InsertFunction();