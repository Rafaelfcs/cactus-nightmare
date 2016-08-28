var game = new Phaser.Game(800, 600, Phaser.AUTO);

game.state.add("menu", menu);
game.state.add("main", main);
game.state.add("gameOver", gameOver);

game.state.start("menu");