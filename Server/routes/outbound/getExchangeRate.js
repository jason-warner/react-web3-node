import axios from 'axios';
import dotenv from 'dotenv'
dotenv.config();

const exchangeEndpoint = `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${process.env.ETHERSCAN_KEY}`
const getExchangeRate = async () => {
    console.log(exchangeEndpoint);
    return axios
        .get(exchangeEndpoint)
        .then((response) => response.data.result)
        .catch((err) => console.log('Exchange rate error: ', err));
}

export { getExchangeRate }