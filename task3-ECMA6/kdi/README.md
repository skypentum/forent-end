#ECMA 6

## 추가된 기능

1. let, const

 - 블록 유효 범위를 잡는 지역 변수를 선언
 - let vs var
    - var: 변수가 선언된 함수 전체가 유효 범위임
    - let: 변수의 유효 범위를 블록 내로 제한
    - const: 상수를 정의함, 값을 변경할 수 없음

```
var a = 5;
var b = 10;
const x = "sneaky";

if (a === 5) {
  let a = 4; // The scope is inside the if-block
  var b = 1; // The scope is inside the function
  var x = "aaa"; //error : Identifier 'x' has already been declared

  console.log(a);  // 4
  console.log(b);  // 1
} 

console.log(a); // 5
console.log(b); // 1
```

```
for (let i = 0; i<10; i++) {
  console.log(i); // 0, 1, 2, 3, 4 ... 9
}

console.log(i); // i is not defined
```

2. class 

 - 자바의 클래스처럼 인스턴스를 생성하기 위한 객체 정의 기능을 제공
 - class vs prototype
    - prototype : 프로토타입의 함수형 객체로 정의
    - class : class 타입의 함수형 객체로 정의

```
// ES5

'use strict';

function User(name){
  this._name = name;
}

User.prototype = Object.create(null, {
  constructor: {
    value: User
  },

  say: {
    value: function() {
      return 'My name is ' + this._name;
    }
  }
});

var user = new User('Alice');
console.log(user.say()); // My name is Alice
```

```
//ES6
class User {
  constructor(name) {
    this._name = name;
  }

  say() {
    return 'My name is ' + this._name;
  }
}

var user = new User('Alice');
console.log(user.say()); // My name is Alice
```

 - 자바의 클래스처럼 생성자를 지원하며, 상속의 기능도 가지고 있다.

(codepen의 경우 실행 시 error 발생 (Unknown expression type: Super) ECMA6 스펙을 완벽하게 제공되지 않아서 그런듯...?)

cf) super : 부모클래스의 필드값이나 메소드를 직접 호출하는 예약어
```
class User {
  constructor(name) {
    this._name = name;
  }

  say() {
    return 'My name is ' + this._name;
  }
}

class UserGroup extends User{
  constructor(nam, group) {
    super(name);
    this._group = group;
  }

  say() {
    return 'My name is ' + super.say() + ' && ' + this._group;
  }
}

var usergroup = new UserGroup('Alice');
console.log(usergroup.say()); // My name is Alice
```

3. Arrows(=>)

 - 함수를 짧게 표현하는 방식
 - c++ / c#에서 많이 쓰이는 람다 방식을 체택함(현재 java8버전에서도 지원함)
 - 일반적 함수와 다르게 this 호출 시 선언된 윗단계 스코프의 this를 공유
``` 
var a = [
  "Hydrogen",
  "Helium",
  "Lithium",
  "Beryl­lium"
];

var a2 = a.map(function(s){ return s.length });
console.log(a2) //[8, 6, 7, 10]
var a3 = a.map( s => s.length );
console.log(a3) //[8, 6, 7, 10]
```

4.for of

 - 객체의 유효값만을 순회
 - for in vs for of
   - for in : 객체의 map:value 모두 순회함
   - for in : 객체의 유효값만을 조회

```
let fibonacci = {
  [Symbol.iterator]() {
    let pre = 0, cur = 1;
    return {
      next() {
        [pre, cur] = [cur, pre + cur];
        return { done: false, value: cur }
      }
    }
  }
}

for (var n of fibonacci) {
  // truncate the sequence at 1000

  if (n > 1000)
    break;
  console.log(n);
}
```

5. Default + Rest + Spread

 - 함수의 파라미터에 대한 초기화 방식이 추가됨
```
//ES5
function f(x, y) { 
  y = y || 12 // 기존 인자 값 초기화 방식

  return x + y;
}
console.log(f(3));
```

```
//ES6
function f(x, y=12) { // 인자값을 해당 위치서 미리 초기화 가능함
  // y is 12 if not passed (or passed as undefined)

  return x + y;
}
console.log(f(3));
```
 - 가변인수를 지원함, 불필요한 인자 순회를 하지 않아도 됨
```
function f3(x, y, z) {
  return x + y + z;
}
// Pass each elem of array as argument

console.log(f3(...[1,2,3]))
```

6. Destructuring

 - es6에서 추가된 기능
 - 패턴 매칭을 통해 값을 바인딩함(없으면 undefined)
 - 여러 변수를 한번에 초기화 가능
```
var x = [1, 2, 3, 4, 5]
var [y, z] = x
console.log(y); // 1
console.log(z); // 2

function f() {
  return [1, 2, 3];
}

var [a, , b] = f();
console.log(a); // 1
console.log(b); // 3
```

7. yield

 - 함수 중간에 값을 넘기거나 중지 시킴(파이썬과 유사)
 - 생성기 함수 (function* 또는 오래된 생성기 함수)를 중지하거나 재개하는데 사용

