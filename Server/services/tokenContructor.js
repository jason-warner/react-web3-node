const getUSD = (eth, rate) => {
    return (parseFloat(eth) * parseFloat(rate));
}


const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

export const tokenConstructor = (balances, exchangeRate, web3) => {
    let
        totalEth = 0,
        totalUsd = 0;
    const tableObject = balances.tokens.map((token) => {
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
    tableObject.unshift(totals, ethBal);
    return tableObject;
}