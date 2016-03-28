#mariaDB 

이 곳은 mariaDB를 위한 공간입니다.

## 스터디 참고 url 

```
mariaDB 공식 사이트 : https://mariadb.org/learn/

Node.js, MariaDB and GIS : https://mariadb.org/node-js-mariadb-and-gis/

APM 설치 : http://wingsnote.com/19 (향후 백엔드 language 사용 여부도 논의해야 할 듯...)
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