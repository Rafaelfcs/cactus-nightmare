var main = function() 
{
	this.moon;							//moon sprite
	this.player;						//player object that contais its sprite
	this.enemies = new Array();			//contais enemies objects
	this.enemiesGroup;					//contains enemies sprites
	this.enemyDelay;					//contains the addEnemy() method loop
	this.enemyDelayIncrement = 2000;	//used to increase the delay of addEnemy
	this.addEnemyFlag = true;			//controls if an enemy may be added or will be added in addEnemy() method
	this.cursors;						//keyboard input
	this.period;						//pediod of rotation based on time
	this.score = 0;						//player's score
	this.scoreText;						//text object

	this.preload = function() 
	{
		//loads images
		game.load.image('space', 'assets/images/space-background.png');
		game.load.image('moon', 'assets/images/moon.png');
		game.load.image('astronaut', 'assets/images/astronaut-crop.png');
		game.load.image('cactus1', 'assets/images/cactus1-crop.png');
		game.load.image('cactus2', 'assets/images/cactus2-crop.png');
	}

	this.create = function() 
	{
		//starts physics system
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
		//adds background
		game.add.sprite(0, 0, 'space');
		
		//adds moon to the center of the world
		this.moon = game.add.sprite(game.world.centerX, game.world.centerY, 'moon');
		this.moon.anchor.setTo(0.5);

		//creates a new player object
		this.player = new player(game.add.sprite(game.world.centerX, game.world.centerY, 'astronaut')); 

		//creates enemy group
		this.enemiesGroup = game.add.group();

		//creates inputs from cursors
		this.cursors = game.input.keyboard.createCursorKeys();

		//adds score text to the screen
    	this.scoreText = game.add.text(10, 10, 'Score: ' + this.score, { font: '34px Arial', fill: '#fff' });

    	//starts loops, enemy movement and addition of new enemies
    	game.time.events.loop(2000, this.updateEnemyRadius, this);
    	this.enemyDelay = game.time.events.loop(5000, this.addEnemy, this);
    	game.time.events.loop(10, this.updateScore, this);
    	
    	//adds the first enemy to the screen
		this.addEnemy();
    }

	this.update = function() 
	{
		//keeps moon on top
		game.world.bringToTop(this.moon);

		//increasing value for the object rotation
		this.period = game.time.now * 0.001;

		//player and enemies movement
		this.player.rotate(this.period, game.world.centerX, game.world.centerY);
		this.updateEnemies();

		//left arrow
		if (this.cursors.left.isDown)
	    {
	    	if(this.player.radius < 276)
	    	{
	    		this.player.radius += 6;
	    	}	        
	    }

	    //right arrow
		if (this.cursors.right.isDown)
	    {
	    	if(this.player.radius > 67)
	    	{
	        	this.player.radius -= 6;
	    	}
	    }

	    //after 250ms starts to check for overlap between the player and the enemies
	    //without this delay it always says there is an overlap in the beginning of the game
	    game.time.events.add(250, this.checkOverlap, this);
	}

	//updates score, controled by a loop
	this.updateScore = function()
	{
		this.score += 0.5 * this.enemies.length;
		this.scoreText.text = "Score: " + Math.floor(this.score) + " x" + this.enemies.length;
	}

	//changes the target (or not) of every enemy
	this.updateEnemyRadius = function()
	{
		for(var i=0; i<this.enemies.length; i++)
		{
			if(getRandomBetween(0,1))
			{
				this.enemies[i].changeTarget();
			}			
		}
	}

	//adds (it might not add) an enemy to the game, cactus1 or cactus2 
	//if there is an addition, the enemyDelay.delay will be increased by enemyDelayIncrement
	//addEnemyFlag ensures that if the enemy is not going to be added, in the next call it will be added
	this.addEnemy = function()
	{
		if(this.addEnemyFlag || getRandomBetween(0,1))
		{
			if(getRandomBetween(0,1))
			{
				this.enemies.push(new enemy(this.enemiesGroup.create(game.world.centerX, game.world.centerY, 'cactus1')));
			}
			else
			{
				this.enemies.push(new enemy(this.enemiesGroup.create(game.world.centerX, game.world.centerY, 'cactus2')));
			}
			this.enemyDelay.delay += this.enemyDelayIncrement;
			this.enemyDelayIncrement += 500;
			this.addEnemyFlag = false;
		}
		else
		{
			this.addEnemyFlag = true;
		}
	}

	//rotates the enemies and makes them go after their target radius
	this.updateEnemies = function()
	{
		for(var i=0; i<this.enemies.length; i++)
		{
			this.enemies[i].rotate(this.period, game.world.centerX, game.world.centerY);
			this.enemies[i].goTarget();
		}
	}

	//checks if the player has overlaped with an enemy
	this.checkOverlap = function()
	{
		//this.scoreText.text = "false";
		for(var i=0; i<this.enemies.length; i++)
		{
			if(game.physics.arcade.overlap(this.player.sprite, this.enemies[i].sprite))
			{
				this.onOverlap();
			}
		}
	}

	//method called when there is an overlap
	this.onOverlap = function()
	{
		//this.scoreText.text = "true";
	}
}

//returns an exact random number between min and max 
function getRandomBetween(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//returns a random number between min and max
function getFloatRandomBetween(min, max)
{
    return Math.random() * (max - min + 1) + min;
}