import Web3 from "web3";
import dotenv from 'dotenv'
import { getExchangeRate } from '../routes/outbound/ETH/getExchangeRate.js'
import { getTransactionHistory } from '../routes/outbound/ETH/getTransactionHistory.js';
import { getBalances } from '../routes/outbound/ETH/getBalances.js'
dotenv.config();

const infuraUrl = `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`;
const web3 = new Web3(infuraUrl);

const getUSD = (eth, rate) => {
    return (parseFloat(eth) * parseFloat(rate));
}
const tokenConstructor = (balances, exchangeRate) => {
    let
        totalEth = 0,
        totalUsd = 0;
    const objArr = balances.tokens.map((token) => {
        const eth = web3.utils.fromWei(token.rawBalance, "ether");
        const usd = getUSD(eth, token.tokenInfo.price.rate);
        const desc = `${token.tokenInfo.name} (${token.tokenInfo.symbol})`;
        const price = {
            eth: eth,
            usd: token.tokenInfo.price === false ? '?' : formatter.format(usd)
        };
        totalEth += parseFloat(eth);
        token.tokenInfo.price !== false ? totalUsd += parseFloat(usd) : undefined;
        return { desc, price }
    });
    const weiBalance = balances.ETH.rawBalance;
    const ethBalance = web3.utils.fromWei(weiBalance, "ether");
    const usdBalance = getUSD(ethBalance, exchangeRate.ethusd)
    const totals = {
        eth: totalEth + parseFloat(ethBalance),
        usd: totalUsd + parseFloat(usdBalance)
    }
    const ethBal = {
        desc: 'Ethereum (ETH)',
        price: {
            eth: ethBalance,
            usd: formatter.format(usdBalance)
        }
    }
    objArr.unshift(totals, ethBal);
    return objArr;
}

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

const walletHoldings = async (wallet) => {
    const balances = await getBalances(wallet);
    const exchangeRate = await getExchangeRate();
    const walletHistory = await getTransactionHistory(wallet);
    const holdings = tokenConstructor(balances, exchangeRate)
    return [holdings, walletHistory, balances];
}

export { walletHoldings }
    // import { getTokens } from '../routes/outbound/ETH/getTokenList.js'
    // const weiBalance = balances.ETH.rawBalance
    // const weiBalance = await web3.eth.getBalance(wallet);
    // const ethBalance = web3.utils.fromWei(weiBalance, "ether")
    // const usdBalance = getUSD(ethBalance, exchangeRate.ethusd)
    // const tokenList = await getTokens(wallet);