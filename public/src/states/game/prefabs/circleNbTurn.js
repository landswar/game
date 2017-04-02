import * as Phaser from 'phaser';

const MARGIN = 10;
const SPRITE_SIZE = 50;

/**
 * Handle the Phaser element which will display the current number of turn in the game.
 */
class CircleNbTurn extends Phaser.Group {
	/**
	 * Put every elements in a Phaser group to display the number of turn.
	 * @constructor
	 * @param {Phaser} game - The Phaser instance.
	 * @param {Number} nbTurn - The current number of turn.
	 */
	constructor(game, nbTurn) {
		super(game);

		this._nbTurn = nbTurn;

		this._circle = new Phaser.Sprite(game, MARGIN, game.height - SPRITE_SIZE - MARGIN, 'circleNbTurn');
		this._circle.fixedToCamera = true;

		this._nbTurnText = new Phaser.Text(game, 0, 0, this._nbTurn.toString(), {
			font: '28px Track',
			fill: 'white',
		});
		this._setTextPosition(this._nbTurn);

		this._circle.addChild(this._nbTurnText);
		this.add(this._circle);
	}

	/**
	 * Set the text position.
	 * @param {Number} nbTurn - The current number of turn.
	 */
	_setTextPosition(nbTurn) {
		this._nbTurnText.y = 7;
		if (nbTurn < 10) {
			this._nbTurnText.x = 15;
		} else if (nbTurn < 100) {
			this._nbTurnText.x = 7;
		}
	}

	/**
	 * Increment the number of turn.
	 */
	incrementNbTurn() {
		++this._nbTurn;
	}
}

export default CircleNbTurn;
