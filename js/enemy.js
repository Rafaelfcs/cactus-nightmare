function enemy(sprite)
{
	this.sprite = sprite;
	this.radius = 10;
	this.radiusTarget = 100;
	this.speed = getRandomBetween(1,2);
	this.sprite.anchor.setTo(0.5);
	this.sprite.enableBody = true;
	this.defase = getFloatRandomBetween(0,8);
	game.physics.arcade.enable(this.sprite);

	this.rotate = function(period, x, y)
	{
		this.sprite.x = this.radius * Math.sin(period + this.defase) + x;
		this.sprite.y = this.radius * Math.cos(period + this.defase) + y;
	}

	this.goTarget = function()
	{		
		if (this.radius < this.radiusTarget)
		{
			this.radius += this.speed;
		}
		else if(this.radius > this.radiusTarget)
		{
			this.radius -= this.speed;
		}
	}

	this.changeTarget = function()
	{
		this.radiusTarget = getRandomBetween(67, 276);
	}
}