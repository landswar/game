import LandsWarError from './LandsWarError';

/**
 * The LandsWarEventEmitter are methods to create a custom event system on the game.
 * When we receive data from a Socket, we can just "emit" the data and prefabs or state
 * can get value automatically to display it.
 */

const emitsWaiting = new Map();
const listeners = new Map();

const EVENTS = {
	EVENT_NB_TURN: 'EVENT_NB_TURN',
};

/**
 * Push a value to a map key.
 * @param {Map} map - The Map.
 * @param {String} key - The key.
 * @param {Object} value - The value.
 */
function addValueToMap(map, key, value) {
	if (map.has(key)) {
		map.set(key, map.get(key).push(value));
	} else {
		map.set(key, [value]);
	}
}

/**
 * Emit data to listeners.
 * @param {String} event - The name of the event.
 * @param {Object} data - The data to send to the listener.
 */
function emit(event, data) {
	if (!EVENTS.hasOwnProperty(event)) {
		throw new LandsWarError(event, 'Invalid event name');
	}

	if (!listeners.has(event)) {
		addValueToMap(emitsWaiting, event, data);
	} else {
		const callbacks = listeners.get(event);
		callbacks.forEach((value) => {
			value(data);
		});
	}
}

/**
 * Listen to an event and call the callback when the event is fired.
 * @param {String} event - The name of the event.
 * @param {Function} callback - The callback to call when the event is fired.
 */
function on(event, callback) {
	if (!EVENTS.hasOwnProperty(event)) {
		throw new LandsWarError(event, 'Invalid event name');
	} else if (typeof callback !== 'function') {
		throw new LandsWarError(event, 'The callback is not a function');
	}

	if (emitsWaiting.has(event)) {
		const datas = emitsWaiting.get(event);
		datas.forEach((data) => {
			callback(data);
		});
		emitsWaiting.delete(event);
	}

	addValueToMap(listeners, event, callback);
}

export { on, emit, EVENTS };
