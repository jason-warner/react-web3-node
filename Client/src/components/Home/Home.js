import React from 'react';
import axios from 'axios';
import './Home.css';
import PersistentDrawerLeft from '../Drawer/Drawer';

const App = () => {
  const [wallet, setWallet] = React.useState("");
  const [balance, updateBalance] = React.useState(['0', '0.00']);
  const [hasMetaMask, setMetaMask] = React.useState(null);
  const [accounts, setAccounts] = React.useState([]);

  const renderBalance = async (wallet) => {
    try {
      await axios
        .post('/post_wallet', { walletAddress: wallet })
        .then((result) => { updateBalance(result.data); console.log(result.data[3]) });
    } catch (error) {
      console.log(error)
    }
  }

  const postWallet = async (e) => {
    e.preventDefault();
    renderBalance();
  }
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  React.useEffect(() => {
    typeof window.ethereum !== 'undefined'
      ? setMetaMask(true)
      : setMetaMask(false);
  }, []);

  const connectMetaHandler = async () => {
    const getAccounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    console.log(getAccounts[0]);
    // setAccounts(getAccounts[0])
    return renderBalance(getAccounts[0]);

  }


  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={postWallet}>
          <input
            type="text"
            value={wallet}
            onInput={(e) => setWallet(e.target.value)}
            placeholder="enter your wallet address"
          />
          <button type="submit">Get Balance</button>

        </form>
        <p>
          Your ETH balance is {balance[0]} or {formatter.format(balance[1])} USD.
        </p>
        {hasMetaMask &&
          <>
            <button onClick={() => connectMetaHandler()}>
              Enable Ethereum
            </button>
          </>
        }
        <ul>
          {balance && console.log(balance)}
          {balance[3] && balance[3].map((token) => (
            <li>{token.symbol}</li>
          ))}
        </ul>
      </header>
      <PersistentDrawerLeft />
    </div>
  );
}

export default App;
