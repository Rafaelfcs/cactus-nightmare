//Criando a imagem do jogador(Nao desenha ela):
var imgPlayer = new Image();
imgPlayer.src = "images/Astronauta.png";

//Criando Objeto Player
var player = {};
player.x = 0;
player.y=0;
player.radius = 300;//Raio Inicial do jogador
player.VelAng = -0.01;//Velocidade angular do player
player.width = 48;//Largura do player
player.height = 60;//Altura do player


//Definindo a funcao para atualizar o player
player.playerUpdate = function(){
	player.x=player.radius * Math.sin(player.VelAng * t) + 800 - player.width/2;//Atualizar a posicao x do jogador de acordo com o tempo de orbita
	player.y=player.radius * Math.cos(player.VelAng * t) + 400 - player.height/2;//Atualizar a posicao y do jogador de acordo com o tempo de orbita
	Context.drawImage(imgPlayer, player.x, player.y, player.width, player.height);//Desenhar a imagem do jogador em context
}