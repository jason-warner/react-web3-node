import express from 'express';
import { web3 } from '../../services/web3.js'
const router = express.Router();



router
    .post('/post_wallet', async (req, res) => {
        const { walletAddress } = req.body;
        const balance = await web3(walletAddress);
        return balance
            ? res.status(200).send(balance)
            : res.status(500)
    });



export { router as api }