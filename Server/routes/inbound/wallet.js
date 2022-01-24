import express from 'express';
import { walletHoldings } from '../../Controllers/web3.js'
const router = express.Router();

router
    .post('/post_wallet', async (req, res) => {
        const { walletAddress } = req.body;
        console.log(walletAddress);
        const holdings = await walletHoldings(walletAddress);
        return holdings
            ? res.status(200).send(holdings)
            : res.status(500)
    });



export { router as api }