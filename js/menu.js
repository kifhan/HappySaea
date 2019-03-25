Game.Menu = function (game) { };

Game.Menu.prototype = {

	create: function() {
		this.cursor = this.game.input.keyboard.createCursorKeys();
		this.cutscene_num = 0;

		this.bgback = game.add.sprite(-2388,0, 'city_world');
		var bgbacktween = game.add.tween(this.bgback).to({x: 0}, Phaser.Timer.SECOND * 12).start();
		bgbacktween.repeat(-1)

		var logo = game.add.sprite(w/2, -150, 'menu');
		logo.anchor.setTo(0.5, 0.5);
		game.add.tween(logo).to({ y: 120 }, 1000, Phaser.Easing.Bounce.Out).start();

		// this.saeasp = game.add.sprite(w/2, h-70, 'hapsae_pink');
		// this.saeasp.anchor.setTo(0.5, 1);

		var label = game.add.text(w/2, h-40, 'press the UP arrow key to start', { font: '16px Arial', fill: '#5a5fa8' });
		label.anchor.setTo(0.5, 0.5);
		label.alpha = 0;
		game.add.tween(label).delay(500).to({ alpha: 1}, 500).start();
		game.add.tween(label).to({y: h-45}, 500).to({y: h-40}, 500).loop().start();

		// this.sound_toggle = this.game.add.button(w-50, 50, 'sound', this.toggle_sound, this);
		// this.sound_toggle.anchor.setTo(1, 0);
		// game.add.tween(this.sound_toggle).delay(500).to({ alpha: 1}, 500).start();
		
		this.hapsae_walk = this.game.add.sprite(w/2, h-70, 'hapsae_walk');
		this.hapsae_walk.anchor.setTo(0.5, 1);
		this.hapsae_walk.scale.setTo(2,2)
		this.hapsae_walk.animations.add('walk', [0, 1, 2, 3], 4, true);
		this.hapsae_walk.animations.play('walk');
	},

	update: function() {
		if (this.cursor.up.isDown)
			this.game.state.start('Brief');
	},

	// toggle_sound: function() {
	// 	if (this.sound_toggle.frame == 0) {
	// 		this.sound_toggle.frame = 1;
	// 		sound = false;
	// 	}
	// 	else {
	// 		this.sound_toggle.frame = 0;
	// 		sound = true;			
	// 	}
	// },

	// change_scene: function() {
	// 	if(this.cutscene_num == 0) {
			
	// 	} else if(this.cutscene_num == 1) {
	// 	} else if(this.cutscene_num == 2) {
	// 		var logo = game.add.sprite(w/2, -150, 'menu');
	// 		logo.anchor.setTo(0.5, 0.5);
	// 		game.add.tween(logo).to({ y: 120 }, 1000, Phaser.Easing.Bounce.Out).start();
	
	// 		// this.bgback.loadTexture('p_pink')
	// 		this.saeasp.loadTexture('hapsae_pink')
	
	// 		var label = game.add.text(w/2, h-60, 'press the UP arrow key to start', { font: '16px Arial', fill: '#363636' });
	// 		label.anchor.setTo(0.5, 0.5);
	// 		label.alpha = 0;
	// 		game.add.tween(label).delay(500).to({ alpha: 1}, 500).start();
	// 		game.add.tween(label).to({y: h-65}, 500).to({y: h-60}, 500).loop().start();
	// 	}
	// }
};