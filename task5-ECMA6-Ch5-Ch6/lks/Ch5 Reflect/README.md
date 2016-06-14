# Chapter 6 Reflect API

ES6는 객체 리플렉션이 가능한 새 Reflect API를 도입 했다.  
Reflection은 아래와 같은 기능을 위해 가성 머신이나 인터프리터에서 실행되는 것을 상정한 언어에서는  
지원되고 있던 부분이 많았다.  
  
객체지향 언어들은 컴파일 때 객체를 생성할 경우 이를 수정할 방법이 없게 된다.  
이를 해결하기 위해 동적으로 인스턴스를 생성하는 Reflection이 존재하며  
이를 통해 객체를 분석하고 수정 보완 등을 할 수 있게 된다.  
참조
`http://gyrfalcon.tistory.com/entry/Java-Reflection`
`http://linuxism.tistory.com/816`

아래는 이러한 특성을 이용해 프로젝트 요구사항을 반영하는 과정을 보여준다.  
`http://www.nextree.co.kr/p3643/`

관련 페이지들
`https://medium.com/@denzels/es6-reflect-api-e90483d6c3bc#.j200pivua`


## Reflect 객체

ES6 전역 Reflect 객체에는 객체 리플렉션에 관한 모든 메소드가 있다.  
Reflect는 함수 객체가 아니기 때문에 호출이 불가능 하며, new 연산자 사용도 불가능 하다.  

### Reflect.apply(function, this, args) 메소드

reflect.apply()는 주어진 this 값으로 타겟 함수를 호출하는 메소드로 Function.prototype.apply() 메소드와 같다.

아래의 3개의 인자를 받는다.

- 타겟 함수
- 타겟 함수의 this
- 타겟 함수의 인자를 지정한 배열 객체

```javascript
function function_name(a, b, c)
{
	return this.value + a + b + c;
}
var returned_value = Reflect.apply(function_name, {value:100}, [10, 20, 30]);

document.write(returned_value);
```

### Reflect.construct(constructor, args, prototype) 메소드
Reflect.construct()는 함수를 생성자로 실행하는 메소드로, new 연산자와 비슷하다.  
굳이 new 대신 Reflect.construct()를 써야하는 이유는  
경우에 따라 한 생성자의 prototype과 다른 생성자의 prototype을 매치시켜야 하기 때문이다.

아래의 3개의 인자를 받는다.

- 타겟 생성자
- 타겟 생성자의 인자에 해당하는 배열
- 타겟 생성자의 prototype

```javascript
function constructor1(a, b)
{
	this.a = a;
	this.b = b;

	this.f = function(){
		return this.a + this.b + this.c;
	}
}
function constructor2(){};
constructor2.prototype.c = 100;

var myObject = Reflect.construct(constructor1, [1, 2], constructor2);

document.write(myObject.f());
```

### Reflect.defineProperty(object, property, descriptor) 메소드
Reflect.defineProperty()는 객체에 새 프로퍼티를 정의하거나 기존 프로퍼티를 수정하는 메소드이다.  
작업의 성공여부가 true, false로 반환된다.  
기존 ES5의 경우 Object.defineProperty()를 사용하였으나, Object.defineProperty()는 수정된 객체를 반환하며,  
실패 시 예외를 내지만 Reflect.defineProperty()는 단순하게 false만을 반환하여 처리가 간편하다.  

아래의 3개 인자를 받는다.

- 프로퍼티를 정의 / 수정할 객체
- 정의 / 수정할 프로퍼티명 또는 심폴
- 정의 / 수정할 프로퍼티의 서술

#### 테이터 프로퍼티와 접근자 프로퍼티
ES5부터 모든 객체의 프로퍼티는 데이터 프로퍼티, 접근자 프로퍼티 둘 중 하나를 가진다.  

데이터 프로퍼티 속성  
value, writable, enumerable, configurable  
접근자 프로퍼티 속성  
set, get, enumerable, configurable  

##### 데이터 프로퍼티 서술자의 속성

###### value
프로퍼티에 할당된 값이다.  
기본값 : undifined  

###### writable
이 속성이 ture면 할당 연산자로 값을 변경할 수 있다.  
기본값 : false  

###### configurable
이 속성이 true면 프로퍼티 속성을 변경, 삭제가 가능하다.  
configurable이 false이고 writable이 ture면 값과 쓰기 가능 속성은 변경 가능하다.  
기본값 : false  

###### enumerable
이 속성이 ture면 프로퍼티를 for ... in 루프나 Object.keys() 메소드에 열거할 수 있다.  
기본값 : false  

