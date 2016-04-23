# ECMAScript 6

## ES6의 문법을 정리하고 ES5와 비교할 수 있는 경우 추가 작성 함

### let의 탄생
타 언어 개발자들이 javascript를 설계 할 때 변수는 모두 블록 스코프임을 모르고 설계할 때가 있다.  
그리고 javascript 설계시 var을 사용하는 방식의 경우 블록이 아닌 관계로 메모리 누수가 생길 가능성이 높다.  
따라서 es6에서는 블록 내에서만 사용 가능한 키워드가 생긴 것이다.

##### 함수 스코프 변수의 예
```
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
```
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
```
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

```
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
```
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
```
function myFunction(x, y, z)
{
	x = x === undefined ? 1 : x;
	y = y === undefined ? 1 : y;
	z = z === undefined ? 1 : z;
}
```
그러나 ES6부터는 새 구문이 생겨 구현이 쉬워졌다.
```
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
```
function myFunction(a, b)
{
 retuen a + b;
}
var data = [1, 2];
var result = myFunction.apply(null, data);
console.log(result);
```
위 코드를 ES6의 경우 펼침 연산자를 통해 좀 더 쉽게 구현할 수 있게 되었다.
```
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
```
let array1 = [3, 4, 5];
let array2 = [1, 2, ...array1, 6, 7];
```

##### 배열 값을 다른 배열에 밀어 넣을 때(push)
이 경우 ES6 때는 아래와 같이 코딩 하였다.
```
var array1 = [1, 2, 3, 4];
var array2 = [3, 4, 5];

Array.prototype.push.apply(array1, array2);
```
하지만 펼침 연산자로 좀 더 편하게 가능해 졌다.
```
var array1 = [1, 2, 3, 4];
var array2 = [3, 4, 5];

array1.push(...array2);
```

##### 나머지 파라미
































