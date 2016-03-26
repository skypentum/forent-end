var fs = require('fs');
var http = require('http');
var url = require('url');
//var ROOT_DIR = "./html/";
var ROOT_DIR = "/home/kiseop.lee/workspace/nodejsstudy/html";
http.createServer(function (req, res) {
  var urlObj = url.parse(req.url, true, false);
  console.log('Opening Dir = ' + ROOT_DIR + ', File = ' + urlObj.pathname + ' File');
  fs.readFile(ROOT_DIR + urlObj.pathname, function (err,data) {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
}).listen(80);
console.log('Server Started');
