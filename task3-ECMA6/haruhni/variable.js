"user strict";

$(function() {
    var result = $('.result-view');
    
    /*
     * array matching
     */
    var [a, b, c] = [1, 2, 3];
    result.append('<p> a : ' + a + '</p>');
    result.append('<p> b : ' + b + '</p>');
    result.append('<p> c : ' + c + '</p>');
    
    /*
     * notation
     */
    var korea = '한국', japan = '일본';
    var country = {korea, japan};
    result.append('<p> country.korea : ' + country.korea + '</p>');
    result.append('<p> country.japan : ' + country.japan + '</p>');
    
    /*
     * object matching
     */
    var car = {
        name: 'forte koup',
        age: '2009'
    };
    var {name, age} = car;
    result.append('<p> name : ' + name + '</p>');
    result.append('<p> age : ' + age + '</p>');
    
    var {name: _name, age: _age} = car;
    result.append('<p> _name : ' + _name + '</p>');
    result.append('<p> _age : ' + _age + '</p>');
    
    function testFunc(x = 10, y = 5) {
        return x * y;
    }
    result.append('<p> testFunc(5) : ' + testFunc(5) + '</p>');
    
    function testFunc2(x, ...y) {
        y.push(x);
        return y;
    }
    result.append('<p> testFunc2(1,2,3,4,5) : ' + testFunc2(1,2,3,4,5) + '</p>');
});