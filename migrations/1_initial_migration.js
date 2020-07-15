const Migrations = artifacts.require("LTO");
const Migrations1 = artifacts.require("sample");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};

