const { MarkovMachine } = require("./markov");

describe(`markov machine`, function () {
  test("generate chains", function () {
    let machine = new MarkovMachine("We party all day and all night");

    expect(machine.chains).toEqual(
      new Map([
        ["We", ["party"]],
        ["party", ["all"]],
        ["all", ["day", "night"]],
        ["day", ["and"]],
        ["and", ["all"]],
        ["night", [null]],
      ])
    );
  });
  test("random choice", function() {
      expect(MarkovMachine.randomChoice([1])).toEqual(1)
      expect(["a","b", "c"]).toContain(MarkovMachine.randomChoice(["a", "b", "c"]));
  })
});
