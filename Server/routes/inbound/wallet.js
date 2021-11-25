import express from 'express';
// import { controller } from '../controller.js'
import { web3 } from '../../services/web3.js'
const router = express.Router();



router
    .post('/post_wallet', async (req, res) => {
        const { walletAddress } = req.body;
        const balance = await web3(walletAddress);
        return res.send(balance)

    })



export { router as api }