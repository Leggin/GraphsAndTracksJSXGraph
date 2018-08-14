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
        this.applyForce({ x: -0.081 * slope, y: -0.081 }); // apply gravity

        this.velocity.x += this.acceleration.x;
        this.velocity.y += this.acceleration.y;

        this.acceleration.x = 0;
        this.acceleration.y = 0;

        let x = this.centerPoint.X() + this.velocity.x;
        let y = this.centerPoint.Y() + this.velocity.y;

        let newPos = this.setAboveGround(x, y);
       // x = newPos[0];
        y = newPos[1];
        return [x, y]
    }

    setAboveGround(x, y) {
        let line = this.getCurrentLine();
        let newx = x;
        let newy = y;
        if (line) {
            let normal = board.create('normal', [line, [x,this.centerPoint.Y()]], { visible: true });
            let normalP = board.create('intersection', [line, normal], { visible: true });

            if (y - this.circle.Radius() < normalP.Y()) {
                newx = normalP.X() + this.circle.Radius()// Math.cos(line.getAngle());
                newy = normalP.Y() + this.circle.Radius()// Math.sin(line.getAngle());
                this.velocity.y = -0.081;
            }
            board.removeObject(normal);
            board.removeObject(normalP);
            console.log(newx,newy);
            
        }
        return [newx, newy];
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
        this.centerPoint.moveAlong(this.movingFunction, 10);
    }

    movingFunction(x) {
        if (x > 12000) return NaN;

        let slope = ball.getSlope();
        return ball.update(slope);
    }
}