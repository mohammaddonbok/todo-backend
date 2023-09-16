require('dotenv').config()
const express = require("express");
const app = express();
const mongoose = require('mongoose')
const cors = require('cors');

mongoose.connect(process.env.DATABASE_URL , {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', ()=> console.log('Connected to Database'))

app.use(express.json())
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
require('./server/routes/tasks.route')(app);
app.listen(5000, () => { 
    console.log(`Server Started`);
 });