```
//검증완료
function* foo(){
  var index = 0;
  while (index <= 2) 
    yield index++;
}
var iterator = foo();
console.log(iterator.next()); // 0

console.log(iterator.next()); // 1

console.log(iterator.next()); // 2

console.log(iterator.next()); // undefined
```
```
var fibonacci = {
  [Symbol.iterator]: function*() {
    var pre = 0, cur = 1;
    for (;;) {
      var temp = pre;
      pre = cur;
      cur += temp;
      yield cur;
    }
  }
}

for (var n of fibonacci) {
  // truncate the sequence at 1000

  if (n > 1000)
    break;
  console.log(n);
}
```

8. module

 - AMD, CommonJS의 영향을 받음
 - module을 export하고 import해서 사용 할 수 있게 해줌
 - 사용 방법
   - import * as myModule from "my-module.js"; // export 한 모듈 전체를 가져옴
   - import {myMember} from "my-module.js"; //모듈에서 export한 맴버 중 하나만 가져옴
   - import {reallyReallyLongModuleMemberName as shortName} from "my-module.js"; //export한 모듈 맴버의 alias를 지정하여 사용함
   - import "my-module.js"; //바인딩 없이 모듈 전체의 사이드 이펙트만 가져옴
```
// --file.js--
function getJSON(url, callback) {
  let xhr = new XMLHttpRequest();
  xhr.onload = function () { 
    callback(this.responseText) 
  };
  xhr.open("GET", url, true);
  xhr.send();
}

export function getUsefulContents(url, callback) {
  getJSON(url, data => callback(JSON.parse(data)));
}

// --main.js--
import { getUsefulContents } from "file.js";
getUsefulContents("http://www.example.com", data => {
  doSomethingUseful(data);
});
```

9. Promiss

  - 비동기 작업결과를 나타내는 방식으로 angular js의 $q와 유사함
  - 사용 함수
    - then() : 성공/실패에 상관없이 무조건 수행
    - catch() : 실패 시 수행
```
//검증완료
function timeout(duration = 0) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, duration);
    })
}

var p = timeout(1000).then(() => {
    console.log('then success'); //1초 후 찍고, 2초후 찍음
    return timeout(2000);
}).then(() => {
    console.log('then fail'); // 1,2초 지난 후 찍음
    throw new Error("hmm");
}).catch(err => {
    console.log('all try'); // error 발생시 찍음
    return Promise.all([timeout(100), timeout(200)]);
})
```

10.symbol

 - 수정 불가능한 데이터 타입으로 주로 객체 속성의 식별자로 사용함
 - object의 고유 값을 지정하며, 외부에서는 접근할 수 없음
 - 사용 가능한 속성 및 method는 [여기](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Symbol)를 참조
```
//symbol 기본 사용법
let debbie = Symbol.for('user');
let mike   = Symbol.for('user');

console.log(debbie === mike);
// <-- true

console.log(Symbol.keyFor(debbie));
// <-- "user"
```
```
//for .. in 절에서는 symbol을 인식하지 못함
var obj = {};

obj[Symbol("a")] = "a";
obj[Symbol.for("b")] = "b";
obj["c"] = "c";
obj.d = "d";

for (var i in obj) {
   console.log(i); // "c", "d"
}
```
```
//Symbol.iterator를 명시하여 반복함
let band = ['Freddy', 'Brian', 'John', 'Roger'];
let iterator = band[Symbol.iterator]();

console.log(iterator.next().value);
// "Freddy"
console.log(iterator.next().value);
// "Brian"
console.log(iterator.next().value);
// "John"
console.log(iterator.next().value);
// "Roger"
console.log(iterator.next().value);
// undefined

```

11. Map + Set + WeakMap + WeakSet

 - underscore 등에서 일반적으로 많이 쓰이는 알고리즘을 적용함
```
// Sets
var s = new Set();  
s.add("hello").add("goodbye").add("hello");  
console.log(s.size === 2);  //true
console.log(s.has("hello") === true);  //true

// Maps
var m = new Map();  
m.set("hello", 42);  
m.set('s', 34);  
console.log(m.get('s') == 34);   // true

// Weak Maps
var s = {};
var wm = new WeakMap();  
wm.set(s, { extra: 42 });  
console.log(wm.size === undefined); // true

// Weak Sets
var ws = new WeakSet();  
ws.add({ data: 42 });  
console.log(ws); //WeakSet {Object {data: 42}}
```

12. Binary and Octal Literals

  - 2진수 8진수 구분자 추가
```
console.log(0b111110111 === 503) // true  
console.log(0o767 === 503) // true  
```

13.proxy

 - 기본적인 작업에 대한 사용자 정의 작업을 정의함
 - 사용 가능한 method는 [여기](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Proxy)를 참조
```
var handler = {
    get: function(target, name){
        return name in target ? target[name] : 37;
    }
};

var p = new Proxy({}, handler);
p.a = 1;
p.b = undefined;

console.log(p.a, p.b); // 1, undefined
console.log('c' in p, p.c); // false, 37
```