function load_images() {
  virus = new Image();
  virus.src = "Assets/v1.png";
  player = new Image();
  player.src = "Assets/superhero.png";
  gemm = new Image();
  gemm.src = "Assets/gem.png";
}
function init() {
  canvas = document.getElementById("mycanvas");
  W = canvas.width = 700;
  H = canvas.height = 400;
  pen = canvas.getContext("2d");
  game_over = false;
  win = false;
  e1 = {
    x: 180,
    y: 50,
    w: 60,
    h: 60,
    speed: 30,
  };
  e2 = {
    x: 350,
    y: 300,
    w: 60,
    h: 60,
    speed: 30,
  };
  e3 = {
    x: 450,
    y: 200,
    w: 60,
    h: 60,
    speed: 30,
  };
  hero = {
    x: 50,
    y: H / 2,
    w: 60,
    h: 60,
    speed: 20,
    moving: false,
    health: 100,
  };
  gem = {
    x: 600,
    y: H / 2,
    w: 60,
    h: 60,
  };
  enemy = [e1, e2, e3];
  canvas.addEventListener("mousedown", function () {
    hero.moving = true;
  });
  canvas.addEventListener("mouseup", function () {
    hero.moving = false;
  });
}
function isOverlap(rect1, rect2) {
  if (
    rect1.x < rect2.x + rect2.w &&
    rect1.x + rect1.w > rect2.x &&
    rect1.y < rect2.y + rect2.h &&
    rect1.y + rect1.h > rect2.y
  ) {
    return true;
  }

  return false;
}
function draw() {
  pen.clearRect(0, 0, W, H);

  pen.drawImage(player, hero.x, hero.y, hero.w, hero.h);
  pen.drawImage(gemm, gem.x, gem.y, gem.w, gem.h);
  for (let i = 0; i < enemy.length; i++) {
    pen.drawImage(virus, enemy[i].x, enemy[i].y, enemy[i].w, enemy[i].h);
  }
  pen.fillStyle = "white";
  pen.fillText("Health " + hero.health, 10, 10);
}
function update() {
  if (isOverlap(hero, gem)) {
    game_over = true;
    draw();
    win = true;
    return;
  }
  for (let i = 0; i < enemy.length; i++) {
    if (isOverlap(hero, enemy[i])) {
      hero.health -= 20;
      if (hero.health < 0) {
        game_over = true;
        draw();
        win = false;
        return;
      }
    }
  }

  if (hero.moving == true) {
    hero.x += hero.speed;
    hero.health += 0;
  }
  for (let i = 0; i < enemy.length; i++) {
    enemy[i].y += enemy[i].speed;

    if (enemy[i].y >= H - enemy[i].h || enemy[i].y <= 0)
      enemy[i].speed = enemy[i].speed * -1;
  }
}
function game_loop() {
  if (game_over == true) {
    if (win == true) alert("You Won");
    else alert("You Lost");
    clearInterval(f);
    return;
  }
  draw();
  update();
}
load_images();
init();

f = setInterval(game_loop, 100);
