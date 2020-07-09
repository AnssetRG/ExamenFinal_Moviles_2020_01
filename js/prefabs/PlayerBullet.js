PlayerBullet = function (game, x, y, type) {
  Phaser.Sprite.call(this, game, x, y, "bullet_" + type);
  this.anchor.setTo(0.5);
  this.scale.setTo(0.25);
  this.type = type;
  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;
};

PlayerBullet.prototype = Object.create(Phaser.Sprite.prototype);
PlayerBullet.prototype.constructor = PlayerBullet;

PlayerBullet.prototype.reset = function (x, y, type) {
  Phaser.Sprite.prototype.reset.call(this, x, y);
  this.loadTexture("bullet_" + type);
  this.type = type;
};
