/*
* nodejs�� ���� ���� URL 
* API: https://nodejs.org/dist/latest-v4.x/docs/api/
* fs����: http://mudchobo.tistory.com/542
* nodejs beginner book : http://www.nodebeginner.org/index-kr.html#the-use-cases
* @index.html�� ���� ���� �ʿ� require
*  - require('fs') : file system�� ���ڷ� file �� ���丮 I/O ó���� ������ function�� ������
*  - require('http') : http ó���� ������ class �� function�� ������
*  - require('https') : https(TLS/SSL) ó���� ������ class �� function�� ������
*                       https�� ��� ������ ���� option�� �����ؾ���
* - require('url') : ���������� ��û�� URL Path �ľ� �� parsing ���� function�� ����
*/

var http = require('http');
var fs = require('fs');
var url = require('url');

/* @read html file 
*  Synchronous : 
*  - ���� ������ �ٷ� ����
*  - I/O�۾� ���� �ٸ� �ڵ尡 ����Ǵ� ���� ����
*  - ���� ���۽� ���� ������ �д� �۾� �� ������ 

var data = fs.readFileSync('index.html', 'utf8');
http.createServer(function(request, response) {
	response.writeHeader(200, {"Content-Type": "text/html"});  
    response.write(data);  
    response.end();
}).listen(3000);
*/

/* Asynchronous : 
*  - callback �Լ��� ���� ����
*  - I/O�۾��� ��� ���� �ٸ� �ڵ尡 ���� ��
*  - ���� �� ������ �۾����� ������
*  - ������ ������� �Ϸᰡ �� �� �����Ƿ�, �ݹ� ü�� ���� ������� ������ �ּ�ȭ
*/
fs.readFile('index.html', 'utf8', function(err, html){
	if(err) {
		throw err;
	}
	
	//create server
	http.createServer(function(request, response) {		
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");
		//set the header value
		response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();
	}).listen(3000);
});
console.log('Listening on port 3000...');


/*
function start(route, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    route(handle, pathname, response, request);
  }

  http.createServer(onRequest).listen(3000);
  console.log("Server has started.");
}

exports.start = start;
*/