let kurly
let px , py

let wy = 0, wFall = false, CameraUp = true

let psr = false, psl = false, psu = false, psd = false
let fly = false, float = false
let HU = false, HD = false, HL = false, HR = false
let wall = [], wallNum = 45

let ClimbAcc = 0.2, gravity = 1.2, acc = 0.4
let climb = 15.0, fall = 1.0, speed = 0, FloatSpd = 0
let ClimbTime = 0, FloatTime = 0, LChangeTime = 0, RChangeTime = 0

let dash
let ready = false, Go = false, charge = true
let DashX = 0, DashY = 0, GoTime = 0
let fresh = false

let cctv = [], robot = [], bullet = [], k = 0

let GoalIn = false

function preload() {
  PlayerStand = loadImage('media/kurlystand.png')
  PlayerRunRight1 = loadImage('media/kurlyrunright.png')
  PlayerRunRight2 = loadImage('media/kurlyrunright2.png')
  PlayerRunLeft1 = loadImage('media/kurlyrunleft.png')
  PlayerRunLeft2 = loadImage('media/kurlyrunleft2.png')
  PlayerWin = loadImage('media/winner.png')
}



function setup() {
  createCanvas(1200, 575);
  //background(220);
  frameRate(60)
  px = 100
  py = 500
  Map()
  //Robots()
  kurly = new Player(px, py);
  dash = new DashBall
}



function draw() {
  if(GoalIn == false) {
    background(200, 100, 100);
    player()
    scroll()
  }
  if(GoalIn == true) {
    background(0);
    push()
    imageMode(CENTER)
    image(PlayerWin, width/2, height/2 - 50, 400, 400)
    textAlign(CENTER)
    textSize(50)
    fill(255)
    text('Kurly finally destroy the professor\'s computer!', width/2, 500)
    pop()
  }
  //enemy()
}



function player() {
  kurly.show()
  kurly.Dash()
  PlayerStop()
  kurly.display()
  kurly.gravity()
  kurly.jump()
  kurly.move()
}

function scroll() {
  for(let i = 2; i < wallNum; i++) {
    wall[i].display()
  }
  wall[0].display()
  wall[1].display()
  Camera()
  goal()
}

function enemy() {
  for(let i = 0; i > 4; i ++) {
    cctv[i].display()
    cctv[i].searching()
    cctv[i].warning()
    cctv[i].destroy()
    cctv[i].y += wy
  }
  for(let i = 0; i > 8; i ++) {
    robot[i].display()
    robot[i].move()
    robot[i].shot()
    robot[i].turn()
    robot[i].stun()
    robot[i].y += wy
  }
  for(let i = 0; i > 8; i ++) {
    bullet[i].disappear()
    bullet[i].hit()
    bullet[i].y += wy
  }
}






function PlayerStop() {
  // true need just one block's say but false need all block's say
  HD = false
  HU = false
  HR = false
  HL = false

  for(let i = 0; i < wallNum; i++) {
    wall[i].Block(kurly)
    if (wall[i] instanceof VerWall) {
      if(wall[i].hitL == true) {
        HL = true
        psl = true        
      }
      if(wall[i].hitR == true) {
        HR = true
        psr = true
      }
    }

    if (wall[i] instanceof HorWall) {
      if(wall[i].hitD == true) {
        HD = true
        psd = true
        charge = true
        Go = false
      }
      if(wall[i].hitU == true) {
        HU = true
        psu = true
        fly = false
        Go = false
      }
    }
  }

  // gathering all wall's false
  if (HL == false) {
    psl = false
  }
  if (HR == false) {
    psr = false
  }
  if (HU == false) {
    psu = false
  }
  if (HD == false) {
    psd = false
  }

}



