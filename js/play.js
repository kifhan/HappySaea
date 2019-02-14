var followers = [];

Game.Play = function (game) { };

Game.Play.prototype = {

	create: function () {
		game.stage.backgroundColor = '#fff';

		game.physics.startSystem(Phaser.Physics.ARCADE);

		this.cursor = this.game.input.keyboard.createCursorKeys();
		//var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        //space_key.onDown.add(this.fire, this); 

        this.load_map();

		this.player = this.game.add.sprite(190*32, 11*32, 'player');
		this.player.anchor.setTo(0.5, 0.5);
		this.player.direction = 2;
		this.player.animations.add('down', [1, 0, 2, 0], 6, true);
		this.player.animations.add('up', [4, 3, 5, 3], 6, true);
		this.player.animations.add('right', [7, 6, 8, 6], 6, true);
		this.player.animations.add('left', [10, 9, 11, 9], 6, true);
		this.player.alive = true;
		game.physics.arcade.enable(this.player);

		this.history = [];

		//this.bullets = game.add.group();
		//this.bullets.createMultiple(20, 'bullet');  
		
    	this.music = game.add.sound('music'); 
    	// if (sound) this.music.play('', 0, 0.4, true);
    	this.key_s = game.add.sound('key');
    	this.key_s.volume = 0.3;
    	this.heart_s = game.add.sound('heart');
    	this.heart_s.volume = 0.3;
    	this.dead_s = game.add.sound('dead');
    	this.dead_s.volume = 0.2;

		this.number_hearts = 0;

		this.dead = this.game.add.sprite(0, 0, 'dead');
		this.dead.alpha = 0;
	},

	update: function() {
		game.physics.arcade.collide(this.player, this.layer);
		// game.physics.arcade.collide(this.player, this.doors, this.touched_door, null, this);
		//game.physics.arcade.overlap(this.bullets, this.layer, this.kill_bullet, null, this);
		game.physics.arcade.overlap(this.player, this.keys, this.take_key, null, this);
		game.physics.arcade.overlap(this.player, this.hearts, this.take_heart, null, this);
		// game.physics.arcade.overlap(this.player, this.enemies, this.player_dead, null, this);
		// game.physics.arcade.overlap(this.enemies, this.walls, this.enemy_wall, null, this);

		this.player_movements();
		// this.camera_movements();

		this.game.camera.focusOnXY(this.player.x, this.player.y);
	},

	// enemy_wall: function(enemy, wall) {		
	// 	if (enemy.body.velocity.x > 0) {
	// 		enemy.body.velocity.x = -200;
	// 		enemy.x -= 10;
	// 	}
	// 	else if (enemy.body.velocity.x < 0) {
	// 		enemy.body.velocity.x = 200;
	// 		enemy.x += 10;
	// 	}
	// 	else if (enemy.body.velocity.y > 0) {
	// 		enemy.body.velocity.y = -200;
	// 		enemy.y -= 10;
	// 	}
	// 	else if (enemy.body.velocity.y < 0) {
	// 		enemy.body.velocity.y = 200;
	// 		enemy.y += 10;
	// 	}
	// },

	// player_dead: function() {
	// 	if (!this.player.alive)
	// 		return;

	// 	if (this.sound) this.dead_s.play();
	// 	this.player.alive = false;
	// 	var t = game.add.tween(this.dead).to({alpha:1}, 100).start();
	// 	t.onComplete.add(function(){
	// 		this.player.reset(w/2, 80);
	// 		game.camera.reset(0, 0);
	// 		this.camera = {x:0, y:0};
	// 		game.add.tween(this.dead).to({alpha:0}, 1200).start();
	// 		this.player.alive = true;
	// 	}, this);
	// },

	// touched_door: function() {
	// 	if (this.player.body.touching.down)
	// 		this.player.y -= 1;
	// 	else if (this.player.body.touching.up)
	// 		this.player.y += 1;		
	// 	else if (this.player.body.touching.left)
	// 		this.player.x += 1;
	// 	else if (this.player.body.touching.right)
	// 		this.player.x -= 1;
	// },

	take_heart: function(player, heart) {
		if (sound) this.key_s.play();
		heart.kill();

		var follower = this.game.add.existing(
			new Follower(this.game, this.player.x, this.player.y, followers.length ? followers[followers.length - 1] : this.player)
		)
		followers.push(follower);
	},

	// open_door: function(id) {
	// 	this.doors.forEach(function(d) {
	// 		if (d.key_id == id) {
	// 			var t = game.add.tween(d.scale).to({x:0, y:0}, 300).start();
	// 			t.onComplete.add(function(){this.kill()}, d);				
	// 		}
	// 	}, this);		
	// },

	take_key: function(player, key) {
		if (!key.alive) return;
		key.alive = false;

		game.add.tween(key.scale).to({x:2, y:2}, 200).start();
		game.add.tween(key).to({alpha:0}, 300).start();
		var t = game.add.tween(key).delay(2200).start();
		// t.onComplete.add(function(){
		// 	console.log('music please')
		// 	this.music.resume();
		// 	game.add.tween(this.music).to({volume:1}, 1000).start();
		// }, this);

		// this.music.pause();
		this.music.volume = 0;

		if (sound) this.heart_s.play();
		// key.kill();

		this.player.loadTexture('player02', 0);
	},


	/*fire: function() {
		var fire = this.bullets.getFirstDead();
		game.physics.arcade.enable(fire);
		fire.anchor.setTo(0.5, 0.5);
        fire.reset(this.player.x, this.player.y);
        fire.body.angularVelocity = 500;

        var speed = 350;
        if (this.player.direction == 1)
        	fire.body.velocity.y = -speed; 
        else if (this.player.direction == 2)
        	fire.body.velocity.y = +speed;
        else if (this.player.direction == 3)
        	fire.body.velocity.x = +speed;
        else if (this.player.direction == 4)
        	fire.body.velocity.x = -speed;
	},

	kill_bullet: function(bullet, layer) {
		bullet.kill();
	},*/

	player_movements: function() {
		this.player.body.velocity.x = 0;
		this.player.body.velocity.y = 0;

		if (!this.player.alive)
			return;

		var speed = 230;

		

		if (this.cursor.left.isDown) {
        	if (this.tween) this.player.body.velocity.x = -50;
        	else this.player.body.velocity.x = -speed;
			this.player.direction = 4;
			this.player.animations.play('left');
		}
		else if (this.cursor.right.isDown) {
        	if (this.tween) this.player.body.velocity.x = 50;
        	else this.player.body.velocity.x = speed;
			this.player.direction = 3;
			this.player.animations.play('right');
		}
		else if (this.cursor.up.isDown) {
        	if (this.tween) this.player.body.velocity.y = -50;
        	else this.player.body.velocity.y = -speed;
			this.player.direction = 1;
			this.player.animations.play('up');
		}
        else if (this.cursor.down.isDown) { 
        	if (this.tween) this.player.body.velocity.y = 50;
        	else this.player.body.velocity.y = speed;
            this.player.direction = 2;
			this.player.animations.play('down');
        }
        else {
        	if (this.player.direction == 1)
        		this.player.frame = 3;
        	else if (this.player.direction == 2)
        		this.player.frame = 0;
        	else if (this.player.direction == 3)
        		this.player.frame = 6;
        	else if (this.player.direction == 4)
        		this.player.frame = 9;

        	this.player.animations.stop();
		}
	},

	load_map: function() {
		this.game.world.setBounds(0,0,200*32, 50*32);

	    this.map = game.add.tilemap('map1');
	    this.map.addTilesetImage('tiles');
	    this.layer = this.map.createLayer('tiles');
		this.map.setCollisionBetween(1, 6);
	    this.map.setCollisionBetween(30, 38);		
	    this.layer.resizeWorld();

		this.enemies = game.add.group();
		this.keys = game.add.group();
		this.doors = game.add.group();
		this.hearts = game.add.group();
		this.walls = game.add.group();

 	    // this.map.createFromObjects('objects', 16, 'enemy', 0, true, false, this.enemies);
	    this.map.createFromObjects('objects', 32, 'heart', 0, true, false, this.hearts);
	    // this.map.createFromObjects('objects', 25, 'door', 0, true, false, this.doors);
	    // this.map.createFromObjects('objects', 4, 'wall', 0, true, false, this.walls);
	    this.map.createFromObjects('objects', 37, 'key', 0, true, false, this.keys);

		this.keys.forEach(function(d) {
			game.physics.arcade.enable(d);
			d.anchor.setTo(0.5, 0.5);
			d.x += d.width/2;
			d.y += d.height/2;
			d.alive = true;
		}, this);

		this.hearts.forEach(function(h) {
			game.physics.arcade.enable(h);
		}, this);

		// this.enemies.forEach(function(e) {
		// 	game.physics.arcade.enable(e);
		// 	if (e.move == 1)
		// 		e.body.velocity.x = 200;
		// 	else
		// 		e.body.velocity.y = 200;
		// }, this);

		// this.walls.forEach(function(e) {
		// 	game.physics.arcade.enable(e);
		// }, this);
	
		// this.doors.forEach(function(d) {
		// 	game.physics.arcade.enable(d);
		// 	d.body.immovable = true;
		// 	d.anchor.setTo(0.5, 0.5);
		// 	d.x += d.width/2;
		// 	d.y += d.height/2;
		// }, this);
	},

	game_finished: function() {
		this.open_door(4);	
		var style = { font: '25px Arial', fill: '#fff', align: 'center' };
		var label = game.add.text(this.camera.x*w+w/2, this.camera.y*h+h/2, 'congratulation!\nnow go to the South-East', style);
		label.anchor.setTo(0.5, 0.5);
		label.scale.setTo(0, 0);
		game.add.tween(label.scale).to({x:1, y: 1}, 1500, Phaser.Easing.Bounce.Out).start();
		
		var p = game.add.emitter(3.5*w, 4*h, 200);
		p.makeParticles('heart');
		p.gravity *= -1;
		p.width = 12*35;
		p.start(false, 1800, 50);

		p.maxParticleScale = 1.3;
		p.minParticleScale = 0.7;
		p.setYSpeed(-100, -200);
		p.setXSpeed(-5, 5);		
	},
};

