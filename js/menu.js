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

	    startText = game.add.text(0, 0, 'Press enter to start',  {font: "34px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" });
		startText.setTextBounds(0, 100, 800, 100);

		arrowText = game.add.text(0, 0, 'Use arrow left and arrow right', {font: "24px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" });
		arrowText.setTextBounds(0, 100, 800, 200);
    }

    this.update = function()
    {
        if (this.enterKey.isDown)
        {
            game.state.start("main");
        }
    }
}
