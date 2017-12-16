const should = require("should");
const game = require("../src");

describe("when there is not enemy", function() {
  it("should win immediatly", function() {
    should.equal(
      game(`50m`),
// - - - - -output - - - - -
      `Firing range is 50m
You win in 0 turns`
    );
  });
});

describe("when enemies can be killed", function() {
  it("should kill the single enemy", function() {
    should.equal(
      game(`20m
Toto 50m 30m`),
// - - - - -output - - - - -
      `Firing range is 20m
Turn 2: Kill Toto at 20m
You win in 2 turns`
    );
  });

  it("should win with more enemies", function() {
    const output = game(
      `50m
BotA 100m 10m
BotB 50m 20m
BotC 30m 20m`
    );

    should.equal(
      output,
      `Firing range is 50m
Turn 1: Kill BotC at 30m
Turn 2: Kill BotB at 30m
Turn 6: Kill BotA at 50m
You win in 6 turns`
    );
  });
});

describe("When the firerange is not long enough", function() {
  it("should lose without even killing one", function() {
    should.equal(
      game(
        `8m
BotA 40m 10m
BotB 50m 20m
BotC 30m 20m`
      ),
// - - - - -output - - - - -
      `Firing range is 8m
You lost in 2 turns
The minimal fire range to win should be: 10m`
    );
  });

  it("should lose and show mininum expected", function() {
    should.equal(
      game(
        `20m
abc1 115m 20m
def2 65m 10m
yyyy 95m 20m
BotA 75m 20m
BotU 80m 20m
BotC 30m 20m`
      ),
// - - - - -output - - - - -
      `Firing range is 20m
Turn 2: Kill BotC at 10m
Turn 4: Kill BotA at 15m
You lost in 4 turns
The minimal fire range to win should be: 35m`
    );
  });
});
