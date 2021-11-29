import React from 'react';
import logo from '../../assets/logo.svg';
import axios from 'axios';
import './Home.css';

const App = () => {
  const [wallet, setWallet] = React.useState("");
  const [balance, updateBalance] = React.useState(['0', '0.00']);
  const postWallet = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post('/post_wallet', { walletAddress: wallet })
        .then((result) => {updateBalance(result.data); console.log(result.data[2])});
    } catch (error) {
      console.log(error)
    }
  }
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
      </header>
    </div>
  );
}

export default App;
