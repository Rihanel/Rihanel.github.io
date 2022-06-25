class Player {
    constructor(px, py) {
        this.x = px
        this.y = py
        this.w = 50
        this.h = 75
        this.player = PlayerStand
        this.slow = false
    }
    display() {
        push()
        imageMode(CENTER)
        image(this.player, this.x, this.y, this.w, this.h)
        pop()
    }

    gravity() {
        if ((psd == false) && (Go == false)) {
            this.y += fall;
        }

        if (psd == false) {
            if (fall < 24) {
              fall += gravity
            } else {
              fall = 24
            }
          } else {
            fall = 1.0
        }
    }

    jump() {
        //make jump variable height
        if (keyIsDown(32) && ClimbTime < 24 && psd == true && Go == false && psu == false && float == false) {
            fly = true
            ClimbTime++
            FloatTime = ClimbTime/3
        } else {
            fly = false
            ClimbTime = 0
        }

        //make jump natural
        if(ClimbTime == 1) {
            climb = 15.0
        }
        
          if(fly == true) {
            climb -= ClimbAcc
        }
        
        //jump
        if((psu == false) && keyIsDown(32) && (fly == true) && (float == false) && Go == false) {
            this.y -= climb;
        }

        //floating
        if(fly == false && psu == false && Go == false){
            float = true
        }
        if (float == true && FloatTime > 0) {
            FloatSpd--
            this.y -= FloatSpd
            FloatTime--
        } else {
            float = false
            FloatSpd = climb
        }
    }

    move() {
        if(Go == false) {
            this.x += speed
        }
        if (speed < 0.4 && speed > -0.4) {
            speed = 0
        }

        if (this.slow == true) {
            if (speed < -3) {
                speed = -3
            }
            if (speed > 3) {
                speed = 3
            }
        }

        if(keyIsDown(65) && (psl == false) && Go == false) {
            if (speed > -12) {
                speed -= acc
              } else if (speed <= -12) {
                speed = -12
              }
        } else if (psl == true) {
            speed = 0
        } else if (speed < 0){
            speed += acc
        } else {
            this.player = PlayerStand
        }

        if(keyIsDown(68) && (psr == false) && Go == false) {
            if (speed < 12) {
                speed += acc
              } else if (speed >= 12) {
                speed = 12
              }
        } else if (psr == true) {
            speed = 0
        } else if (speed > 0){
            speed -= acc
        } else {
            this.player = PlayerStand
        }

        if(keyIsDown(68) && keyIsDown(65)) {
            this.player = PlayerStand
            if (speed <= 0){
                speed += acc
            }
            if (speed >= 0){
                speed -= acc
            }
        }
    }

    Dash() {
        if (ready == true) {
            dash.display()
            DashX = 30 * cos(dash.rad)
            DashY = 30 * sin(dash.rad)
        }

        if (psd == true || psu == true || psr == true || psl == true) {
            fresh = false
            Go = false
        }

        if (Go == true) {
            this.x += DashX
            this.y += DashY
            GoTime++
        }
        
        if (GoTime == 10){
            Go = false
            GoTime = 0
            fresh = true
        }

        if (fresh == true) {
            if (DashX <= 0.4 && DashX >= -0.4) {
                DashX = 0
            } else {
                if (DashX > 0) {
                    DashX -= 0.4
                    this.x += DashX
                }
                if (DashX < 0) {
                    DashX += 0.4
                    this.x += DashX
                }
            }

            if (DashY <= 1 && DashY >= -1) {
                DashY = 0
            } else {
                if (DashY > 0) {
                    DashY -= 1
                    this.y += DashY
                }
                if (DashY < 0) {
                    DashY += 1
                    this.y += DashY
                }
            }
        }
    }

    show() {
        if (keyIsDown(65)) {
            LChangeTime++
            if (LChangeTime > 20) {
                LChangeTime = 0
            } else if (LChangeTime > 10) {
                this.player = PlayerRunLeft2
            } else if (LChangeTime > 0) {
                this.player = PlayerRunLeft1
            }
        } else {
            LChangeTime = 0
        }

        if (keyIsDown(68)) {
            RChangeTime++
            if (RChangeTime > 20) {
                RChangeTime = 0
            } else if (RChangeTime > 10) {
                this.player = PlayerRunRight2
            } else if (RChangeTime > 0) {
                this.player = PlayerRunRight1
            }
        } else {
            RChangeTime = 0
        }


    }
}

class DashBall {
    constructor() {
        this.x
        this.y
        this.dx
        this.dy
        this.rad
    }
    
    display() {
        this.dx = kurly.x - mouseX
        this.dy = kurly.y - mouseY
        this.rad = atan2(this.dy, this.dx)

        this.x = kurly.x + cos(this.rad) * 75
        this.y = kurly.y + sin(this.rad) * 75
        push()
        noStroke()
        fill(0, 255, 0)
        ellipse(this.x, this.y, 5, 5)
        pop()
    }
}