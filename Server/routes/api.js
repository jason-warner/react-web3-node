import express from 'express';
import { controller } from '../controller.js'
const router = express.Router();


router
    .post('/post_wallet', (req, res) => {
        const { walletAddress } = req.body;
        return controller(walletAddress)
    })



export { router as api }