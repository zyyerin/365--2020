const canvas = document.querySelector('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight/2;

const c = canvas.getContext('2d');
const w = canvas.width;
const h = canvas.height;

const numberOfCircles = 32;
const maxRadius = 50;

// keep track of the score
var xHitCount = 0, yHitCount = 0;

// spawn the circles from the same locations
const x = Math.random() * w/2 + maxRadius;
const y = Math.random() * h/2 + maxRadius;

// create an array of circles
let circles = [];
for (let i=0; i<numberOfCircles; i++) {
  let r = Math.random() * maxRadius;
  let speed = Math.random() * 10;
  let nor = Math.floor( Math.random() * 50);
  circles.push(new Circle(r, x, y, speed, nor));
}

animate();


// functions
function animate() {

  requestAnimationFrame(animate);
  c.clearRect(0, 0, w, h);

  for (let i=0; i<circles.length; i++) {
    circles[i].update();
  }

  // captions
  document.getElementById('title').innerHTML = 'an array of '+numberOfCircles+' moving circles';
  document.getElementById('date').innerHTML = '2020-04-21';
  document.getElementById('score').innerHTML = xHitCount + yHitCount;
}

// objects
function Circle(r, x, y, speed, numberOfRings) {
  this.x = x;
  this.y = y;
  this.xv = (Math.random()-0.5) * speed;
  this.yv = (Math.random()-0.5) * speed;
  this.r = r;

  this.draw = function() {
    for (let i=0; i<numberOfRings; i++) {
      c.beginPath();
      c.arc(this.x, this.y, this.r/(i+1), 0, Math.PI * 2, false);
      c.strokeStyle = "rgba(0, 0, 0, 0.25)";
      c.stroke();
    }
  }

  this.update = function() {
    if (this.x > w - this.r || this.x < this.r) {
      this.xv *= -1;
      xHitCount ++;
    }
    if (this.y > h - this.r || this.y < this.r) {
      this.yv *= -1;
      yHitCount ++;
    }
    this.x += this.xv;
    this.y += this.yv;

    this.draw();
  }
}
