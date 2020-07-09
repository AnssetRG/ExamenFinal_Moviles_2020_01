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
  this.game = game;
  this.health = 1;
  this.type = key;
  this.game.physics.arcade.enable(this);

  if (this.type == "red" || this.type == "yellow") {
    this.body.velocity.x = game.rnd.integerInRange(0, 10) > 5 ? -1 : 1;
    this.x =
      this.body.velocity.x > 0 ? this.game.width + this.width : -this.width;
    this.y = this.game.height * 0.8;
  }

  if (this.tpye == "cream") {
    this.x = game.rnd.integerInRange(0, this.game.width);
    this.y = -this.height;
    this.body.velocity.y = -10;
  }

  if (this.tpye == "fly") {
    this.body.velocity.x = game.rnd.integerInRange(0, 10) > 5 ? -1 : 1;
    this.x =
      this.body.velocity.x > 0 ? this.game.width + this.width : -this.width;
    this.y = this.game.world.centerY;
  }

  if (this.type == "brown") {
    this.x = game.rnd.integerInRange(0, this.game.width);
    this.y = this.game.height + this.height;
    this.body.velocity.y = 10;
  }
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
      ? 3
      : key == "fly"
      ? 5
      : 2;

  this.loadTexture(key + pos);

  this.health = 1;
  this.type = key;

  if (this.type == "red" || this.type == "yellow") {
    this.body.velocity.x = game.rnd.integerInRange(0, 10) > 5 ? -1 : 1;
    this.x =
      this.body.velocity.x > 0 ? this.game.width + this.width : -this.width;
    this.y = this.game.height * 0.8;
  }

  if (this.tpye == "cream") {
    this.x = game.rnd.integerInRange(0, this.game.width);
    this.y = -this.height;
    this.body.velocity.y = -10;
  }

  if (this.tpye == "fly") {
    this.body.velocity.x = game.rnd.integerInRange(0, 10) > 5 ? -1 : 1;
    this.x =
      this.body.velocity.x > 0 ? this.game.width + this.width : -this.width;
    this.y = this.game.world.centerY;
  }

  if (this.type == "brown") {
    this.x = game.rnd.integerInRange(0, this.game.width);
    this.y = this.game.height + this.height;
    this.body.velocity.y = 10;
  }
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
