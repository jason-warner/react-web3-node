import React from 'react';
import logo from '../../assets/logo.svg';
import axios from 'axios';
import './Home.css';

const App = () => {
  const [name, setName] = React.useState("");
  // const article = { title: 'Axios POST Request Example' };
  const postName = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:3001/post_name', name)
    } catch (error) {
      console.log(error)
    }
    console.log()
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form onSubmit={postName}>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
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
