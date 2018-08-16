
const startX = 0;
const startY = 0;
const sliderMin = -8;
const sliderMax = 8;
var animationActive = false;

// init board
var board = JXG.JSXGraph.initBoard('jxgbox', { boundingbox: [-10, 25, 10, -35], keepaspectratio: true, axis: false });

//animation start slider
var sliderStartAnimation = board.create('slider', [[-5, 20], [5, 20], [-1, 0, 1]], { snapWidth: 1, withLabel: false, size: 14, strokeWidth: 4, strokeColor: '#ff9999', highlightStrokeColor: '#ff9999', highlightFillColor: '#ffe6e6' });
board.create('text', [3, 18, 'start'], { strokeOpacity: 0.5, fontSize: 20, fixed: true, strokeColor: '#cccccc' });
board.create('text', [-7, 18, 'stop'], { strokeOpacity: 0.5, fontSize: 20, fixed: true, strokeColor: '#cccccc' });

// controll start and stop of animation with slider values
var startPoint = board.create('point', [
    () => {
        if (sliderStartAnimation.Value() == 1) {
            if (animationActive == false) {
                startAnimation();
            }

        }
        else if (sliderStartAnimation.Value() == -1) {
            if (animationActive == true) {
                stopAnimation();
                resetPlots();
            }
        }
        sliderStartAnimation.setValue(0);
        return 0;

    }, 0], { visible: false });



// init sliders for plane heights
var slider1 = board.create('slider', [[startX, -10], [startX, -20], [sliderMax, 0, sliderMin]], sliderProperties);
var slider2 = board.create('slider', [[startX + 20, -10], [startX + 20, -20], [sliderMax, 0, sliderMin]], sliderProperties);
var slider3 = board.create('slider', [[startX + 40, -10], [startX + 40, -20], [sliderMax, 0, sliderMin]], sliderProperties);
var slider4 = board.create('slider', [[startX + 60, -10], [startX + 60, -20], [sliderMax, 0, sliderMin]], sliderProperties);
var slider5 = board.create('slider', [[startX + 80, -10], [startX + 80, -20], [sliderMax, 0, sliderMin]], sliderProperties);
var slider6 = board.create('slider', [[startX + 100, -10], [startX + 100, -20], [sliderMax, 0, sliderMin]], sliderProperties);

// init of planes
var lines = [];
lines.push(board.create('line', [[startX, function () { return slider1.Value() }], [startX + 20, function () { return slider2.Value() }]], { lineCap: 'round', straightFirst: false, straightLast: false, strokeWidth: 4, strokeColor: '#737373' })); // inclined plane
lines.push(board.create('line', [[startX + 20, function () { return slider2.Value() }], [startX + 40, function () { return slider3.Value() }]], { lineCap: 'round', straightFirst: false, straightLast: false, strokeWidth: 4, strokeColor: '#737373' })); // inclined plane
lines.push(board.create('line', [[startX + 40, function () { return slider3.Value() }], [startX + 60, function () { return slider4.Value() }]], { lineCap: 'round', straightFirst: false, straightLast: false, strokeWidth: 4, strokeColor: '#737373' })); // inclined plane
lines.push(board.create('line', [[startX + 60, function () { return slider4.Value() }], [startX + 80, function () { return slider5.Value() }],], { lineCap: 'round', straightFirst: false, straightLast: false, strokeWidth: 4, strokeColor: '#737373' })); // inclined plane
lines.push(board.create('line', [[startX + 80, function () { return slider5.Value() }], [startX + 100, function () { return slider6.Value() }]], { lineCap: 'round', straightFirst: false, straightLast: false, strokeWidth: 4, strokeColor: '#737373' })); // inclined plane


//init ball
var ball = new Ball(startX + 5, 5, lines);

//slider for start velocity
var sliderVelocity = board.create('slider', [[startX + 10, startY - 30], [startX + 90, startY - 30], [-1, 0, 1]], { suffixLabel: 'start velocity = ', size: 8, strokeWidth: 3, strokeColor: '#737373', highlightStrokeColor: '#d9d9d9', highlightFillColor: '#d9d9d9' });

function startAnimation() {
    animationActive = true;
    ball.start(sliderVelocity.Value()); // start ball animation
}
function stopAnimation() {
    animationFinished()
    ball.stop(); // start ball animation
}

function animationFinished() {
    animationActive = false;
}
