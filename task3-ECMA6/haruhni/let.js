"user strict";
/*
 * 블럭 스코프를 위한 키워드.
 */
$(function() {
    var result = $('.result-view');
    
    result.append('<p>hoisting</p>');
    (function() {
        /*
         * hoisting
         * 실행 시 변수의 위치와 상관없이 상단으로 hoist 된다.
         * 이때, undefined 값이 할당 된다.
         */
        if (false) {
            var log = 'hi';
        }
        
        result.append('<p>' + log + '</p>');
    })();
    
    result.append('<p>let block scope</p>');
    (function() {
        /*
         * block scope
         * if 문 안에서 만 사용이 가능한 log 변수
         */
        if (false) {
            let log = 'hi';
        }
        try {
            result.append('<p>' + log + '</p>');
        } catch(exception) {
            result.append('<p>' + exception.message + '</p>');
        }
    })();
    
    result.append('<p>es5 closure 와 scope</p>');
    (function() {
        var handlers = [];
        for (var i=0; i<3; i++) {
            handlers[i] = function() {
                result.append('<p>' + i + '</p>');
            }
        }

        $.each(handlers, function(index, value) {
            value();
        })
    })();
    
    result.append('<p>es5 closure 해결</p>');
    (function() {
        var handlers = [];
        for (var i=0; i<3; i++) {
            (function(i) {
                handlers[i] = function() {
                result.append('<p>' + i + '</p>');
            }
            })(i);
        }

        $.each(handlers, function(index, value) {
            value();
        })
    })();
    
    /*
    (function() {
        var handlers = [];
        for (var i=0; i<3; i++) {
            (function() {
                var newI = i;
                handlers[newI] = function() {
                result.append('<p>' + newI + '</p>');
            }
            })();
        }

        $.each(handlers, function(index, value) {
            value();
        })
    })();
    */
    
    result.append('<p>es6 let</p>');
    (function() {
        var handlers = [];
        for (let i=0; i<3; i++) {
            handlers[i] = function() {
                result.append('<p>' + i + '</p>');
            }
        }

        $.each(handlers, function(index, value) {
            value();
        })
    })();
    
    result.append('<p>var vs let</p>');
    (function() {
        var a = 5;
        var b = 10;

        if (a === 5) {
            let a = 4;
            var b = 1;
            result.append('<p>' + a + '</p>');
            result.append('<p>' + b + '</p>');
        }

        result.append('<p>' + a + '</p>');
        result.append('<p>' + b + '</p>');
    })();
});
