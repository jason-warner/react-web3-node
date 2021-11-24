import Web3 from "web3";

const web3 = async (wallet) => {
    console.log(Web3);
    const url = 'https://mainnet.infura.io/v3/cc89ff3f55d94f5e8c3f19138c928340';
    const web3 = new Web3(url);
    const balance = await web3.eth.getBalance(wallet);
    return console.log(balance);
    // console.log(web3)
}

export { web3 }