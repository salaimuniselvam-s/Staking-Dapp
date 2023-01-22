import React, { useEffect, useState } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import StakingAbi from "../constants/Staking.json";
import TokenAbi from "../constants/RewardToken.json";
import {
  REWARD_TOKEN_ADDRESS,
  STAKE_TOKEN_ADDRESS,
} from "../constants/address";
import { useNotification } from "web3uikit";

function StakeDetails({
  reloadPage,
  rtBalance,
  setRtBalance,
  stakedBalance,
  setStakedBalance,
  earnedBalance,
  setEarnedBalance,
}) {
  const { account, isWeb3Enabled } = useMoralis();
  const stakingAddress = STAKE_TOKEN_ADDRESS;
  const rewardTokenAddress = REWARD_TOKEN_ADDRESS;
  const dispatch = useNotification();
  const [interval, setIntervals] = useState("");

  const { runContractFunction: getRTBalance } = useWeb3Contract({
    abi: TokenAbi.abi,
    contractAddress: rewardTokenAddress,
    functionName: "balanceOf",
    params: {
      account,
    },
  });

  const { runContractFunction: getStakedBalance } = useWeb3Contract({
    abi: StakingAbi.abi,
    contractAddress: stakingAddress,
    functionName: "getStaked",
    params: {
      account,
    },
  });

  const { runContractFunction: getEarnedBalance } = useWeb3Contract({
    abi: StakingAbi.abi,
    contractAddress: stakingAddress,
    functionName: "earned",
    params: {
      account,
    },
  });

  useEffect(() => {
    function updateEarnedBalance() {
      if (stakedBalance == "0" || stakedBalance == "0.00") return;
      const update = async () => {
        const earnedBalance = (
          await getEarnedBalance({ onError: (error) => console.log(error) })
        )?.toString();
        const formattedEarnedBalance = parseFloat(earnedBalance) / 1e18;
        const formattedEarnedBalanceRounded = formattedEarnedBalance;
        setEarnedBalance(
          formattedEarnedBalanceRounded == "NaN"
            ? 0
            : formattedEarnedBalanceRounded
        );
      };
      const intervals = setInterval(() => {
        update();
      }, [7000]);
      if (interval) {
        clearInterval(interval);
      }
      setIntervals(intervals);
    }
    if (isWeb3Enabled) updateEarnedBalance();
  }, [isWeb3Enabled, account, stakedBalance]);

  useEffect(() => {
    async function updateUiValues() {
      const rtBalance = (
        await getRTBalance({ onError: (error) => console.log(error) })
      )?.toString();
      const formattedRtBalance = parseFloat(rtBalance) / 1e18;
      const formattedRtBalaceRounded = formattedRtBalance?.toFixed(2);
      setRtBalance(
        formattedRtBalaceRounded == "NaN" ? 0 : formattedRtBalaceRounded
      );
      if (formattedRtBalance == 0) {
        dispatch({
          type: "info",
          message:
            "You have 0 Sms Tokens. Use Buy Section below to buy Sms tokens With Ethers",
          title: "Buy Sms Tokens",
          position: "bottomR",
        });
      }

      const stakedBalace = (
        await getStakedBalance({ onError: (error) => console.log(error) })
      )?.toString();
      const formattedStakedBalance = parseFloat(stakedBalace) / 1e18;
      const formattedStakedBalanceRounded = formattedStakedBalance?.toFixed(2);
      setStakedBalance(
        formattedStakedBalanceRounded == "NaN"
          ? 0
          : formattedStakedBalanceRounded
      );

      const earnedBalance = (
        await getEarnedBalance({ onError: (error) => console.log(error) })
      )?.toString();
      const formattedEarnedBalance = parseFloat(earnedBalance) / 1e18;
      const formattedEarnedBalanceRounded = formattedEarnedBalance;
      console.log(formattedEarnedBalanceRounded, "dfasda");
      setEarnedBalance(
        formattedEarnedBalanceRounded == "NaN"
          ? 0
          : formattedEarnedBalanceRounded
      );
    }

    if (isWeb3Enabled) updateUiValues();
  }, [account, getRTBalance, getStakedBalance, isWeb3Enabled, reloadPage]);

  return (
    <div className="p-3 flex flex-wrap">
      <div className="font-bold my-3 mx-6">
        Sms Token Balance is: {rtBalance}
      </div>
      <div className="font-bold my-3 mx-6">
        Earned Balance is: {earnedBalance}
      </div>
      <div className="font-bold my-3 mx-6">
        Staked Balance is: {stakedBalance}
      </div>
    </div>
  );
}

export default StakeDetails;
