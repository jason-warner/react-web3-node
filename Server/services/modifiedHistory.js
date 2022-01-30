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


export const historyModifier = (history, exchangeRate) => {
    const modifiedHistory = [];
    for (let i = 0; i < history.length; i++) {
        const historyObj = history[i];
        const value = historyObj.value;
        console.log('value: ', value, i)
        const modifiedValue = web3.utils.fromWei(value, "ether");
        const gas = historyObj.gas;
        const modifiedGas = web3.utils.fromWei(gas, "ether");
        const row = [
            modifiedValue,
            historyObj.from,
            historyObj.to,
            modifiedGas,
            historyObj.hash
        ];
        modifiedHistory.push(row);
    }
    return modifiedHistory;
}