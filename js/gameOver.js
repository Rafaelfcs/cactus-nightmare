var gameOver = function()
{
	this.enterKey;

	this.preload = function()
	{
		game.load.image('cactus1', 'assets/images/cactus1-crop.png');
	}

	this.create = function()
	{
		var cactus = game.add.sprite(game.world.centerX, game.world.centerY, 'cactus1');
		cactus.anchor.setTo(0.5);
		this.enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
	}

	this.update = function()
	{
		if (this.enterKey.isDown)
		{
			game.state.start("main");
		}	
	}
}