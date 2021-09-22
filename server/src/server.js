require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./config/database')
const cors = require('cors');
const route = require('./routes');
const bodyParser = require('body-parser');
const port = process.env.port;
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// Connect database
db.connect();

app.use(cors());
route(app);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})