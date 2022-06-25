class HorWall {
    constructor(x, y, w) {
        this.x = x
        this.y = y
        this.w = w
        this.h = 50
        this.hitU
        this.hitD
        this.camera = false
    }
    display() {
      push()
      rectMode(CENTER)
      noStroke()
      fill(255, 125, 0)
      rect(this.x, this.y, this.w, this.h)
      pop()
    }

    Block(it) {
      if ((this.h/2 + it.h/2 >= (this.y - it.y)) && (0 <= (this.y - it.y)) && (this.w/2 + it.w/2 >= (it.x - this.x)) && (this.w/2 + it.w/2 >= (this.x - it.x))) {
        it.y = this.y - (this.h/2 + it.h/2)
        this.hitD = true
        it.sd = true
      } else if (fly == false && float == false) {
        this.hitD = false
        it.sd = false
      }

      if ((this.h/2 + it.h/2 >= (it.y - this.y)) && (0 <= (it.y - this.y)) && (this.w/2 + it.w/2 >= (it.x - this.x)) && (this.w/2 + it.w/2 >= (this.x - it.x))) {
        it.y = this.y + (this.h/2 + it.h/2)
        this.hitU = true
        it.su = true
      } else {
        this.hitU = false
        it.su = false
      }
    }
}



class VerWall {
    constructor(x, y, h) {
        this.x = x
        this.y = y
        this.w = 50
        this.h = h
        this.hitL
        this.hitR
    }
    display() {
      push()
      rectMode(CENTER)
      noStroke()
      fill(100)
      rect(this.x, this.y, this.w, this.h)
      pop()
    }
    
    Block(it) {
      if ((this.w/2 + it.w/2 > (it.x - this.x)) && (0 <= (it.x - this.x)) && (this.h/2 + it.h/2 >= (it.y - this.y)) && (this.h/2 + it.h/2 >= (this.y - it.y))) {
        it.x = this.x + (this.w/2 + it.w/2)
        this.hitL = true
        it.sl = true
      } else {
        this.hitL = false
      }

      if ((this.w/2 + it.w/2 > (this.x - it.x)) && (0 <= (this.x - it.x)) && (this.h/2 + it.h/2 >= (it.y - this.y)) && (this.h/2 + it.h/2 >= (this.y - it.y))) {
        it.x = this.x - (this.w/2 + it.w/2)
        this.hitR = true
        it.sr = true
      } else {
        this.hitR = false
      }
    }
}