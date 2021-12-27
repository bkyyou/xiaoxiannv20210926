// 烟花效果
var canvas = document.getElementById('my-canvas');
var context = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight * 0.8;
}

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

window.addEventListener('resize', resizeCanvas, false);
resizeCanvas();

function mouseDownHandler(e) {
  var x = e.clientX;
  var y = e.clientY;
  fire(x, y);
}
var rid;
function fire(x, y) {
  createFireworks(x, y);
  function tick() {
    context.globalCompositeOperation = 'destination-out';
    context.fillStyle = 'rgba(0, 0, 0,' + 20 / 100 + ')';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.globalCompositeOperation = 'lighter';
    drawFireworks();
    rid = requestAnimationFrame(tick);
  }
  cancelAnimationFrame(rid);
  tick();
}
var particles = [];
function createFireworks(sx, sy) {
  clearCanvas();
  particles = [];
  var hue = Math.floor(Math.random() * 51) + 150;
  var hueVariance = 30;
  var count = 365;
  for (var i = 0; i < count; i++) {
    var p = {};
    var angle = Math.floor(Math.random() * 360);
    p.radians = angle * Math.PI / 180;
    p.x = sx;
    p.y = sy;
    p.speed = (Math.random() * 5) + .4;
    p.radius = p.speed;
    p.size = Math.floor(Math.random() * 3) + 1;
    p.hue = Math.floor(Math.random() * ((hue + hueVariance) - (hue - hueVariance))) + (hue - hueVariance);
    p.brightness = Math.floor(Math.random() * 31) + 50;
    p.alpha = (Math.floor(Math.random() * 61) + 40) / 100;
    particles.push(p);
  }
}
function drawFireworks() {
  for (var i = 0; i < particles.length; i++) {
    var p = particles[i];
    var vx = Math.cos(p.radians) * p.radius;
    var vy = Math.sin(p.radians) * p.radius + 1.2;
    p.x += vx;
    p.y += vy;
    p.radius *= 1 - p.speed / 300;
    p.alpha -= 0.005;
    context.beginPath();
    context.arc(p.x, p.y, p.size, 0, Math.PI * 2, false);
    context.closePath();
    context.fillStyle = 'hsla(' + p.hue + 100 + ', 100%, ' + p.brightness + '%, ' + p.alpha + ')';
    context.fill();
  }
}
function fireRandom() {
  const x = (canvas.width * 0.7) * Math.random() + canvas.width * 0.2;
  const y = (canvas.height * 0.6) * Math.random() + canvas.height * 0.2;
  fire(x, y);
}

document.addEventListener('mousedown', mouseDownHandler, false);

// 星星效果
function Star(type) {
  this.speed = 1;
  this.star = document.createElement('div');
  this.star.className = type === 'star' ? 'star' : 'moon';
  this.star.style.top = '0px';
  this.star.style.left = Math.random() * window.innerWidth + 1 + 'px';
  document.body.appendChild(this.star);
}
Star.prototype.down = function() {
  var that = this;
  function move() {
    that.star.style.top = that.star.offsetTop + that.speed + 'px';
    if (that.star.offsetTop > window.innerHeight) {
      clearInterval(timer);
      document.body.removeChild(that.star);
    }
  }
  var timer = setInterval(move, 25);
}
let starTimer = setInterval(() => {
  new Star('star').down();
}, 300)

// 文字效果
const BASE_CONFIG = {
  // width: 50,
  // height: 50,
  ...baseSize,
  padding: 5,
  delayBetweenStrokes: 0,
  strokeAnimationSpeed: 1.3,
  showCharacter: false,
  showOutline: false,
}
const WRITER_CONFIG = {
  ...BASE_CONFIG,
  // strokeColor: '#e09037'
  strokeColor: '#FF8D8D'
};

const NAME_CONFIG = {
  ...BASE_CONFIG,
  // strokeColor: '#87db92'
  strokeColor: '#FF8D8D'
};

const getWriterList = () => {
  let writerList = [];
  writerList.push(HanziWriter.create(screentWidthFlag ? 'phone_sheng' : 'sheng', '生', WRITER_CONFIG));
  writerList.push(HanziWriter.create(screentWidthFlag ? 'phone_ri' : 'ri', '日', WRITER_CONFIG));
  writerList.push(HanziWriter.create(screentWidthFlag ? 'phone_kuai' : 'kuai', '快', WRITER_CONFIG));
  writerList.push(HanziWriter.create(screentWidthFlag ? 'phone_le' : 'le', '乐', WRITER_CONFIG));
  !screentWidthFlag && writerList.push(HanziWriter.create('ya', '吖', WRITER_CONFIG));
  writerList.push(HanziWriter.create(screentWidthFlag ? 'phone_xiao' : 'xiao', '小', NAME_CONFIG));
  writerList.push(HanziWriter.create(screentWidthFlag ? 'phone_xian' : 'xian', '仙', NAME_CONFIG));
  writerList.push(HanziWriter.create(screentWidthFlag ? 'phone_nv' : 'nv', '女', NAME_CONFIG));
  return writerList;
}

const generateAnimateWriter = async (writerList) => {
  const writerCount = writerList.length;
  for (const writer of writerList) {
    await writer.animateCharacter();
  }

  // document.getElementsByClassName('happy-birthday__container')[0].style.opacity = 0;
  fireRandom();
  setInterval(() => {
    fireRandom();
  }, 2000);
}

const writerList = getWriterList();
generateAnimateWriter(writerList);


let myAudio = document.getElementById('myAudio');
let playAudio = document.getElementById('playAudio');

playAudio.addEventListener('click', () => {
  myAudio.play();
  playAudio.style.display = 'none';
})



