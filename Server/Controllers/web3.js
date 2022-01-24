import Web3 from "web3";
import dotenv from 'dotenv'
import { getExchangeRate } from '../routes/outbound/ETH/getExchangeRate.js';
import { getTransactionHistory } from '../routes/outbound/ETH/getTransactionHistory.js';
import { getBalances } from '../routes/outbound/ETH/getBalances.js';
import { tokenConstructor } from '../services/tokenContructor.js';
import { historyContructor } from "../services/historyConstructor.js";
dotenv.config();

const infuraUrl = `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`;
const web3 = new Web3(infuraUrl);



const walletHoldings = async (wallet) => {
    const balances = await getBalances(wallet);
    const exchangeRate = await getExchangeRate();
    const walletHistory = await getTransactionHistory(wallet);
    const holdings = tokenConstructor(balances, exchangeRate, web3);
    const history = historyContructor(walletHistory)
    historyContructor(history)
    return [holdings, balances, history];
}

export { walletHoldings }
    // import { getTokens } from '../routes/outbound/ETH/getTokenList.js'
    // const weiBalance = balances.ETH.rawBalance
    // const weiBalance = await web3.eth.getBalance(wallet);
    // const ethBalance = web3.utils.fromWei(weiBalance, "ether")
    // const usdBalance = getUSD(ethBalance, exchangeRate.ethusd)
    // const tokenList = await getTokens(wallet);