function Camera() {
  for(let i = 0; i < wallNum; i++) {
    if (wall[i] instanceof HorWall) {
      if (wall[i].hitD == true && wall[i].camera == true) {
        if (wall[i].y < 525) {
          CameraUp = true
        } else if (wall[i].y > 525) {
          CameraUp = false
        }
      }
    }

    if (kurly.y - 37.5 < 50) {
      wall[i].y += 5
    }

    if (kurly.y + 37.5 > 555 ) {
      wall[i].y -= 5
    }

    if (CameraUp == true) {
      wall[i].y += 5
    }
  }

  if (kurly.y - 37.5 < 50) {
    wy += 5
  }

  if (kurly.y + 37.5 > 555 ) {
    wy -= 5
  }

  if (CameraUp == true) {
    wy += 5
  }
}



function Map() {
  wall[0] = new VerWall(0, -2925, 7000)
  wall[1] = new VerWall(width, -2925, 7000)
  wall[2] = new HorWall(width/2, height - 25, width)
  wall[2].camera = true
  //first floor
  stair(3, 5, 700, height - 50, 1000, RIGHT, false)
  stair(6, 8, 1000, height - 125, 400, RIGHT, true)
  wall[9] = new VerWall(812.5, 75, 50)
  //make floor
  wall[10] = new HorWall(width/2 - 100, 100, 1000)
  wall[10].camera = true
  wall[11] = new HorWall(width/2 + 100, -350, 1000)
  wall[11].camera = true
  wall[12] = new HorWall(width/2 - 100, -800, 1000)
  wall[12].camera = true
  wall[13] = new HorWall(width/2 + 100, -1250, 1000)
  wall[13].camera = true
  wall[14] = new HorWall(width/2 - 100, -1700, 1000)
  wall[14].camera = true
  //second floor
  stair(15, 16, 875, 75, 150, LEFT, true)
  wall[17] = new VerWall(400, 50, 50) 
  wall[18] = new VerWall(100, 25, 100)
  wall[19] = new VerWall(50, 25, 100)
  stair(20, 21, 75, -25, 100, LEFT, false)
  //third floor
  wall[22] = new VerWall(350, -400, 50)
  wall[23] = new VerWall(900, -425, 100)
  stair(24, 26, 1100, -375, 300, RIGHT, false)
  //fifth floor
  wall[27] = new VerWall(350, -1300, 50)
  stair(28, 35, 800, -1275, 750, RIGHT, false)
  //forth floor
  wall[36] = new VerWall(800, -875, 100)
  stair(37, 44, 400, -825, 500, TOP, false)
}


// make stair easy
function stair(num, value, x, y, w, way, s) {
  for (i = num; i <= value; i++) {
    let j = (i-num)
    if(way == LEFT) {
      wall[i] = new HorWall(x - 25*j, y - 25*j, w - 25*j)
      wall[i].camera = s
    }
    if(way == RIGHT) {
      wall[i] = new HorWall(x + 25*j, y - 25*j, w - 25*j)
      wall[i].camera = s
    }
    if(way == TOP) {
      wall[i] = new HorWall(x, y - 25*j, w - 50*j)
      wall[i].camera = s
    }
  }
}


// make goal sign
function goal() {
  push()
  rectMode(CENTER)
  noStroke()
  fill(0)
  rect(400, -1825 + wy, 100, 200)
  pop()
  if((100 + kurly.h/2 >= (-1800 + wy - kurly.y)) && (100 + kurly.h/2 >= (kurly.y + 1800 - wy)) && (50 + kurly.w/2 >= (400 - kurly.x)) && (50 + kurly.w/2 >= (kurly.x - 400))) {
    GoalIn = true
  }
}

function Robots() {
  for (i = 0; i < 4; i++) {
    for (j = 0; j < 2; j++) {
      cctv[i] = new CCTV(width/2, -325 - 450 * i)
      robot[k] = new Robot(int(random(500, 700)), 50 - 450 * i, i)
      bullet[k] = new Bullet(k)
      k++
    }
  }
}




// it help player's dash
function mousePressed() {
  if ((mouseButton == LEFT) && (charge == true)) {
    frameRate(10)
    ready = true
  }
}

function mouseReleased() {
  if ((mouseButton == LEFT) && (ready == true)) {
    frameRate(60)
    ready = false
    charge = false
    psd = false
    float = false
    fly = false
    Go = true
  }
}