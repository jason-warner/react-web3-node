import React from 'react';
import logo from '../../assets/logo.svg';
import axios from 'axios';
import './Home.css';

const App = () => {
  const [wallet, setWallet] = React.useState("");
  const [balance, updateBalance] = React.useState(["0.00", "0.00"]);
  // const article = { title: 'Axios POST Request Example' };
  const postWallet = async (e) => {
    e.preventDefault()
    try {
      await axios
        .post('/post_wallet', { walletAddress: wallet })
        .then((result) => updateBalance(balance => balance, result.data));
    } catch (error) {
      console.log(error)
    }
    console.log()
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form onSubmit={postWallet}>
          <input type="text" value={wallet} onChange={(e) => setWallet(e.target.value)} />
          <button type="submit">Send Name</button>
        </form>
        <p>
          Your ETH balance is {balance[0]} or ${balance[1]} USD.
        </p>
      </header>
    </div>
  );
}

export default App;
