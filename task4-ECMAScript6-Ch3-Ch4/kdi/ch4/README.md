# 비동기 프로그래밍
## Promise [이곳](http://yubylab.tistory.com/entry/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-Promise-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0) 참조
 - 비동기로 처리하는 작업의 결과를 나타냄(성공 또는 실패 할 수 있음.. 약속은 무조건 지켜지는 것은 아니므로...)
 - 사용 이유 
   * 하나의 작업을 처리하기 위해 여러번의 비동기 호출 시 callback 결과를 순차적으로 보장 받을 수 없음(callback 중첩)
   * return, throw를 통해 함수를 순차적으로 처리하기 위함
   * 코드 가독성이 좋아짐

```
console.log("1");
$('.button').click(function(){ 
  console.log("2"); 
}); 
console.log("3");
setTimeout(function(){ console.log("4"); }, 1000); 
console.log("5");
$.get('getUserList.do',function(result){
  console.log("6");
});

function a() {
  return 50;
}

var promiseWithStudent = new Promise(function(resolve, reject){
  let result = a();
  if(result > 50) {
    resolve(result);
  } else {
    reject(result);
  }
});

promiseWithStudent.then(function(data) {
  if (data === 100) { 
    return 'excellent';
  } else {
    return 'not bad';
  }
}, function(error) {
  return 'shit!!';
}).then(function(result){
  console.log(result);
});
```

## promise를 처리하기 위한 필요 사항
 * deferred 객체 : promise의 상태를 처리
 resolve() | 주어진 값이 정상인 경우 객체를 반환하는 매소드
 reject() | 주어진 값이 정상이 아닌 경우 객체를 반환하는 매소드
 all() | 주어진 순환형 deferred가 모두 처리되었을 때 반환하는 매소드
```
var promiseWithStudent = new Promise(function(resolve, reject){
  let result = a();
  if(result > 50) {
    resolve(result);
  } else {
    reject(result);
  }
});

//또는
if(result > 50) {
  Promise.resolve(50);
} else {
  Promise.reject(50);
}

//all
function timeout(duration = 0) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, duration);
    })
}

var p1 = timeout(1000);
var p2 = timeout(2000);

var arr = [p1, p2];

Promise.all(arr).then(function() {
  console.log('Done !!!!');
});
```

 * promise 객체 : promise 실행을 처리 
 then() | deferred 객체의 결과가 성공/실패에 관계 없이 무조건 수행
 catch() | deferred 객체의 결과가 실패인 경우 수행
```
promiseWithStudent.then(function(data) {
  if (data === 100) { 
    return 'excellent';
  } else {
    return 'not bad';
  }
}, function(error) {
  return 'shit!!';
}).then(function(result){
  console.log(result);
});


// 또는
promiseWithStudent.then(function(data) {
  if (data === 100) { 
    return 'excellent';
  } else {
    return 'not bad';
  }
}).catch(function(error) {
  return 'shit!!';
}).then(function(result){
  console.log(result);
});
```

