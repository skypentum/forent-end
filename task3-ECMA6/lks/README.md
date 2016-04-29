# ECMAScript 6

## ES6의 문법을 정리하고 ES5와 비교할 수 있는 경우 추가 작성 함

### let의 탄생
타 언어 개발자들이 javascript를 설계 할 때 변수는 모두 블록 스코프임을 모르고 설계할 때가 있다.  
그리고 javascript 설계시 var을 사용하는 방식의 경우 블록이 아닌 관계로 메모리 누수가 생길 가능성이 높다.  
따라서 es6에서는 블록 내에서만 사용 가능한 키워드가 생긴 것이다.

##### 함수 스코프 변수의 예
```javascript
var a = 1;
function myFunction()
{
	console.log(a);
	var b = 2;
	if(true)
	{
		var c = 3;
		console.log(b);
	}
	console.log(c);
}
myFunction();
```
위 코드의 실행 결과는 아래와 같다.
```
1
2
3
```

##### 블록 스코프 변수의 예
```javascript
let a = 1;
function myFunction()
{
	console.log(a);
	let b = 2;
	if(true)
	{
		let c = 3;
		console.log(b);
	}
	console.log(c);
}
myFunction();
```
위 코드의 실행 결과는 아래와 같다.
```
1
2
Reference Error Exception
```
이처럼 블록을 넘어간 곳에서는 해당 변수를 읽을 수 없게 된다.  

##### 주의사항
var의 경우 선언을 한 후 재 선언시 가르키는 대상이 같아지면서 문제 없이 처리가 되니만,  
let의 경우 재 선언시 에러가 발생하게 된다.
```javascript
let a = 1;
let a = 10; // TypeError
function myFunction()
{
	console.log(a);
	let b = 2;
	let b = 20; // TypeError
	if(true)
	{
		let c = 3;
		let c = 30; // TypeError
		console.log(b);
	}
	console.log(c);
}
myFunction();
```

### const 키워드

읽기 전용 키워드
상수를 선언할 때 사용 하며, 블록 스코프 변수이다.

```javascript
const a = 1;
function myFunction()
{
	console.log(a);
	const b = 2;
	if(true)
	{
		const c = 3;
		console.log(b);
	}
	console.log(c);
}
myFunction();
```
위 코드의 실행 결과는 아래와 같다.
```
1
2
ReferenceError Exception
```

##### 상수를 통한 객체 참조

상수도 객체를 할당할 수 있다. 객체의 참조 값은 객체의 속성을 갖기 때문에 변경이 가능하지만,  
상수 자체는 변경이 불가능하다.
```javascript
const a = {
	"name" : "Tom"
};
console.log(a.name);
a.name = "Mary";
console.log(a.name);
a={};

```
실행 결과는 아래와 같다.
```
Tom
Mary
읽기 전용 예외 발생
```

### 파라미터 기본 값
자바스크립트의 경우 파라미터 값을 받지 못할 때 기본값을 처리하기 위해 추가 코딩이 필요 했다.
```javascript
function myFunction(x, y, z)
{
	x = x === undefined ? 1 : x;
	y = y === undefined ? 1 : y;
	z = z === undefined ? 1 : z;
}
```
그러나 ES6부터는 새 구문이 생겨 구현이 쉬워졌다.
```javascript
function myFunction(x = 1, y = 2, z = 3)
{
	console.log(x, y, z);
}
myFunction(6, 7);
```
실행 결과는 아래와 같다.
```
6 7 3
```

### 펼침 연산자

이터러블 객체를 개별 값으로 나누는 펼침 연산자는 "..."으로 표기한다.
```
이터러블(iterable)은 ES6 이터러블 규약(iterable protocol)에 따라 여러 값을 가지고,
개별 값을 순회 가능한 객체를 말한다.
대표적인 이터러블 객체로는 배열이 있다.
```
펼침 연산자를 사용하는 방법 중 하나는 기존 ES6의 경우 배열 값을 함수 인자로 넘겨주려고 할 때  
apply()내장 메소드를 이용할 수 밖에 없었다.  
아래는 apply를 이용하여 구현한 코드이다.
```javascript
function myFunction(a, b)
{
	retuen a + b;
}
var data = [1, 2];
var result = myFunction.apply(null, data);
console.log(result);
```
위 코드를 ES6의 경우 펼침 연산자를 통해 좀 더 쉽게 구현할 수 있게 되었다.
```javascript
function myFunction(a, b)
{
	retuen a + b;
}
var data = [1, 2];
var result = myFunction.(...data);
console.log(result);
```
자바스크립트 해석기는 ...data를 먼저 1, 2로 치환한 다음 myFunction 함수를 호출하게 된다.

#### 펼침 연산자의 다른 사용 예

##### 배열 값을 다른 배열의 일부로 만들 때
```javascript
let array1 = [3, 4, 5];
let array2 = [1, 2, ...array1, 6, 7];
```

