"user strict";

$(function() {
    var result = $('.result-view');
    
    class Shape {
        constructor(width, height) {
            this.width = width;
            this.height = height;
        }
        
        getArea() {
            return 0;
        }
        
        getType() {
            return 'Shape';
        }
    }
    
    var shape = new Shape(5, 10);
    result.append('<p> shape.getType : ' + shape.getType() + '</p>');
    
    function Es5Shape(width, height) {
        
        if (!(this instanceof Es5Shape)) {
            return new Es5Shape(width, height);
        }
        this.width = width;
        this.height = height
    }
    
    Es5Shape.prototype.getArea = function() {
        return 0;
    }
    
    Es5Shape.prototype.getType = function() {
        return 'Shape';
    }
    
    var shape2 = new Es5Shape(5, 10);
    result.append('<p> shape2.getType : ' + shape2.getType() + '</p>');
    
    class Rect extends Shape {
        constructor(width, height) {
            super(width, height);
        }
        
        getArea() {
            return this.width * this.height;
        }
        
        getType() {
            return super.getType() + ':Rect';
        }
    }
    
    var rect = new Rect(5, 5);
    result.append('<p> rect.getType : ' + rect.getType() + '</p>');
    
    
    var testShape = Es5Shape(5, 5);
    var testShape2 = Shape(5, 5);
})