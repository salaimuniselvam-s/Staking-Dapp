import React, { useState } from "react";
import { useWeb3Contract } from "react-moralis";
import StakingAbi from "../constants/Staking.json";
import {
  Button,
  Input,
  NotificationProvider,
  useNotification,
} from "web3uikit";
import { ethers } from "ethers";
import { STAKE_TOKEN_ADDRESS } from "../constants/address";

function WithDrawToken({ setReloadPage, reloadPage, stakedBalance }) {
  const stakingAddress = STAKE_TOKEN_ADDRESS;
  const [inputValue, setInputValue] = useState("");

  const { runContractFunction } = useWeb3Contract();
  const dispatch = useNotification();

  let stakeOptions = {
    abi: StakingAbi.abi,
    contractAddress: stakingAddress,
    functionName: "withdraw",
  };

  async function handleWithDrawToken() {
    if (inputValue == 0) {
      dispatch({
        type: "error",
        message: `Withdraw Amount Must  Greater than Zero`,
        title: "Withdraw Token",
        position: "bottomR",
      });
      return;
    } else if (Number(inputValue) > Number(stakedBalance)) {
      dispatch({
        type: "error",
        message: `Withdraw Amount Must  Less than Staked Balance`,
        title: "Withdraw Token",
        position: "bottomR",
      });
      return;
    }
    stakeOptions.params = {
      amount: ethers.utils.parseEther(inputValue, "ether"),
    };

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
        title: "Successfully Withdrawn..",
        position: "bottomR",
      });
      setReloadPage(!reloadPage);
    } catch (error) {
      console.error(error);
      dispatch({
        type: "error",
        message: "Withdraw Failed.Please Try Again",
        title: "Withdraw Failed",
        position: "bottomR",
      });
    }
  }

  return (
    <NotificationProvider>
      <div className="text-black mr-6 basis-2/5 my-6 p-3 grow bg-slate-100 rounded-xl">
        <div className="flex flex-wrap justify-between ">
          <div className="text-xl p-1 font-bold">Withdraw Token !</div>
          <div className="mr-12 p-1">
            Staked Balance is <b>{stakedBalance}</b>
          </div>
        </div>
        <div className="p-1 my-3">
          <Input
            onChange={(e) => setInputValue(e.target.value)}
            validation={{
              numberMax: stakedBalance,
              numberMin: 0,
            }}
            type="number"
            width="100%"
            label="Withdraw Token"
          />
          <div className="pt-3 mt-3">
            <Button
              onClick={handleWithDrawToken}
              text="Withdraw Token"
              theme="primary"
            />
          </div>
        </div>
      </div>
    </NotificationProvider>
  );
}

export default WithDrawToken;
