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





























