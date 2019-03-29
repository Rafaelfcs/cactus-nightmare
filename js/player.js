function player(sprite)
{
    this.sprite = sprite;						//receives the sprite by the constructor
    this.radius = 100;							//inicial radius
    this.sprite.anchor.setTo(0.5);				//set anchor to its center
    this.sprite.enableBody = true;
    game.physics.arcade.enable(this.sprite);

    //rotate function
    this.rotate = function(period, x, y)
    {
        this.sprite.x = this.radius * Math.sin(period * -1) + x;
        this.sprite.y = this.radius * Math.cos(period * -1) + y;
    }
}
