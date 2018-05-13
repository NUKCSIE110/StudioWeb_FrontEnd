var x = 0;
var y = 0;
var x_ = 0;
var y_ = 0;

function fern(xf, yf) {
  stroke('hsla(127, 57%, 41%, 0.5)');
  fill(color('hsla(127, 57%, 41%, 0.5)'));
  ellipse((100 * xf + 500), (100 * (-yf) + 1200), 3);
  //point((100 * xf + 500), (100 * (-yf) + 1200));
}


function setup() {
    createCanvas(800, 1500);
    //generator();
}

function draw() {
    prob = (Math.random() * 100);
    if (prob < 83) {
        x_ = x * 0.86 + y * 0.03;
        y_ = x * (-0.03) + y * 0.86 + 1.5;
        fern(x, y);
    }
    else if (prob < 91) {
        x_ = x * 0.2 + y * (-0.25);
        y_ = x * 0.21 + y * 0.23 + 1.5;
        fern(x, y);
    }
    else if (prob < 99) {
        x_ = x * (-0.15) + y * 0.27;
        y_ = x * 0.25 + y * 0.26 + 0.45;
        fern(x, y);
    }
    else{
        x_ = 0;
        y_ = y * 0.17;
        fern(x, y);
    }
      x = x_;
      y = y_;
}
