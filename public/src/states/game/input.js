import * as Phaser from 'phaser';
import { TILE_SIZE } from './../../utils/LandsWarData';

export default {
	// _onLeftButtonDown(x, y) {
	// 	x += Math.round(this.camera.x / TILE_SIZE);
	// 	y += Math.round(this.camera.y / TILE_SIZE);
	// },

	// _onRightButtonDown(x, y) {
		// x += Math.round(this.camera.x / TILE_SIZE);
		// y += Math.round(this.camera.y / TILE_SIZE);
	// },

	_onPointerMoved(x, y) {
		this._lastPointerPos = { x, y };
		this._cursor.x = (x * TILE_SIZE) + (Math.round(this.camera.x / TILE_SIZE) * TILE_SIZE);
		this._cursor.y = (y * TILE_SIZE) + (Math.round(this.camera.y / TILE_SIZE) * TILE_SIZE);
	},

	_addMoveCallback() {
		this.input.addMoveCallback((pointer, x, y /* , downState */) => {
			x = Math.trunc(x / TILE_SIZE);
			y = Math.trunc(y / TILE_SIZE);

			// if (pointer.leftButton.isDown) {
			// 	this._onLeftButtonDown(x, y);
			// } else if (pointer.rightButton.isDown) {
			// 	this._onRightButtonDown(x, y);
			// }
			if (x !== this._lastPointerPos.x || y !== this._lastPointerPos.y) {
				this._onPointerMoved(x, y);
			}
		});
	},

	_addKeyboardCallback() {
		this.input.keyboard.onDownCallback = (e) => {
			if (e.keyCode === Phaser.Keyboard.UP) {
				this.camera.y -= TILE_SIZE;
			} else if (e.keyCode === Phaser.Keyboard.DOWN) {
				this.camera.y += TILE_SIZE;
			} else if (e.keyCode === Phaser.Keyboard.LEFT) {
				this.camera.x -= TILE_SIZE;
			} else if (e.keyCode === Phaser.Keyboard.RIGHT) {
				this.camera.x += TILE_SIZE;
			}
		};
	},
};
