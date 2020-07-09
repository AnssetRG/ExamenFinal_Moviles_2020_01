Preload = function () {};

Preload.prototype = {
  preload: function () {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    //centrar el juego horizontalmente
    this.scale.pageAlignHorizontally = true;
    //centrar el juego verticalmente
    this.scale.pageAlignVertically = true;
    this.load.image("fondo", "assets/bg_layer4.png");
    this.load.spritesheet("player", "assets/dude.png", 32, 48, 9);
    this.load.image("floor", "assets/floor/choco.png");

    //brown
    this.load.image("brown0", "assets/brown/duck_outline_brown.png");
    this.load.image("brown1", "assets/brown/duck_outline_target_brown.png");
    this.load.image("brown2", "assets/brown/duck_white.png");

    //cream
    this.load.image("cream0", "assets/cream/creamChoco.png");
    this.load.image("cream1", "assets/cream/creamMocca.png");
    this.load.image("cream2", "assets/cream/creamPink.png");

    //fly
    this.load.image("fly0", "assets/fly/shipBeige_manned.png");
    this.load.image("fly1", "assets/fly/shipBlue_manned.png");
    this.load.image("fly2", "assets/fly/shipGreen_manned.png");
    this.load.image("fly3", "assets/fly/shipPink_manned.png");
    this.load.image("fly4", "assets/fly/shipYellow_manned.png");

    //red
    this.load.image("red0", "assets/red/spikeMan_jump.png");
    this.load.image("red1", "assets/red/springMan_stand.png");

    //yellow
    this.load.image("yellow0", "assets/yellow/flyMan_fly.png");
    this.load.image("yellow1", "assets/yellow/sun1.png");
    this.load.image("yellow2", "assets/yellow/wingMan1.png");

    //bullets
    this.load.image("bullet_brown", "assets/bullets/brown.png");
    this.load.image("bullet_cream", "assets/bullets/cream.png");
    this.load.image("bullet_fly", "assets/bullets/fly.png");
    this.load.image("bullet_red", "assets/bullets/red.png");
    this.load.image("bullet_yellow", "assets/bullets/yellow.png");
  },
  create: function () {
    this.state.start("Menu");
  },
};
