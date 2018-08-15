
var startX = 0;
var startY = 0;
var board = JXG.JSXGraph.initBoard('jxgbox', { boundingbox: [-10, 25, 10, -35], keepaspectratio: true, axis: false });


var slider1 = board.create('slider', [[startX, -10], [startX, -20], [5, 0, -5]], { snapWidth: 1, precision: 0 });
console.log(slider1.label.position='lrt');

var slider2 = board.create('slider', [[startX + 20, -10], [startX + 20, -20], [5, 0, -5]], { snapWidth: 1, precision: 0 });
var slider3 = board.create('slider', [[startX + 40, -10], [startX + 40, -20], [5, 0, -5]], { snapWidth: 1, precision: 0 });
var slider4 = board.create('slider', [[startX + 60, -10], [startX + 60, -20], [5, 0, -5]], { snapWidth: 1, precision: 0 });
var slider5 = board.create('slider', [[startX + 80, -10], [startX + 80, -20], [5, 0, -5]], { snapWidth: 1, precision: 0 });
var slider6 = board.create('slider', [[startX + 100, -10], [startX + 100, -20], [5, 0, -5]], { snapWidth: 1, precision: 0 });


var lines = [];
lines.push(board.create('line', [[startX, function () { return slider1.Value() }], [startX + 20, function () { return slider2.Value() }]], { lineCap: 'round', straightFirst: false, straightLast: false, strokeWidth: 4, strokecolor: '#333333' })); // inclined plane

lines.push(board.create('line', [[startX + 20, function () { return slider2.Value() }], [startX + 40, function () { return slider3.Value() }]], { lineCap: 'round', straightFirst: false, straightLast: false, strokeWidth: 4, strokecolor: '#333333' })); // inclined plane
lines.push(board.create('line', [[startX + 40, function () { return slider3.Value() }], [startX + 60, function () { return slider4.Value() }]], { lineCap: 'round', straightFirst: false, straightLast: false, strokeWidth: 4, strokecolor: '#333333' })); // inclined plane
lines.push(board.create('line', [[startX + 60, function () { return slider4.Value() }], [startX + 80, function () { return slider5.Value() }],], { lineCap: 'round', straightFirst: false, straightLast: false, strokeWidth: 4, strokecolor: '#333333' })); // inclined plane
lines.push(board.create('line', [[startX + 80, function () { return slider5.Value() }], [startX + 100, function () { return slider6.Value() }]], { lineCap: 'round', straightFirst: false, straightLast: false, strokeWidth: 4, strokecolor: '#333333' })); // inclined plane



var ball = new Ball(startX + 5, 5, lines); // ball object
ball.start();

