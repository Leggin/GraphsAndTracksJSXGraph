class Ball {
    constructor(x, y, lines) {
        this.centerPoint = board.create('point', [x, y], { visible: false }); //center of ball
        this.circle = board.create('circle', [this.centerPoint, 1.5], { strokeWidth: 4, strokeColor: '#d9d9d9', fillColor: '#f2f2f2' }); // ball drawing

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
    }

    applyForce(force) {
        this.acceleration.x += force.x;
        this.acceleration.y += force.y;
    }

    update(slope) {
        this.velocity.x += this.acceleration.x;
        this.velocity.y += this.acceleration.y;

        this.acceleration.x = 0;
        this.acceleration.y = 0;

        let x = this.centerPoint.X() + this.velocity.x;
        let y = this.centerPoint.Y() + this.velocity.y;

        y = this.getYBound(x, y);
        return [x, y]
    }

    getYBound(x, y) {
        let currentLine = this.getCurrentLine();


        let newy = y;

        if (currentLine) {
            this.lp1.setPosition(JXG.COORDS_BY_USER, [currentLine.point1.X(), currentLine.point1.Y()]);
            this.lp2.setPosition(JXG.COORDS_BY_USER, [currentLine.point2.X(), currentLine.point2.Y()]);
            this.vp1.setPosition(JXG.COORDS_BY_USER, [x, y + 20]);
            this.vp2.setPosition(JXG.COORDS_BY_USER, [x, y]);

            if (y - this.circle.Radius() < this.verticalP.Y()) {
                newy = this.verticalP.Y() + this.circle.Radius() + Math.abs(Math.sin(this.line.getAngle())) * (this.circle.Radius()*this.circle.Radius() / Math.PI);
                this.velocity.y = -0.0981;
            }
            //board.removeObject(vertical);
            //board.removeObject(verticalP);
        }
        return newy;
    }

    getSlope() {
        let currentLine = this.getCurrentLine();
        if (currentLine) {
            return Math.sin(currentLine.getAngle());
        }
        return 1;
    }

    getCurrentLine() {
        for (let line of this.groundLines) {
            if (this.isCurrentlyAbove(line)) {
                return line;
            }
        }
        this.stop();
        return NaN;
    }

    isCurrentlyAbove(line) {
        if (line.point1.X() < this.centerPoint.X() && line.point2.X() > this.centerPoint.X()) {
            return true;
        }
        return false;
    }

    start(velocity) {
        resetPlots();
        this.animationActive = true;
        this.velocity.x = velocity;
        this.centerPoint.moveAlong(this.movingFunction, 0, { callback: animationFinished });
    }
    stop() {
        this.animationActive = false;
    }


    movingFunction(x) {
        if (x > 12000 || !ball.animationActive) return NaN;

        let slope = ball.getSlope();
        ball.applyForce({ x: -0.0981 * slope, y: -0.0981 }); // apply gravity
        ball.plotData(x);
        let newPos = ball.update(); //get updated motion

        return newPos;
    }

    plotData(time) {
        updatePlot(time, this.centerPoint.X(), this.velocity.x, this.acceleration.x)
    }
}