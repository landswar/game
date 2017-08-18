import * as Phaser from 'phaser';

const BTN_END_OF_TURN = {
	WIDTH:         142,
	HEIGHT:        32,
	MARGIN_RIGHT:  17,
	MARGIN_BUTTOM: 18,
	FRAME_OVER:    2,
	FRAME_OUT:     0,
	FRAME_DOWN:    1,
};

/**
 * Handle the end of turn button.
 */
class BtnEndOfTurn extends Phaser.Group {
	/**
	 * Display the end of turn button.
	 * @constructor
	 * @param {Phaser} game - The Phaser instance.
	 */
	constructor(game) {
		super(game);

		this._btnEndOfTurn = new Phaser.Button(
			game, game.width - BTN_END_OF_TURN.WIDTH - BTN_END_OF_TURN.MARGIN_RIGHT,
			game.height - BTN_END_OF_TURN.HEIGHT - BTN_END_OF_TURN.MARGIN_BUTTOM,
			'btnEndOfTurn', this.onClick, this,
			BTN_END_OF_TURN.FRAME_OVER, BTN_END_OF_TURN.FRAME_OUT, BTN_END_OF_TURN.FRAME_DOWN,
		);

		this.add(this._btnEndOfTurn);
	}

	/**
	 * Fired when we click on the button.
	 */
	onClick() {
		this._btnEndOfTurn.inputEnabled = false;
	}
}

export { BtnEndOfTurn as default, BTN_END_OF_TURN };
