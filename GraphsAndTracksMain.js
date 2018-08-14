var board = JXG.JSXGraph.initBoard('jxgbox', { boundingbox: [-50, 25, 50, -25] /*,axis:true*/ });




var line1 = board.create('line', [[-50, -1], [-30, -10]], { straightFirst: false, straightLast: false, strokeWidth: 2 }); // inclined plane
var line2 = board.create('line', [[-30, -10], [0, -8]], { straightFirst: false, straightLast: false, strokeWidth: 2 }); // inclined plane
var line3 = board.create('line', [[0, -8], [80, 2]], { straightFirst: false, straightLast: false, strokeWidth: 2 }); // inclined plane

var lines = [];
lines.push(line1);
lines.push(line2);
lines.push(line3);


var ball = new Ball(-45, 5, lines); // ball object
ball.start();

