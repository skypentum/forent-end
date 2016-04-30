"user strict";

/*
 * Arrows Function 문법
 *
 * ([param], [param]) => {
 *      statements
 * }
 *
 * param => expression
 *
 */

$(function() {
    var result = $('.result-view');
    
    /*
     * 한줄 표현식
     */
    let square = x => x * x;
    result.append('<p>let square = x => x * x : ' + square(3) + '</p>');
    
    /*
     * 한줄 표현식의 변환 코드
     */
    let square2 = (x) => { return x * x };
    result.append('<p>let square2 = (x) => { return x * x } : ' + square2(3) + '</p>');
    
    /*
     * callback function
     */
    setTimeout(() => {
        result.append('<p>es6 setTimeout 100ms</p>');
    }, 100);
    
    setTimeout(function() {
        result.append('<p>es5 setTimeout 100ms</p>');
    }, 100);
    
    let list = [1, 2, 3, 4];
    var filterList = list.filter(n => {
        return n % 2 ===0;
    });
    result.append('<p>es6 : ' + filterList + '</p>');
    
    filterList = list.filter(n => n % 2 ===0);
    result.append('<p>es6 : ' + filterList + '</p>');
    
    filterList = list.filter(function(n) {
        return n % 2 !==0;
    });
    result.append('<p>es5 : ' + filterList + '</p>');
    
    /*
     * 익명함수 표현
     */
    (() => result.append('<p>es6 익명함수</p>'))();
    (function() { result.append('<p>es5 익명함수</p>'); })();
    
    
    /*
     * Arrows Function 내부의 this 는 항상 Arrows Function 를 감싸고 있는 외부 스코프를 참조한다.
     */
    (function() {
        var obj = {
            getThis: function() {
                var getter = function() {
                    return this;
                }
                
                return getter();
            }
        }
        result.append('<p>es5 obj : ' + (obj.getThis() === obj) + '</p>');
    })();
    
    (function() {
        var obj = {
            getThis: function() {
                var getter = () => {
                    return this;
                }
                
                return getter();
            }
        }
        
        result.append('<p>es6 obj : ' + (obj.getThis() === obj) + '</p>');
    })();
    
    (function() {
        var obj = {
            getThis: function() {
                var self = this;
                var getter = function() {
                    return self;
                }
                
                return getter();
            }
        }
        result.append('<p>es5 obj : ' + (obj.getThis() === obj) + '</p>');
    })();
    
    (function() {
        this.name = 'outer';
        var inner = {
            name: 'inner',
            getName: function() {
                return this.name;
            }
        }
        result.append('<p>es5 inner get Name : ' + inner.getName() + '</p>');
    })();
    
    (function() {
        this.name = 'outer';
        var inner = {
            name: 'inner',
            getName: () => {
                return this.name;
            }
        }
        result.append('<p>es6 inner get Name : ' + inner.getName() + '</p>');
    })();
});