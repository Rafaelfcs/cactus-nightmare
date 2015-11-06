//Imagem de fundo
var IMGBACKGROUND = new Image();
IMGBACKGROUND.src = "images/space-background.png";

//Imagem da lua:
var IMGMOON = new Image();
IMGMOON.src = "images/moom.png";

//Imagem Cactos
var IMGCACTUS = new Image();
IMGCACTUS.src = "images/Cacto2.png";

//Cores das fontes
var RED = "#F25626"
var WHITE = "#FFFFFF"
var GREEN = "#54dd75"
var ORANGE = "#FFC42E"

//Tamanho das fontes
var BIG = '150px CactusSandwich';
var MEDIUM = '80px CactusSandwich';
var SMALL = '70px CactusSandwich';

var Context; //Contexto, onde se deve desenhar tudo

var t=0; //Tempo que o objeto esta orbitando

var gameLoop; //Guarda o loop principal do jogo
var moveEnemyLoop; //Guarda o loop de push enemys
var addEnemyLoop; //Guarda o loop de push enemys
var addEnemyWasRandom = 0; // Controla o addEnemy random, para que pule uma adicao no maximo

var play = 0; //Estado do jogo

//Score
var score=0; //Durante o jogo
var gameOverScore; //Tela de game-over
var multiplier; //Tela de game-over

//Audio
var sound = new Audio("music/Peppy-Pepe.mp3");

//Player e inimigos
var enemiesArray = new Array();
var player = new Player();

//Checa se o browser suporta salvar o highscore
var storageEnabled=0;
var highscoreFlag;
if(typeof(Storage) !== "undefined")
{
    storageEnabled = 1;
}
var storedScore; //Salva highscore

//Checar botoes pressionado = true;
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

