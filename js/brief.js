Game.Brief = function (game) { };

Game.Brief.prototype = {

	create: function() {
		this.cursor = this.game.input.keyboard.createCursorKeys();

        this.state = false
		var saeasp = game.add.sprite(w/2, 200, 'p_hanbok');
		saeasp.anchor.setTo(0.5);
        
        this.dialogIdx = 0
        this.texts = [
            '안녕하세요! 해피새아의 혼자놀기, 새아입니다.',
            // '오늘은 제 얘기를 해볼거예요.',
            // '여러분, 저 고백할게 있어요.',
            // '저 사실 사람이 아니예요.',
            '여러분, 저 고백할게 있어요. 저는 사실 요정이랍니다!  >_<',
            // '...',
            // '... ... ...',
            '... ... ... ... ...' + ' (후다닥)'
        ];

        function calltextend() {
            // console.log('yeah!!')
            this.dialogIdx++;
            this.state = true;
        }

        this.dialogue = new Dialogue(this.game);
		this.dialogue.init({
			borderThickness: 3,
			borderColor: 0x646464,
			borderAlpha: 0.5,
			windowAlpha: 0.9,
			windowColor: 0xFFFFFF,
			windowHeight: 150,
			padding: 24,
			dialogSpeed: 3.2,
			font: '28px Arial',
			fontColor: '#383838',
			textPadding: 22,
			gameWidth: w,
			gameHeight: h,
			callback: calltextend.bind(this)
		})
		this.dialogue.setText(this.texts[this.dialogIdx], true);
	},

	update: function() {
		if (this.state && this.cursor.up.isDown) {
            this.state = false;
            if(this.dialogIdx === this.texts.length) {
			    this.game.state.start('Play');
            }else {
                this.dialogue.setText(this.texts[this.dialogIdx], true);
            }
        }
	},
};