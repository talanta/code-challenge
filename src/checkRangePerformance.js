//@ts-check
const Position = require("./position");
/** @param {Array<Position>} enemies*/
/** @param {Number} start*/ 
function checkRangePerformance(range, enemies, start, pit) {
  //test
  return enemies.reduce(
    (res, pos, x) => {
      if (x < start) {
        return { check: true, iteration: res.iteration };
      }
      if (res.check === false) {
        return { check: false, iteration: res.iteration };
      }
      const el = enemies[x];
      let it = res.iteration;
      if (it >= el.turnsToTarget) {
        return { check: false, iteration: res.iteration };
      }
      while (it < el.turnsToTarget) {
        let topRange = el.distance - it * el.enemy.speed;
        let timeToTarget = Math.ceil(topRange / el.enemy.speed) - 1;
        let timeToBeKilled = Math.ceil((topRange - range) / el.enemy.speed);

        if (timeToBeKilled <= 0) {
          return { check: true, iteration: it + 1 };
        }
        if (timeToTarget === 0) {
          return { check: false, iteration: it };
        }
        it++;
      }
      return { check: false, iteration: it };
    },
    { check: true, iteration: pit }
  );
}

module.exports = checkRangePerformance;
