Symbol : 
 - 원시 타입 / 수정 불가능한 데이터 타입
 - 속성 식별자로 사용
 - 유일한 소유권을 가짐
 - 이유 : 객체 프로퍼티 키로 사용 시 다른 프로퍼티 키와 충돌하는 일을 방지한다.
 - new 연산자를 쓰지 못함(사용 시 예외 처리) - es6 부터 규정상 원사타입 생성자를 임의로 호출 불가
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
  
   // module-scoped symbol
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
```