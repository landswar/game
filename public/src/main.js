import LandsWar from './LandsWar';

(function () {
	const gameDiv = document.createElement('div');
	gameDiv.id = 'game';
	document.getElementsByTagName('body')[0].appendChild(gameDiv);

	const config = {
		divIdName:   gameDiv.id,
		height:      640,
		width:       1280,
		tokenPlayer: process.env.TOKEN_PLAYER,
		shortIdRoom: process.env.SHORTID_ROOM,
		socketUrl:   process.env.WEBSOCKETS_URL,
	};

	const landsWar = new LandsWar(config);
	landsWar.start().catch((error) => {
		logger.error(error);
	});
}());
