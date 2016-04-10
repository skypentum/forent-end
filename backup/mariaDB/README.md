#mariaDB 

이 곳은 mariaDB를 위한 공간입니다.

## 스터디 참고 url 

```
mariaDB 공식 사이트 : https://mariadb.org/learn/

Node.js, MariaDB and GIS : https://mariadb.org/node-js-mariadb-and-gis/

APM 설치 : http://wingsnote.com/19 (향후 백엔드 language 사용 여부도 논의해야 할 듯...)

Using MySQL with Node.js & the node-mysql JavaScript Client : http://www.sitepoint.com/using-node-mysql-javascript-client/
```

### CentOS 7에 MariaDB 설치 (yum을 이용한 간편 설치)

설치 명령
```
yum install mariadb-server mariadb
```

시작 프로그램에 등록
```
systemctl enable mariadb.service
```

서비스 시작
```
systemctl start mariadb.service
```

root acount 세팅(cnf파일하는 것보다 간편하고 쉬움)
```
mysql_secure_installation
enter
Y
비번
비번
Y
Y
Y
Y
(주의: 버튼 누르는 순서나 내용이 버전에 따라 바뀔 수 있으니 잘 읽어보고 처리)
```

### 모듈 설치
현재 mariadb의 경우 두 가지 방법이 존재한다.  
mariasql, node-mysql  
설치 명령어
```
mariasql
npm install mariasql
node-mysql
npm install mysql
```

#### 모듈 설치 후 모듈을 찾을 수 없다고 에러가 발생할 경우 임시 방편
프로젝트 폴더에서 아래의 명령어를 수행하면 된다.
```
npm link 모듈명(mariasql or mysql)
```
확실한 해결 방법을 많이 찾아보았지만 결국 찾지 못함 (2016.04.08 lks)

### node-mysql을 이용한 mariadb 접근

##### 데이터 불러오기

우선 간단하게 sql의 데이터를 불러와 보았다.
```
var mysql = require('mysql');
var rows;

var connection = mysql.createConnection({
        host : 'localhost',
        port : 3306,
        user : 'root',
        password : 'Password',
        database : 'nodejs'
});

connection.connect(function(err) {
        if(err){
                console.error('mysql connection error');
                console.error(err);
                throw err;
        }
});

connection.query('SELECT * FROM test', function (error, result, fields) {
        if (error) {
                console.log('쿼리 문장에 오류가 있습니다.');
        } else {
                console.log(result);
    }
});

connection.end();
```

가져온 데이터를 웹에 뿌려보았다.  
이 때 기존 웹페이지 표시하는 방법으로 하면 error가 발생되어, json으로 변환해서 뿌릴 수 있도록 하였다.
```
var http = require('http');
var mysql = require('mysql');
var rows;

var connection = mysql.createConnection({
        host : 'localhost',
        port : 3306,
        user : 'root',
        password : 'Password',
        database : 'nodejs'
});

connection.connect(function(err) {
        if(err){
                console.error('mysql connection error');
                console.error(err);
                throw err;
        }
});

connection.query('SELECT * FROM test', function (error, result, fields) {
        if (error) {
                console.log('쿼리 문장에 오류가 있습니다.');
        } else {
                console.log(result);
                rows = result;
    }
});

connection.end();

http.createServer(function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(rows, null, 3));
}).listen(80);
console.log('Server running at http://127.0.0.1:80/');

```