##### 접근자 프로퍼티 서술자 속성

###### get
프로퍼티 값을 조회하는 함수이다.  
기본값 : undefined  

###### set
프로퍼티 값을 지정하는 함수이며 주어진 값을 프로퍼티에 할당한다.  

###### configurable
이 속성이 true면 프로퍼티 서술자를 변경하거나 프로퍼티 자체를 삭제할 수 있다.  
기본값 : false

###### enumerable
이 속성이  true면 프로퍼티를 for ... in 루프나 Object.keys() 메소드에 열거할 수 있다.  
기본값 : false  

Reflect.defineProperty(), Object.defineProperty(), Object.defineProperties(), Object.create()를 쓰지 않고 추가한 프로프티는  
Writable, enumerable, configurable 속성이 모두 true인 데이터 프로퍼티로 설정된다.  

Reflect.defineProperty(), Object.defineProperty(), Object.defineProperties() 메소드 호출 시  
이미 동일한 이름의 프로퍼티가 있을 경우 해당 프로퍼티를 덮어쓴다.  
단, 서술자에 따로 지정하지 않은 속성은 유지 된다.  

데이터 / 접근자 프로퍼티는 상호 변환이 가능한데, 변환을 하면 서술자에 지정하지 않은 configurable, enumerable 속성은 보존되지만  
다른 속성은 기본값으로 설정된다.

아래는 Reflect.defineProperty()로 데이터 프로퍼티를 생성하는 예제이다.
```javascript
var obj = {};

Reflect.defineProperty(obj, "name", {
	value: "수지",
	writable: true,
	configurable: true,
	enumerable: true
});
document.write(obj.name);
```

아래는 같은 메소드로 접근자 프로퍼티를 생성하는 예제이다.
```javascript
let obj = {
	__name__: "수지"
};

Reflect.defineProperty(obj, "name", {
	get: function(){
		return this.__name__;
	},
	set: function(newName){
		this.__name__ = newName;
	},
	configurable: true,
	enumerable: true
});
obj.name = "민호";
document.write(obj.name);
```

### Reflect.deleteProperty(object, property) 메소드
Reflect.deleteProperty()는 객체 프로퍼티를 삭제하는 메소드로, delete 연산자와 기능이 같다. 

이 메소드는 아래의 2개 인자를 받는다.  
- 타겟 객체  
- 삭제할 프로퍼티 명  

아래는 이를 사용한 예제이다.
```javascript
let obj = {
	name: "수지"
};

document.write(obj.name);
Reflect.deleteProperty(obj, "name");
document.write(obj.name);

```

### Reflect.enumerate(object) 메소드

Reflect.enumerate()는 주어진 객체 자신의 열거 가능한 프로퍼티와 이 객체가 상속받은 열거 가능 프로퍼티를 이터레이터 객체로 반환한다.  
이 메소드는 열거 가능 프로퍼티를 순회하는 for ... in 루프와 유사하다.  
```javascript
let obj = {
	a: 1,
	b: 2,
	c: 3
};

var iterator = Reflect.enumerate(obj);

document.write(iterator.next().value);document.write("<br>");
document.write(iterator.next().value);document.write("<br>");
document.write(iterator.next().value);document.write("<br>");
document.write(iterator.next().done);document.write("<br>");
```
참고로 위 코드(Reflect.enumerate)는 현재 지원하는 브라우저가 없습니다.  
`https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Reflect/enumerate` 참조  

### Reflect.get(object, property, this) 메소드

Reflect.get()은 객체 프로퍼티 값을 조회하는 메소드로, 객체와 프로퍼티명을 인자로 받고  
프로퍼티가 접근자 프로퍼티일 경우 세번째 선택 인자에 get 함수 내부의 this 값을 지정할 수 있다.  

아래는 이 예제 이다.  
```javascript
let obj = {
	__name__: "수지"
};

Reflect.defineProperty(obj, "name", {
	get: function(){
		return this.__name__;
	}
});
document.write(obj.name);
var name = Reflect.get(obj, "name", {__name__: "민호"});
document.write(name);
var name = Reflect.get(obj, "name");
document.write(name);
```

### Reflect.set(object, property, value, this)메소드

Reflect.set()는 객체 프로퍼티 값을 지정하는 메소드로, 객체와 프로퍼티명, 프로퍼티 값을 인자로 받는다.  
접근자 프로퍼티일 경우에는 네 번째 선택 인자에 get 함수 내부의 this값을 지정할 수 있다.  

프로퍼티 값 지정에 문제가 없을 경우 true, 실패할 경우 false를 반환한다.

