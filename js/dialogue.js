function Dialogue(game) {
    "use strict";
    this.game = game;
}

Dialogue.prototype.next = function() {
    this.index++;
    if (this.index >= this.texts.length) {
        this.index = 0;
    }
    this.text = this.texts[this.index];
};

Dialogue.prototype.previous = function() {
    this.index--;
    if (this.index < 0) {
        this.index = this.texts.length + this.index;
    }
    this.text = this.texts[this.index];
};

Dialogue.prototype.generate = function() {
    var index = 0;
    var text = this.text;
    var iterator = function() {
        index++;
        return text.substr(0, index);
    };
    return iterator;
};

// Initialize the dialog modal
Dialogue.prototype.init = function(opts) {
    // Check to see if any optional parameters were passed
    if (!opts) opts = {};

    this.borderThickness = opts.borderThickness || 3;
    this.borderColor = opts.borderColor || 0x646464;
    this.borderAlpha = opts.borderAlpha || 0.5;
    this.windowAlpha = opts.windowAlpha || 0.9;
    this.windowColor = opts.windowColor || 0xFFFFFF;
    this.windowHeight = opts.windowHeight || 150;
    this.padding = opts.padding || 24;
    this.dialogSpeed = opts.dialogSpeed || 3.2;
    this.gameWidth = opts.gameWidth || 400;
    this.gameHeight = opts.gameHeight || 100;
    this.font = opts.font || '28px Arial';
    this.fontColor = opts.fontColor || '#383838';
    this.textPadding = opts.textPadding || 22;
    this.callback = opts.callback || function () {}
    

    this.graphics = this.game.add.graphics(0, 0);
    this.graphics.fixedToCamera = true;
    // this.graphics.cameraOffset.setTo(0, 0);

    this.eventCounter = 0;
    this.visible = true;
    this.text;
    this.dialog;
    this.endlabel;

    // Create the dialog window
    var x = this.padding;
    var y = this.gameHeight - this.windowHeight - this.padding;
    var rectWidth = this.gameWidth - (this.padding * 2);
    var rectHeight = this.windowHeight;

    this.graphics.beginFill(this.windowColor, this.windowAlpha);
    this.graphics.drawRect(x + 1, y + 1, rectWidth - 1, rectHeight - 1);
    this.graphics.endFill();
    this.graphics.lineStyle(this.borderThickness, this.borderColor, this.borderAlpha);
    this.graphics.drawRect(x, y, rectWidth, rectHeight);
}

Dialogue.prototype.setText = function(text, animate) {
    // Reset the dialog
    this.eventCounter = 0;
    this.dialog = text.split('');
    if (this.timedEvent) this.game.time.events.remove(this.timedEvent);
    
    var tempText = animate ? '' : text;
    if (this.text) this.text.destroy();
    if (this.endlabel) this.endlabel.destroy();
        
    var x = this.padding + this.textPadding;
    var y = this.gameHeight - this.windowHeight - this.padding + this.textPadding;
    
    this.text = this.game.add.text(x, y, tempText, {
        font: this.font,
        fill: this.fontColor,
        align: 'left',
        lineSpacing: 26,
        wordWrap: true,
        wordWrapWidth: this.gameWidth - (this.padding * 2) - (this.textPadding * 2)
    });
    this.graphics.addChild(this.text)
    
    if (animate) {
        this.timedEvent = this.game.time.events.loop(
            150 - (this.dialogSpeed * 30), this._animateText, this);
    }
}

Dialogue.prototype._animateText = function() {
    this.eventCounter++;
    // console.log('dialogue: ' + this.text.text + this.dialog[this.eventCounter - 1]);
    this.text.setText(this.text.text + this.dialog[this.eventCounter - 1]);
    if (this.eventCounter === this.dialog.length) {
        this.game.time.events.remove(this.timedEvent);
        this.game.time.events.add(Phaser.Timer.SECOND * 0.6, function() {
            var label = game.add.text(this.gameWidth - this.padding - this.textPadding,
                this.gameHeight - this.padding - this.textPadding, '>>', { font: '24px Arial', fill: '#111111' });
            label.anchor.setTo(1,0.5);
            label.alpha = 0;
            label.fixedToCamera = true;
            game.add.tween(label).delay(600).to({ alpha: 1}, 1000).to({ alpha: 0.2}, 500).loop().start();
            // game.add.tween(label).to({y: h-65}, 500).to({y: h-60}, 500).start();
            this.endlabel = label
            this.graphics.addChild(this.endlabel)
            this.callback();
        }, this);
    }
}

Dialogue.prototype.destroy = function() {
    if (this.text) this.text.destroy();
    if (this.endlabel) this.endlabel.destroy();
    this.graphics.destroy();
}

try {
module.exports = Dialogue;
} catch (err) {
window.Dialogue = Dialogue;
}
