const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');

animate();

var x = Math.random() * innerWidth, y = Math.random() * innerHeight;
var xv = 20;
var yv = 20;
var radius = 5;

function animate() {

  requestAnimationFrame(animate);

  // c.clearRect(0, 0, innerWidth, innerHeight);

  for (let i=0; i<200; i++) {
    c.beginPath();
    c.arc(x, y, radius, 0, Math.PI  * 2, false);
    c.stroke();

    if (x > innerWidth-radius || x < radius) {
      xv *= -1;
      radius *= (Math.random() + 0.5);
    }
    if (y > innerHeight-radius || y < radius) {
      yv *= -1;
    }
    x += xv;
    y += yv;
  }

}
