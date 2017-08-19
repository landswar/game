import LandsWarData from './../utils/LandsWarData';
import { on, emit, EVENTS } from './../utils/LandsWarEventEmitter';

/**
 * Handle every Socket linked to the Game.
 */
class SocketGame {
	/**
	 * Save the Socket instance define listeners.
	 * @param {Socket} socket - The instance of Socket.
	 * @constructor
	 */
	constructor(socket) {
		this._socket = socket;

		this._socket.on('game:nextPlayer', (data) => {
			emit(EVENTS.EVENT_NB_TURN, data.nbTurn);
			emit(EVENTS.EVENT_YOUR_TURN, data.yourTurn);
		});

		on(EVENTS.EVENT_END_TURN, () => this.endTurn());
	}

	/**
	 * End the turn of the current player.
	 */
	async endTurn() {
		const result = await this._socket.emit('game:endTurn', LandsWarData.getAuthData());
		emit(EVENTS.EVENT_NB_TURN, result.nbTurn);
		emit(EVENTS.EVENT_YOUR_TURN, result.yourTurn);
	}
}

export default SocketGame;
