import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import StakeDetails from "../components/StakeDetails";
import StakeForm from "../components/StakeForm";
import { useState } from "react";
import ClaimToken from "../components/ClaimToken";
import WithDrawToken from "../components/WithdrawToken";
import BuyToken from "../components/BuyToken";

export default function Home() {
  const [reloadPage, setReloadPage] = useState(false);
  const [rtBalance, setRtBalance] = useState("0");
  const [stakedBalance, setStakedBalance] = useState("0");
  const [earnedBalance, setEarnedBalance] = useState("0");
  let props = {
    reloadPage,
    setReloadPage,
    rtBalance,
    setRtBalance,
    stakedBalance,
    setStakedBalance,
    earnedBalance,
    setEarnedBalance,
  };
  return (
    <main className="bg-gradient-to-r from-zinc-300 to-indigo-200">
      <div className={` ${styles.container}`}>
        <Header />
        <StakeDetails {...props} />

        <div className="flex flex-wrap">
          <StakeForm {...props} />
          <BuyToken {...props} />
        </div>
        <div className="flex flex-wrap ">
          <WithDrawToken {...props} />
          <ClaimToken {...props} />
        </div>
      </div>
    </main>
  );
}
