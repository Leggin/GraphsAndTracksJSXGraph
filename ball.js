class Ball {
    constructor(x, y, lines) {
        this.centerPoint = board.create('point', [x, y]); //center of vall
        this.circle = board.create('circle', [this.centerPoint, 2]); // ball drawing

        this.acceleration = { x: 0, y: 0 } // acceleration vector
        this.velocity = { x: 0, y: 0 } // velocity vector 
        this.groundLines = lines;
    }

    applyForce(force) {
        this.acceleration.x += force.x;
        this.acceleration.y += force.y;
    }

    update(slope) {
      //  this.applyForce({ x: -0.081 * slope, y: -0.081 }); // apply gravity

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
        let line = this.getCurrentLine();
        let newy = y;
        if (line) {
            let vertical = board.create('line', [[x, y + 20], [x, y]], { visible: true });
            let verticalP = board.create('intersection', [line, vertical], { visible: true });

            if (y - this.circle.Radius() < verticalP.Y()) {
                newy = verticalP.Y() + this.circle.Radius() + Math.abs(Math.sin(line.getAngle())) * (this.circle.Radius() / Math.PI);
            }
            board.removeObject(vertical);
            board.removeObject(verticalP);
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
        return NaN;
    }

    isCurrentlyAbove(line) {
        if (line.point1.X() < this.centerPoint.X() && line.point2.X() > this.centerPoint.X()) {
            return true;
        }
        return false;
    }

    start() {
        this.centerPoint.moveAlong(this.movingFunction, 1000);
    }

    movingFunction(x) {
        if (x > 12000) return NaN;

        let slope = ball.getSlope();
        ball.applyForce({ x: -0.081 * slope, y: -0.081 }); // apply gravity

        ball.plotData(x);
        let newPos = ball.update(); //get updated motion
        
        return newPos;
    }

    plotData(time) {   
        console.log(this.centerPoint.X());
         
        updatePlot(time, this.centerPoint.X(), this.velocity.x, this.acceleration.x)
    }
}