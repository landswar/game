import LandsWarData from './../utils/LandsWarData';
import { on, emit, EVENTS } from './../utils/LandsWarEventEmitter';

/**
 * Handle every Socket linked to the Unit.
 */
class SocketGame {
	/**
	 * Save the Socket instance define listeners.
	 * @param {Socket} socket - The instance of Socket.
	 * @constructor
	 */
	constructor(socket) {
		this._socket = socket;

		this._socket.on('unit:moved', (data) => {
			emit(EVENTS.EVENT_UNIT_MOVED, data);
		});

		try {
			on(EVENTS.EVENT_UNIT_MOVE, (data) => this.unitMove(data));
		} catch (e) {
			logger.error(e);
		}
	}

	/**
	 * End the turn of the current player.
	 */
	async endTurn() {
		const result = await this._socket.emit('game:endTurn', LandsWarData.getAuthData());
		emit(EVENTS.EVENT_NB_TURN, result.nbTurn);
		emit(EVENTS.EVENT_YOUR_TURN, result.yourTurn);
	}

	/**
	 * Move an Unit.
	 * @param {Object} data - An Object with Unit ID and its new position.
	 */
	async unitMove(data) {
		await this._socket.emit('unit:move', Object.assign(LandsWarData.getAuthData(), data));

		emit(EVENTS.EVENT_UNIT_MOVED, data);
	}
}

export default SocketGame;
