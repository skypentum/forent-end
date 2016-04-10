var fs = require('fs');

function start(response) {
	var body = fs.readFileSync('index.html', 'utf8');
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

exports.start = start;