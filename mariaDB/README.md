## CentOS 7에 MariaDB 설치 (yum을 이용한 간편 설치)

설치 명령
yum install mariadb-server mariadb

시작 프로그램에 등록
systemctl enable mariadb.service

서비스 시작
systemctl start mariadb.service

root acount 세팅(cnf파일하는 것보다 간편하고 쉬움)
mysql_secure_installation
enter
Y
비번
비번
Y
Y
Y
Y
(주의: 버튼 누르는 순서나 내용이 버전에 따라 바뀔 수 있으니 잘 읽거보고 처리)
