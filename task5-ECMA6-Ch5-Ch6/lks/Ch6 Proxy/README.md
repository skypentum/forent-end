# Chapter 6 Proxy

프록시는 객체에 임의의 동작을 넣기 위해 사용되며, 기존 OOP 언어들은 대부분 예전부터 쓰여온 기능이다.  
Proxy가 소개된 사이트들을 아래 적는다.  
`http://hacks.mozilla.or.kr/2016/03/es6-in-depth-proxies-and-reflect/`  
`http://stroot.tistory.com/70`

책의 내용은 무언가 설명을 위해 억지로 예제를 만든 느낌이 강하여  
차라리 래퍼런스를 보는 것이 더 나을지도 모르겠다.(definedProperty까지 작성 후 든 생각)  
`https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy`  

마지막으로 아래의 블로그가 우리가 사용하는 책을 옮긴 것으로 보인다.  
`https://medium.com/@sungsichyun/es6-proxy-api-891b24b1c887#.jicb5ordg`  

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

### 트랩

트랩은 객체에 적용할 수 있는데, 값을 반환하는 트랩은 반환 시 지켜야 할 규칙이 있다.  
반환값을 가로채고 필터링하여 규칙에 부합하는지 체크하며 규칙에 맞지 않으면 TypeError 예외를 발생시킨다.  
트랩 내부에서 this 값은 항상 처리기를 가리킨다.  

####get(target, property, receiver) 메소드

get 트랩은 프로퍼티 값을 조회할 때 사용하며, 타겟, 프로퍼티명, 프록시 3개의 인자를 받는다.  

아래는 예제이다.
```javascript
let proxy = new Proxy({
	age: 12
}, {
	get: function(target, property, receiver){
		if(property in target){
			return target[property];
		}
		else{
			return "찾지 못함";
		}
	}
});

document.write(Reflect.get(proxy, "age"));document.write("<br>");
document.write(proxy.age);document.write("<br>");
document.write(Reflect.get(proxy, "name"));document.write("<br>");
document.write(proxy.name);
```

receiver는 접근하려는 프로퍼티가 위치한 객체의 참조값이다.  
```javascript
예제 입력 보류
```

obj는 proxy 객체를 상속하며, name 프로퍼티가 obj 객체에 없으므로 proxy 객체에서 찾게 된다.  
proxy 객체에는 get 트랩이 있으므로 값이 나오게 된다.  
따라서 reveiver 값은 name을 접근하는 방법이 obj.name이면 obj, proxy.name이면 proxy가 된다.  
다른 트랩에서도 이런 식으로 결정 된다.  

##### 규칙

- 타겟 객체 프로퍼티가 쓰기 금지, 설정 금지 데이터 프로퍼티면 타겟 객체 프로퍼티 값과 동일한 값을 반환한다.
- 타겟 객체 프로퍼티가 [[Get]] 속성이 설정 금지 접근자 프로퍼티(undefined)일 경우 값은 undefined 이다.


#### set(target, property, value, receiver) 메소드

set 트랩은 할당 연산자, 또는 Reflect.set() 메소드로 프로퍼티 값을 지정할 때 실행된다.  
타겟 객체, 프로퍼티명, 새 프로퍼티명, 수신자 이 4가지를 인자로 받는다.  
지정 성공 여부를 true / false로 반환한다.  

```javascript
let proxy = new Proxy({}, {
	set: function(target, property, value, receiver){
		target[property] = value;
		return true;
	}
});

document.write(Reflect.set(proxy, "name", "수지"));document.write("<br>");
document.write(proxy.name);
```

##### 구칙

- 타겟 객체 프로퍼티가 쓰기 금지, 설정 금지 데이터 프로퍼티면 값을 변경할 수 없으므로 false를 반환한다.
- 타겟 객체 프로퍼티가 [[Set]] 속성이 설정 금지 접근자 프로퍼티(undefined)일 경우 값을 변경할 수 없으므로 false를 반환한다.

#### has(target, property) 메소드

has 트랩은 in 연산자로 특정 프로퍼티가 있는지 확인할 때 실행된다.  
타겟 객체, 프로퍼티명을 인자로 받아 존재 여부를 불리언 값으로 반환한다.  

```javascript
let proxy = new Proxy({
	age: 12
}, {
	has: function(target, property){
		if(property in target){
			return true;
		}
		else{
			return false;
		}
	}
});

document.write(Reflect.has(proxy, "name"));document.write("<br>");
document.write(Reflect.has(proxy, "age"));
```

##### 규칙

- 타겟 객체 프로퍼티가 객체 자신의 프로퍼티 이고 설정 금지 프로퍼티면 false를 반환할 수 없다.
- 타겟 객체가 확장할 수 없고 프로퍼티가 객체 자신의 프로퍼티로 존재하면 false를 반환할 수 없다.

#### isExtensible(target) 메소드

isExensible 트랩은 Object.isExtensible() 메소드로 특정 프로퍼티의 확장 가능 여부를 확인할 때 실행된다.  
타겟 객체를 인자로 받아 확장 가능 여부를 true / false 값으로 반환한다.

아래는 예제이다.  
```javascript
let proxy = new Proxy({
	age: 12
}, {
	isExtensible: function(target){
		return Object.isExtensible(target);
	}
});

document.write(Reflect.isExtensible(proxy));
```

