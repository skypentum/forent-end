$(function() {
    var displayLog = function(msg) {
        $('.result-view').append('<p>' + msg + '</p>');
    }
    
    class Student {
        constructor(name) {
            this.name = name;
        }
    }
    
    /*
    function Student(name) {
        this.name = name;
    }
    */
    
    var s1 = new Student('수지');
    displayLog(s1.name);
    
    class Person {
        constructor(name, age) {
            this.name = name;
            this.age = age
        }
        
        printProfile() {
            displayLog(this.name + ', ' + this.age);
        }
    }
    
    /*
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    
    Person.prototype.printProfile = function() {
        displayLog(this.name + ', ' + this.age);
    }
    */
    
    var p = new Person('수지', 23);
    p.printProfile();
    
    class Person2 {
        constructor(name) {
            this._name_ = name;
        }
        
        get name() {
            return this._name_;
        }
        
        set name(name) {
            this._name_ = name;
        }
    }
    
    /*
    function Person2(name) {
        this._name_ = name;
        Object.defineProperty(this, 'name', {
            get: function() { return this._name_; },
            set: function(newValue) { this._name_ = newValue; },
            enumerable: true,
            configurable: true
        });
    }
    */
    
    var p1 = new Person2('수지');
    displayLog(p1.name);
    
    class StaticStudent {
        constructor(name) {
            this.name = name;
        }
        
        static findName(student) {
            return student.name;
        }
    }
    
    /*
    function StaticStudent(name) {
        this.name = name;
    }
    
    StaticStudent.findName = function(student) {
        return student.name;
    }
    */
    
    var ss = new StaticStudent('수지');
    displayLog(StaticStudent.findName(ss));
    
    class Car {
        constructor(cc) {
            this.cc = cc;
        }
        
        printCC() {
            displayLog(this.cc);
        }
    }
    
    class CompactCar extends Car {
        constructor(name, cc) {
            super(cc);
            this.name = name;
        }
        
        printName() {
            displayLog(this.name);
        }
    }
    
    /*
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
    */
    
    var tico = new CompactCar('tico', 900);
    tico.printName();
    tico.printCC();
    
    console.log(CompactCar, tico);
});