##### 배열 값을 다른 배열에 밀어 넣을 때(push)
이 경우 ES6 때는 아래와 같이 코딩 하였다.
```javascript
var array1 = [1, 2, 3, 4];
var array2 = [3, 4, 5];

Array.prototype.push.apply(array1, array2);
```
하지만 펼침 연산자로 좀 더 편하게 가능해 졌다.
```javascript
var array1 = [1, 2, 3, 4];
var array2 = [3, 4, 5];

array1.push(...array2);
```

##### 나머지 파라미터

함수의 마지막 파라미터 앞에 "..."을 붙이는 것으로 이름이 붙여진 파라미터보다 함수 파라미터를 더 많이 포함하는 배열이 된다.  
개수가 가변적일 때 이를 포착하는 용도로 사용하게 된다.  
기존에는 아래와 같은 방법으로 구현을 했다.
```javascript
function myFunction(a, b)
{
	var args = Array.prototype.slice.call(arguments, myFunction.length);
	console.log(args);
}
myFunction(1, 2, 3, 4, 5);
```
하지만 ES6에서는 나머지 파라미터로 훨씬 간결하게 가능하게 되었다.
```javascript
function myFunction(a, b, ...args)
{
	console.log(args);
}
myFunction(1, 2, 3, 4, 5);
```

### 해체 할당

해체 할당(destructuring assignment)은 이터버블이나 객체의 값/프로퍼티를 각각 배열이나 객체 생성자 리터럴과 비슷한 구문으로 변수에 할당하는 표현식이다.  
'배열 해체 할당'과 '객체 해체 할당' 두 가지 유형이 있다.

#### 배열 해체 할당

배열 해체 할당(array destructing assignment)은 이터러블 객체에서 값을 추출하여 변수에 할당한다.  
배열 생성 리터럴과 닮은꼴이라 이렇게 부른다.

##### 기본 예제

ES5 이전에는 배열 값을 할당하려면 아래와 같이 하였다.
```javascript
var myArray = [1, 2, 3];
var a = myArray[0];
var b = myArray[1];
var c = myArray[2];
```
ES6 부터는 배열 해체 할당문 한 줄이면 된다.
```javascript
let myArray = [1, 2, 3];
let a, b, c;
[a, b, c] = myArray;
```
이를 더 짧게 하고 싶다면 아래와 같이 하면 된다.
```javascript
[a, b, c] = [1, 2, 3];
```

##### 값을 건너 뛴다.

이터러블 값에서 할당 없이 건너 뛰는 경우도 가능하다.
```javascript
let [a, , b] = [1, 2, 3];
console.log(a);
console.log(b);
```
결과는 아래와 같다.
```
1
3
```

##### 배열 해체 할당에 나머지 연산자를 사용

해체 할당 시 마지막 변수 앞에 "..."를 붙이면, 변수가 모자랄 때 배열 객체로 바뀌어 나머지 값들이 할당이 된다.
```javascript
let [a, ...b] = [1, 2, 3, 4, 5];
colsole.log(a);
colsole.log(Array.isArray(b));
colsole.log(b);
```
결과는 아래와 같다.
```
1
true
2, 3, 4, 5
```

##### 변수의 기본값

해체 할당이 안 된 변수의 기본 값을 undefined 이외의 값으로의 지정도 가능하다.
```javascript
let [a, b, c = 3] = [1, 2];
colsole.log(c); // 결과는 '3'
```

##### 중첩 배열 해체

중첩 배열의 경우도 동일하게 적용이 가능하다.
```javascript
let [a, b, [c, d]] = [1, 2, [3, 4]];
```

##### 파라미터로 배열 해체 할당 사용

해체 할당 표현식을 함수 파라미터 자리에 넣어서 추출하는 것도 가능하다.
```javascript
function myFunction([a, b, c = 3])
{
	console.log(a, b, c); // 결과는 '1 2 3'
}

myFunction([1, 2]);
```

#### 객체 해체 할당

객체 할당은 객체 프로퍼티 값을 추출해서 변수에 할당한다.  
ES5 이전에는 객체 프로퍼티 값을 다른 변수에 할당하려면 아래와 같은 방법을 사용했다.
```javascript
var object = {"name" : "tom", "age" : 20};
var name = object.name;
var age = object.age;
```
하지만 ES6 부터는 객체 해체 할당문 한 줄이면 된다.
```javascript
let object = {"name" : "tom", "age" : 20};
let name, age;
({name, age} = object); // 배열 해체 할당용 구문
```
객체 프로퍼티명과 변수명은 반드시 같아야 하며, 반드시 바꿀 필요가 있을 경우에는 아래와 같이 한다.
```javascript
let object = {"name" : "tom", "age" : 20};
let x, y;
({name: x, age: y} = object); // 배열 해체 할당용 구문
```
더 짧게 줄이면 아래와 같다.
```javascript
let {name, age} = {"name" : "tom", "age" : 20};
```

##### 변수의 기본 값

