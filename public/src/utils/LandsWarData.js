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
}

export const TILE_SIZE = 32;
export default new LandsWarData();
