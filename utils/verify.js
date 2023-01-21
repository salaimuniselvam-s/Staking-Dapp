const { run } = require("hardhat");
// contractAddress = 0x310173e320108c0f375d9eff8ccd0f248bdab1e2
const verify = async (contractAddress, args) => {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.error("Already verified!");
    } else {
      console.error(e);
    }
  }
};

module.exports = { verify };
