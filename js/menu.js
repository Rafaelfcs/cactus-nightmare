var menu = function()
{
	this.enterKey;

	this.preload = function()
	{
		game.load.image('cactus2', 'assets/images/cactus2-crop.png');
	}

	this.create = function()
	{
		var cactus = game.add.sprite(game.world.centerX, game.world.centerY, 'cactus2');
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