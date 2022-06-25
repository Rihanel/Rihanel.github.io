class Robot {
    constructor(x, y, i) {
        this.x = x
        this.y = y
        this.i = i
        this.vel = 0

        this.rand  = int(random(1, 2))
        if(this.rand == 1) {
            this.vel = 1
        } else {
            this.vel = -1
        }

        this.fire = false
        this.sl = false
        this.sr = false
        this.down = false
    }
    display() {
        ellipse(this.x, this.y, 50, 50)
    }

    move() {
        if (cctv[this.i].sense = true) {
            if(kurly.x > this.x) {
                this.x += 4
            }
            if(kurly.x < this.x) {
                this.x -= 4
            }
        }
        if (cctv[this.i].sense = true) {
            this.x += this.vel
        }
    }

    shot() {
        if (cctv[this.i].sense = true) {
            if(this.fire == false) {
                bullet[this.i].Aim()
                this.fire = true
            }

            if(this.fire == true) {
                bullet[this.i].display()
                bullet[this.i].shot()
            }
        }
    }

    turn() {
        if (this.sl == true || this.sr == true) {
            this.vel *= -1
        }
    }

    stun() {
        if (cctv[this.i].down == true) {
            this.down = true
        } 
    }
}

class CCTV {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.sense = false
        this.dist = 0
        this.down = false
    }

    display() {
        arc(this.x, this.y,  50, 50, 0, PI)
    }
    
    searching() {
        push()
        noStroke()
        fill(255, 0, 0, 50)
        arc(this.x, this.y,  500, 500, 0, PI)
        pop()
    }

    warning() {
        this.dist = dist(this.x, this.y, kurly.x, kurly.y)
        if (this.dist <= 500 && this.y > kurly.y) {
            this.sense = true
        } else {
            this.sense = false
        }
    }

    destroy() {
        if (this.dist <= 0 && Go == true) {
            this.down = true
        }
    }
}

class Bullet {
    constructor(i) {
        this.i = i

        this.x
        this.y
        this.x1
        this.y1
        this.x2
        this.y2
        this.dx
        this.dy
        this.rad
        this.locX
        this.locY

        this.Hit = false
        this.dist = 0
        this.HitTime =0
        this.speed = 10

        this.down = false
        this.sl = false
        this.sr = false
        this.sd = false
        this.su = false
    }
    
    display() {
        ellipse(this.x, this.y, 8, 8)
    }

    Aim() {
        this.x1 = robot[this.i].x
        this.y1 = robot[this.i].y
        this.x2 = kurly.x
        this.y2 = kurly.y
        this.dy = this.y2 - this.y1
        this.dx = this.x2 - this.x1
        this.rad = atan2(this.dy,this.dx)
        this.locX=(this.speed*cos(this.rad));
        this.locY=(this.speed*sin(this.rad));
    }

    shot() {
        this.x += this.locX
        this.y += this.locY
    }

    disappear() {
        if (this.sl == true || this.sr == true || this.sd == true || this.su == true ) {
            this.down = true
        } else {
            this.down = false
        }
    }

    hit() {
        this.dist = dist(this.x, this.y, kurly.x, kurly.y)
        if (this.dist <= 0) {
            this.down = true
            this.Hit = true
        }
        if (this.Hit == true && this.HitTime <= 20) {
            this.HitTime++
            kurly.slow = true
        } else {
            this.down = false
            this.Hit = false
            this.HitTime = false
            kurly.slow = false
        }
    }
}