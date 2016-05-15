#Symbol : 
 - 원시 타입 / 수정 불가능한 데이터 타입
 - 속성 식별자로 사용
 - 유일한 소유권을 가짐
 - 이유 : 객체 프로퍼티 키로 사용 시 다른 프로퍼티 키와 충돌하는 일을 방지한다.
 - new 연산자를 쓰지 못함(사용 시 예외 처리) : es6 부터 규정상 원시타입 생성자를 임의로 호출 불가
```
(function() {

    var key1 = "description";
    var key2 = "description";

    function MyClass1(privateData) {
      this[key1] = privateData;
      this[key2] = "privateData";
    }

    MyClass1.prototype = {
      someFunc: function() {
        return "data: " + this[key1];
      }
    };

    var c = new MyClass1("private data");
    console.log(key1);
    console.log(c[key1]);
    console.log(key2);
    console.log(c[key2]);

    console.log(c.someFunc());
  
    var key3 = Symbol("description");
    var key4 = Symbol("description");

    function MyClass2(privateData) {
      this[key3] = privateData;
      this[key4] = "privateData";
    }

    MyClass2.prototype = {
      someFunc: function() {
        return "data: " + this[key3];
      }
    };

    var c = new MyClass2("private data");
    console.log(key3);
    console.log(c[key3]);
    console.log(key4);
    console.log(c[key4]);

    console.log(c.someFunc());
  	
})();

//Symbol.for(String) method
//key/value 형태로 등록 (key: symbol 서술 / value: symbol)
//심볼을 반환(기본적으로 symbol 내의 프로퍼티를 조회 할 수 없음)
let obj = {};

(function(){
  let s1 = Symbol("name");
  obj[s1] = "수지";
  let s2 = Symbol.for("age");
  obj[s2] = 27;
})();

console.log(obj[Symbol("name")]); 
console.log(obj[Symbol.for("age")]); 
```

#iteration
 - 루프 또는 순회하기 위한 구현규칙
 - iterable / iterator 규약으로 나누어 규정
 - iterable vs iterator
   
   iterable | iterator
   객체의 요소를 탐색하는 포인터 | 객체의 요소를 반환하도록 함
   Symbol.iterator 심볼을 프로퍼티 키로 반드시 가져야 함 | 요소를 반환하는 함수를 구현(기본 : next())
   심볼만 호출하냐 | 매번 함수를 호출하냐(사용 메모리의 차이?)
   
```
let obj1 = {
  array: [1, 2, 3, 4, 5],
  nextIndex: 0,
  [Symbol.iterator]: function(){
    return {
      array: this.array,
      nextIndex: this.nextIndex,
      next: function(){
        return this.nextIndex < this.array.length ?
          {value: this.array[this.nextIndex++], done: false} :
        {done: true};
      }
    }
  }
};

var iterable = obj1[Symbol.iterator]()

console.log(iterable.next().value);
console.log(iterable.next().value);
console.log(iterable.next().value);
console.log(iterable.next().value);
console.log(iterable.next().value);
console.log(iterable.next().done);


let obj = {
  array: [1, 2, 3, 4, 5],
  nextIndex: 0,
  next: function(){
    return this.nextIndex < this.array.length ?
      {value: this.array[this.nextIndex++], done: false} :
    {done: true};
  }
};

console.log(obj.next().value);
console.log(obj.next().value);
console.log(obj.next().value);
console.log(obj.next().value);
console.log(obj.next().value);
console.log(obj.next().done);
```

#generator
 - 한번에 하나 이상의 값을 반환하는 함수
 - 이터러블 + 이터레이터가 모두 구현되어 있음
 - 생성기 함수(function*)로 표기함
 - yield : 해당 속성을 만나면 중지되고 해당 값을 반환함

```
//codepen에서만 동작
//iterator
function* generator_function()
{
  yield 1;
  yield 2;
  yield 3;
}

let generator = generator_function();

console.log(generator.next().value);
console.log(generator.next().value);
console.log(generator.next().value);
console.log(generator.next().done);

//iterable
generator = generator_function();

let iterable = generator[Symbol.iterator]();

console.log(iterable.next().value);
console.log(iterable.next().value);
console.log(iterable.next().value);
console.log(iterable.next().done);

//yield* 키워드를 사용하여 표현식 지정 가능
function* generator_function_1()
{
	yield 2;
	yield 3;
}

function* generator_function_2()
{
	yield 1;
	yield* generator_function_1();
	yield* [4, 5];
}

var generator = generator_function_2();

console.log(generator.next().value);
console.log(generator.next().value);
console.log(generator.next().value);
console.log(generator.next().value);
console.log(generator.next().value);
console.log(generator.next().done);

```

#for...of 루프
 - iterable 객체 값을 순회하는 구문
 - next()보다 간편함

```
function* generator_function()
{
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
}

for(let value of generator_function())
{
  console.log(value);
}
```