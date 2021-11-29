import Web3 from "web3";
import dotenv from 'dotenv'
import { getExchangeRate } from '../routes/outbound/ETH/getExchangeRate.js'
import { getTransactionHistory } from '../routes/outbound/ETH/getTransactionHistory.js';
dotenv.config();

const infuraUrl = `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`
const web3 = async (wallet) => {
    // console.log(Web3);
    const web3 = new Web3(infuraUrl);
    const weiBalance = await web3.eth.getBalance(wallet);
    const ethBalance = web3.utils.fromWei(weiBalance, "ether")
    const exchangeRate = await getExchangeRate();
    const usdBalance = (parseFloat(ethBalance) * parseFloat(exchangeRate.ethusd));
    const walletHistory = await getTransactionHistory(wallet);
    return [ethBalance, usdBalance, walletHistory];
}

export { web3 }