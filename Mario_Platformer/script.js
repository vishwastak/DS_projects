count = 0;
let config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    width: 800,
    height: 600,
  },

  backgroundColor: 0xffff11,
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: 1000,
      },
      debug: false,
    },
  },
};
let game = new Phaser.Game(config);

let player_config = {
  player_speed: 250,
  player_jumpspeed: 700,
};

function preload() {
  this.load.image("ground", "Assets/topground.png");
  this.load.image("background", "Assets/background.png");
  this.load.spritesheet("dude", "Assets/dude.png", {
    frameWidth: 32,
    frameHeight: 48,
  });
  this.load.image("apple", "Assets/apple.png");
  this.load.image("ray", "Assets/ray.png");
}
function create() {
  W = game.config.width;
  H = game.config.height;

  let bg = this.add.sprite(0, 0, "background");
  bg.displayWidth = W;
  bg.displayHeight = H;
  bg.setOrigin(0, 0);

  let rays = [];
  for (let i = -10; i < 10; i++) {
    let ray = this.add.sprite(W / 2, H - 100, "ray");
    ray.displayHeight = 1.2 * H;
    ray.setOrigin(0.5, 1);
    ray.alpha = 0.2;
    ray.angle = i * 20;
    rays.push(ray);
  }
  this.tweens.add({
    targets: rays,
    props: {
      angle: {
        value: "+=20",
      },
    },
    duration: 2000,
    repeat: -1,
  });
  let ground = this.add.tileSprite(0, H - 128, W, 128, "ground");
  ground.setOrigin(0, 0);

  this.player = this.physics.add.sprite(100, 0, "dude", 4);
  this.player.setCollideWorldBounds(true);

  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });
  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1,
  });
  this.anims.create({
    key: "center",
    frames: this.anims.generateFrameNumbers("dude", { start: 4, end: 4 }),
    //frames: [{key : 'dude',frame :4}]
    frameRate: 10,
  });
  let fruits = this.physics.add.group({
    key: "apple",
    repeat: 8,
    setXY: { x: 25, y: 0, stepX: 100 },
    setScale: { x: 0.2, y: 0.2 },
  });
  this.player.setBounce(0.5);

  fruits.children.iterate(function (f) {
    f.setBounce(Phaser.Math.FloatBetween(0.4, 0.6));
  });
  let platforms = this.physics.add.staticGroup();
  platforms.create(100, 150, "ground").setScale(1.5, 0.5).refreshBody();
  platforms.create(300, 350, "ground").setScale(1.5, 0.5).refreshBody();
  platforms.create(600, 200, "ground").setScale(1.5, 0.5).refreshBody();
  platforms.add(ground);

  this.cursor = this.input.keyboard.createCursorKeys();
  //NOT necessary as ground is added to platform
  //this.physics.add.existing(ground, true);
  //ground.body.allowGravity = false;
  //ground.body.immovable = true;

  this.physics.add.collider(platforms, this.player);
  this.physics.add.collider(fruits, platforms);
  this.physics.add.overlap(this.player, fruits, eatFruit, null, this);

  this.cameras.main.setBounds(0, 0, W, H);
  this.physics.world.setBounds(0, 0, W, H);

  this.cameras.main.startFollow(this.player, true, true);
  this.cameras.main.setZoom(1.5);
}
function update() {
  if (this.cursor.left.isDown) {
    this.player.setVelocityX(-player_config.player_speed);
    this.player.anims.play("left", true);
  } else if (this.cursor.right.isDown) {
    this.player.setVelocityX(player_config.player_speed);
    this.player.anims.play("right", true);
  } else {
    this.player.setVelocityX(0);
    this.player.anims.play("center");
  }
  if (this.cursor.up.isDown && this.player.body.touching.down) {
    this.player.setVelocityY(-player_config.player_jumpspeed);
  }
}
function eatFruit(player, fruit) {
  fruit.disableBody(true, true);
  count++;

  if (count == 8) {
    font_style = {
      font: "bold 30px Algerian",
      align: "center",
      color: "blue",
    };
    this.add.text(250, 200, "You are full", font_style);
  }
}