객체 프로퍼티가 undefined일 경우 변수에 기본 값을 줄 때는 아래와 같이 한다.
```javascript
let {a, b, c = 3} = {a: "1", b: "2"};
console.log(c); // 실행결과는 "3"
```

##### 조합 프로퍼티명을 해체

프로퍼티명을 동적으로 조합할 경우 표현식을 []로 감싼다.
```javascript
let {["first" + "Name"]: x} = {firstName: "Tom"};
console.log(x); // 실행 결과는 "Tom"
```

##### 중첩 객체를 해체

중첩된 객체, 즉 객체 속 객체의 프로퍼티도 아래와 같이 추출이 가능하다.
```javascript
var {name, otherInfo: {age}} = {name: "Tom", otherInfo: {age: 20}};
console.log(name, age); // 결과는 Tom 20
```

##### 파라미터로 객체 해체 할당 사용

배열 해체 할당 처럼 객체 해체 할당도 함수 파라미터로 사용이 가능하다.
```javascript
function myFunction({name = "Tom", age = 20, profession = "math"} = {})
{
	console.log(name, age, profession); // 실행결과는 "Min 25 math"
}
myFunction ({name = "Min", age: 25});
```

### 화살표 함수

ES6부터 => 연산자로 함수를 생성하는 화살표 함수가 생겼다.  
화살표 함수는 보다 간결한 구문으로 구현할 수 있는 익명 함수이다.
우선 아래의 예제로 어떻게 사용하는지 확인해 본다.
```javascript
let circleArea = (pi, r) => {
	let area = pi * r * r;
	return area;
}
let result = circleArea = (3.14, 3);

console.log(result); // 실행 결과는 "28.26"
```

ES5의 경우는 아래와 같은 방법을 사용하였다.
```javascript
var circle Area = function(pi, r){
	var area = pi * r * r;
	retune area;
}

var result = circleArea = (3.14, 3);

console.log(result); // 실행 결과는 "28.26"
```

그리고 문장이 하나의 경우는 { } 기호를 생략할 수 있다.
```javascript
let circle Area = (pi, r) => pi * r * r;
let result = circleArea = (3.14, 3);

console.log(result); // 실행 결과는 "28.26"
```

#### 화살표 함수에서의 this 값

화살표 함수에서 this 값은 해당 스코프의 this 값과 같다.  
여타 함수에서 this가 context object를 가리키는 것과는 차이가 있다.
아래에서 나오는 일반 함수에서의 this와 화살표 함수에서의 this가 어떻게 다른지를 살펴보자.
```javascript
var object = {
	f1: function(){
		console.log(this);
		var f2 = function(){console.log(this);}
		f2();
		setTimeout(f2, 1000);
	}
}
object.f1();
```
일반 함수에서의 결과는 아래와 같다.
```
Object
Window
Window
```
아래는 화살표 함수에서의 this 이다.
```javascript
var object = {
	f1 () => {
		console.log(this);
		var f2 = () => {console.log(this);}
		f2();
		setTimeout(f2, 1000);
	}
}
object.f1();
```
실행 결과는 아래와 같다.
```
Window
Window
Window
```

#### 화살표 함수와 일반 함수의 차이점

화살표 함수는 instant 하기 때문에 객체 생성자로 사용할 수 없다. 즉 new 연산자를 사용할 수 없다.  
결론적으로 this와 new 에서의 차이가 발생하게 된며, 그 외의 차이점은 없다.

### 강화된 객체 리터럴

#### 프로퍼티 정의
ES6부터는 변수명과 동일한 이름을 가진 객체 프로퍼티에 간편하게 값을 할당할 수 있게 되었다.
ES5 이전에는 아래와 같이 사용하였다.
```javascript
var x = 1, y = 2;
var object = {
	x: x,
	y: y
}
console.log(object.x); // 실행결과는 "1"
```
ES6부터는 아래와 같이 간편하게 사용이 가능하다.
```javascript
var x = 1, y = 2;
var object = { x, y };

console.log(object.x); // 실행결과는 "1"
```

#### 메소드 정의

다음은 객체 메소드를 정의하는 새로운 구문이다.
```javascript
let object = {
	myFunction(){
		console.log("Hello!!!"); // 실행결과는 "Hello!!!"
	}
}
object.myFunction();
```
간결해진 구문으로 인해 기존 객체 메소드에서 사용할 수 없었던 super를 사용할 수 있게 되었다.
사용하는 방법에 대해서는 뒷 부분에서 다시 다루겠다.


#### 조합 프로퍼티명

기존에는 프로퍼티 명을 조합해서 넣을 경우에는 객체를 생성 후에 프로퍼티를 추가해야만 했다.
ES5 이전에는 아래와 같이 사용한 것이다.
```javascript
var object = {};
object["first" + "Name"] = "Tom";
console.log(object["first" + "Name"]);
```

하지만 ES6 부터는 객체 생성에서 부터 프로퍼티 추가가 가능하게 되었다.
```javascript
let object = {
	["first" + "Name"] = "Tom",
};
console.log(object["first" + "Name"]);
```










