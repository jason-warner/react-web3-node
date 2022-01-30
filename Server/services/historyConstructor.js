import Web3 from "web3";
import dotenv from 'dotenv'

dotenv.config();

const infuraUrl = `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`;
const web3 = new Web3(infuraUrl);

const getUSD = (eth, rate) => {
    return (parseFloat(eth) * parseFloat(rate));
}

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});


export const historyConstructor = (history, exchangeRate) => {
    const modifiedHistory = [];
    for (let i = 0; i < history.length; i++) {
        const historyObj = history[i];
        const value = web3.utils.fromWei(historyObj.value, "ether");
        const usdValue = getUSD(value, exchangeRate.ethusd)
        const modifiedValue = formatter.format(usdValue)
        const gas = web3.utils.fromWei(historyObj.gas, "ether");
        const usdGas = getUSD(gas, exchangeRate.ethusd);
        const modifiedGas = formatter.format(usdGas);
        const row = [
            value,
            modifiedValue,
            historyObj.from,
            historyObj.to,
            gas,
            historyObj.hash
        ];
        modifiedHistory.push(row);
    }
    return modifiedHistory;
}