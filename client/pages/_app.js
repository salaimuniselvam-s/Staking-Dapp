import { NotificationProvider } from "web3uikit";
import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";

function MyApp({ Component, pageProps }) {
  return (
    <NotificationProvider>
      <MoralisProvider initializeOnMount={false}>
        <Component {...pageProps} />
      </MoralisProvider>
    </NotificationProvider>
  );
}

export default MyApp;
