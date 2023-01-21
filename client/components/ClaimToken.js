import React from "react";
import { useWeb3Contract } from "react-moralis";
import StakingAbi from "../constants/Staking.json";
import { Button, Form, useNotification } from "web3uikit";
import {
  REWARD_TOKEN_ADDRESS,
  STAKE_TOKEN_ADDRESS,
} from "../constants/address";

function ClaimToken({ setReloadPage, reloadPage, earnedBalance }) {
  const stakingAddress = STAKE_TOKEN_ADDRESS;

  const { runContractFunction } = useWeb3Contract();
  const dispatch = useNotification();

  let stakeOptions = {
    abi: StakingAbi.abi,
    contractAddress: stakingAddress,
    functionName: "claimReward",
  };

  async function handleClaimToken(data) {
    stakeOptions.params = {};
    if (earnedBalance <= 0) {
      dispatch({
        type: "error",
        message: `Claim Amount Should Be Greater than Zero`,
        title: "Claim Token",
        position: "topR",
      });
      return;
    }

    try {
      const tx = await runContractFunction({
        params: stakeOptions,
        onError: (error) => console.log(error),
        onSuccess: () => {},
      });
      await tx.wait(1);
      dispatch({
        type: "success",
        message: ``,
        title: "Successfully Claimed Rewards",
        position: "topR",
      });
      setReloadPage(!reloadPage);
    } catch (error) {
      console.error(error);
      dispatch({
        type: "error",
        message: "Token Claim Failed.Please Try Again",
        title: "Token Claim Failed",
        position: "topR",
      });
    }
  }

  return (
    <div className="text-black grow basis-2/5  mt-6 p-3  bg-slate-100 rounded-xl">
      <div className="text-xl p-1 font-bold ">Claim Reward !</div>
      <div className="border-spacing-3 border rounded-2xl py-2 my-3 px-3 border-slate-300">
        Reward Balance is <b>{earnedBalance}</b>
      </div>
      <div className="p-1 mt-3">
        {" "}
        <Button
          onClick={handleClaimToken}
          text="Claim Reward"
          theme="primary"
        />
      </div>
    </div>
  );
}

export default ClaimToken;
