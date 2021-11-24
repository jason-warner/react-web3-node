import { controller } from './controller.js';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { api } from "./routes/api.js";
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors());

app.use('/', cors(), api);

app.get('/', (req, res) => {
    res.send("API IS WORKING");
})

// controller();


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    const url = `http://localhost:3001`
    console.log(`Listening on ${url}`);
})