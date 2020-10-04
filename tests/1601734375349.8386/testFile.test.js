const arr = require("./inputFile");

    var { expect } = require("chai");

    describe("test", function () {
      it("must be 3", function (done) {
        expect(arr.length).to.equal(3);
        done();
      });
    });
  