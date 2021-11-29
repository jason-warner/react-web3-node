import Web3 from "web3";
import dotenv from 'dotenv'
import { getExchangeRate } from '../routes/outbound/getExchangeRate.js'
dotenv.config();

const infuraUrl = `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`
const web3 = async (wallet) => {
    // console.log(Web3);
    console.log(infuraUrl)
    const web3 = new Web3(infuraUrl);
    const weiBalance = await web3.eth.getBalance(wallet);
    const ethBalance = web3.utils.fromWei(weiBalance, "ether")
    const exchangeRate = await getExchangeRate();
    console.log('exchange rate: ', exchangeRate);
    const usdBalance = (parseFloat(ethBalance) * parseFloat(exchangeRate.ethusd)).toFixed(2)
    return [ethBalance, usdBalance];
}

export { web3 }