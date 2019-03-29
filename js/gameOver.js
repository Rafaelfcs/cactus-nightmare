var gameOver = function()
{
    this.enterKey;

    this.preload = function()
    {
		game.load.image('cactus1', 'assets/images/cactus1-crop.png');
		game.load.image('cactus2', 'assets/images/cactus2-crop.png');
    }

    this.create = function()
    {
		var score = globalScore;
		var particleNumber = globalCactusNumber;

		//create cactus explosion
		var emitter = game.add.emitter(game.world.centerX, 200, 200);
		//pick one at random when emitting a new particle
		emitter.makeParticles(['cactus1', 'cactus2']);
   		emitter.start(true, 5000, 0, particleNumber);

		this.enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

		hitText = game.add.text(0, 0, 'You hit a Cactus!',  {font: "34px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" });
		hitText.setTextBounds(0, 100, 800, 100);

		tryText = game.add.text(0, 0, 'Press enter to try again', {font: "24px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" });
		tryText.setTextBounds(0, 100, 800, 200);

		scoreText = game.add.text(0, 0, 'Final score: ' + score, {font: "40px Arial", fill: "#8b0", boundsAlignH: "center", boundsAlignV: "middle" });
		scoreText.setTextBounds(0, 100, 800, 350);
    }

    this.update = function()
    {
        if (this.enterKey.isDown)
        {
            game.state.start("main");
        }
    }
}
