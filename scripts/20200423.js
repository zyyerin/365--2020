const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight/2;
let w = canvas.width;
let h = canvas.height;

let mouse = {
  x: undefined,
  y: undefined
}
let symbols = [
  '\uf1c0',
  '\uf1c0',
  '\uf03d',
  '\uf075',
  '\uf1ab',
  '\uf025',
  '\uf036',
  '\uf017',
  '\uf124',
  '\uf130'
];

let senario = 1;

let margin = 20;
let xstep = 40;
let ystep = 40;
let iconSize = 20;

let icons;
init();
function init() {
  icons = [];
  for (let x=margin; x<w; x+=xstep) {
    for (let y=margin*2.5; y<h; y+=ystep) {
      let index;
      if (senario == 1) {
        index = 0;
      } else {
        index = Math.floor(Math.random() * symbols.length);
      }
      icons.push(new Icon(x, y, iconSize, index));
    }
  }



}

function Icon(x, y, s, i) {
  this.x = x;
  this.y = y;
  this.s = s;
  this.i = i;
  this.fill = Math.random() * 0.25 + 0.1;

  this.draw = function() {
    c.font = this.s + 'px FontAwesome';
    // give a random fill color;
    c.fillStyle = 'rgba('
    + 0 + ','
    + 0 + ','
    + 0 + ','
    + this.fill + ')';
    c.fillText(symbols[this.i], this.x - this.s/2, this.y - this.s/2);
  }

  this.update = function() {
    // distance calculation
    const range = 50;
    const dist = Math.pow((mouse.x - this.x), 2) + Math.pow((mouse.y - this.y), 2);

    // change size on mouse move
    if(dist < range * range) {
      if (this.s < 32) {
        this.s += 2;
      }
    } else if (this.s > 20) {
      this.s -= 0.5;
    }

    this.draw();
  }

}

update();

function update() {
  requestAnimationFrame(update);
  c.clearRect(0, 0, w, h);

  for (let i=0; i<icons.length; i++) {
    icons[i].update(senario);
  }
}

// interaction
window.addEventListener('mousemove',
  function(e) {
    mouse.x = e.x;
    mouse.y = e.y - h/2;
  }
)

// switch senario based on scroll position
window.addEventListener('wheel',
  function(e) {
    console.log(senario);
    senario += 1;
    init();
}, false);
