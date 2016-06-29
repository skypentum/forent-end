LibMath = {};

var sum = function(x, y) {
	return x + y;
};

var sub = function(x, y) {
	return x - y;
};

LibMath = {
	findSum: function(a, b) {
		return sum(a, b);
	},
	findSub: function(a, b) {
		return sub (a, b);
	}
};