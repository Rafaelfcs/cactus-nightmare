//creates the game
var game = new Phaser.Game(800, 600, Phaser.AUTO);

//global score variables
var globalScore = 0;
var globalCactusNumber = 0;

//adds all the states
game.state.add("menu", menu);
game.state.add("main", main);
game.state.add("gameOver", gameOver);

//starts on the menu
game.state.start("menu");