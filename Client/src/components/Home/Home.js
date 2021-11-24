import React from 'react';
import logo from '../../assets/logo.svg';
import axios from 'axios';
import './Home.css';

const App = () => {
  const [wallet, setWallet] = React.useState("");
  // const article = { title: 'Axios POST Request Example' };
  const postWallet = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/post_wallet', {walletAddress: wallet})
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
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
