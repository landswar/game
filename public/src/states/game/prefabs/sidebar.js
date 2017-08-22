import * as Phaser from 'phaser';

import landsWarData, { FONT_FAMILY } from './../../../utils/LandsWarData';
import { on, EVENTS } from './../../../utils/LandsWarEventEmitter';
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

const UNIT = {
	TILE:  { X: 9, Y: 112 },
	TEXT:  { X: 50, Y: 118, SIZE: 18 },
	HEART: {
		X:    9,
		Y:    156,
		TEXT: { X: 49, Y: 158, SIZE: 18 },
	},
	GASOLINE: {
		X:    92,
		Y:    156,
		TEXT: { X: 121, Y: 158, SIZE: 18 },
	},
	BULLET: {
		X:    46,
		Y:    191,
		TEXT: { X: 87, Y: 195, SIZE: 18 },
	},
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
		this._unitGroup = null;

		this._createGroundPart(game);
		this._createUnitPart(game);

		this.add(this._sidebar);

		on(EVENTS.EVENT_UNIT_OVER, (unit) => {
			this._displayUnitInfos(unit);
		});

		on(EVENTS.EVENT_UNIT_OUT, () => {
			this._hideUnitInfos();
		});
	}

	/**
	 * Create the ground informations area.
	 * @param {Phaser} game - The Phaser instance.
	 */
	_createGroundPart(game) {
		this._ground = new Phaser.Sprite(game, GROUND.TILE.X, GROUND.TILE.Y, 'tiles');

		this._groundName = new Phaser.Text(game, GROUND.TEXT.X, GROUND.TEXT.Y, '', {
			font: `${GROUND.TEXT.SIZE}px '${FONT_FAMILY}'`,
			fill: 'black',
		});
		this._sidebar.addChild(this._groundName);

		this._shields = []; // TODO: Maybe a Phaser.Group is better?
		this._shields.push(new Phaser.Sprite(game, SHIELD.X, SHIELD.Y, 'shield', 1));
		this._shields.push(new Phaser.Sprite(game, SHIELD.X + SHIELD.WIDTH + SHIELD.MARGIN, SHIELD.Y, 'shield', 1));
		this._shields.push(new Phaser.Sprite(game, SHIELD.X + (SHIELD.WIDTH * 2) + (SHIELD.MARGIN * 2), SHIELD.Y, 'shield', 1));
		this._shields.push(new Phaser.Sprite(game, SHIELD.X + (SHIELD.WIDTH * 3) + (SHIELD.MARGIN * 3), SHIELD.Y, 'shield', 1));

		this._sidebar.addChild(this._ground);
		this._shields.forEach((shield) => this._sidebar.addChild(shield));
	}

	/**
	 * Create the unit informations area.
	 * @param {Phaser} game - The Phaser instance.
	 */
	_createUnitPart(game) {
		this._unitGroup = new Phaser.Group(game);

		this._unit = new Phaser.Sprite(game, UNIT.TILE.X, UNIT.TILE.Y, 'unitRed');
		this._unitGroup.addChild(this._unit);

		this._unitHeart = new Phaser.Sprite(game, UNIT.HEART.X, UNIT.HEART.Y, 'heart');
		this._unitHeartText = new Phaser.Text(game, UNIT.HEART.TEXT.X, UNIT.HEART.TEXT.Y, '', {
			font: `${UNIT.HEART.TEXT.SIZE}px '${FONT_FAMILY}'`,
			fill: 'black',
		});
		this._unitGroup.addChild(this._unitHeart);
		this._unitGroup.addChild(this._unitHeartText);

		this._unitGasoline = new Phaser.Sprite(game, UNIT.GASOLINE.X, UNIT.GASOLINE.Y, 'gasoline');
		this._unitGasolineText = new Phaser.Text(game, UNIT.GASOLINE.TEXT.X, UNIT.GASOLINE.TEXT.Y, '', {
			font: `${UNIT.GASOLINE.TEXT.SIZE}px '${FONT_FAMILY}'`,
			fill: 'black',
		});
		this._unitGroup.addChild(this._unitGasoline);
		this._unitGroup.addChild(this._unitGasolineText);

		this._unitBullet = new Phaser.Sprite(game, UNIT.BULLET.X, UNIT.BULLET.Y, 'bullet');
		this._unitBulletText = new Phaser.Text(game, UNIT.BULLET.TEXT.X, UNIT.BULLET.TEXT.Y, '', {
			font: `${UNIT.BULLET.TEXT.SIZE}px '${FONT_FAMILY}'`,
			fill: 'black',
		});
		this._unitGroup.addChild(this._unitBullet);
		this._unitGroup.addChild(this._unitBulletText);

		this._unitName = new Phaser.Text(game, UNIT.TEXT.X, UNIT.TEXT.Y, '', {
			font: `${UNIT.TEXT.SIZE}px '${FONT_FAMILY}'`,
			fill: 'black',
		});
		this._unitGroup.addChild(this._unitName);

		this._unitGroup.visible = false;

		this._sidebar.addChild(this._unitGroup);
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

	/**
	 * Display unit informations.
	 * @param {Object} unitInfos - An Object with the current state of the Unit and default infos.
	 */
	_displayUnitInfos({ unit, unitDefault }) {
		if (!this._unitGroup) {
			return;
		}

		this._unit.frame = unitDefault.id - 1;
		this._unitName.setText(LandsWarLocales.t(unitDefault.name));

		this._unitHeartText.setText(unit.life.toString());
		this._unitBulletText.setText(unit.ammo1.toString());
		this._unitGasolineText.setText(unit.fuel.toString());

		this._unitGroup.visible = true;
	}

	/**
	 * Hide unit informations.
	 */
	_hideUnitInfos() {
		if (!this._unit) {
			return;
		}

		this._unitGroup.visible = false;
	}
}

export { Sidebar as default, SHIELD };
