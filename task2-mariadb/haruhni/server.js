var express = require("express");
var app = express();
var path = require("path");

var Client = require('mariasql');

var c = new Client({
    host: 'localhost',
    user: 'haruhni',
    password: '1234',
    db: 'haruhni'
});


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/api/getList', function (request, response) {
    var result = [];
    var query = c.query("SELECT * FROM test;");
    query.on('result', function (res) {
        res.on('data', function (row) {
            console.log(row);
            result.push(row);
        }).on('end', function () {
            console.log('Result set finished');
        });
    }).on('end', function () {

        response.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        response.write(JSON.stringify(result));
        response.end();
        console.log('No more result sets!');
    });
});

app.on('exit', function () {
    console.log('exit');
    c.end();

});


app.listen(8888);

console.log("Running at Port 8888");