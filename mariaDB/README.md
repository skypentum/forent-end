#mariaDB 

�� ���� mariaDB�� ���� �����Դϴ�.

## ���͵� ���� url 

```
mariaDB ���� ����Ʈ : https://mariadb.org/learn/

Node.js, MariaDB and GIS : https://mariadb.org/node-js-mariadb-and-gis/

APM ��ġ : http://wingsnote.com/19 (���� �鿣�� language ��� ���ε� �����ؾ� �� ��...)
```

### CentOS 7�� MariaDB ��ġ (yum�� �̿��� ���� ��ġ)

��ġ ���
```
yum install mariadb-server mariadb
```

���� ���α׷��� ���
```
systemctl enable mariadb.service
```

���� ����
```
systemctl start mariadb.service
```

root acount ����(cnf�����ϴ� �ͺ��� �����ϰ� ����)
```
mysql_secure_installation
enter
Y
���
���
Y
Y
Y
Y
(����: ��ư ������ ������ ������ ������ ���� �ٲ� �� ������ �� �о�� ó��)
```