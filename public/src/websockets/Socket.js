import io from 'io'; // eslint-disable-line

/**
 * Socket is a wrapper of Socket.io.
 */
class Socket {
	/**
	 * Connect to the server.
	 * @param {String} url - The url of the server.
	 * @param {Function} onConnect - Called when the client is connected to the server.
	 * @param {Function} onDisconnect - Called when the client is disconnected with the server.
	 * @constructor
	 */
	constructor(url, onConnect, onDisconnect) {
		this._socket = io.connect(url);

		this._socket.on('connect', onConnect);
		this._socket.on('disconnect', onDisconnect);
	}

	/**
	 * Call the method "on" of socket.io.
	 * @param {String} event - The name of the event to watch.
	 * @param {Function} callback - A function who will be called whe the event is fired.
	 */
	on(event, callback) {
		this._socket.on(event, callback);
	}

	/**
	 * Call the method "emit" of socket.io.
	 * @param {String} event - The name of the event to emit.
	 * @param {Object} data - The data to sent.
	 * @return {Promise} A Promise with the received data.
	 */
	emit(event, data) {
		return new Promise((resolve, reject) => {
			this._socket.emit(event, data, (result) => {
				if (result.statusCode) {
					reject(result);
					return;
				}
				resolve(result);
			});
		});
	}
}

export default Socket;
