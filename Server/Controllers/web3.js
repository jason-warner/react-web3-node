import Web3 from "web3";
import dotenv from 'dotenv'
import { getExchangeRate } from '../routes/outbound/ETH/getExchangeRate.js';
import { getTransactionHistory } from '../routes/outbound/ETH/getTransactionHistory.js';
import { getBalances } from '../routes/outbound/ETH/getBalances.js';
import { tokenConstructor } from '../services/tokenContructor.js';
import { historyModifier } from "../services/modifiedHistory.js";
dotenv.config();

const infuraUrl = `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`;
const web3 = new Web3(infuraUrl);



const walletHoldings = async (wallet) => {
    const balances = await getBalances(wallet);
    const exchangeRate = await getExchangeRate();
    const walletHistory = await getTransactionHistory(wallet);
    const holdings = tokenConstructor(balances, exchangeRate, web3);
    let history
    if (walletHistory[0].value) {
        history = historyModifier(walletHistory, exchangeRate);
    }
    return [holdings, balances, history];
}

export { walletHoldings }
