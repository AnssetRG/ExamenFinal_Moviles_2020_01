Enemy = function (game, key) {
  this.Max_Range =
    key == "brown" || key == "cream" || key == "yellow"
      ? 2
      : key == "fly"
      ? 4
      : 1;
  let pos = game.rnd.integerInRange(0, this.Max_Range);
  Phaser.Sprite.call(this, game, 0, 0, key + pos);
  this.anchor.setTo(0.5);
  this.scale.setTo(0.35);
  this.game = game;
  this.health = 1;
  this.type = key;
  this.game.physics.arcade.enable(this);

  this.SetMovement();
};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.damage = function (amount) {
  Phaser.Sprite.prototype.damage.call(this, amount);
  if (this.health <= 0) this.kill();
};
Enemy.prototype.reset = function (key) {
  Phaser.Sprite.prototype.reset.call(this);
  this.Max_Range =
    key == "brown" || key == "cream" || key == "yellow"
      ? 2
      : key == "fly"
      ? 4
      : 1;
  let pos = this.game.rnd.integerInRange(0, this.Max_Range);
  this.loadTexture(key + pos);

  this.health = 1;
  this.type = key;

  this.SetMovement();
};

Enemy.prototype.SetMovement = function () {
  if (this.type == "red" || this.type == "yellow") {
    this.body.velocity.x = this.game.rnd.integerInRange(0, 10) > 5 ? -10 : 10;
    this.x =
      this.body.velocity.x > 0 ? this.width : this.game.width - this.width;
    this.y = this.game.height * 0.8;
  }

  if (this.type == "cream") {
    this.x = this.game.rnd.integerInRange(
      this.width,
      this.game.width - this.width
    );
    this.y = this.height;
    this.body.velocity.y = +10;
  }

  if (this.type == "fly") {
    this.body.velocity.x = this.game.rnd.integerInRange(0, 10) > 5 ? -10 : 10;
    this.x =
      this.body.velocity.x > 0 ? this.width : this.game.width - this.width;
    this.y = this.game.world.centerY;
  }

  if (this.type == "brown") {
    this.x = this.game.rnd.integerInRange(
      this.width,
      this.game.width - this.width
    );
    this.y = this.game.height - this.height;
    this.body.velocity.y = -10;
  }

  console.log(this.x + "," + this.y);
};

Enemy.prototype.getPoints = function () {
  if (this.type == "brown") {
    return 5;
  } else if (this.type == "red") {
    return 10;
  } else if (this.type == "yellow") {
    return 15;
  } else if (this.type == "cream") {
    return 20;
  } else if (this.type == "fly") {
    return 50;
  }
};
