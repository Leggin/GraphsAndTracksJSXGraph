
const startX = 0;
const startY = -7;
const sliderMin = -8;
const sliderMax = 8;
var animationActive = false;

// init board
var board = JXG.JSXGraph.initBoard('jxgbox', { boundingbox: [-10, 25, 10, -35], keepaspectratio: true, axis: false, showNavigation: false, showCopyright: false, });

//---animation start slider --------------------------------------
var sliderStartAnimation = board.create('slider', [[-5 + startX, 28 + startY], [5 + startX, 28 + startY], [-1, 0, 1]], {
    snapWidth: 1, withLabel: false, size: 14, strokeWidth: 4, strokeColor: '#ff9999', highlightStrokeColor: '#ff9999', highlightFillColor: '#ffe6e6', baseline: {
        strokeColor: '#4d4d4d',
        fillColor: '#d9d9d9'
    },
    highline: {
        strokeColor: '#666666',
        fillColor: '#d9d9d9'
    }
});
board.create('text', [3 + startX, 26 + startY, 'start'], { strokeOpacity: 0.5, fontSize: 20, fixed: true, strokeColor: '#cccccc' });
board.create('text', [-7 + startX, 26 + startY, 'stop'], { strokeOpacity: 0.5, fontSize: 20, fixed: true, strokeColor: '#cccccc' });
// ----------------------------------------------------------------

// --- controll start and stop of animation with slider values ----
var startAnimationPoint = board.create('point', [
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
// ------------------------------------------------------------------

// --- position slider ----------------------------------------------
var sliderBallPosition = board.create('slider', [[0.5 + startX, 20 + startY], [99.5 + startX, 20 + startY], [0.5, 0, 99.5]], {
    withLabel: false, size: 14, strokeWidth: 4, strokeColor: '#b3d1ff', fillColor: '#cce0ff', baseline: {
        strokeColor: '#4d4d4d',
        fillColor: '#d9d9d9'
    },
    highline: {
        strokeColor: '#666666',
        fillColor: '#d9d9d9'
    }
});
// -------------------------------------------------------------------

// --- init sliders for plane heights ---
var slider1 = board.create('slider', [[startX, startY - 10], [startX, startY - 20], [sliderMax, 8, sliderMin]], sliderProperties);
var slider2 = board.create('slider', [[startX + 20, startY - 10], [startX + 20, startY - 20], [sliderMax, -8, sliderMin]], sliderProperties);
var slider3 = board.create('slider', [[startX + 40, startY - 10], [startX + 40, startY - 20], [sliderMax, -8, sliderMin]], sliderProperties);
var slider4 = board.create('slider', [[startX + 60, startY - 10], [startX + 60, startY - 20], [sliderMax, 0, sliderMin]], sliderProperties);
var slider5 = board.create('slider', [[startX + 80, startY - 10], [startX + 80, startY - 20], [sliderMax, 0, sliderMin]], sliderProperties);
var slider6 = board.create('slider', [[startX + 100, startY - 10], [startX + 100, startY - 20], [sliderMax, 8, sliderMin]], sliderProperties);
// ------------------------------------------------------------------

// --- init of planes -----------------------------------------------
var lines = [];
lines.push(board.create('line', [[startX, function () { return slider1.Value() + startY }], [startX + 20, function () { return slider2.Value() + startY }]], { lineCap: 'round', straightFirst: false, straightLast: false, strokeWidth: 4, strokeColor: '#737373' })); // inclined plane
lines.push(board.create('line', [[startX + 20, function () { return slider2.Value() + startY }], [startX + 40, function () { return slider3.Value() + startY }]], { lineCap: 'round', straightFirst: false, straightLast: false, strokeWidth: 4, strokeColor: '#737373' })); // inclined plane
lines.push(board.create('line', [[startX + 40, function () { return slider3.Value() + startY }], [startX + 60, function () { return slider4.Value() + startY }]], { lineCap: 'round', straightFirst: false, straightLast: false, strokeWidth: 4, strokeColor: '#737373' })); // inclined plane
lines.push(board.create('line', [[startX + 60, function () { return slider4.Value() + startY }], [startX + 80, function () { return slider5.Value() + startY }],], { lineCap: 'round', straightFirst: false, straightLast: false, strokeWidth: 4, strokeColor: '#737373' })); // inclined plane
lines.push(board.create('line', [[startX + 80, function () { return slider5.Value() + startY }], [startX + 100, function () { return slider6.Value() + startY }]], { lineCap: 'round', straightFirst: false, straightLast: false, strokeWidth: 4, strokeColor: '#737373' })); // inclined plane
// -------------------------------------------------------------------

//init ball
var ball = new Ball(startX + 5, 5, lines);

// --- point to control start position of ball ---
var startAnimationPoint = board.create('point', [
    () => {
        if (!animationActive)
            ball.setXPosition(sliderBallPosition.Value());
        return 0;

    }, 0], { visible: false });
// ------------------------------------------------------------------

// --- slider for start velocity ------------------------------------
var sliderVelocity = board.create('slider', [[startX + 10, startY - 25], [startX + 90, startY - 25], [-1, 0, 1]], {
    suffixLabel: 'start velocity = ', size: 14, baseline: {
        strokeColor: '#4d4d4d',
        fillColor: '#d9d9d9'
    },
    highline: {
        strokeColor: '#666666',
        fillColor: '#d9d9d9'
    }, strokeWidth: 3, strokeColor: '#737373', highlightStrokeColor: '#d9d9d9', highlightFillColor: '#d9d9d9'
});
// ------------------------------------------------------------------

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
