//Criando Imagem de fundo(Não esta desenhando ela):
var imgBackground = new Image();
imgBackground.src = "images/background.png";
//Criando Imagem da lua(Não esta desenhando ela):
var imgMoom = new Image();
imgMoom.src = "images/moom.png";

//Imagem Menu
var imgMenu = new Image();
imgMenu.src = "images/background.png";

//Imagem Cactos
var imgCactus = new Image();
imgCactus.src = "images/Cacto1.png";

var Context;//Contexto aonde se deve desenhar tudo

var t=0;//Tempo que o objeto esta orbitando

var gameUpdate;//Guarda o loop principal do jogo
var ReorderRadiusTimer;
var MoreCactuar;

//Determina MENU/JOGO
var play = 0;

//Placar no game-over
var score;

//Checar botoes pressionado= true;


var pressed={};
window.onkeydown=function(e){
     e = e || window.event;
     pressed[e.keyCode] = true;
}
window.onkeyup=function(e){
     e = e || window.event;
     delete pressed[e.keyCode];
}
   
//Função inicial:
var init = function(){
	
	var snd = new Audio("music/CUCARACHA.mp3"); // buffers automatically when created
	snd.loop = true;
	snd.oncanplaythrough=snd.play();

	
	Context=document.getElementById("canvas").getContext("2d");//Obter o contexto para se desenhar
	
	gameUpdate = setInterval("update()", 10);//Iniciando o loop principal do programa
	
	var enemy = NewEnemy();
	enemy.radiusTarget = Math.random()*205 + 145;
	enemy.defase = Math.random()*2;
	enemy.sprite = Math.floor(Math.random()*11)%2;
}

//Loop principal do programa
var update = function()
{
	
	if (play == 0)
	{	
		Context.drawImage(imgMenu, 0, 0, 1600, 800);
		Context.drawImage(imgCactus, 300, 400, 256, 256);
		Context.font = '42px Courier';
		Context.fillStyle = "green";
		Context.fillText("CACTUS Nightmare!", 570 , 200);
		Context.font = '22px Courier';
		Context.fillText("Press enter to begin!", 650 ,400);
		
		if(pressed[13])
		{
			play = 1;
			ReorderRadiusTimer = setInterval("NewRadius()",1500);
			MoreCactuar = setInterval("NewCactus()",10000);
		}
	}
	else if(play == 2)
	{
		//Game-Over
		Context.drawImage(imgMenu, 0, 0, 1600, 800);
		Context.fillText("SCORE:" + score, 570 , 200);
		//score = 0;
		Context.fillText("Press enter to Restart!", 650 ,400);
		
		if(pressed[13])
		{
			play = 1;
			ReorderRadiusTimer = setInterval("NewRadius()",1500);
			MoreCactuar = setInterval("NewCactus()",10000);
		}
	}
	else if (play == 1)
	{
		
		//Normal Game
		if (pressed[39])
		{
			if (player.radius > 145){
				player.radius -= 4.5;
			}
		}	
	
		if (pressed[37])
		{
			if (player.radius < 350){
				player.radius += 4.5;
			}
		}	
		
		
		//Atualizar o plano de fundo:
		Context.drawImage(imgBackground, 0, 0, 1600, 800);//Desenhar a imagem de background no Context
		
		//Atualizar o player:
		player.playerUpdate();
		for (var i = 0; i < enemiesArray.length; i++)
		{
			enemiesArray[i].UpdateEnemy();
		}
		Context.drawImage(imgMoom,700,300,200,200);//Desenhar a imagem da lua no Context
		CheckCollision();
		if (play == 1){
			t += 1;//Atualiza o tempo de orbita
		}

		//Printa t na tela:
		Context.font = '42px Courier';
		Context.fillStyle = "green";
		Context.fillText("Pontuacao: " + (t/10), 1000 , 700);
		
		//Atualiza variavel pontuacao:
		
		
		Context.font = '22px Courier';
	}
	
}

function NewRadius(){
	for(var i=0;i < enemiesArray.length;i++){
		enemiesArray[i].radiusTarget = Math.random()*205 + 145;
	}
}

function NewCactus(){
	var enemy = NewEnemy();
	enemy.radiusTarget = Math.random()*205 + 145;
	enemy.defase = Math.random()*6.28;
	enemy.sprite = Math.floor(Math.random()*11)%2;
}


function CheckCollision(){
	for(var i = 0;i < enemiesArray.length;i++){
		if (player.x < enemiesArray[i].x + enemiesArray[i].width && 
			enemiesArray[i].x < player.x + player.width && 
			player.y < enemiesArray[i].y + enemiesArray[i].height && 
			enemiesArray[i].y < player.y + player.height){
			score = (t/10);
			t=0;
			for(var i=1;i < enemiesArray .length;i++){
				enemiesArray.splice(i);
			}
			
			//Mostrar a tela de game-over
			play = 2;
			
			clearInterval(MoreCactuar);
			clearInterval(ReorderRadiusTimer);
			//MoreCactuar = setInterval("NewCactus()",10000);
		}
	}
	
	return false;
}
