import * as Phaser from 'phaser';

import landsWarData, { FONT_FAMILY } from './../../../utils/LandsWarData';
import LandsWarLocales from './../../../utils/LandsWarLocales';

const SIDEBAR = {
	MARGIN_RIGHT:  10,
	MARGIN_BOTTOM: 75,
	WIDTH:         160,
	HEIGHT:        240,
};

const GROUND = {
	TILE: { X: 9, Y: 12 },
	TEXT: { X: 50, Y: 18, SIZE: 18 },
};

const SHIELD = {
	X:      30,
	Y:      50,
	WIDTH:  20,
	HEIGHT: 24,
	MARGIN: 7,
};

/**
 * Handle the Phaser element which will display the current sidebar of the game.
 * The sidebar display informations about the ground, the unit and a button to end the turn.
 */
class Sidebar extends Phaser.Group {
	/**
	 * Put every elements in a Phaser group to display the sidebar.
	 * @constructor
	 * @param {Phaser} game - The Phaser instance.
	 */
	constructor(game) {
		super(game);

		this._sidebar = new Phaser.Sprite(game, game.width - SIDEBAR.WIDTH - SIDEBAR.MARGIN_RIGHT, game.height - SIDEBAR.HEIGHT - SIDEBAR.MARGIN_BOTTOM, 'sidebar');
		this._sidebar.fixedToCamera = true;

		this._ground = null;

		this._groundName = new Phaser.Text(game, GROUND.TEXT.X, GROUND.TEXT.Y, '', {
			font: `${GROUND.TEXT.SIZE}px '${FONT_FAMILY}'`,
			fill: 'black',
		});

		this._sidebar.addChild(this._groundName);

		this._createGroundPart(game);

		this.add(this._sidebar);
	}

	/**
	 * Create the ground informations area.
	 * @param {Phaser} game - The Phaser instance.
	 */
	_createGroundPart(game) {
		this._ground = new Phaser.Sprite(game, GROUND.TILE.X, GROUND.TILE.Y, 'tiles');

		this._shields = []; // TODO: Maybe a Phaser.Group is better?
		this._shields.push(new Phaser.Sprite(game, SHIELD.X, SHIELD.Y, 'shield', 1));
		this._shields.push(new Phaser.Sprite(game, SHIELD.X + SHIELD.WIDTH + SHIELD.MARGIN, SHIELD.Y, 'shield', 1));
		this._shields.push(new Phaser.Sprite(game, SHIELD.X + (SHIELD.WIDTH * 2) + (SHIELD.MARGIN * 2), SHIELD.Y, 'shield', 1));
		this._shields.push(new Phaser.Sprite(game, SHIELD.X + (SHIELD.WIDTH * 3) + (SHIELD.MARGIN * 3), SHIELD.Y, 'shield', 1));

		this._sidebar.addChild(this._ground);
		this._shields.forEach((shield) => this._sidebar.addChild(shield));
	}

	/**
	 * Return an Object with ground informations.
	 * @param {Number} index - The index of the current tile under the cursor.
	 * @return {Object} An Object with ground informations.
	 */
	_getGroundInfos(index) {
		const realIndex = index - 1;

		if (realIndex >= 2 && realIndex <= 8) {
			return {
				name:    'road',
				defense: landsWarData.getRules().grounds[3].defense,
			};
		}

		const groundRule = landsWarData.getRules().grounds[realIndex];

		return {
			name:    groundRule.name,
			defense: groundRule.defense,
		};
	}

	/**
	 * Display the ground tile and the ground defense.
	 * @param {Object} param - An Object with the current tile index and its position.
	 */
	displayGroundInfos({ index }) {
		if (!this._groundName || !this._ground) {
			return;
		}

		this._ground.frame = index - 1;

		const groundInfos = this._getGroundInfos(index);
		this._groundName.setText(LandsWarLocales.t(groundInfos.name));

		this._shields.forEach((shield, i) => {
			shield.frame = i < groundInfos.defense ? 0 : 1;
		});
	}
}

export { Sidebar as default, SHIELD };
