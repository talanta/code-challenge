const Enemy = require("./enemies");

/**@param {Number} fireRange */
/**@param {Enemy} enemy */
function Position(fireRange, enemy) {
  this.enemy = enemy;
  this.distance = enemy.distance;
  this.turnsToTarget = Math.ceil(enemy.distance / enemy.speed);
  this.turnsToRange = Math.ceil(
    Math.max(0, enemy.distance - fireRange) / enemy.speed
  );
}
Position.prototype.move = function() {
  this.distance -= this.enemy.speed;
  this.turnsToRange = Math.max(0, this.turnsToRange - 1);
  this.turnsToTarget = Math.max(0, this.turnsToTarget - 1);
};

/** @param {Enemy} e1*/
/** @param {Enemy} e2*/
Position.sort = function(e1, e2) {
  if (e1.turnsToTarget > e2.turnsToTarget) {
    return 1;
  }
  if (e1.turnsToTarget === e2.turnsToTarget) {
    if (e1.turnsToRange > e2.turnsToRange) {
      return 1;
    }
    if (e1.turnsToRange === e2.turnsToRange) {
      return 0;
    }
    return -1;
  }
  return -1;
};

/** @param {Enemy} e1*/
/** @param {Enemy} e2*/
Position.sortByDistance = function(e1, e2) {
  if (e1.turnsToTarget > e2.turnsToTarget) {
    return 1;
  }
  if (e1.turnsToTarget === e2.turnsToTarget) {
    return 0;
  }
  return -1;
};

module.exports = Position;
