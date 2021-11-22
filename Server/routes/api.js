import express from 'express';
const router = express.Router()

router
    .get('/', (req, res) => {
        res.send("API IS WORKING");
    })
    .post('/post_name', (req, res) => {
        let name = req.body;
        console.log(name);
    })



export { router as api }