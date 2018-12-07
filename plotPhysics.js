class PlotPhysics {
    constructor(name, text, bounds, backColor, strokeColor) {
        this.physicsBoard = JXG.JSXGraph.initBoard(name, { boundingbox: bounds, axis: true, keepaspectratio: false });
        this.pointList = { x: [], y: [] };
        this.strokeColor = strokeColor;
        this.physicsBoard.renderer.container.style.backgroundColor = backColor;
        let nameText = this.physicsBoard.create('text', [0, 0, text], { strokeOpacity: 0.5, fontSize: 40, fixed: true, strokeColor: '#cccccc' });
        nameText.setPosition(JXG.COORDS_BY_SCREEN, [10, 100, 70]);
        this.curve = this.physicsBoard.create('curve', [this.pointList.x, this.pointList.y], { strokeColor: this.strokeColor, strokeWidth: 3 });
    }

    plot(time, plotValue) {
        this.pointList.x.push(time / 1000);
        this.pointList.y.push(plotValue);
        this.physicsBoard.update();
    }

    reset() {
        this.pointList.x.splice(0, this.pointList.x.length);
        this.pointList.y.splice(0, this.pointList.y.length);
    }
}

var positionPlotBoard = new PlotPhysics('jxgposplot', "X-Position", [-1.5, 110, 13.0, -15], '#fff2e6', '#ff7b00');
var velocityPlotBoard = new PlotPhysics('jxgvelplot', "Velocity", [-1.5, 4.0, 13.0, -4.0], '#e6ffee', '#00cc44');
var accelerationPlotBoard = new PlotPhysics('jxgaccplot', "Acceleration", [-1.5, 0.08, 13.0, -0.08], '#e6f4ff', '#0068b3');

function updatePlot(time, pos, vel, acc, ypos, yacc, yvel) {
    positionPlotBoard.plot(time, pos);
    velocityPlotBoard.plot(time, vel);
    accelerationPlotBoard.plot(time, acc);
}

function resetPlots() {
    positionPlotBoard.reset();
    velocityPlotBoard.reset();
    accelerationPlotBoard.reset();
}


