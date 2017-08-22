import LandsWar from './LandsWar';

(async function () {
	const gameDiv = document.createElement('div');
	gameDiv.id = 'game';
	document.getElementsByTagName('body')[0].appendChild(gameDiv);

	const gameRules = {};

	try {
		gameRules.grounds = await (await fetch(`${process.env.API_URL}/grounds`)).json();
		gameRules.units = await (await fetch(`${process.env.API_URL}/units`)).json();

		const config = {
			divIdName:   gameDiv.id,
			height:      640,
			width:       1280,
			tokenPlayer: process.env.TOKEN_PLAYER,
			shortIdRoom: process.env.SHORTID_ROOM,
			socketUrl:   process.env.WEBSOCKETS_URL,
			gameRules,
		};

		const landsWar = new LandsWar(config);
		await landsWar.start();
	} catch (e) {
		console.error(e); // eslint-disable-line
	}
}());
