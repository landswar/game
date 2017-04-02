# LandsWar - Game

[![dependency status](https://david-dm.org/landswar/game.svg)](https://david-dm.org/landswar/game)
[![dev-dependencies status](https://david-dm.org/landswar/game/dev-status.svg)](https://david-dm.org/landswar/game#info=devDependencies)

The LandsWar game created with [Phaser.io](http://phaser.io/).

## What is LandsWar?

LandsWar is a turn-based tactics online video game inspired by Advance Wars.

There are 3 types of units in the game (we don't have define the number of units in each category):

- ground units
- air units
- naval units

Also, there are a lot of different type of ground with bonus or malus for units.

With LandsWar, you will be able to play against your friend and people from all around the world.

## How to play?

Coming soon...

## How to run locally?

First, you need to run the server: [https://github.com/landswar/server](https://github.com/landswar/server)

When the server is started, you will have to create an account and a room.
When you have your ```token``` and the ```shortid``` of the room, you need to set two ENV variables:
```bash
export TOKEN_PLAYER='your token'
export SHORTID_ROOM='shortid of the room'
```

Then, you can clone the repo (the recursive mode is to clone also the [assets submodule repository](https://github.com/landswar/assets)), install dependencies and start the Webpack dev server:

```bash
git clone https://github.com/landswar/game.git --recursive
# or by ssh: git clone git@github.com:landswar/game.git --recursive
cd game
npm install
npm start
```

The game will be available at ```http://127.0.0.1:9000/```

### NPM commands

- ```npm run build``` To build the game.
- ```npm run watch``` To build again the game when a file is modified.
- ```npm run lint``` To run the ESLint code check.
- ```npm run fix-code``` To fix simple norm errors with ESLint.

## Questions / Bugs

If you find a bug or want a new feature, don't hesitate to [create an issue](https://github.com/landswar/game/issues).

## License

[GNU AFFERO GENERAL PUBLIC LICENSE](LICENSE)