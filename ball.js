class Ball {
    constructor(x, y, lines) {
        this.centerPoint = board.create('point', [x, y], { visible: false }); //center of ball
        this.circle = board.create('circle', [this.centerPoint, 1.5], { strokeWidth: 4, strokeColor: '#80b3ff', fillColor: '#b3d1ff' }); // ball drawing

        this.acceleration = { x: 0, y: 0 } // acceleration vector
        this.velocity = { x: 0, y: 0 } // velocity vector 
        this.groundLines = lines;
        this.animationActive = false;

        this.vp1 = board.create('point', [x, y], { visible: false });
        this.vp2 = board.create('point', [x, 20], { visible: false });
        this.lp1 = board.create('point', [0, 0], { visible: false });
        this.lp2 = board.create('point', [21, 0], { visible: false });

        this.vertical = board.create('line', [this.vp1, this.vp2], { visible: false });
        this.line = board.create('line', [this.lp1, this.lp2], { visible: false });
        this.verticalP = board.create('intersection', [this.line, this.vertical], { visible: false });
        this.movingFunction = this.movingFunction.bind(this);
    }

    applyForce(force) {
        if (this.getCurrentLine() === null) {
            return;
        };
        this.acceleration.x += force.x;
        this.acceleration.y += force.y;
    }

    update(slope) {
        if (this.getCurrentLine() === null) return NaN;

        this.velocity.x += this.acceleration.x;
        this.velocity.y += this.acceleration.y;

        this.acceleration.x = 0;
        this.acceleration.y = 0;

        let x = this.centerPoint.X() + this.velocity.x;
        let y = this.centerPoint.Y() + this.velocity.y;

        y = this.getYBound(x + this.velocity.x, y);
        return [x, y]
    }

    // get y value for new ball position if ball is below current line
    getYBound(x, y) {
        let currentLine = this.getCurrentLine();
        let newY = y;

        if (currentLine) {
            this.lp1.setPosition(JXG.COORDS_BY_USER, [currentLine.point1.X(), currentLine.point1.Y()]);
            this.lp2.setPosition(JXG.COORDS_BY_USER, [currentLine.point2.X(), currentLine.point2.Y()]);
            this.vp1.setPosition(JXG.COORDS_BY_USER, [x, y + 200]);
            this.vp2.setPosition(JXG.COORDS_BY_USER, [x, y]);

            let alpha = ((this.circle.Radius() / Math.abs(Math.cos(this.line.getAngle()))) - this.circle.Radius());

            let yTemp = this.verticalP.Y() + this.circle.Radius() + alpha;
            if (y < yTemp) {

                newY = yTemp;
            }
        }
        this.velocity.y = 0;
        return newY;
    }

    // return the angle of the current line
    getSlope() {
        let currentLine = this.getCurrentLine();
        if (currentLine) {
            return Math.sin(currentLine.getAngle());
        }
        return 1;
    }

    // return the line where the ball currently is
    getCurrentLine() {
        for (let line of this.groundLines) {
            if (this.isCurrentlyAbove(line)) {
                return line;
            }
        }
        this.stop();
        return null;
    }

    // check if the ball is over or under line
    isCurrentlyAbove(line) {
        if (line.point1.X() <= this.centerPoint.X() && line.point2.X() >= this.centerPoint.X()) {
            return true;
        }
        return false;
    }

    // start animation
    start(velocity) {
        resetPlots();
        this.animationActive = true;
        this.velocity.x = velocity;
        this.centerPoint.moveAlong(this.movingFunction, 0, { callback: animationFinished });
    }

    // stop animation
    stop() {
        this.animationActive = false;
    }

    movingFunction(x) {
        if (x > 12000 || !this.animationActive) return NaN;
        if(this.getCurrentLine() === null) return NaN;
        let slope = this.getSlope();
        this.applyForce({ x: 0, y: -0.981 }); // apply gravity
        let downhillForce = -0.0981 * slope;

        this.applyForce({ x: downhillForce, y: 0 }); // apply Downhill force
        this.plotData(x);
        let newPos = this.update(); //get updated motion

        return newPos;
    }

    plotData(time) {
        updatePlot(time, this.centerPoint.X(), this.velocity.x, this.acceleration.x, this.centerPoint.Y(), this.acceleration.y, this.velocity.y);
    }

    // position set by the slider
    setXPosition(newX) {
        this.centerPoint.setPosition(JXG.COORDS_BY_USER, [newX, -200]);
        let newY = this.getYBound(this.centerPoint.X(), this.centerPoint.Y());
        this.centerPoint.setPosition(JXG.COORDS_BY_USER, [newX, newY]);
    }
}

function round(value, exp) {
    if (typeof exp === 'undefined' || +exp === 0)
        return Math.round(value);

    value = +value;
    exp = +exp;

    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0))
        return NaN;

    // Shift
    value = value.toString().split('e');
    value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));

    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp));
}