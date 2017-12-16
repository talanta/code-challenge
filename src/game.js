//@ts-check
const Enemy = require("./enemies");
const Position = require("./position");
const checkRangePerformance = require("./checkRangePerformance");

/** @param {Number} fireRange*/
/** @param {Array<Enemy>} enemies*/
function Game(fireRange, enemies) {
  this.iteration = 0;
  this.fireRange = fireRange;
  this.board = enemies;
  this.log = ["Firing range is " + fireRange + "m"];
}

Game.prototype.guessFiringRange = function() {
  if (this.board.length > 0) {
    const orderByDistance = this.board
      .map(e => new Position(this.fireRange, e))
      // @ts-ignore
      .sort(Position.sortByDistance);

    const bestRange = [];
    const ko = [];
    const ranges = orderByDistance.forEach((el, x) => {
      let it = x;
      while (it < el.turnsToTarget) {
        let topRange = el.distance - it * el.enemy.speed;
        if (topRange <= 0) {
          break;
        }
        if (
          !bestRange.find(v => v <= topRange) &&
          !ko.find(v => topRange <= v)
        ) {
          if (checkRangePerformance(topRange, orderByDistance, 0, 0).check) {
            bestRange.push(topRange);
          } else {
            ko.push(topRange);
            return;
          }
        }
        it++;
      }
    });
    return bestRange.sort((x, y) => x - y)[0];
  }
};
Game.prototype.initiliaze = function() {
  const enemies = this.board
    .map(e => new Position(this.fireRange, e))
    //@ts-ignore
    .sort(Position.sort);

  return enemies;
};
/** @param {Array<Position>} enemies*/
Game.prototype.nexRun = function(enemies) {
  const isOver =
    enemies.length === 0 || enemies.findIndex((v, i) => v.distance <= 0) >= 0;

  if (isOver) {
    return false;
  }
  this.iteration++;

  if (enemies[0].turnsToRange === 0) {
    const en = enemies.shift();
    this.log.push(
      "Turn " +
        this.iteration +
        ": Kill " +
        en.enemy.name +
        " at " +
        en.distance +
        "m"
    );
  }
  enemies.forEach(el => el.move());
  return true;
};
/** @param {Array<Position>} enemies*/
Game.prototype.finish = function(enemies) {
  const win = enemies.length === 0;
  this.log.push(
    (win ? "You win in " : "You lost in ") + this.iteration + " turns"
  );
  if (!win) {
    const range = this.guessFiringRange();
    this.log.push("The minimal fire range to win should be: " + range + "m");
  }
};

module.exports = Game;
