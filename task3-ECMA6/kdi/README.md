#ECMA 6

## 추가된 기능

1. let

 - 블록 유효 범위를 잡는 지역 변수를 선언
 - let vs var
   
   var: 변수가 선언된 함수 전체가 유효 범위임
   let: 변수의 유효 범위를 블록 내로 제한
   

```
var a = 5;
var b = 10;

if (a === 5) {
  let a = 4; // The scope is inside the if-block
  var b = 1; // The scope is inside the function

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
   prototype : 프로토타입의 함수형 객체로 정의
   class : class 타입의 함수형 객체로 정의

```
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

 - 자바의 클래스처럼 상속의 기능도 가지고 있다.
(근데 실행이 되지 않음 (Unknown expression type: Super) 해당 예약어가 chrome에서 제공되지 않아서 그런듯...?)
super : 부모클래스의 필드값이나 메소드를 직접 호출하는 예약어
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
