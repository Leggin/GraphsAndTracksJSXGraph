
class PlotPhysics {
    constructor(name, text, bounds, backColor, strokeColor) {
        this.physicsBoard = JXG.JSXGraph.initBoard(name, { boundingbox: bounds, axis: true, keepaspectratio: false });
        this.prevPoint = this.physicsBoard.create('point', [0, 0], { visible: false });
        this.strokeColor = strokeColor;
        this.physicsBoard.renderer.container.style.backgroundColor = backColor;
        let nameText = this.physicsBoard.create('text', [0, 0, text], { strokeOpacity: 0.5, fontSize: 40, fixed: true, strokeColor: '#cccccc' });
        nameText.setPosition(JXG.COORDS_BY_SCREEN, [10, 100, 70]);
    }

    plot(time, plotValue) {
        let p = this.physicsBoard.create('point', [time / 1000, plotValue], { visible: false, fixed: true });
        this.physicsBoard.create('line', [this.prevPoint, p], { lineCap: 'round', straightFirst: false, straightLast: false, fixed: true, strokeWidth: 3, strokeColor: this.strokeColor });
        this.prevPoint = p;
    }
}

var positionPlotBoard = new PlotPhysics('jxgposplot', "Position", [-1.5, 90, 13.0, -15], '#fff2e6', '#ff7b00');
var velocityPlotBoard = new PlotPhysics('jxgvelplot', "Velocity", [-1.5, 4.0, 13.0, -4.0], '#e6ffee', '#00cc44');
var accelerationPlotBoard = new PlotPhysics('jxgaccplot', "Acceleration", [-1.5, 0.05, 13.0, -0.05], '#e6f4ff', '#0068b3');

/*
var positionPlotBoard = JXG.JSXGraph.initBoard('jxgposplot', { boundingbox: [-1.5, 6, 13.0, -4.0], axis: true });
var posPointList = { x: [], y: [] };
posPointList.x.push(0);
posPointList.y.push(0);
positionPlotBoard.create('curve', [function () { return posPointList.x }, function () { return posPointList.y }], { numberPointsHigh: 100 });
var velocityPlotBoard = JXG.JSXGraph.initBoard('jxgvelplot', { boundingbox: [-1.5, 4.0, 13.0, -2.0], axis: true });
var velPointList = [];
velPointList.push(velocityPlotBoard.create('point', [0, 0], { visible: false }));

var accelerationPlotBoard = JXG.JSXGraph.initBoard('jxgaccplot', { boundingbox: [-1.5, 0.1, 13.0, -0.1], axis: true });
var accPointList = [];
accPointList.push(accelerationPlotBoard.create('point', [0, 0], { visible: false }));
*/
function updatePlot(time, pos, vel, acc) {
    positionPlotBoard.plot(time, pos);
    velocityPlotBoard.plot(time, vel);
    accelerationPlotBoard.plot(time, acc);

}

function plotPosition(time, pos) {
    let p = positionPlotBoard.create('point', [time / 1000, pos], { visible: false, fixed: true });
    posPointList.x.push(p.X());
    posPointList.y.push(p.Y());

    //positionPlotBoard.create('line', [positionPrevPoint, p], { straightFirst: false, straightLast: false, fixed: true, strokeColor: '#ff9933', strokeWidth: 3 });
    //positionPrevPoint = p;
}


function plotVelocity(time, vel) {
    //let p = velocityPlotBoard.create('point', [time / 1000, vel], { visible: false, fixed: true });
    //velocityPlotBoard.create('line', [velocityPrevPoint, p], { straightFirst: false, straightLast: false, fixed: true, strokeColor: '#00ff55', strokeWidth: 3 });
    //velocityPrevPoint = p;

}

function plotAcceleration(time, acc) {
    //let p = accelerationPlotBoard.create('point', [time / 1000, acc], { visible: false, fixed: true });
    //accelerationPlotBoard.create('line', [accelerationPrevPoint, p], { straightFirst: false, straightLast: false, fixed: true, strokeColor: '#0077cc', strokeWidth: 3 });
    //accelerationPrevPoint = p;

}