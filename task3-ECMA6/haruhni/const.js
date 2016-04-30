"user strict";
/*
 * const의 경우 초기화 후 값이 변경되지 않은다.
 * 만약 동작 중 값을 변경 할 경우 에러를 발생시킨다.
 * const 역시 let 키워드와 같이 블럭 스코프 영역을 같는다.
 * 기본적으로 const는 변경이 되지 않지만 예외 적인 경우가 있다.. array, obj...
 */
$(function() {
    var result = $('.result-view');

    const SIZE = 10;

    result.append('<p>SIZE : ' + SIZE + '</p>');
    try {
        SIZE = 20;
    } catch (exception) {
        result.append('<p>'+ exception.message + '</p>');
    } finally {
        result.append('<p>change SIZE : ' + SIZE + '</p>');
    }
    
    (function() {
        const TEST = 'out';
        if (true) {
            const TEST = 'in';
            result.append('<p>const in scope : ' + TEST + '</p>');
        }
        result.append('<p>const out scope : ' + TEST + '</p>');
    })();
    
    (function() {
        var TEST = 'out';
        if (true) {
            var TEST = 'in';
            result.append('<p>var in scope : ' + TEST + '</p>');
        }
        result.append('<p>var out scope : ' + TEST + '</p>');
    })();
    
    const ARR = [1, 2, 3];
    result.append('<p>ARR : ' + ARR + '</p>');
    ARR[0] = 3;
    result.append('<p>change ARR : ' + ARR + '</p>');
    
    const OBJ = {
        name: 'haruhni'
    };
    result.append('<p>OBJ : ' + OBJ.name + '</p>');
    OBJ.name = 'test';
    result.append('<p>change OBJ : ' + OBJ.name + '</p>');
});
