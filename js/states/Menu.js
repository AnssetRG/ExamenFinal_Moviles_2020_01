Menu = function () {};

Menu.prototype = {
  create: function () {
    this.banckground = this.game.add.sprite(
      this.game.world.centerX,
      this.game.world.centerY,
      "fondo"
    );
    this.banckground.anchor.setTo(0.5);
    this.banckground.scale.setTo(0.5);

    this.title = this.game.add.text(
      this.game.world.centerX,
      this.game.height * 0.25,
      "Examen Final",
      { fontSize: "20px", fill: "#FFFFFF" }
    );

    this.jugar = this.game.add.text(
      this.game.world.centerX,
      this.game.height * 0.75,
      "Jugar"
    );
    this.jugar.fill = "#FFFFFF";
    this.jugar.inputEnabled = true;
    this.jugar.events.onInputDown.add(this.goGame, this);
  },
  goGame: function () {
    this.state.start("Seleccion");
  },
};
