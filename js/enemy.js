function enemy(sprite)
{
	this.sprite = sprite;						//receives the sprite by the constructor
	this.radius = 10;							//inicial radius
	this.radiusTarget = 100;					//inicial radius target
	this.speed = getRandomBetween(1,2);			//speed of pursue of target
	this.sprite.anchor.setTo(0.5);				//set anchor to its center
	this.sprite.enableBody = true;				
	this.defase = getFloatRandomBetween(0,8);	//defase of the rotation
	game.physics.arcade.enable(this.sprite);

	//rotate function, defase dont let them stay in one single line, but in all sorts of angles
	this.rotate = function(period, x, y)
	{
		this.sprite.x = this.radius * Math.sin(period + this.defase) + x;
		this.sprite.y = this.radius * Math.cos(period + this.defase) + y;
	}

	//pursue radius target 
	this.goTarget = function()
	{
		//removes error of when the speed == 2 and the target is a odd number
		if(Math.abs(this.radius - this.radiusTarget) > 3)
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
	}

	//chooses a new target
	this.changeTarget = function()
	{
		this.radiusTarget = getRandomBetween(67, 276);
	}
}