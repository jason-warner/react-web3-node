import Web3 from "web3";
import dotenv from 'dotenv';
import axios from "axios";
dotenv.config()

const getTokens = async (walletAddress) => {
    return axios({
        method: 'get',
        url: `https://web3api.io/api/v1/addresses/${walletAddress}/tokens`,
        headers: { 'x-api-key': process.env.AMBERDATA_KEY }
    })
        .then(res => res.data.payload.records)
        .catch((err) => console.log('Amberdata error: ', err))

}

export { getTokens }
