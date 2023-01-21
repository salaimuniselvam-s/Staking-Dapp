import React, { useState } from "react";
import { useWeb3Contract } from "react-moralis";
import RewardTokenABI from "../constants/RewardToken.json";
import { Button, Input, useNotification } from "web3uikit";
import { ethers } from "ethers";
import {
  ETHER_TO_SMS_TOKEN,
  REWARD_TOKEN_ADDRESS,
  STAKE_TOKEN_ADDRESS,
} from "../constants/address";

function BuyToken({ setReloadPage, reloadPage, stakedBalance }) {
  const smsTokenAddress = REWARD_TOKEN_ADDRESS;
  const [inputValue, setInputValue] = useState("");

  const { runContractFunction } = useWeb3Contract();
  const dispatch = useNotification();

  let smsTokenOptions = {
    abi: RewardTokenABI.abi,
    contractAddress: smsTokenAddress,
    functionName: "buyToken",
  };

  async function handleBuyToken() {
    if (inputValue == 0) {
      dispatch({
        type: "error",
        message: `Token  Must  Greater than Zero`,
        title: "Buy Token",
        position: "topR",
      });
      return;
    }
    smsTokenOptions.msgValue = ethers.utils.parseEther(
      `${inputValue / ETHER_TO_SMS_TOKEN}`
    );

    try {
      const tx = await runContractFunction({
        params: smsTokenOptions,
        onError: (error) => console.log(error),
        onSuccess: () => {},
      });
      await tx.wait(1);
      dispatch({
        type: "success",
        message: ``,
        title: "Successfully Bought Token..",
        position: "topR",
      });
      setReloadPage(!reloadPage);
    } catch (error) {
      console.error(error);
      dispatch({
        type: "error",
        message: "Token Buying Failed.Please Try Again",
        title: "Token Buying Failed",
        position: "topR",
      });
    }
  }

  return (
    <div className="text-black grow basis-2/5  mt-6 p-3  bg-slate-100 rounded-xl">
      <div className="flex flex-wrap justify-between ">
        <div className="text-xl p-1 font-bold">Buy Token !</div>
        <div className="mr-12 p-1">
          1 Ether = <b>{ETHER_TO_SMS_TOKEN}(sms) </b> Tokens
        </div>
      </div>
      <div className="p-1 mb-2 mt-3">
        <Input
          onChange={(e) => setInputValue(e.target.value)}
          validation={{
            numberMin: 0,
          }}
          type="number"
          width="100%"
          label="Buy Token"
        />
        <div className="pt-3 ">
          <Button onClick={handleBuyToken} text="Buy Token" theme="primary" />
        </div>
      </div>
    </div>
  );
}

export default BuyToken;