//Retorna random entre min e max
function getRandomBetween(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Funcao inicial
function init()
{
	//Configuracao do audio
	sound.loop = true;

    var storedSound = localStorage.isPlaying;
    if(storedSound == 1 || storedSound == undefined)
    {
        sound.play();
    }

	Context = document.getElementById("canvas").getContext("2d"); //Obter o contexto para se desenhar
	gameLoop = setInterval("update()", 10); //Iniciando o loop principal do programa
}

//Loop principal
function update()
{
	//Pausa o audio (S)
	if(pressed[83])
    {
		sound.pause();
        localStorage.isPlaying = 0; //Ao abrir o jogo vai lembrar que o audio estava desligado
	}

	//Toca o audio (A)
	if(pressed[65])
	{
		sound.play();
        localStorage.isPlaying = 1; //Ao abrir o jogo vai lembrar que o audio estava ligado
	}

	//Score
	score = Math.floor((t/10) * (enemiesArray.length));

    switch (play)
    {
        case 0: //Menu

            Context.drawImage(IMGBACKGROUND, 0, 0, 1920, 1080);
            Context.drawImage(IMGCACTUS, 170, 250, 560, 800);

            Context.font = BIG;
                Context.fillStyle = GREEN;
                    writeCenterText("CACTUS NIGHTMARE!", 200);

            Context.font = MEDIUM;
                Context.fillStyle = WHITE;
                    Context.fillText("Press Enter To Begin!", 900, 550);

            Context.font = SMALL;
                Context.fillStyle = RED;
                    Context.fillText("Use Right And Left Arrows", 900, 670);
                    Context.fillText("A/S For The Audio", 900, 770);
                    Context.fillText("C For The Credits", 900, 870);

            if(pressed[13]) //Começa o jogo (Enter)
            {
                play = 1;
                addEnemy(true); //Adiciona de forma nao randomica
                setIntervals();
            }

            if(pressed[67]) //Creditos (C)
            {
                play = 3;
            }
            break;

        case 1: //Jogo

            Context.drawImage(IMGBACKGROUND, 0, 0, 1920, 1080);

            if (pressed[39]) //Right arrow
            {
                if (player.radius >= 145){
                    player.radius -= 5.5;
                }
            }

            if (pressed[37]) //Left arrow
            {
                if (player.radius <= 450){
                    player.radius += 5.5;
                }
            }

            //Atualiza o jogador e inimigos
            player.updatePlayer();
            for (var i = 0; i < enemiesArray.length; i++)
            {
                enemiesArray[i].updateEnemy();
            }

            //Desenha a lua aqui para ficar por cima dos cactos
            Context.drawImage(IMGMOON, 810, 430, 200, 200);

            //Atualiza o tempo de orbita
            t += 1;

            Context.font = '95px CactusSandwich';
                Context.fillStyle = WHITE;
                    Context.fillText("Score ", 1330 , 970);

            Context.font = '65px CactusSandwich';
                if (storedScore >= score)
                {
                    Context.fillStyle = GREEN;
                }
                else
                {
                    Context.fillStyle = ORANGE;
                }
                    Context.fillText("X " + enemiesArray.length, 1560 , 920);

            storedScore = localStorage.highscore;
            Context.font = '90px CactusSandwich';
                //Se passar o recorde o score fica laranja
                if (storedScore >= score)
                {
                    Context.fillStyle = RED;
                }
                else
                {
                    Context.fillStyle = ORANGE;
                }
                    Context.fillText(score, 1635 , 1000);

            //Se houver colisao
            if(CheckCollision())
            {
                //Pega pontuacao
                gameOverScore = score;
                multiplier = enemiesArray.length;

                //Reseta tempo, inimigos e intervalos
                t=0;
                for(var i=0; i < enemiesArray.length; i++)
                {
                    enemiesArray.splice(i);
                }
                clearInterval(addEnemyLoop);
                clearInterval(moveEnemyLoop);

                //Mostrar a tela de game-over
                play = 2;
            }
            break;

        case 2: //Game over

            Context.drawImage(IMGBACKGROUND, 0, 0, 1920, 1080);
            var txtAux;

            if(pressed[13]) //Enter
            {
                play = 1;
                setIntervals();
                addEnemy(true); //Adiciona de forma nao randomica
                highscoreFlag = 0;
            }

            if(pressed[8]) //Backspace
            {
                play = 0;
                highscoreFlag = 0;
            }

            storedScore = localStorage.highscore;
            //Guarda o novo highscore se o browser suportar
            if(storageEnabled && (storedScore == undefined || storedScore < gameOverScore))
            {
                localStorage.highscore = gameOverScore;
                highscoreFlag= 1;
            }

            if (highscoreFlag)
            {
                var excla = "!! ";

                Context.font = BIG;
                    Context.fillStyle = ORANGE;
                        txtAux = "Score: ";
                        measure = textCenterPosition(excla + txtAux + gameOverScore);
                        Context.fillText(excla, measure, 300);
                    Context.fillStyle = WHITE;
                        Context.fillText(txtAux, measure + textMeasure(excla), 300);
                    Context.fillStyle = ORANGE;
                        Context.fillText(gameOverScore, measure + textMeasure(excla + txtAux), 300);

                Context.font = MEDIUM;
                if(storageEnabled)
                {
                    Context.fillStyle = ORANGE;
                        txtAux = "Highscore: ";
                        measure = textCenterPosition(excla + txtAux + storedScore);
                        Context.fillText(excla, measure, 450);
                    Context.fillStyle = WHITE;
                        Context.fillText(txtAux, measure + textMeasure(excla), 450);
                    Context.fillStyle = ORANGE;
                        Context.fillText(storedScore, measure + textMeasure(excla + txtAux), 450);
                }

                Context.font = MEDIUM;
                    Context.fillStyle = WHITE;
                        txtAux = "Multiplier: ";
                        measure = textCenterPosition(txtAux + "X " + multiplier);
                        Context.fillText(txtAux, measure, 550);
                    Context.fillStyle = ORANGE;
                            Context.fillText("X " + multiplier, measure +  textMeasure(txtAux), 550);

                Context.font = SMALL;
                    Context.fillStyle = WHITE;
                        writeCenterText("Press enter to restart!", 900);
                        writeCenterText("Backspace for the menu", 1000);
            }
            else
            {
                Context.font = BIG;
                    Context.fillStyle = WHITE;
                        txtAux = "Score: ";
                        measure = textCenterPosition(txtAux + gameOverScore);
                        Context.fillText(txtAux, measure, 300);
                    Context.fillStyle = RED;
                        Context.fillText(gameOverScore, measure + textMeasure(txtAux), 300);

                Context.font = MEDIUM;
                if(storageEnabled)
                {
                    Context.fillStyle = WHITE;
                        txtAux = "Highscore: ";
                        measure = textCenterPosition(txtAux + storedScore);
                        Context.fillText(txtAux, measure, 450);
                    Context.fillStyle = ORANGE;
                        Context.fillText(storedScore, measure + textMeasure(txtAux), 450);
                }

                Context.font = MEDIUM;
                    Context.fillStyle = WHITE;
                        txtAux = "Multiplier: ";
                        measure = textCenterPosition(txtAux + "X " + multiplier);
                        Context.fillText(txtAux, measure, 550);
                    Context.fillStyle = GREEN;
                            Context.fillText("X " + multiplier, measure +  textMeasure(txtAux), 550);

                Context.font = SMALL;
                    Context.fillStyle = WHITE;
                        writeCenterText("Press enter to restart!", 900);
                        writeCenterText("Backspace for the menu", 1000);

            }
            break;

        case 3: //Creditos

            Context.drawImage(IMGBACKGROUND, 0, 0, 1920, 1080);

            if(pressed[8]) //Backspace
            {
                play = 0;
            }

            Context.font = BIG;
                Context.fillStyle = WHITE;
                    writeCenterText("Credits: ", 300);

            Context.font = MEDIUM;
                Context.fillStyle = ORANGE;
                    writeCenterText("Artur Moraes do Lago   Joao Victor Fernandes", 450);
                    writeCenterText("Caio Salvador Rohwedder   Rafael Ferigolo", 550);
                    writeCenterText("Raphael Pavan   Lucas Antonio", 650);

            Context.font = SMALL;
                Context.fillStyle = WHITE;
                    writeCenterText("Press backspace to go back!", 1000);

            break;
    }
}

function setIntervals()
{
    moveEnemyLoop = setInterval("NewRadius()", 750);
    addEnemyLoop = setInterval("addEnemy(false)", 5000);
}

//Troca o raio target dos cactos (ou não (random))
function NewRadius()
{
	for(var i=0; i < enemiesArray.length; i++)
	{
        if(getRandomBetween(0,1))
        {
		    enemiesArray[i].changeRadiusTarget();
        }
	}
}

//Checa se o jogador bateu num cacto
function CheckCollision()
{
	for(var i = 0;i < enemiesArray.length;i++)
	{
		if (player.x < enemiesArray[i].x + enemiesArray[i].width &&
			enemiesArray[i].x < player.x + player.width &&
			player.y < enemiesArray[i].y + enemiesArray[i].height &&
			enemiesArray[i].y < player.y + player.height)
		{
            return true;
		}
	}
	return false;
}

//Adiciona inimigo na partida (de forma randomica ou nao, mas garante que nao pule mais de uma vez)
function addEnemy(notRandom)
{
    random = getRandomBetween(0,1)

    if(random || notRandom || addEnemyWasRandom)
    {
    	var enemy = new Enemy();
        addEnemyWasRandom = 0;
    	enemiesArray.push(enemy);
    	enemy.radiusTarget = getRandomBetween(145, 450);
    }
    else
    {
        addEnemyWasRandom = 1; //Se o addEnemy nao for feito uma vez, na proxima ele sera feito
    }
}

//Retorna posicao centralizada do texto na tela
function textCenterPosition(txt)
{
    var measure = Math.floor(Context.measureText(txt).width);
    measure = (1920-measure)/2;
    return measure;
}

//Retorna 'medida' de um texto
function textMeasure(txt)
{
    return Math.floor(Context.measureText(txt).width);
}

//Escreve um texto centralizado numa altura (y)
function writeCenterText(txt, y)
{
    Context.fillText(txt, textCenterPosition(txt), y);
}
