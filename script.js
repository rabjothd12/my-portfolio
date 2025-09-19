const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let shootingStars = [];
let staticStars = [];

function random(min, max) {
  return Math.random() * (max - min) + min;
}

class StaticStar {
  constructor() {
    this.x = random(0, canvas.width);
    this.y = random(0, canvas.height);
    this.radius = Math.random() * 1.5;
    this.opacity = random(0.1, 1);
    this.delta = random(0.002, 0.01);
  }

  twinkle() {
    this.opacity += this.delta;
    if (this.opacity >= 1 || this.opacity <= 0.1) {
      this.delta = -this.delta;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.fill();
  }
}

class ShootingStar {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = random(0, canvas.width);
    this.y = random(0, canvas.height / 2);
    this.len = random(150, 300); 
    this.speed = random(10, 20); 
    this.angle = Math.PI / 4; 
    this.opacity = 1;
  }

  update() {
    this.x += this.speed * Math.cos(this.angle);
    this.y += this.speed * Math.sin(this.angle);
    this.opacity -= 0.02; 

    return this.opacity > 0; 
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(
      this.x - this.len * Math.cos(this.angle),
      this.y - this.len * Math.sin(this.angle)
    );
    ctx.strokeStyle = `rgba(255,255,255,${this.opacity})`;
    ctx.lineWidth = 2;
    ctx.shadowBlur = 8;
    ctx.shadowColor = "white";
    ctx.stroke();
  }
}


function createStars(staticCount) {
  for (let i = 0; i < staticCount; i++) {
    staticStars.push(new StaticStar());
  }
}


function spawnShootingStar() {
  if (Math.random() < 0.02) { 
    shootingStars.push(new ShootingStar());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  staticStars.forEach(star => {
    star.twinkle();
    star.draw();
  });

  spawnShootingStar();

  shootingStars = shootingStars.filter(star => {
    star.update();
    star.draw();
    return star.opacity > 0;
  });

  requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  staticStars = [];
  createStars(150);
});

createStars(150);
animate();

const stars = document.querySelector('.stars-background');

window.addEventListener('mousemove', (e) => {
  const xRatio = e.clientX / window.innerWidth;
  const yRatio = e.clientY / window.innerHeight;
  const maxTranslate = 15; 
  const translateX = (xRatio - 0.5) * maxTranslate; 
  const translateY = (yRatio - 0.5) * maxTranslate;

  stars.style.transform = `translate(${translateX}px, ${translateY}px)`;
});

document.getElementById("currentYear").textContent = new Date().getFullYear();

const planet1 = document.getElementById('planet1');
const planet2 = document.getElementById('planet2');
const nebula1 = document.getElementById('nebula1');

window.addEventListener('mousemove', (e) => {
  const xRatio = e.clientX / window.innerWidth;
  const yRatio = e.clientY / window.innerHeight;

  const planet1X = (xRatio - 0.5) * 20; 
  const planet1Y = (yRatio - 0.5) * 20;

  const planet2X = (xRatio - 0.5) * 15; 
  const planet2Y = (yRatio - 0.5) * 15;

  const nebulaX = (xRatio - 0.5) * 30; 
  const nebulaY = (yRatio - 0.5) * 30;

  planet1.style.transform = `translate(${planet1X}px, ${planet1Y}px)`;
  planet2.style.transform = `translate(${planet2X}px, ${planet2Y}px)`;
  nebula1.style.transform = `translate(${nebulaX}px, ${nebulaY}px)`;
});




