//@ts-check
const Game = require("./game");
const Enemy = require("./enemies");

module.exports = function(input = "") {
  const lines = input.split("\n");
  const fireRange = parseInt(lines[0].substr(0, lines[0].length - 1));
  const game = new Game(
    fireRange,
    lines
      .slice(1)
      .map(el => el.split(" "))
      .map(
        el =>
          new Enemy(
            el[0],
            parseInt(el[1].substr(0, el[1].length - 1)),
            parseInt(el[2].substr(0, el[2].length - 1))
          )
      )
  );
  const en = game.initiliaze();
  while (game.nexRun(en));
  game.finish(en);
  return game.log.join("\n");
};
