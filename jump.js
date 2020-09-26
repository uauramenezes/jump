canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');

const player = {
  x: canvas.width / 2 -25,
  y: canvas.height - 55,
  w: 50,
  h: 50,
  speed: 15,
  jump: false,
  dx: 0,
  dy: 0,
  left: false,
  right: false,
}

const ground = {
  x: 0,
  y: canvas.height - 5,
  w: canvas.width,
  h: 5
}

function keyDown(e) {
  if (e.key === 'a' || e.key === 'ArrowLeft') {
    player.left = true
  } 

  if (e.key === 'd' || e.key === 'ArrowRight') {
    player.right = true
  }

  if ((e.key === ' ' || e.key === 'w' || e.key === 'ArrowUp') &&
  player.y + player.h === ground.y) {
    player.jump = true;
  }
}

function keyUp(e) {
  if (e.key === 'a' || e.key === 'ArrowLeft') {
    player.left = false
  } 

  if (e.key === 'd' || e.key === 'ArrowRight') {
    player.right = false
  }

  if (e.key === ' ' || e.key === 'w' || e.key === 'ArrowUp') {
    player.jump = false;
  }
}

function movePlayer() {
  if (!player.jump && player.y + player.h === ground.y) {
    player.dx = 0;
  }

  if (player.left) {
    player.dx = -player.speed;
  }

  if (player.right) {
    player.dx = player.speed;
  }

  player.x += player.dx;
  player.y += player.dy;
}

function jump() {
  if (player.jump) {
    player.dy = -player.speed
  }

  if (player.y < canvas.height * (4 / 6)) {
    player.jump = false
  }

  if (!player.jump) {
    player.dy = player.speed
  }
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function collisionDetection() {
  if (player.x <= 0) {
    player.x = 0;
  }

  if (player.x + player.w >= canvas.width) {
    player.x = canvas.width - player.w;
  }

  if (player.y + player.h > ground.y) {
    player.y = ground.y - player.h
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#000';
  ctx.fillRect(player.x, player.y, player.w, player.h);
  ctx.fillStyle = 'gray';
  ctx.fillRect(ground.x, ground.y, ground.w, ground.h);

  jump()
  movePlayer();
  collisionDetection();

  requestAnimationFrame(draw);
}

draw();