##### 규칙

- 타겟 객체가 확장 가능하면 false를 반환할 수 없으며, 확장 불가하면 true를 반환할 수는 없다.

#### getPrototypeOf(target) 메소드

getPrototypeOf 트랩은 Object.getPrototypeOf() 메소드나 __proto__ 프로퍼티로 내부 [[prototype]] 프로퍼티 값을 조회할 때 실행된다.  
타겟 객체를 인자로 받는다.  
이 메소드는 결과로 null 또는 객체를 반환하고, null 값은 타겟 객체가 아무 것도 상속하지 않은 상속 체인 끝 부분에 있는 객체임을 나타낸다.  

아래는 예제이다.  
```javascript
let proxy = new Proxy({
	age: 12,
	__proto__ : {
		name: "수지"
	}
}, {
	getPrototypeOf: function(target){
		return Object.getPrototypeOf(target);
	}
});

document.write(Reflect.getPrototypeOf(proxy).name);

```

##### 규칙

- 반환값은 반드시 객체, null 중 하나가 된다.
- 타겟 객체가 확장 불가하면 실제 프로토타입을 반환한다.

#### setPrototypeOf(target, prototype) 메소드

setPrototypeOf 트랩은 Object.setPrototypeOf() __proto__프로퍼티로 내부 [[prototype]] 프로퍼티 값을 지정할 때 실행 된다.  
타겟 객체, 할당할 프로퍼티 값을 인자로 받는다.  
값 지정의 성공 여부를 true / false 로 반환한다.  

아래는 예제이다.
```javascript
let proxy = new Proxy({}, {
	setPrototypeOf: function(target, value){
		Reflect.setPrototypeOf(target, value);
		return true;
	}
});

Reflect.setPrototypeOf(proxy, {name: "수지"});
document.write(Reflect.getPrototypeOf(proxy).name);
```

##### 규칙

- 타겟 객체가 확장 불가하면 false를 반환한다.

#### preventExtensions(target) 메소드

preventExtensions 트랩은 Object.preventExtensions()로 프로퍼티를 추가하지 못하게 차단할 때 실행된다.  
target 객체를 인자로 받는다.  
확장 방지 성공 여부를 true / false로 반환한다.  
```javascript
let proxy = new Proxy({}, {
	preventExtensions: function(target){
		Object.preventExtensions(target);
		return true;
	}
});

document.write(Reflect.preventExtensions(proxy));document.write("<br>");

proxy.a = 12;
document.write(proxy.a);
```

##### 규칙

- 타겟이 확장 불가, 또는 그렇게 되었을 경우에만 true를 반환한다.

#### getOwnPropertyDescriptor(target, property) 메소드

getOwnPropertyDescriptor 트랩은 Object.getOwnPropertyDescripter() 메소드로 프로퍼티 서술자를 조회할 때실행된다.  
타겟과 프로퍼티명을 인자로 받는다.  
이 트랩은 서술자 객체 또는 undefined 둘 중 하나를 반환하며, 주어진 프로퍼티가 없을 경우에 반환값은 undefined 이다.

아래는 예제이다.
```javascript
let proxy = new Proxy({
	age: 12
}, {
	getOwnPropertyDescriptor: function(target, property){
		return Object.getOwnPropertyDescriptor(target, property);
	}
});

let descriptor = Reflect.getOwnPropertyDescriptor(proxy, "age");

document.write("Enumerable: " + descriptor.enumerable);document.write("<br>");
document.write("Writable: " + descriptor.writable);document.write("<br>");
document.write("Configurable: " + descriptor.configurable);document.write("<br>");
document.write("Value: " + descriptor.value);
```

##### 규칙

- 객체, undefined 둘 중 하나를 반환한다.
- 주어진 프로퍼티가 타겟 객체 자신의 설정 불가능한 프로퍼티라면 undefined를 반환할 수 없다.
- 주어진 프로퍼티가 타겟 객제 자신의 프로퍼티이고 타겟 객체가 확장 불가능하면 undefined를 반환할 수 없다.
- 주어진 프로퍼티가 타겟 객체 자신의 프로퍼티가 아니고 타겟 객체가 확장 불가능하면 undefined를 반환한다.
- 주어진 프로퍼티가 타겍 객제 자신의 프로퍼티이거나, 타겟 객체 자신의 설정 가능한 프로퍼티이면, 반환된 서술자 객체의 configurable 프로퍼티를 false로 바꿀 수 없다.

#### defineProperty(target, property, descriptor) 메소드

defineProperty 트랩은 Object.defineProperty() 메소드로 프로퍼티를 정의할 때 실행된다.  
타겟 객체, 프로퍼티명, 서술자 객체를 인자로 받는다.  
정의 성공 여부를 true / false 값으로 반환한다.  

아래는 예제이다.
```javascript
let proxy = new Proxy({}, {
	defineProperty: function(target, property, descriptor){
		Object.defineProperty(target, property, descriptor);
		return true;
	}
});

Reflect.defineProperty(proxy, "name", {value: "수지"});

document.write(proxy.name);
```

##### 규칙

- 타겟 객체가 확장 불가능이고 프로퍼티가 존재하지 않을 땐 false를 반환한다.