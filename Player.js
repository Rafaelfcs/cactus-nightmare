//Criando a imagem do jogador(Nao desenha ela):
var IMGPLAYER = new Image();
IMGPLAYER.src = "images/Astronauta.png";

function Player()
{
	this.x = 0;
	this.y = 0;
	this.radius = 300;  //Raio Inicial do jogador
	this.VelAng = -0.01;  //Velocidade angular do player
	this.width = 48;  //Largura do player
	this.height = 60;  //Altura do player

	//Definindo a funcao para atualizar o player
	this.updatePlayer = function()
	{
		//Atualizar a posicao x do jogador de acordo com o tempo de orbita
		player.x = player.radius * Math.sin(player.VelAng * t) + 910 - player.width/2;

		//Atualizar a posicao y do jogador de acordo com o tempo de orbita
		player.y = player.radius * Math.cos(player.VelAng * t) + 530 - player.height/2;

		//Desenhar a imagem do jogador em context
		Context.drawImage(IMGPLAYER, player.x, player.y, player.width, player.height);
	}
}
