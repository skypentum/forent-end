"user strict";

/*
 * 배열을 순회 하기 위한 for - of
 * for - in / forEach 의 단점을 보안하고 좀더 강력한 배열 순회를 위해 사용한다.
 * Array, Map, set 등 iterator 와 함께 사용하면 좀더 강력하게 사용할수있어 보인다....
 */
$(function() {
    var result = $('.result-view');
    
    var arr = [1, 2, 3, 4, 5, 6];
    for (x of arr) {
        result.append('<p> x : ' + x + '</p>');
    }
})