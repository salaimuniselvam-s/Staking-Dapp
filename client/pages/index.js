import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import StakeDetails from "../components/StakeDetails";
import StakeForm from "../components/StakeForm";
import { useState } from "react";
import ClaimToken from "../components/ClaimToken";
import WithDrawToken from "../components/WithdrawToken";
import BuyToken from "../components/BuyToken";
import { NotificationProvider } from "web3uikit";

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
    <main className="bg-gradient-to-r  from-zinc-300 to-indigo-200">
      <div className={` ${styles.container}`}>
        <Header />
        <NotificationProvider>
          <StakeDetails {...props} />
        </NotificationProvider>

        <div className="flex flex-wrap">
          <NotificationProvider>
            <StakeForm {...props} />
          </NotificationProvider>
          <NotificationProvider>
            <BuyToken {...props} />
          </NotificationProvider>
        </div>
        <div className="flex flex-wrap ">
          <NotificationProvider>
            <WithDrawToken {...props} />
          </NotificationProvider>
          <NotificationProvider>
            <ClaimToken {...props} />
          </NotificationProvider>
        </div>
      </div>
    </main>
  );
}
