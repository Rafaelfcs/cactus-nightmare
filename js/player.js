function player(sprite)
{
	this.sprite = sprite;
	this.radius = 100;
	this.sprite.anchor.setTo(0.5);
	this.sprite.enableBody = true;
	game.physics.arcade.enable(this.sprite);

	this.rotate = function(period, x, y)
	{
		this.sprite.x = this.radius * Math.sin(period * -1) + x;
		this.sprite.y = this.radius * Math.cos(period * -1) + y;
	}
}