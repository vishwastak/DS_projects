function init() {
  score = 0;
  canvas = document.getElementById("mycanvas");
  W = H = canvas.width = canvas.height = 990;
  pen = canvas.getContext("2d");
  cs = 66;
  game_over = false;
  food = getRandomFood();
  trophy_img = new Image();
  trophy_img.src = "images/trophy.png";

  food_img = new Image();
  food_img.src = "images/apple.png";
  snake = {
    init_len: 1,
    color: "blue",
    direction: "right",
    cells: [],

    createsnake: function () {
      for (var i = this.init_len; i > 0; i--) {
        this.cells.push({ x: i, y: 0 });
      }
    },
    drawsnake: function () {
      for (var i = 0; i < this.cells.length; i++) {
        pen.fillStyle = this.color;
        pen.fillRect(
          this.cells[i].x * cs,
          this.cells[i].y * cs,
          cs - 2,
          cs - 2
        );
      }
    },
    updatesnake: function () {
      score = this.cells.length - 1;
      var HeadX = this.cells[0].x;
      var HeadY = this.cells[0].y;

      if (HeadX == food.x && HeadY == food.y) {
        var flag = false;
        food = getRandomFood();
        while (1) {
          for (var i = 0; i < this.cells.length; i++) {
            if (food.x == this.cells[i].x && food.y == this.cells[i].y)
              flag = true;
            else if (food.x == 0 && food.y == 0) flag = true;
          }
          if (flag) food = getRandomFood();
          else break;
        }
      } else {
        this.cells.pop();
      }
      var nextX, nextY;
      if (this.direction == "right") {
        nextX = HeadX + 1;
        nextY = HeadY;
      } else if (this.direction == "left") {
        nextX = HeadX - 1;
        nextY = HeadY;
      } else if (this.direction == "up") {
        nextX = HeadX;
        nextY = HeadY - 1;
      } else if (this.direction == "down") {
        nextX = HeadX;
        nextY = HeadY + 1;
      }

      this.cells.unshift({
        x: nextX,
        y: nextY,
      });

      var lastX = Math.round(W / cs) - 1;
      var lastY = Math.round(H / cs) - 1;
      var flag2 = false;
      for (var i = this.cells.length - 1; i > 0; i--) {
        if (
          this.cells[0].x == this.cells[i].x &&
          this.cells[0].y == this.cells[i].y
        ) {
          game_over = true;
          return;
        }
      }

      if (
        this.cells[0].y < 0 ||
        this.cells[0].x < 0 ||
        this.cells[0].x > lastX ||
        this.cells[0].y > lastY
      ) {
        game_over = true;
        return;
      }
    },
  };
  snake.createsnake();
  function keypressed(e) {
    if (
      e.key == "ArrowUp" &&
      (snake.cells.length == 1 || snake.direction != "down")
    )
      snake.direction = "up";
    else if (
      e.key == "ArrowRight" &&
      (snake.cells.length == 1 || snake.direction != "left")
    )
      snake.direction = "right";
    else if (
      e.key == "ArrowLeft" &&
      (snake.cells.length == 1 || snake.direction != "right")
    )
      snake.direction = "left";
    else if (
      e.key == "ArrowDown" &&
      (snake.cells.length == 1 || snake.direction != "up")
    )
      snake.direction = "down";
  }
  document.addEventListener("keydown", keypressed);
}

function draw() {
  pen.clearRect(0, 0, W, H);
  snake.drawsnake();

  pen.drawImage(food_img, food.x * cs, food.y * cs, cs, cs);
  pen.drawImage(trophy_img, 0, 0, cs, cs);

  pen.fillStyle = "red";
  pen.font = "35px Roboto";
  pen.fillText(score, 20, 30);
}
function update() {
  snake.updatesnake();
}
function getRandomFood() {
  foodX = Math.round((Math.random() * (W - cs)) / cs);
  foodY = Math.round((Math.random() * (H - cs)) / cs);
  food = {
    x: foodX,
    y: foodY,
    color: "red",
  };
  return food;
}
function gameloop() {
  if (game_over == true) {
    alert("Game Over ! Your Score is " + score);
    pen.clearRect(0, 0, W, H);
    clearInterval(f);
  }
  draw();
  update();
}
init();

f = setInterval(gameloop, 100);
