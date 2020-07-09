Player = function (game, hp, speed) {
  Phaser.Sprite.call(this, game, 0, 0, "player");
  this.anchor.setTo(0.5);
  this.game = game;
  this.hp = hp;
  this.frame = 4;
  this.game.add.existing(this);

  this.x = this.game.world.centerX;
  this.y = this.game.height * 0.75;

  this.PLAYER_SPEED = speed;

  this.actual_bullet = "brown";

  this.animations.add("WalkLeft", [0, 1, 2, 3], 12, true);
  this.animations.add("WalkRight", [5, 6, 7, 8], 12, true);

  this.game.physics.arcade.enable(this);
  this.anchor.setTo(0.5);
  this.body.collideWorldBounds = true;
  //this.body.gravity.y = 1000;

  this.createBullet = new Phaser.Signal();

  this.keys = this.game.input.keyboard.createCursorKeys();
  this.AKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
  this.SKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
  this.DKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
  this.FKey = this.game.input.keyboard.addKey(Phaser.Keyboard.F);
  this.GKey = this.game.input.keyboard.addKey(Phaser.Keyboard.G);
};

//Igual al prototype de Phazer dando todas sus propiedades
Player.prototype = Object.create(Phaser.Sprite.prototype);
//Inicialziacion del objeto recibe la función Player - sobrescribe el constructor default por este de Player
Player.prototype.constructor = Player;

Player.prototype.update = function () {
  if (this.AKey.isDown) {
    this.actual_bullet = "brown";
  } else if (this.SKey.isDown) {
    this.actual_bullet = "cream";
  } else if (this.DKey.isDown) {
    this.actual_bullet = "fly";
  } else if (this.FKey.isDown) {
    this.actual_bullet = "red";
  } else if (this.GKey.isDown) {
    this.actual_bullet = "yellow";
  }

  this.body.velocity.x = 0;
  if (this.keys.left.isDown) {
    this.body.velocity.x = -300;
    this.play("WalkLeft");
  } else if (this.keys.right.isDown) {
    this.body.velocity.x = 300;
    this.play("WalkRight");
  } else {
    this.frame = 4;
  }
  /*if (this.keys.up.isDown) {
    this.body.velocity.y = -300;
  }*/
  if (
    this.keys.up.isDown &&
    (this.body.touching.down || this.body.blocked.down)
  ) {
    this.body.velocity.y = -500;
  }
};

Player.prototype.shoot = function () {
  this.createBullet.dispatch(this.x, this.y, this.actual_bullet);
};

Player.prototype.damage = function (amount) {
  Phaser.Sprite.prototype.damage.call(this, amount);
};
