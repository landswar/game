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
		this.load.image('tiles', groundImg);
		this.load.image('cursor', cursorImg);
		this.load.image('circleNbTurn', circleNbTurnImg);
		this.game.kineticScrolling = this.game.plugins.add(Phaser.Plugin.KineticScrolling);

		const blob = new Blob([JSON.stringify(landsWarData.getMap())], {type: "application/json"})
		this.load.tilemap('ground', URL.createObjectURL(blob), null, Phaser.Tilemap.TILED_JSON);
	}

	/**
	 * Display the map.
	 */
	_displayMap() {
		this._tileMap = this.add.tilemap('ground');
		this._tileMap.addTilesetImage('standard-sun', 'tiles');

		this._groundLayer = this._tileMap.createLayer('groundLayer');
		this._groundLayer.resizeWorld();
	}

	/**
	 * Diplay the map as a background and add other elements in top of it.
	 */
	create() {
		this._displayMap();

		this._mapGroup = this.add.group();
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

		// To get Tile data : this._tileMap.getTile(0, 0, 'groundLayer');
	}

	// update() { }
}

Object.assign(StateGame.prototype, input);

export default StateGame;
