//@ts-check
/** @param {Number} distance */
/** @param {Number} speed */
function Enemy(name = "", distance, speed) {
  this.name = name;
  this.distance = distance;
  this.speed = speed;
}
module.exports = Enemy;
