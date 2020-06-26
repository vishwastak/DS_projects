let prizes_config = {
  count: 12,
  prize_names: [
    "3000 Credits",
    "35% Off",
    "Hard Luck",
    "70% OFF",
    "Swagpack",
    "100% OFF",
    "Netflix",
    "50% Off",
    "Amazon Voucher",
    "2 Extra Spin",
    "CB Tshirt",
    "CB Book",
  ],
};

config = {
  type: Phaser.canvas,
  width: 800,
  height: 600,
  backgroundColor: 0xffcc00,
  flag: false,
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
  audio: {
    disableWebAudio: true,
  },
};

game = new Phaser.Game(config);

function preload() {
  this.load.audio("theme", ["Assets/oedipus_wizball_highscore.mp3"]);
  this.load.image("background", "Assets/back.jpg");
  this.load.image("pin", "Assets/pin.png");
  this.load.image("stand", "Assets/stand.png");
  this.load.image("wheel", "Assets/wheel.png");
  this.load.image("button", "Assets/button.png");
  console.log(this);
}
function create() {
  let W = game.config.width;
  let H = game.config.height;
  this.music = this.sound.add("theme");
  let background = this.add.sprite(0, 0, "background");
  background.setPosition(W / 2, H / 2);
  background.setScale(0.17);

  let stand = this.add.sprite(W / 2 + 3, H / 2 + 200, "stand");
  stand.setScale(0.2);

  let pin = this.add.sprite(W / 2, H / 2 - 200, "pin");
  pin.setScale(0.2);
  pin.depth = 1;

  this.wheel = this.add.sprite(0, 0, "wheel");
  this.wheel.setPosition(W / 2, H / 2);
  this.wheel.setScale(0.2);

  this.button = this.add.sprite(0, 0, "button").setInteractive();
  this.button.setPosition(W - 100, H - 100);
  this.button.setScale(0.5);

  font_style = {
    font: "bold 30px Algerian",
    align: "center",
    color: "blue",
  };
  this.add.text(10, 10, "Welcome to Spin & Win !!", font_style);
  font_style = {
    font: "bold 30px Cordova",
    align: "center",
    color: "red",
  };
  this.game_text = this.add.text(450, 10, "", font_style);
}
function update() {
  this.button.on("pointerdown", spinwheel, this);
}

function spinwheel() {
  if (config.flag == false) {
    this.music.play();
    this.game_text.setText("Let's hope for the best!!");
    config.flag = true;
    console.log("inside spinwheel");

    let rounds = Phaser.Math.Between(2, 4);
    let angle = Phaser.Math.Between(0, 11) * 30;
    let total_angle = rounds * 360 + angle;

    let idx = Math.floor((total_angle % 360) / 30);
    console.log(total_angle + " " + idx);
    //let execute then
    tween = this.tweens.add({
      targets: this.wheel,
      angle: total_angle,
      ease: "Cubic.easeInOut",
      duration: 6000,
      callbackScope: this,
      onComplete: function () {
        this.music.pause();
        this.game_text.setText(
          "You won " + prizes_config.prize_names[11 - idx] + " !!"
        );
        config.flag = false;
      },
    });
  }
}
function actionOnClick() {
  background.visible = !background.visible;
}
