const express = require("express");
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');
const Taskroutes=require('./Routes/Routes')

const app = express();
const port = 3200;

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());



app.get('/', (req, res) => {
    res.send("first project");
});


app.use('/', Taskroutes);
const start = async () => {
    try {
        await db(process.env.MONGO_URI);
        app.listen(port, () => console.log(`app is running on port : ${port}`));
    } catch (error) {
        console.log(error);
    }
}

start();
