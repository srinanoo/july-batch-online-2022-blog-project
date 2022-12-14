const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());

app.use(express.urlencoded({extended: false}));
app.use(express.json());

const blogRoute = require('./routes/blogRoute');
app.use("/api/v1/blog", blogRoute);

app.get('/*', (req, res) => {
    return res.send("Invalid Access Route");
});

app.listen(process.env.BE_PORT, ()=> {
    console.log("Server is listening to Port Number: " + process.env.BE_PORT);
});