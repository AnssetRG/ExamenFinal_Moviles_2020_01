Seleccion = function () {};

Seleccion.prototype = {
  create: function () {
    this.banckground = this.game.add.sprite(
      this.game.world.centerX,
      this.game.world.centerY,
      "fondo"
    );
    this.banckground.anchor.setTo(0.5);
    this.banckground.scale.setTo(0.5);

    this.normal = this.game.add.text(
      this.game.width * 0.25,
      this.game.height * 0.25,
      "Normal",
      { fontSize: "48px", fill: "#FFFFFF" }
    );
    this.normal.lifes = 4;
    this.normal.inputEnabled = true;
    this.normal.events.onInputDown.add(this.goGame, this, 0);

    this.parao = this.game.add.text(
      this.game.width * 0.1,
      this.game.height * 0.65,
      "Parao sin Polo",
      { fontSize: "48px", fill: "#FFFFFF" }
    );
    this.parao.lifes = 1;
    this.parao.inputEnabled = true;
    this.parao.events.onInputDown.add(this.goGame, this, 0);
  },
  goGame: function (level_hp) {
    this.state.start("Game", true, false, level_hp.lifes);
  },
};
