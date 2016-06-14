# Chapter 6 Proxy

프록시는 객체에 임의의 동작을 넣기 위해 사용되며, 기존 OOP 언어들은 대부분 예전부터 쓰여온 기능이다.  
Proxy가 소개된 사이트들을 아래 적는다.  
`http://hacks.mozilla.or.kr/2016/03/es6-in-depth-proxies-and-reflect/`  
`http://stroot.tistory.com/70`

## 프록시란

프록시는 프로퍼티 탐색 및 할당, 생성자 호출, 열거 등 객체의 기본 동작에 사용자 임의의 로직을 넣기 위해 사용한다.  
객체를 프록시로 감싼 이후에는 해당 객체에서 일어나는 모든 일들은 프록시 객체를 대상으로 하기 때문에 원하는 작업을 넣을 수 있다.  

### 용어 정의
프록시 관련 주요 용어 몇 가지를 아래와 같이 정의 한다.  

- 타겟 : 프록시로 감쌀 객체  
- 트랩 : 타겟 객체의 동작을 가로채는 함수로, 사용자 임의의 동작을 부여 함  
- 처리기 : 트랩이 있는 객체로 프록시 객체에 붙임  

## 프록시 API

프록시는 Proxy 생성자로 생성하며, 아래 2개의 인자를 받는다.  


- 타겟 : 프록시로 감싹 객체  
- 처리기 : 타겟 객체에 쓸 트랩이 있는객체  

트랩은 타겟 객체에 가능한 어떤 작업이라도 정의할 수 있으며, 정의하지 않을 경우 기본 동작을 수행한다.  
아래는 프록시 생성과 타겟 객체에 여러 가지 작업을 어떻게 수행하는지 예제이다.
```javascript
let target = {
	age: 12
};

let handler = {};

let proxy = new Proxy(target, handler);
proxy.name = "수지";

document.write(target.name);document.write("<br>");
document.write(proxy.name);document.write("<br>");
document.write(target.age);document.write("<br>");
document.write(proxy.age);
```
프로퍼티 할당 트랩이 따로 없는 관계로 기본 동작만 한다.  

보통 프록시를 사용할 때 타겟 객체를 굳이 생성하여 보관하지는 않으므로,  
아래와 같이 작성하여 사용하면 된다.
```javascript
let proxy = new Proxy({
	age: 12
}, {});

proxy.name = "수지";

document.write(proxy.name);document.write("<br>");
document.write(proxy.age);
```

