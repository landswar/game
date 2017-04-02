import * as Phaser from 'phaser';
import 'phaser-kinetic-scrolling-plugin';
import input from './input';
import landsWarData, { TILE_SIZE } from './../../utils/LandsWarData';
import CircleNbTurn from './prefabs/circleNbTurn';

import groundImg from './../../assets/out/ground/standard/standard-sun.png';
import cursorImg from './../../assets/out/interface/element/cursor.png';
import circleNbTurnImg from './../../assets/out/interface/element/circle-nb-turn.png';

/**
 * StateGame is the state where the player can start playing.
 */
class StateGame extends Phaser.State {
	/**
	 * Initialize the state.
	 * @constructor
	 */
	constructor() {
		super();

		this._tileMap = null;
		this._lastPointerPos = { x: 0, y: 0 };
	}

	/**
	 * Preload sprites and plugins.
	 */
	preload() {
		this.load.image('groundImage', groundImg);
		this.load.image('cursor', cursorImg);
		this.load.image('circleNbTurn', circleNbTurnImg);
		this.game.kineticScrolling = this.game.plugins.add(Phaser.Plugin.KineticScrolling);
	}

	/**
	 * Display the map.
	 */
	_displayMap() {
		this._tileMap = this.add.tilemap();
		this._tileMap.addTilesetImage('groundImage');

		this._map = landsWarData.getMap();
		const groundLayer = this._tileMap.create('groundLayer', this._map[0].length, this._map.length, TILE_SIZE, TILE_SIZE, this._mapGroup);
		groundLayer.resizeWorld();

		for (let y = 0; y < this._map.length; ++y) {
			for (let x = 0; x < this._map[y].length; ++x) {
				this._tileMap.putTile(this._map[y][x], x, y, groundLayer);
			}
		}
	}

	/**
	 * Diplay the map as a background and add other elements in top of it.
	 */
	create() {
		this._mapGroup = this.add.group();

		this._displayMap();
		this._cursor = this.add.sprite(0, 0, 'cursor');
		this._mapGroup.add(this._cursor);

		this._circlNbTurn = new CircleNbTurn(this.game, 0);

		this._addKeyboardCallback();
		this._addMoveCallback();

		this.game.kineticScrolling.start();
		this.game.kineticScrolling.configure({
			kineticMovement:  false,
			horizontalScroll: true,
			verticalScroll:   true,
			horizontalWheel:  false,
			verticalWheel:    false,
		});
	}

	// update() { }
}

Object.assign(StateGame.prototype, input);

export default StateGame;
