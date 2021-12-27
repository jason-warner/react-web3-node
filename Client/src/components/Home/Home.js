import React from 'react'
import axios from 'axios';
import './Home.css';
import PersistentDrawerLeft from '../Drawer/Drawer';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { BasicTable } from '../Table/BasicTable.js'

const App = () => {
  const [wallet, setWallet] = React.useState("");
  const [balances, updateBalances] = React.useState([]);
  const [hasMetaMask, setMetaMask] = React.useState(null);

  const renderBalance = async (wallet) => {
    try {
      await axios
        .post('/post_wallet', { walletAddress: wallet })
        .then((result) => updateBalances(result.data));
    } catch (error) {
      console.log(error);
    }
  }


  const postWallet = async (e) => {
    e.preventDefault();
    return renderBalance(wallet);
  }

  React.useEffect(() => {
    typeof window.ethereum !== 'undefined'
      ? setMetaMask(true)
      : setMetaMask(false);
  }, []);

  const connectMetaHandler = async () => {
    const getAccounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    return renderBalance(getAccounts[0]);
  }

  React.useEffect(() => console.log('Balances: ', balances), [balances]);
  const rows = balances[0];

  return (
    <>
      <PersistentDrawerLeft />
      <main
        className="min-h-screen flex flex-col items-center justify-center text-white"
        style={{
          backgroundColor: '#2c303a',
          fontSize: 'calc(10px + 1vmin)',
          minHeight: 'calc(100vh - 64px)',
          marginTop: '64px'
        }}
      >
        <Box sx={{ flexGrow: 1, marginTop: '4rem' }}>
          <Grid container rowSpacing={4} spacing={2}>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              {hasMetaMask &&
                <Button
                  sx={{
                    paddingTop: '10px',
                    color: "#61dafb",
                    backgroundColor: '#131417',
                    "&:hover":
                    {
                      backgroundColor: "#61dafb",
                      color: '#1e1f26'
                    }
                  }}
                  variant="contained"
                  onClick={() => connectMetaHandler()} className="flex flex-row justify-center text-center">
                  Enable Ethereum
                </Button>
              }
            </Grid>
            <Grid item xs={12} sx={{ justifyContent: 'center' }}>
              <form className="flex flex-row justify-center p-2">
                <input
                  style={{
                    borderRadius: '4px 0 0 4px',
                    backgroundColor: '#131417',
                    border: '1px solid #61dafb',
                    color: '#61dafb',
                    fontSize: '0.875rem'
                  }}
                  type="text"
                  value={wallet}
                  onInput={(e) => setWallet(e.target.value)}
                  placeholder=" Wallet Address"
                />
                <Button
                  sx={{
                    paddingTop: '10px',
                    borderColor: "#61dafb",
                    borderRadius: '0 4px 4px 0',
                    color: "#61dafb",
                    "&:hover": {
                      backgroundColor: "#61dafb",
                      color: '#1e1f26'
                    }
                  }}
                  className="p-2"
                  type="submit"
                  variant="outlined"
                  onClick={(e) => postWallet(e)}
                >Get Balance</Button>
              </form>
            </Grid>
            {balances[0] &&
              <Grid item xs={12} >
                <BasicTable rows={rows} />
              </Grid>
            }
          </Grid>
        </Box>
      </main>
    </>
  );
}

export default App;
