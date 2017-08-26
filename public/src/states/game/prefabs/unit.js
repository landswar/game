import * as Phaser from 'phaser';

import LandsWarData, { TILE_SIZE } from '../../../utils/LandsWarData';
import { on, emit, EVENTS } from './../../../utils/LandsWarEventEmitter';
import MoveSquares from './moveSquares';

const UNIT = {
	WIDTH:  25,
	HEIGHT: 32,
};

const TEXT_LIFE = {
	X: TILE_SIZE - 12,
	Y: TILE_SIZE - 16,
};

/**
 * Handle the Phaser element which will display an Unit.
 */
class Unit extends Phaser.Group {
	/**
	 * Put every elements in a Phaser group to display an Unit.
	 * @constructor
	 * @param {Phaser} game - The Phaser instance.
	 * @param {Object} unit - The Unit Object from the Redis database.
	 */
	constructor(game, unit) {
		super(game);

		this._unitData = unit;

		this._unit = new Phaser.Sprite(game, unit.x * TILE_SIZE, unit.y * TILE_SIZE, 'unitRed', unit.id - 1);
		this._unit.inputEnabled = true;
		this._unit.events.onInputDown.add(() => this.onClick(game), this);
		this._unit.events.onInputOver.add(this.onOver, this);
		this._unit.events.onInputOut.add(this.onOut, this);

		this._unitLife = null;

		this.updateText(game);

		on(EVENTS.EVENT_UNIT_MOVED, ({ redisIdUnit, x, y }) => {
			if (this._unitData.redisId === redisIdUnit) {
				this._unit.x = x * TILE_SIZE;
				this._unit.y = y * TILE_SIZE;
				this._unitData.x = x;
				this._unitData.y = y;
			}
		});

		this.add(this._unit);
	}

	/**
	 * Display and update the text of the Unit life.
	 * @param {Phaser} game - The Phaser instance.
	 */
	updateText(game) {
		if (this._unitData.life === 10) {
			return;
		}

		if (!this._unitLife) {
			this._unitLife = new Phaser.Text(game, TEXT_LIFE.X, TEXT_LIFE.Y,
				this._unitData.life.toString(), {
					font: '15px Track',
					fill: 'white',
				},
			);
			this._unitLife.stroke = '#000000';
			this._unitLife.strokeThickness = 2;
			this._unit.addChild(this._unitLife);
		} else {
			this._unitLife.setText(this._unitData.life.toString());
		}
	}

	/**
	 * Fired when we click on the Unit.
	 * @param {Phaser} game - The Phaser instance.
	 */
	onClick(game) {
		if (this._moveSquares) {
			this._moveSquares.destroy();
		}

		this._moveSquares = new MoveSquares(game, this._unitData);
	}

	/**
	 * Fired when the cursor in on the Unit.
	 */
	onOver() {
		emit(EVENTS.EVENT_UNIT_OVER, {
			unit:        this._unitData,
			unitDefault: LandsWarData.getUnitInfos(this._unitData.id),
		});
	}

	/**
	 * Fired when the cursor in not anymore on the Unit.
	 */
	onOut() {
		emit(EVENTS.EVENT_UNIT_OUT, LandsWarData.getUnitInfos(this._unitData.id));
	}
}

export { Unit as default, UNIT };
