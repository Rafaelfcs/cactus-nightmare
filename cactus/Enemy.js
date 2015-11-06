var imageEnemy1 = new Image();
imageEnemy1.src = "images/Cacto1.png";
var imageEnemy2 = new Image();
imageEnemy2.src = "images/Cacto2.png";

var enemiesArray = new Array();

var Enemy = function() {
	this.radius = 0;//Raio Inicial do Inimigo
	this.radiusTarget = 400;//Raio Final do Inimigo /// Mudar para random
	this.VelAng = 0.01;//Velocidade angular do Inimigo
	this.defase = 0;
	this.width = 48;//Largura do Inimigo
	this.height = 48;//Altura do Inimigo
	this.x = 800 - this.width/2;
	this.y = 400 - this.height/2;
	this.sprite = 0;
	
	this.UpdateEnemy = function() {
		this.x=-this.radius * Math.sin(this.VelAng * t + this.defase) + 800 - this.width/2;//Atualizar a posicao x do jogador de acordo com o tempo de orbita
		this.y=-this.radius * Math.cos(this.VelAng * t + this.defase) + 400 - this.height/2;//Atualizar a posicao y do jogador de acordo com o tempo de orbita
		if (this.sprite == 0){
			Context.drawImage(imageEnemy1, this.x, this.y, this.width, this.height);
		}else{
			Context.drawImage(imageEnemy2, this.x, this.y, this.width, this.height);
		}
			
		if (this.radius < this.radiusTarget){
			this.radius += 2;
		}else{
			this.radius -= 2;
		}
	}
}

 var NewEnemy = function() {
		var inimigo = new Enemy();
		enemiesArray.push(inimigo);
		return inimigo;
	}