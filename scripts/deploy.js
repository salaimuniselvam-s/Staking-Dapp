const { ethers } = require("hardhat");
const { verify } = require("../utils/verify");
require("dotenv").config();
const developmentChains = ["hardhat", "localhost"];
async function main() {
  const RewardToken = await ethers.getContractFactory("RewardToken");
  const rewardToken = await RewardToken.deploy();
  await rewardToken.deployed();

  console.log("RewardToken contract deployed to:", rewardToken.address);

  const Staking = await ethers.getContractFactory("staking");
  const staking = await Staking.deploy(
    rewardToken.address,
    rewardToken.address
  );
  await staking.deployed();

  console.log("Staking contract deployed to:", staking.address);
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(rewardToken.address, []);
    await verify(staking.address, [rewardToken.address, rewardToken.address]);
  }
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
