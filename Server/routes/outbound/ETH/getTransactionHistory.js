import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();

const getTransactionHistory = (wallet) => {
    const endpoint = `https://api.etherscan.io/api?module=account&action=txlist&address=${wallet}&sort=asc&apikey=${process.env.ETHERSCAN_KEY}`
    return axios(endpoint)
        .then((response) => response.data.result)
        .catch((error) => console.log(error))
}

export { getTransactionHistory }