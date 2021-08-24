const BallPlayer = artifacts.require("BallPlayer");

module.exports = function (deployer) {
  deployer.deploy(BallPlayer);
};
