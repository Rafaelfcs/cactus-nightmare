var IMGENEMY1 = new Image();
IMGENEMY1.src = "images/Cacto1.png";
var IMGENEMY2 = new Image();
IMGENEMY2.src = "images/Cacto2.png";

function Enemy()
{
	this.radius = 0;  //Raio Inicial do Inimigo
	this.radiusTarget = getRandomBetween(145, 450); //Raio Final do Inimigo
	this.VelAng = 0.01;  //Velocidade angular do Inimigo
	this.defase = getRandomBetween(0, 220); //Descompasso entre um cacto e outro
	this.width = 48;  //Largura do Inimigo
	this.height = 48;  //Altura do Inimigo
	this.x = 910 - this.width/2;
	this.y = 530 - this.height/2;
	this.randomType = getRandomBetween(1,2); //Tipo do cacto(img1 ou img2)
	this.changeSpeed = getRandomBetween(1,2); //Cacto pode se mexer mais rapido ou mais devagar

	this.updateEnemy = function() {

		//Atualizar a posicao x do jogador de acordo com o tempo de orbita
		this.x=-this.radius * Math.sin(this.VelAng * t + this.defase) + 910 - this.width/2;

		//Atualizar a posicao y do jogador de acordo com o tempo de orbita
		this.y=-this.radius * Math.cos(this.VelAng * t + this.defase) + 530 - this.height/2;

		if (this.randomType == 1)
		{
			Context.drawImage(IMGENEMY1, this.x, this.y, this.width, this.height);
		}
		else if(this.randomType == 2)
		{
			Context.drawImage(IMGENEMY2, this.x, this.y, this.width, this.height);
		}

		if (this.radius < this.radiusTarget)
		{
			this.radius += this.changeSpeed;
		}
		else if(this.radius > this.radiusTarget)
		{
			this.radius -= this.changeSpeed;
		}
	}

	this.changeRadiusTarget = function()
	{
		this.radiusTarget =  getRandomBetween(145, 450);
	}
}
