
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

    reset(name, text, bounds, backColor, strokeColor){
        this.physicsBoard = JXG.JSXGraph.initBoard(name, { boundingbox: bounds, axis: true, keepaspectratio: false });
        this.prevPoint = this.physicsBoard.create('point', [0, 0], { visible: false });
        this.strokeColor = strokeColor;
        this.physicsBoard.renderer.container.style.backgroundColor = backColor;
        let nameText = this.physicsBoard.create('text', [0, 0, text], { strokeOpacity: 0.5, fontSize: 40, fixed: true, strokeColor: '#cccccc' });
        nameText.setPosition(JXG.COORDS_BY_SCREEN, [10, 100, 70]);
    }
}

var positionPlotBoard = new PlotPhysics('jxgposplot', "Position", [-1.5, 110, 13.0, -15], '#fff2e6', '#ff7b00');
var velocityPlotBoard = new PlotPhysics('jxgvelplot', "Velocity", [-1.5, 4.0, 13.0, -4.0], '#e6ffee', '#00cc44');
var accelerationPlotBoard = new PlotPhysics('jxgaccplot', "Acceleration", [-1.5, 0.08, 13.0, -0.08], '#e6f4ff', '#0068b3');


function updatePlot(time, pos, vel, acc) {
    positionPlotBoard.plot(time, pos);
    velocityPlotBoard.plot(time, vel);
    accelerationPlotBoard.plot(time, acc);

}

function resetPlots(){
    positionPlotBoard.reset('jxgposplot', "Position", [-1.5, 110, 13.0, -15], '#fff2e6', '#ff7b00');
    velocityPlotBoard.reset('jxgvelplot', "Velocity", [-1.5, 4.0, 13.0, -4.0], '#e6ffee', '#00cc44');
    accelerationPlotBoard.reset('jxgaccplot', "Acceleration", [-1.5, 0.08, 13.0, -0.08], '#e6f4ff', '#0068b3');
}


