import * as Phaser from 'phaser';

import loglevel from 'loglevel';

import StateGame from './states/game/StateGame';
import landsWarData from './utils/LandsWarData';
import LandsWarError from './utils/LandsWarError';
import LandsWarLocales from './utils/LandsWarLocales';
import Socket from './websockets/Socket';
import SocketRoom from './websockets/SocketRoom';

/**
 * LandsWar is the main class and the entry point of the Phaser game.
 */
class LandsWar extends Phaser.Game {
	/**
	 * Start the instance of Phaser, connect to the socket server and set useful data.
	 * @param {Object} config - The configuration Object for the game.
	 * @constructor
	 */
	constructor(config) {
		LandsWar.checkConfig(config);
		super(config.width, config.height, Phaser.AUTO, config.divIdName);

		if (!config.logLevel) {
			config.logLevel = loglevel.levels.DEBUG;
		}

		landsWarData.setRules(config.gameRules);

		window.logger = loglevel;
		logger.setLevel(config.logLevel);

		this._config = config;

		this._socket = new Socket(config.socketUrl,
			() => { this._connect(); },
			() => { this._disconnect(); },
		);
		this._socketRoom = new SocketRoom(this._socket);

		this._createState();
	}

	/**
	 * Check if the config object is valid.
	 * @param {Object} config - The config object.
	 */
	static checkConfig(config) {
		const configDefinition = ['divIdName', 'height', 'width', 'tokenPlayer', 'shortIdRoom', 'socketUrl'];
		const configProp = Reflect.ownKeys(config);

		configDefinition.forEach((item) => {
			if (configProp.indexOf(item) === -1) {
				throw new LandsWarError(item, 'Property not found');
			}
		});

		if (!document.getElementById(config.divIdName)) {
			throw new LandsWarError(config.divIdName, 'Div not found');
		} else if (config.height < 0 || config.width < 0) {
			throw new LandsWarError({ height: config.height, width: config.width }, 'Invalid dimension');
		} else if (typeof config.tokenPlayer !== 'string' || typeof config.shortIdRoom !== 'string') {
			throw new LandsWarError({ tokenPlayer: config.tokenPlayer, shortIdRoom: config.shortIdRoom }, 'Invalid token/shortid');
		} else if (config.logLevel && typeof config.logLevel !== 'number') {
			throw new LandsWarError(config.logLevel, 'Invalid logLevel');
		}
	}

	/**
	 * Create every state of the game for Phaser.
	 */
	_createState() {
		this.state.add('game', StateGame);
	}

	/**
	 * Call when the client is connected with the server.
	 */
	_connect() {
		logger.info('Connected with the server.');
	}

	/**
	 * Call when the client is disconnected with the server.
	 */
	_disconnect() {
		logger.info('Disconnected with the server.');
	}

	/**
	 * Start the game by joining the room and starting the first state.
	 */
	async start() {
		await LandsWarLocales.init();
		const result = await this._socketRoom.join(this._config.tokenPlayer, this._config.shortIdRoom);
		if (result.statusCode) {
			throw new LandsWarError(result, result.message);
		}
		landsWarData.setMapAndPlayers(result.players, result.map);
		this.state.start('game');
	}
}

export default LandsWar;
