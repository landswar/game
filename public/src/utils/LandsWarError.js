/**
 * LandsWarError is a custom Error class.
 */
class LandsWarError extends Error {
	/**
	 * Set the message and the name of the Error.
	 * @param {Object} value - The value of the error element.
	 * @param {String} message - The error message.
	 */
	constructor(value, message) {
		super(message);

		this.message = `${value}: ${message}`;
		this.name = 'LandsWarError';
	}
}

export default LandsWarError;
