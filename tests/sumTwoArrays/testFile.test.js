const sumTwoArrays = require("./inputFile");

const { expect } = require("chai");

describe("test sum two arrays", function () {
  it("sum [1] [1] to equal 2", function (done) {
    expect(sumTwoArrays([1],[1])).to.equal(2);
    done();
  });

  it("sum [1,2,3] [4] to equal 10", function (done) {
    expect(sumTwoArrays([1,2,3],[4])).to.equal(10);
    done();
  });
});
