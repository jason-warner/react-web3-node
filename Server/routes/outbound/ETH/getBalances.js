import dotenv from 'dotenv';
import axios from "axios";
dotenv.config()

const getBalances = async (walletAddress) => {
    return axios({
        method: 'get', //${process.env.ETHPLORER_KEY}
        url: `https://api.ethplorer.io/getAddressInfo/${walletAddress}?apiKey=freekey`
    })
        .then(res => res.data)
        .catch((err) => console.log('Ethplorer error: ', err));

}

export { getBalances }
