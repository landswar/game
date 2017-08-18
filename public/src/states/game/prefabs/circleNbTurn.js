import * as Phaser from 'phaser';

import { on, EVENTS } from './../../../utils/LandsWarEventEmitter';

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
	 */
	constructor(game) {
		super(game);

		this._nbTurn = 0;

		this._circle = new Phaser.Sprite(game, MARGIN, game.height - SPRITE_SIZE - MARGIN, 'circleNbTurn');
		this._circle.fixedToCamera = true;

		game.time.events.add(Phaser.Timer.SECOND, () => {
			this._nbTurnText = new Phaser.Text(game, 0, 0, this._nbTurn.toString(), {
				font: '28px Track',
				fill: 'white',
			});
			this._updateText();

			on(EVENTS.EVENT_NB_TURN, (nbTurn) => {
				this._nbTurn = nbTurn;

				this._updateText();
			});

			this._circle.addChild(this._nbTurnText);
		});

		this.add(this._circle);
	}

	/**
	 * Update the text.
	 */
	_updateText() {
		this._nbTurnText.setText(this._nbTurn.toString());
		this._nbTurnText.y = 7;
		if (this._nbTurn < 10) {
			this._nbTurnText.x = 15;
		} else if (this._nbTurn < 100) {
			this._nbTurnText.x = 7;
		}
	}
}

export default CircleNbTurn;
