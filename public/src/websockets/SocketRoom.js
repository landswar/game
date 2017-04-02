/**
 * Handle every Socket linked to the Room.
 */
class SocketRoom {
	/**
	 * Save the Socket instance.
	 * @param {Socket} socket - The instance of Socket.
	 * @constructor
	 */
	constructor(socket) {
		this._socket = socket;
	}

	/**
	 * Join a room to start the game.
	 * @param {String} tokenPlayer - The token of the player.
	 * @param {String} shortIdRoom - The shortid of the room.
	 * @return {Promise} A Promise with the received data.
	 */
	join(tokenPlayer, shortIdRoom) {
		return this._socket.emit('room:join', {
			tokenPlayer,
			shortIdRoom,
		});
	}
}

export default SocketRoom;
