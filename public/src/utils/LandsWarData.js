/**
 * LandsWarData handle datas needed by the game.
 */
class LandsWarData {
	/**
	 * Initialize variables.
	 */
	constructor() {
		this._players = null;
		this._map = null;
		this._rules = null;
	}

	/**
	 * @param {String} tokenPlayer - The token of the Player.
	 * @param {String} shortIdRoom - The Short ID of the current Room.
	 */
	setAuthData(tokenPlayer, shortIdRoom) {
		this._authData = {
			tokenPlayer,
			shortIdRoom,
		};
	}

	/**
	 * Get the Auth informations to send through WebSockets.
	 * @return {Object} The Auth informations.
	 */
	getAuthData() {
		return this._authData;
	}

	/**
	 * Set an array which contains every player of the game and the map of the game.
	 * @param {Array} players - An array which contains each id of players in the game.
	 * @param {Array} map - A two dimensional array who correspond to the map of the game.
	 */
	setMapAndPlayers(players, map) {
		this._players = players;
		this._map = map;
	}

	/**
	 * Return the map of the game.
	 * @return {Array} An array who corresponds to the map.
	 */
	getMap() {
		return this._map;
	}

	/**
	 * Set the Rules of the game.
	 * @param {Object} rules - An Object which contains every rules fetched from the API.
	 */
	setRules(rules) {
		this._rules = rules;
	}

	/**
	 * Get the Rules of the game.
	 * @return {Object} An Object which contains every rules fetched from the API.
	 */
	getRules() {
		return this._rules;
	}

	/**
	 * Get informations about an unit.
	 * @param {Number} id - The unique ID of the Unit.
	 * @return {Object} The Unit Object.
	 */
	getUnitInfos(id) {
		return this._rules.units.find((unit) => unit.id === id);
	}
}

export const TILE_SIZE = 32;
export const FONT_FAMILY = 'Track';
export default new LandsWarData();
