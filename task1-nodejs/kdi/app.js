/*
* nodejs와 관련 참고 URL 
* API: https://nodejs.org/dist/latest-v4.x/docs/api/
* fs번역: http://mudchobo.tistory.com/542
* nodejs beginner book : http://www.nodebeginner.org/index-kr.html#the-use-cases
* @index.html를 열기 위한 필요 require
*  - require('fs') : file system의 약자로 file 및 디렉토리 I/O 처리와 관련한 function을 제공함
*  - require('http') : http 처리와 관련한 class 및 function을 제공함
*  - require('https') : https(TLS/SSL) 처리와 관련한 class 및 function을 제공함
*                       https의 경우 인증서 관련 option을 설정해야함
* - require('url') : 브라우저에서 요청한 URL Path 파악 및 parsing 관련 function을 제공
*/

var http = require('http');
var fs = require('fs');
var url = require('url');

/* @read html file 
*  Synchronous : 
*  - 파일 내용을 바로 리턴
*  - I/O작업 동안 다른 코드가 실행되는 것을 막음
*  - 서버 시작시 설정 파일을 읽는 작업 시 유용함 

var data = fs.readFileSync('index.html', 'utf8');
http.createServer(function(request, response) {
	response.writeHeader(200, {"Content-Type": "text/html"});  
    response.write(data);  
    response.end();
}).listen(3000);
*/

/* Asynchronous : 
*  - callback 함수를 통해 리턴
*  - I/O작업의 상관 없이 다른 코드가 실행 됨
*  - 서버 웹 페이지 작업으로 유용함
*  - 순서에 상관없이 완료가 될 수 있으므로, 콜백 체인 등의 방법으로 문제를 최소화
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