import React, { useState } from "react";
import { useWeb3Contract } from "react-moralis";
import StakingAbi from "../constants/Staking.json";
import TokenAbi from "../constants/RewardToken.json";
import { Button, Input, useNotification } from "web3uikit";
import { ethers } from "ethers";
import {
  REWARD_TOKEN_ADDRESS,
  STAKE_TOKEN_ADDRESS,
} from "../constants/address";

function StakeForm({ setReloadPage, reloadPage }) {
  const stakingAddress = STAKE_TOKEN_ADDRESS;
  const rewardTokenAddress = REWARD_TOKEN_ADDRESS;
  const [inputValue, setInputValue] = useState("");

  const { runContractFunction } = useWeb3Contract();
  const dispatch = useNotification();

  let approveOptions = {
    abi: TokenAbi.abi,
    contractAddress: rewardTokenAddress,
    functionName: "approve",
  };

  let stakeOptions = {
    abi: StakingAbi.abi,
    contractAddress: stakingAddress,
    functionName: "stake",
  };

  async function handleStakeSubmit(data) {
    if (inputValue == 0 || !inputValue) {
      dispatch({
        type: "error",
        message: `Stake Amount Should Be Greater than Zero`,
        title: "Stake Token",
        position: "topR",
      });
      return;
    }
    approveOptions.params = {
      amount: ethers.utils.parseEther(inputValue, "ether"),
      spender: stakingAddress,
    };

    const tx = await runContractFunction({
      params: approveOptions,
      onError: (error) => {
        dispatch({
          type: "error",
          message: "Staking Approve Failed.Please Try Again",
          title: "Staking Failed",
          position: "topR",
        });
        console.log(error);
      },
      onSuccess: () => {},
    });
    await tx.wait(1);
    handleApproveSuccess(approveOptions.params.amount);
  }

  async function handleApproveSuccess(amountToStakeFormatted) {
    stakeOptions.params = {
      amount: amountToStakeFormatted,
    };

    const tx = await runContractFunction({
      params: stakeOptions,
      onError: (error) => {
        dispatch({
          type: "error",
          message: "Staking Failed.Please Try Again",
          title: "Staking Failed",
          position: "topR",
        });
        console.log(error);
      },
    });
    await tx?.wait(1);

    if (tx) {
      dispatch({
        type: "success",
        message: `${ethers.utils.formatEther(
          amountToStakeFormatted
        )} Token is Successfully Staked`,
        title: "Successfully Staked..",
        position: "topR",
      });
      console.log("Stake transaction complete");
      setReloadPage(!reloadPage);
    }
  }

  return (
    <div className="text-black mr-6 basis-2/5 mt-6 p-3 grow bg-slate-100 rounded-xl">
      <div className="text-xl p-1 font-bold">Stake Token !</div>
      <div className="p-1 mb-2 mt-3">
        <Input
          onChange={(e) => setInputValue(e.target.value)}
          validation={{
            numberMin: 0,
          }}
          type="number"
          width="100%"
          label="Stake Token"
        />
        <div className="pt-3 ">
          <Button
            onClick={handleStakeSubmit}
            text="Stake Token"
            theme="primary"
          />
        </div>
      </div>
    </div>
  );
}

export default StakeForm;
