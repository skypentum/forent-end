$(function() {
    /*
     * 객체를 만드는 두가지 방법
     * 1. 객체 리터럴 사용
     * 2. 생성자
     */
    
    var displayLog = function(msg) {
        $('.result-view').append('<p>' + msg + '</p>');
    }

    var student = {
        name: '수지',
        printName: function() {
            displayLog(this.name);
        }
    }
    
    student.printName();
    
    function Student(name) {
        this.name = name;
    }
    
    Student.prototype.printName = function() {
        displayLog(this.name);
    }
    
    var student1 = new Student('민호');
    student1.printName();
    
    var objTest = {
        name: '수지',
        __proto__: {
            age: 24
        }
    }
    
    displayLog(objTest.age);
    
    objTest.age = objTest.age - 20;
    
    displayLog(objTest.age);
    console.log(Object.getPrototypeOf(objTest));
    console.log(objTest);
    
    /*
     * 프로토타입 기반 프로그래밍 - 객체의 원형인 프로토타입을 이용하여 새로운 객체를 만들어내는 프로그래밍 기법이다
     * 자바스크립트의 모든 객체는 자신을 생성한 객체 원형에 대한 숨겨진 연결을 갖는다. 이때 자기 자신을 생성하기 위해 사용된 객체원형을 프로토타입이라 한다.
     * 자바스크립트에서 함수 Function 가 중요한 이유는 사용자가 정의할 수 있는 프로토타입 속성 prototype property 을 제공하는 유일한 객체
     */
    
    var fn = function() {};
    var obj = {};
    var arr = [];
    
    console.log(fn.prototype);
    console.log(obj.prototype);
    console.log(arr.prototype);
    
    /*
     * fn.prototype = {
     *    constructor : function f () {},
     *    __proto__ : Object
     * }
     */
    
    var TEST1 = function() {
        this.fn = function() {
            displayLog('hello');
        }
    };
    
    TEST1.fn = function() {
        displayLog('world');
    }
    
    var test1 = new TEST1();
    test1.fn();
    
    var TEST2 = function() {};
    TEST2.fn = function() {
        displayLog('hello');
    }
    TEST2.prototype.fn = function() {
        displayLog('world');
    }
    
    var test2 = new TEST2();
    test2.fn();
    
    
    /*
     * prototpye === 공유 / 내장 메소드
     */
    
    

    function School(name) {
        this.name = name;
    }
    
    School.prototype.printName = function() {
        displayLog(this.name);
    }
    
    function School2(name) {
        this.name = name;
        this.printName = function() {
            displayLog(this.name);
        }
    }
    
    var s1 = new School('이학교');
    s1.printName();
    
    var s2 = new School2('저학교');
    s2.printName();
    
    console.log(s1, s2);
    
    /*
     * 상속
     */
    
    function Car(cc) {
        this.cc = cc;
    }
    
    Car.prototype.printCC = function() {
        displayLog(this.cc);
    }
    
    function CompactCar(name, cc) {
        this.name = name;
        Car.call(this, cc);
    }
    
    CompactCar.prototype = new Car();
    CompactCar.prototype.constructor = CompactCar;
    CompactCar.prototype.printName = function() {
        displayLog(this.name);
    }
    
    var tico = new CompactCar('tico', 900);
    tico.printName();
    tico.printCC();
    
    console.log(CompactCar, tico);
    
    /*
     * new 강제하기
     */
    
    function NewClass(name) {
        this.name = name;
    }
    
    NewClass.prototype.getName = function() {
        return this.name;
    }
    
    /*
    function NewClass(name) {
        if (!(this instanceof NewClass)) {
            return new NewClass(name);
        }
        
        this.name = name;
    }
    
    NewClass.prototype.getName = function() {
        return this.name;
    }
    */
    
    var c1 = NewClass('hahaClass');
    displayLog(c1.getName());
    
    var c2 = new NewClass('hohoClass');
    displayLog(c2.getName());
});