// Follower constructor
var Follower = function(game, x, y, target) {
	Phaser.Sprite.call(this, game, x, y, 'happaly');
	
	this.animations.add('move', [1, 0, 2, 0], 6, true);
	this.animations.play('move');

    // Save the target that this Follower will follow
    // The target is any object with x and y properties
    this.target = target;

    // Set the pivot point for this sprite to the center
    this.anchor.setTo(0.5, 0.5);

    // Enable physics on this object
    this.game.physics.enable(this, Phaser.Physics.ARCADE);

    // Each Follower will record its position history in
    // an array of point objects (objects with x,y members)
    // This will be used to make each Follower follow the
    // same track as its target
    this.history = [];
    this.HISTORY_LENGTH = 10;

    // Define constants that affect motion
    this.MAX_SPEED = 240; // pixels/second
    this.MIN_DISTANCE = 48; // pixels
};

// Followers are a type of Phaser.Sprite
Follower.prototype = Object.create(Phaser.Sprite.prototype);
Follower.prototype.constructor = Follower;

Follower.prototype.update = function() {
    // Get the target x and y position.
    //
    // This algorithm will follow targets that may or may not have a position
    // history.
    //
    // The targetMoving flag tells this object when its target is moving
    // so that it knows when to move and when to stop.
    var t = {};
    var targetMoving = false;
    if (this.target.history !== undefined && this.target.history.length) {
        // This target has a history so go towards that
        t = this.target.history[0];
        if (this.target.body.velocity.x !== 0 ||
            this.target.body.velocity.y !== 0) targetMoving = true;
    } else {
        // This target doesn't have a history defined so just
        // follow its current x and y position
        t.x = this.target.x;
        t.y = this.target.y;

        // Calculate distance to target
        // If the position is far enough way then consider it "moving"
        // so that we can get this Follower to move.
        var distance = this.game.math.distance(this.x, this.y, t.x, t.y);
        if (distance > this.MIN_DISTANCE) targetMoving = true;
    }

    // If the distance > MIN_DISTANCE then move
    if (targetMoving) {
        // Add current position to the end of the history array
        this.history.push({ x: this.x, y: this.y });

        // If the length of the history array is over a certain size
        // then remove the oldest (first) element
        if (this.history.length > this.HISTORY_LENGTH) this.history.shift();

        // Calculate the angle to the target
        var rotation = this.game.math.angleBetween(this.x, this.y, t.x, t.y);

        // Calculate velocity vector based on rotation and this.MAX_SPEED
        this.body.velocity.x = Math.cos(rotation) * this.MAX_SPEED;
        this.body.velocity.y = Math.sin(rotation) * this.MAX_SPEED;
    } else {
        this.body.velocity.setTo(0, 0);
    }
};