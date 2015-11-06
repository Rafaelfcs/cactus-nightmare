//Criando Imagem de fundo(Não esta desenhando ela):
var imgBackground = new Image();
imgBackground.src = "images/space-background.png";

//Criando Imagem da lua(Não esta desenhando ela):
var imgMoom = new Image();
imgMoom.src = "images/moom.png";

//Imagem Menu
var imgMenu = new Image();
imgMenu.src = "images/space-background.png";

//Imagem Cactos
var imgCactus = new Image();
imgCactus.src = "images/Cacto2.png";

var Context;//Contexto aonde se deve desenhar tudo

var t=0;//Tempo que o objeto esta orbitando

var gameUpdate;//Guarda o loop principal do jogo
var ReorderRadiusTimer;
var MoreCactuar;

//Determina MENU/JOGO
var play = 0;
var numcactus = 1;

//Placar no game-over
var score=0;
var gameOverScore;

//Audio
var snd = new Audio("music/CUCARACHA.mp3"); // buffers automatically when created

//Checar botoes pressionado= true;
var pressed={};
window.onkeydown=function(e)
{
    e = e || window.event;
    pressed[e.keyCode] = true;
}
window.onkeyup=function(e)
{
    e = e || window.event;
    delete pressed[e.keyCode];
}
   
//Initial function
var init = function()
{	
	snd.loop = true;
	snd.play();
	
	Context = document.getElementById("canvas").getContext("2d");//Obter o contexto para se desenhar
	
	gameUpdate = setInterval("update()", 10);//Iniciando o loop principal do programa
	
	var enemy = NewEnemy();
	enemy.radiusTarget = Math.random() * 205 + 145;
	enemy.defase = Math.random() * 2;
	enemy.sprite = Math.floor(Math.random() * 11) % 2;
}

//Main loop
var update = function()
{
	//Pauses audio (S)
	if(pressed[83])
	{
		snd.pause();
	}
	
	//Plays audio (A)
	if(pressed[65])
	{
		snd.play();
	}
	
	//Score
	score = Math.floor((t/10) * (numcactus+1));
	
	//Menu
	if (play == 0)
	{	
		Context.drawImage(imgMenu, 0, 0, 1920, 1080);
		Context.drawImage(imgCactus, 170, 340, 600, 600);
		
		Context.font = '150px CactusSandwich';
			Context.fillStyle = '#2BE841';
				Context.fillText("CACTUS NIGHTMARE!", 300 , 200);
				
		Context.font = '80px CactusSandwich';
			Context.fillStyle = 'white';
				Context.fillText("Press Enter To Begin!", 900 , 550);
				
		Context.font = '60px CactusSandwich';
			Context.fillStyle = 'red';
				Context.fillText("Use Right And Left Arrows", 900 , 700);
				Context.fillText("A/S For The Audio", 900 , 800);
				Context.fillText("C For The Credits", 900 , 900);
		
		if(pressed[13])
		{
			play = 1;
			ReorderRadiusTimer = setInterval("NewRadius()",1500);
			MoreCactuar = setInterval("NewCactus()",10000);
		}
		
		if(pressed[67])
		{
			play = 4;
		}
	}
	//Game-Over
	else if(play == 2)
	{
		Context.drawImage(imgMenu, 0, 0, 1920, 1080);
		
		Context.font = '150px CactusSandwich';
			
			Context.fillStyle = 'white';
				Context.fillText("SCORE: ", 600 , 300);
			
			Context.fillStyle = 'red';
				Context.fillText( gameOverScore, 1100 , 300);
		
		Context.font = '70px CactusSandwich';
			Context.fillStyle = 'white';

				Context.fillText("Press enter to Restart!", 620 ,500);
				Context.fillText("Multiplier: ", 730 ,600);
				
			Context.fillStyle = '#2BE841';
				Context.fillText("X " + numcactus, 1050 ,600);
		
		if(pressed[13])
		{
			numcactus=1;
			play = 1;
			ReorderRadiusTimer = setInterval("NewRadius()",1500);
			MoreCactuar = setInterval("NewCactus()",10000);
		}
	}
	//Nomal Game
	else if (play == 1)
	{
		if (pressed[39])
		{
			if (player.radius > 145){
				player.radius -= 5.5;
			}
		}
	
		if (pressed[37])
		{
			if (player.radius < 450){
				player.radius += 5.5;
			}
		}
		
		//Atualizar o plano de fundo:
		Context.drawImage(imgBackground, 0, 0, 1920, 1080);//Desenhar a imagem de background no Context
		
		//Atualizar o player:
		player.playerUpdate();
		for (var i = 0; i < enemiesArray.length; i++)
		{
			enemiesArray[i].UpdateEnemy();
		}
		Context.drawImage(imgMoom,810,430,200,200);//Desenhar a imagem da lua no Context
		CheckCollision();
		if (play == 1){
			t += 1;//Atualiza o tempo de orbita
		}

		//Printa t na tela:
		Context.font = '95px CactusSandwich';
			Context.fillStyle = "white";
				Context.fillText("Score ", 1330 , 970);
			
		Context.font = '65px CactusSandwich';	
			Context.fillStyle = '#2BE841';
				Context.fillText("X " + numcactus, 1560 , 920);
			
		Context.font = '90px CactusSandwich';	
			Context.fillStyle = "red";
				Context.fillText(score, 1635 , 1000);
		//Atualiza variavel pontuacao
	}
	//Credits
	else if(play == 4)
	{
		Context.drawImage(imgMenu, 0, 0, 1920, 1080);
		
		Context.font = '150px CactusSandwich';
			Context.fillStyle = 'white';
				Context.fillText("Credits: ", 700 , 300);
			
		Context.font = '70px CactusSandwich';
			Context.fillStyle = 'red';
				Context.fillText("Artur Moraes do Lago", 300, 500);
				Context.fillText("Joao Victor Fernandes", 1000, 500);
				Context.fillText("Caio Salvador Rohwedder", 350, 600);
				Context.fillText("Rafael Ferigolo", 1100, 600);
				Context.fillText("Raphael Pavan", 500, 700);
				Context.fillText("Lucas Antonio", 950, 700);
		
			Context.fillStyle = 'white';
				Context.fillText("Press backspace to go back!", 580 , 900);
			
			Context.fillStyle = '#2BE841';
				
		if(pressed[8])
		{
			play = 0;
		}
	}	
}

function NewRadius()
{
	for(var i=0;i < enemiesArray.length;i++)
	{
		enemiesArray[i].radiusTarget = Math.random()*305 + 145;
	}
}

function NewCactus()
{
	var enemy = NewEnemy();
	numcactus= numcactus + 1;
	enemy.radiusTarget = Math.random()*205 + 145;
	enemy.defase = Math.random()*6.28;
	enemy.sprite = Math.floor(Math.random()*11)%2;
}


function CheckCollision()
{
	for(var i = 0;i < enemiesArray.length;i++)
	{
		if (player.x < enemiesArray[i].x + enemiesArray[i].width && 
			enemiesArray[i].x < player.x + player.width && 
			player.y < enemiesArray[i].y + enemiesArray[i].height && 
			enemiesArray[i].y < player.y + player.height)
		{
			gameOverScore = score;
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
