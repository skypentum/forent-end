#Express + mariaDB 연동

##express 설치 
 - express 설치와 관련해서는 [이곳](http://expressjs.com/ko/starter/installing.html)을 참조함

## mariaDB 설치
 - 다운로드 : [https://downloads.mariadb.org](https://downloads.mariadb.org)

 - window 에 경우 두가지 방법이 있음.
    
    1. 설치버전.msi 확장명으로 되어 있는 installer를 다운받아 설치
    2. 설치버전.zip 확장명으로 되어 있는 압축파일을 다운로드 받은 후 원하는 경로에 압축을 풀음

## express + mariaDB
  - mariaDB의 경우 mysql와 동일한 DBMS을 제공하므로 'mysql' module를 사용하여 연동함

### package.json
```
"dependencies": {
    "body-parser": "~1.13.2",
    "cookie-parser": "~1.3.5",
    "debug": "~2.2.0",
    "express": "~4.13.1",
    "jade": "~1.11.0",
    "morgan": "~1.6.1",
    "serve-favicon": "~2.3.0",
    "mysql": "*", <- 해당 부분 추가
    "ejs": "*"
}
```

### npm install
```
npm install mysql
```

### DB Connecetion
```
var pool = mysql.createPool({
    connectionLimit: 3,
    host: 'localhost',
    user: 'root',
    database: 'test',
    password: 'test000'
});
:
pool.getConnection(function (err, connection) {
	// Use the connection
	connection.query('SELECT * FROM tb_test limit 10', function (err, rows) {
	    if (err) console.error("err : " + err);
	    console.log("rows : " + JSON.stringify(rows));
	    res.render('mariadb_html', {title: 'test', rows: rows});
	    connection.release();
	});
});
```

## 스터디 참고 url 
```
window7에 mariaDB 설치 : http://blog.axisj.com/archives/245
express DB 통합 : http://expressjs.com/ko/guide/database-integration.html
Getting Started with Node.js + MySQL : https://www.codementor.io/nodejs/tutorial/node-js-mysql
mySQL 연동 : http://bcho.tistory.com/892
```