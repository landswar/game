import * as Phaser from 'phaser';

import landsWarData, { TILE_SIZE } from './../../../utils/LandsWarData';
import { emit, EVENTS } from './../../../utils/LandsWarEventEmitter';

/**
 * Handle move squares.
 */
class MoveSquares extends Phaser.Group {
	/**
	 * Initialize values to display move squares.
	 * @constructor
	 * @param {Phaser} game - The Phaser instance.
	 * @param {Object} unitData - An Object which contains the current state of the Unit.
	 */
	constructor(game, unitData) {
		super(game);

		this._unitData = unitData;
		this._moveSquares = [];

		const baseDirections = {
			UP:    (y) => y - 1,
			DOWN:  (y) => y + 1,
			LEFT:  (x) => x - 1,
			RIGHT: (x) => x + 1,
		};

		this._directions = {
			UP:         (x, y) => ({ x, y: baseDirections.UP(y) }),
			UP_LEFT:    (x, y) => ({ x: baseDirections.LEFT(x), y: baseDirections.UP(y) }),
			UP_RIGHT:   (x, y) => ({ x: baseDirections.RIGHT(x), y: baseDirections.UP(y) }),
			DOWN:       (x, y) => ({ x, y: baseDirections.DOWN(y) }),
			DOWN_LEFT:  (x, y) => ({ x: baseDirections.LEFT(x), y: baseDirections.DOWN(y) }),
			DOWN_RIGHT: (x, y) => ({ x: baseDirections.RIGHT(x), y: baseDirections.DOWN(y) }),
			LEFT:       (x, y) => ({ x: baseDirections.LEFT(x), y }),
			RIGHT:      (x, y) => ({ x: baseDirections.RIGHT(x), y }),
		};

		Object.keys(this._directions).forEach((directionKey) => {
			const baseMove = landsWarData.getUnitInfos(unitData.id).move;
			const pos = { x: unitData.x, y: unitData.y };

			this._putSquareInDirection(game, directionKey, baseMove, pos);
		});

		this._putSquareAtPos(game, { x: unitData.x, y: unitData.y });

		this._moveSquares.forEach((moveSquare) => {
			this.add(moveSquare);
		});
	}

	/**
	 * Put a square at a given position.
	 * @param {Phaser} game - The Phaser instance.
	 * @param {Object} pos - The position Object.
	 */
	_putSquareAtPos(game, { x, y }) {
		const square = new Phaser.Sprite(game, x * TILE_SIZE, y * TILE_SIZE, 'move');

		square.inputEnabled = true;
		square.events.onInputDown.add(() => this._onClick({ x, y }), this);

		this._moveSquares.push(square);
	}

	/**
	 * Apply the method associated with the key to the position.
	 * @param {String} directionKey - The direction key from directions Object.
	 * @param {Object} pos - The position Object.
	 * @return {Object} An Object position.
	 */
	_applyDirection(directionKey, { x, y }) {
		return this._directions[directionKey](x, y);
	}

	/**
	 * Put every square in a given direction.
	 * @param {Phaser} game - The Phaser instance.
	 * @param {String} directionKey - The direction key from directions Object.
	 * @param {Number} move - The remaining unit move.
	 * @param {Object} pos - The position Object.
	 */
	_putSquareInDirection(game, directionKey, move, pos) {
		let noMove = false;

		while (move > 0 && !noMove) {
			pos = this._applyDirection(directionKey, pos);
			const complexDir = !!directionKey.includes('_');
			if (complexDir && move > 1) {
				move -= 2;
			} else if (!complexDir) {
				--move;
			} else {
				noMove = true;
			}

			if (!noMove) {
				this._putSquareAtPos(game, pos);

				if (complexDir) {
					this._putSquareInDirection(game, directionKey.split('_')[0], move, pos);
					this._putSquareInDirection(game, directionKey.split('_')[1], move, pos);
				}
			}
		}
	}

	/**
	 * Fired when we clicked on a square.
	 * @param {Number} squareIndex - The index of the square in _moveSquares.
	 * @param {Object} pos - The position Object.
	 */
	_onClick({ x, y }) {
		emit(EVENTS.EVENT_UNIT_MOVE, {
			redisIdUnit: this._unitData.redisId,
			x,
			y,
		});
		this.destroy();
	}
}

export default MoveSquares;

