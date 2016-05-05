# Chapter3 이터레이터

### ES6 Symbol

심볼은 리터럴 형식이 없고 Symbol() 함수로 생성한다.  
이 함수는 언제나 유일한 심볼을 반환한다.  
심볼은 언제나 동일하지 않으며, 다른 어떤 값과도 충돌하지 않는 일종의 문자열 값이다.

```javascript
let s1 = window.Symbol("내 심볼");
let s2 = window.Symbol("내 심볼");

document.write(s1 === s2);
```

#### typeof 연산자

심볼에 typeof 연산을 하면 결과는 "symbol"이다.
```javascript
var s = Symbol();
document.write(typeof s);
```

#### new 연산자

Symbol()에는 new 연산자를 사용할 수 없다. 자신이 생성자로 사용된 것을 감지하여 예외를 던지기 때문이다.
```javascript
try{
	let s = new Symbol();
}
catch(e){
	document.write(e.message);
}
```

#### 심볼을 프로퍼티 키로 사용

객체의 프로퍼티 키는 보통 문자열 타입이었지만 ES6부터는 문자열과 심볼 둘 다 가능하다.
```javascript
(function(){
	let s2 = Symbol();
	s1 = s2;
	obj = {[s2]: "내 심볼"}
	document.write(obj[s2] + "<br>");
	document.write(obj[s2] === obj[s1]);
	document.write("<br>");
})();
document.write(obj[s1]);
```

#### Object.getOwnPropertySymbols() 메소드
Object.getOwnPropertyName()로는 심볼 프로퍼티를 조회할 수가 없다.  
따라서 객체의 심볼 프로퍼티를 배열로 가져오기 위해서는 Object.getOwnPropertySymbols() 메소드를 사용해야 한다.
```javascript
```