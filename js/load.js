Game = {};

// var tile_size = 40;
// var w = tile_size*12;
// var h = tile_size*10;

var w = 780;
var h = 480;
var sound = true;
var score = 0;

function rand(num){ return Math.floor(Math.random() * num) };


Game.Boot = function (game) { };

Game.Boot.prototype = {
	preload: function () {
		game.stage.backgroundColor = '#fff';
		game.load.image('loading', 'images/loading.png');
		game.load.image('loading2', 'images/loading2.png');
			},
	create: function() {
		this.game.state.start('Load');
	}
};

Game.Load = function (game) { };

Game.Load.prototype = {
	preload: function () {
	    label2 = game.add.text(Math.floor(w/2)+0.5, Math.floor(h/2)-15+0.5, 'loading...', { font: '30px Arial', fill: '#fff' });
		label2.anchor.setTo(0.5, 0.5);

		preloading2 = game.add.sprite(w/2, h/2+15, 'loading2');
		preloading2.x -= preloading2.width/2;
		preloading = game.add.sprite(w/2, h/2+19, 'loading');
		preloading.x -= preloading.width/2;
		game.load.setPreloadSprite(preloading);

		game.load.audio('puff', 'sounds/hap_puff.wav');

 		// game.load.tilemap('map1', 'levels/map.json', null, Phaser.Tilemap.TILED_JSON);
		// game.load.image('tiles', 'images/basictiles.png');
		
 		game.load.tilemap('map1', 'levels/starttown.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.image('tiles', 'images/testtile32.png');
		
    	game.load.image('menu', 'images/menu.png');
    	game.load.image('dead', 'images/dead.png');
		game.load.spritesheet('sound', 'images/sound.png', 28, 22);

		game.load.spritesheet('player', 'images/saea01.png', 32*2, 32*2);
		game.load.spritesheet('player02', 'images/saea02.png', 32*2, 32*2);
		game.load.spritesheet('happaly', 'images/happaly.png', 32, 32);
		game.load.image('enemy', 'images/enemy.png');
		//game.load.image('bullet', 'images/bullet2.png');
		game.load.image('key', 'images/key.png');
		game.load.image('door', 'images/door.png');
		game.load.image('heart', 'images/heart.png');

		game.load.audio('music', 'sounds/music.wav');
		game.load.audio('key', 'sounds/key.wav');
		game.load.audio('heart', 'sounds/heart.wav');
		game.load.audio('dead', 'sounds/dead.wav');

		game.load.image('hapsae_hanbok', 'images/HappySaea_Hanbok.png');
		game.load.image('hapsae_pink', 'images/HappySaea_pink.png');

		game.load.image('city_world', 'images/pixelcity_world.png');

		game.load.spritesheet('hapsae_walk', 'images/HappySaea_walk.png', 80, 128);

    	game.load.image('hapsae_logo', 'images/hapsae_logo.png');

	},
	create: function () {
		game.state.start('Menu');
	}
};
