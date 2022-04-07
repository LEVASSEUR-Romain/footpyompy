var canvas,
  ctx,
  cx = 100,
  cy = 100,
  vx = 4,
  vy = 2,
  radius1 = 45,
  cx2 = 300,
  cy2 = 150,
  vx2 = 1.5,
  vy2 = 2.5,
  radius2 = 45;
var time;

function init() {
  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");
  animate();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  time = requestAnimationFrame(animate);

  //circle 1.
  ctx.beginPath();
  ctx.arc(cx, cy, radius1, 0, 2 * Math.PI, false);
  ctx.fillStyle = "green";
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();

  if (cx + radius1 > canvas.width || cx - radius1 < 0) vx = -vx;
  if (cy + radius1 > canvas.height || cy - radius1 < 0) vy = -vy;

  cx += vx;
  cy += vy;

  // circle 2

  ctx.beginPath();
  ctx.arc(cx2, cy2, radius2, 0, 2 * Math.PI, false);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();

  if (cx2 + radius2 > canvas.width || cx2 - radius2 < 0) vx2 = -vx2;
  if (cy2 + radius2 > canvas.height || cy2 - radius2 < 0) vy2 = -vy2;

  cx2 += vx2;
  cy2 += vy2;

  checkCollision();
}

function checkCollision() {
  var dx = cx2 - cx; //distance between x
  var dy = cy2 - cy; // distance between y
  var distance = Math.sqrt(dx * dx + dy * dy); //Pythagoream Theory
  var minDistance = radius1 + radius2;
  // COLLISION CODES HERE NEW DIRECTION

  if (distance < minDistance) {
    var angle = Math.atan2(dy, dx),
      spread = minDistance - distance,
      ax = spread * Math.cos(angle),
      ay = spread * Math.sin(angle);

    // solve collision (separation)
    cx -= ax;
    cy -= ay;

    // give a punch to the speed
    var punch = 2;

    vx -= punch * Math.cos(angle);
    vy -= punch * Math.sin(angle);
    vx2 += punch * Math.cos(angle);
    vy2 += punch * Math.sin(angle);
  }
}

function start() {
  animate();
}

function stop() {
  window.cancelAnimationFrame(time);
}
