Game = function () {};

Game.prototype = {
  init: function (hp) {
    this.hp = hp;

    this.PLAYER_SPEED = 200;
    this.BULLET_SPEED = -200;

    this.shooting_time = 0;
    this.SHOOTING_TIMER = 200;
    this.ENEMY_SPAWN_TIMER = 1000 / this.currentLevel;
    this.enemy_spawn_time = 0;

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 1000;
  },
  create: function () {
    this.banckground = this.game.add.sprite(
      this.game.world.centerX,
      this.game.world.centerY,
      "fondo"
    );

    this.floor = this.game.add.tileSprite(0, 0, this.game.width, 70, "floor");
    this.floor.y = this.game.height - this.floor.height;
    this.physics.arcade.enable(this.floor);
    this.floor.body.allowGravity = false;
    this.floor.body.inmovable = true;
    this.floor.collideWorldBounds = true;

    this.player = new Player(this.game, this.hp, this.PLAYER_SPEED);
    this.player.createBullet.add(this.createPlayerBullet, this);

    this.initBullets();
    this.initEnemies();
    this.loadLevel();

    this.spaceBar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    this.score = 0;
    this.scoreText = this.game.add.text(
      this.game.world.width * 0.05,
      this.game.world.height * 0.05,
      "Score :" + this.score
    );
    this.scoreText.fill = "#FFFFFF";

    this.lifeText = this.game.add.text(
      this.game.world.width * 0.85,
      this.game.world.height * 0.05,
      "HP :" + this.player.hp
    );
    this.lifeText.fill = "#FFFFFF";
  },
  initEnemies: function () {
    this.enemies = this.game.add.group();
    this.enemies.enableBody = true;
  },
  initBullets: function () {
    this.playerBullets = this.game.add.group();
    this.playerBullets.enableBody = true;
  },
  createPlayerBullet: function (x, y, bullet_type) {
    let bullet = this.playerBullets.getFirstDead();
    if (!bullet) {
      bullet = new PlayerBullet(this.game, x, y, bullet_type);
      this.playerBullets.add(bullet);
    } else {
      bullet.reset(x, y, bullet_type);
    }
    bullet.body.allowGravity = false;
    bullet.body.velocity.y = this.BULLET_SPEED;
  },
  loadLevel: function () {
    this.currentIndexEnemy = 0;

    this.endOfLevelTimer = this.game.time.events.add(
      370 * 1000,
      function () {
        localStorage.setItem("score", this.score);
        this.game.state.start("GameOver");
      },
      this
    );

    this.scheduleNextEnemy();
  },
  scheduleNextEnemy: function () {
    let time_to_spawn = 8;
    let total_time = 0;
    //first wave
    for (let i = 0; i < 4; i++) {
      this.nextEnemyTimer = this.game.time.events.add(
        total_time,
        function () {
          this.createEnemy(this.randomKey(["red"], this));
        },
        this
      );
      total_time += time_to_spawn * 100;
      console.log(total_time);
    }
    //second wave
    time_to_spawn = 6;
    for (let i = 0; i < 8; i++) {
      this.nextEnemyTimer = this.game.time.events.add(
        total_time,
        function () {
          this.createEnemy(this.randomKey(["red", "yellow"], this));
        },
        this
      );
      total_time += time_to_spawn * 100;
      console.log(total_time);
    }
    //third wave
    time_to_spawn = 4;
    for (let i = 0; i < 16; i++) {
      this.nextEnemyTimer = this.game.time.events.add(
        total_time,
        function () {
          this.createEnemy(this.randomKey(["red", "yellow", "fly"], this));
        },
        this
      );
      total_time += time_to_spawn * 100;
      console.log(total_time);
    }
    //forth wave
    time_to_spawn = 3;
    for (let i = 0; i < 32; i++) {
      this.nextEnemyTimer = this.game.time.events.add(
        total_time,
        function () {
          this.createEnemy(
            this.randomKey(["red", "yellow", "fly", "brown"], this)
          );
        },
        this
      );
      total_time += time_to_spawn * 100;
      console.log(total_time);
    }
    //fifth wave
    time_to_spawn = 2;
    for (let i = 0; i < 64; i++) {
      this.nextEnemyTimer = this.game.time.events.add(
        total_time,
        function () {
          this.createEnemy(
            this.randomKey(["red", "yellow", "fly", "brown", "cream"], this)
          );
        },
        this
      );
      total_time += time_to_spawn * 100;
      console.log(total_time);
    }
  },
  randomKey: function (keys) {
    var key = keys[this.game.rnd.integerInRange(0, keys.length - 1)];
    return key;
  },
  createEnemy: function (key) {
    console.log(key + " está siendo creado.");
    let enemy = this.enemies.getFirstDead();
    if (!enemy) {
      enemy = new Enemy(this.game, key);
      this.enemies.add(enemy);
    } else {
      enemy.reset(key);
    }
    console.log(enemy);
    enemy.body.allowGravity = false;
  },
  update: function () {
    this.shooting_time += this.game.time.elapsed;
    if (this.spaceBar.isDown && this.shooting_time >= this.SHOOTING_TIMER) {
      this.shooting_time = 0;
      this.player.shoot();
    }
    this.game.physics.arcade.collide(this.player, this.floor);
    this.game.physics.arcade.overlap(
      this.playerBullets,
      this.enemies,
      this.damageEnemy,
      null,
      this
    );
    this.game.physics.arcade.overlap(
      this.player,
      this.enemies,
      this.damagePlayer,
      null,
      this
    );

    //this.game.input.onDown.add(this.toggle, this);
  },
  damageEnemy: function (bullet, enemy) {
    if (bullet.type == enemy.type) {
      this.score += enemy.getPoints();
      enemy.damage(1);
      this.scoreText.text = "Score :" + this.score;
    }

    bullet.kill();
  },
  damagePlayer: function (player, enemie) {
    enemie.kill();
    this.player.hp--;
    this.lifeText.text = "HP :" + this.player.hp;
    if (this.player.hp == 0) {
      localStorage.setItem("score", this.score);
      this.game.state.start("GameOver");
    }
  },
  //Debugging
  toggle: function () {
    this.showDebug = this.showDebug ? false : true;

    if (!this.showDebug) {
      this.game.debug.reset();
    }
  },
  render: function () {
    if (this.showDebug) {
      this.game.debug.body(this.player);
      this.enemyBullets.forEach(function (enemy) {
        this.game.debug.body(enemy);
      }, this);
    }
  },
};
