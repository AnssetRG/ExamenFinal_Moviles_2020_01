GameOver = function (game) {};

//prototype: para crear más funcionalidades
GameOver.prototype = {
  init: function () {},
  create: function () {
    this.banckground = this.game.add.sprite(
      this.game.world.centerX,
      this.game.world.centerY,
      "fondo"
    );
    this.banckground.anchor.setTo(0.5);
    this.banckground.scale.setTo(0.5);

    this.title = this.game.add.text(
      this.game.world.width * 0.25,
      this.game.world.height * 0.25,
      "Game Over",
      { fontSize: "48px", fill: "#FFFFFF" }
    );

    this.score = 0;
    if (!localStorage.getItem("Score") == null) {
      this.score = localStorage.getItem("Score");
    }

    this.score_text = this.game.add.text(
      this.game.world.width * 0.25,
      this.game.world.height * 0.5,
      "Score: " + this.score,
      { fontSize: "48px", fill: "#FFFFFF" }
    );

    console.log("Game over " + this.score);

    this.endLevelTimer = this.game.time.events.add(
      3000,
      function () {
        this.GoToMenu();
      },
      this
    );
  },
  GoToMenu: function () {
    this.state.start("Menu");
  },
};