아래는 예제이다.
```javascript
let obj1 = {
	__name__: "수지"
};

Reflect.defineProperty(obj1, "name", {
	set: function(newName){
		this.__name__ = newName;
	},

	get: function(){
		return this.__name__;
	}
});
var obj2 = {
	__name__: "민호"
};
Reflect.set(obj1, "name", "수지", obj2);
// 마지막 obj2의 경우는 get 함수 내부에서 참조할 this 값을 obj2가 될 수 있도록 변경함으로
// 실제 바뀐 값은 obj2의 __name__이 될 수 있도록 하였다.
document.write(obj1.name);document.write("<br>")
document.write(obj2.__name__);
```

### Reflect.getOwnPropertyDescriptor(object, property) 메소드

Reflect.getOwnPropertyDescriptor()는 객체 프로퍼티의 서술자를 조회하는 메소드이다.  
기능상 Object.getOwnPropertyDescriptor()와 거의 같다.  

인자는 아래와 같다.  
- 타겟 객체  
- 프로퍼티명  

아래는 예제이다.
```javascript
let obj = {
	name: "수지"
};

var descriptor = Reflect.getOwnPropertyDescriptor(obj, "name");
document.write(descriptor.value);document.write("<br>")
document.write(descriptor.writable);document.write("<br>")
document.write(descriptor.enumerable);document.write("<br>")
document.write(descriptor.configurable);
```

### Reflect.getPrototypeOf(object)메소드
Reflect.getPrototypeOf()는 객체 프로토타입, 즉 내부 [[prototype]] 값을 조회하는 메소드로, Object.getPrototypeOf()와 같다.  

아래는 예제이다.
```javascript
let obj1 = {
	__proto__: {
		name: "수지"
	}
};

var obj2 = Reflect.getPrototypeOf(obj1);
document.write(obj2.name);
```

### Reflect.setPrototypeOf(object, prototype) 메소드
Reflect.setPrototypeOf()는 내부 [[prototype]] 값을 지정하는 메소드다.  
작업 성공 여부를 true / false로 반환한다.

아래는 사용 예제이다.
```javascript
let obj = {};
Reflect.setPrototypeOf(obj, {
	name: "수지"
});

document.write(obj.name);
```

### Reflect.has(object, property) 메소드
Reflect.has()는 주어진 객체에 어떤 프로퍼티가 존재하는지 확인하는 메소드로, 이 객체가 상속한 프로퍼티도 체크한다.  
존재 여부를 ture / false로 반환한다.  
in 연산자와 기능 상 같다.

아래는 예제이다.
```javascript
let obj = {
	__proto__: {
		name: "수지"
	},
	age: 12
};

document.write(Reflect.has(obj, "name"));document.write("<br>")
document.write(Reflect.has(obj, "age"));
```

### Reflect.isExtensible(object) 메소드
Reflect.isExtensible()는 확장 가능한 객체인지를 확인하는 메소드이다.  
이 객체에 새로운 프로퍼티를 추가할 수 있는지 확인하는 것이며, Object.preventExtensions(), Object.freeze(), Object.seal() 메소드로 제어할 때 이를 파악할 수 있게 된다.  
이 메소드는 Object.isExtensible()과 같다.

아래는 예제이다.
```javascript
let obj = {
	name: "수지"
};

document.write(Reflect.isExtensible(obj));document.write("<br>");
Object.preventExtensions(obj);
document.write(Reflect.isExtensible(obj));
```

### Reflect.preventExtension(object) 메소드
Reflect.preventExtension()는 객체를 확장할 수 없게 하는 메소드이다.  
처리 결과를 true 또는 false로 반환한다.  
이 메소드는 Object.preventExtensions()와 같다.
```javascript
let obj = {
	name: "수지"
};

document.write(Reflect.isExtensible(obj));document.write("<br>");
document.write(Reflect.preventExtensions(obj));document.write("<br>");
document.write(Reflect.isExtensible(obj));
```

### Reflect.ownKeys(object) 메소드
Reflect.ownKeys()는 객체 자신의 프로퍼티 키를 원소로 담은 배열을 반환한다.  
단, 상속한 프로퍼티는 무시한다.

아래는 예제이다.
```javascript
let obj = {
	a: 1,
	b: 2,
	__proto__: {
		c: 3
	}
};

let keys = Reflect.ownKeys(obj);

document.write(keys.length);document.write("<br>");
document.write(keys[0]);document.write("<br>");
document.write(keys[1]);document.write("<br>");
document.write(keys[2]);
```