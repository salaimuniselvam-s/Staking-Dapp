require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");

const PRIVATE_KEY =
  process.env.PRIVATE_KEY ||
  "0x11ee3108a03081fe260ecdc106554d09d9d1209bcafd46942b10e02943effc4a";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";
const POLYGONSCAN_KEY = process.env.POLYGONSCAN_KEY || "";
const POLYGON_RPC_URL = process.env.POLYGON_RPC_URL || "";

module.exports = {
  solidity: "0.8.6",
  settings:{
    optimizer:{
      enabled:true,
      runs:200
    },

  networks: {
    hardhat: {
      chainId: 31337,
    },
    mumbai: {
      url: POLYGON_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 80001,
      blockConfirmations: 2,
    },

    //go to metamask and select mumbai testnet
    //go to account details from the three dots option
    //select export private key
    //copy and paste pvt key .env PRIVATE_KEY
  },
  etherscan: {
    apiKey: {
      goerli: ETHERSCAN_API_KEY,
      polygonMumbai: POLYGONSCAN_KEY,
    },
    customChains: [], // uncomment this line if you are getting a TypeError: customChains is not iterable
  },
};
