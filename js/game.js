var game = new Phaser.Game(w, h, Phaser.AUTO, 'gameContainer', null, false, false);
// var game = new Phaser.Game(w, h, Phaser.AUTO, 'gameContainer');


game.state.add('Boot', Game.Boot);
game.state.add('Load', Game.Load);
game.state.add('Menu', Game.Menu);
game.state.add('Brief', Game.Brief);
game.state.add('Play', Game.Play);

game.state.start('Boot');